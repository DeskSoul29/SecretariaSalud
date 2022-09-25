import login from "../models/user.js";
import local from "../models/localidades.js";
import codEsta from "../models/codigoEstablecimientos.js";
import hojavida from "../models/hojavida.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";

var authCoordi = (function () {
  var isUser = function (req, title, mess, icon, button, timer, ruta) {
    return (req.alert = [
      {
        alert: true,
        alertTitle: title,
        alertMessage: mess,
        alertIcon: icon,
        showConfirmButton: button,
        timer: timer,
        ruta: ruta,
      },
    ]);
  };

  return {
    isUser: isUser,
  };
})();

// Apartado: Cuentas - Register
export const register = async (req, res, next) => {
  const { name, lastname, user, pass, provincia, municipio, rol } = req.body;

  login.find({ user: user }).exec(async (err, results) => {
    if (results.length != 0) {
      //Usuario ya registrado
      authCoordi.isUser(
        req,
        "Advertencia",
        "Usuario ya Registrado",
        "error",
        true,
        false,
        "/coordinacion/Cuentas/Register"
      );
    } else {
      var userNew = new login({
        user: user,
        nombre: name,
        apellido: lastname,
        pass: await bcryptjs.hash(pass, 8),
        provincia: provincia,
        municipio: municipio,
        rol: rol,
      });

      await userNew.save().then((result) => {
        authCoordi.isUser(
          req,
          "Conexión exitosa",
          "Registrado Correctamente",
          "success",
          false,
          800,
          "/coordinacion/Cuentas/Register"
        );
      });
    }
    return next();
  });
};
export const fillFields = async (req, res, next) => {
  const localidades = await local.find();
  req.localidades = localidades;
  return next();
};

//Apartado Cuentas - Usuarios
export const users = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const users = await login.find({ user: { $ne: decodificada.user } });
    req.users = users;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const consultUser = async (req, res, next) => {
  const consultUser = await login.findById(req.params.id).lean();
  req.consultUser = consultUser;
  return next();
};
export const editUser = async (req, res, next) => {
  var {
    name,
    lastname,
    provincia,
    municipio,
    rol,
    extraMuni1,
    extraMuni2,
    extraMuni3,
  } = req.body;

  extraMuni1 = extraMuni1 == "Ninguno" ? "" : extraMuni1;
  extraMuni2 = extraMuni2 == "Ninguno" ? "" : extraMuni2;
  extraMuni3 = extraMuni3 == "Ninguno" ? "" : extraMuni3;

  console.log(extraMuni3);

  await login
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          nombre: name,
          apellido: lastname,
          provincia: provincia,
          municipio: municipio,
          rol: rol,
          municipioExtra1: extraMuni1,
          municipioExtra2: extraMuni2,
          municipioExtra3: extraMuni3,
        },
      },
      { new: true }
    )
    .then((result) => {
      authCoordi.isUser(
        req,
        "Conexión exitosa",
        "Editado Correctamente",
        "success",
        false,
        800,
        "coordinacion/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};
export const deleteUser = async (req, res, next) => {
  await login
    .deleteOne({ user: req.body.userDel })
    .then((result) => {
      authCoordi.isUser(
        req,
        "Conexión exitosa",
        "Eliminado Correctamente",
        "success",
        false,
        800,
        "coordinacion/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};

// Hojas de Vidas
export const CodigosEstablecimientos = async (req, res, next) => {
  const codigos = await codEsta.find().sort({ codigo: 1 });
  req.codigos = codigos;
  return next();
};
export const inscribirEstablecimiento = async (req, res, next) => {
  const {
    provincia,
    municipio,
    grupEsta,
    codEsta,
    tipoEsta,
    Nriesgo,
    tIden,
    inputIden,
    rSocial,
    direccion,
    rLegal,
    estado,
  } = req.body;

  var salida = false;

  if (tIden == "NIT") {
    await hojavida
      .find({ identificacion: inputIden, tipoIdentificacion: tIden })
      .count()
      .then((result) => {
        if (result >= 1) {
          authCoordi.isUser(
            req,
            "Advertencia",
            "NIT ya registrado",
            "error",
            true,
            false
          );
          salida = true;
        }
      });
  } else if (tIden == "Cedula Ciudadania") {
    await hojavida
      .find({
        identificacion: inputIden,
        tipoIdentificacion: tIden,
        grupo: grupEsta,
      })
      .count()
      .then((result) => {
        if (result >= 1) {
          authCoordi.isUser(
            req,
            "Advertencia",
            "Usuario con Establecimiento En El Mismo Grupo",
            "error",
            true,
            false
          );
          salida = true;
        }
      });
  }

  if (!salida) {
    var estaNew = new hojavida({
      provincia: provincia,
      municipio: municipio,
      grupo: grupEsta,
      codigo: codEsta,
      tipo: tipoEsta,
      nivelRiesgo: Nriesgo,
      tipoIdentificacion: tIden,
      identificacion: inputIden,
      razonSocial: rSocial,
      direccion: direccion,
      repreLegal: rLegal,
      estado: estado,
    });
    await estaNew
      .save()
      .then((result) => {
        if (result) {
          authCoordi.isUser(
            req,
            "Conexión exitosa",
            "Establecimiento Añadido Correctamente",
            "success",
            false,
            800,
            "/coordinacion/HojaVida/InscribirHV"
          );
        } else {
          authCoordi.isUser(
            req,
            "Advertencia",
            "Error en la Base de Datos",
            "error",
            true,
            false,
            "/coordinacion/HojaVida/InscribirHV"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return next();
};
export const hojavidaConsultAll = async (req, res, next) => {
  const hv = await hojavida.find({}).lean();
  req.hojavida = hv;
  return next();
};
export const HVConsultOne = async (req, res, next) => {
  const CHVida = await hojavida.findById(req.params.id).lean();
  req.consultHV = CHVida;
  return next();
};
export const editHV = async (req, res, next) => {
  const {
    provincia,
    municipio,
    grupEsta,
    codEsta,
    tipoEsta,
    Nriesgo,
    tIden,
    inputIden,
    rSocial,
    direccion,
    rLegal,
    estado,
  } = req.body;

  await hojavida
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          provincia: provincia,
          municipio: municipio,
          grupo: grupEsta,
          codigo: codEsta,
          tipo: tipoEsta,
          nivelRiesgo: Nriesgo,
          tipoIdentificacion: tIden,
          identificacion: inputIden,
          razonSocial: rSocial,
          direccion: direccion,
          repreLegal: rLegal,
          estado: estado,
        },
      },
      { new: true }
    )
    .then((result) => {
      if (result) {
        authCoordi.isUser(
          req,
          "Conexión exitosa",
          "Establecimiento Actualizado Correctamente",
          "success",
          false,
          800,
          "coordinacion/HojaVida/ConsultarHV"
        );
      } else {
        authCoordi.isUser(
          req,
          "Advertencia",
          "Error en la Base de Datos",
          "error",
          true,
          false,
          "coordinacion/HojaVida/ConsultarHV"
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return next();
};
