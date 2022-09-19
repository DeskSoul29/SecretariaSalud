import login from "../models/user.js";
import local from "../models/localidades.js";
import codEsta from "../models/codigoEstablecimientos.js";
import hojavida from "../models/hojavida.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";

// Apartado: Cuentas - Register
export const register = async (req, res, next) => {
  const { name, lastname, user, pass, provincia, municipio, rol } = req.body;

  login.find({ user: user }).exec(async (err, results) => {
    if (results.length != 0) {
      //Usuario ya registrado
      req.register = "found";
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
      await userNew.save(function (err, results) {
        req.register = results;
      });
    }
    return next();
  });
};

export const fillFields = async (req, res, next) => {
  const localidades = await local.find({}).lean();
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
export const editUser = async (req, res, next) => {
  const { name, lastname, pass, provincia, municipio, rol } = req.body;

  await login
    .updateOne(req.params.id, {
      nombre: name,
      apellido: lastname,
      pass: await bcryptjs.hash(pass, 8),
      provincia: provincia,
      municipio: municipio,
      rol: rol,
    })
    .then((result) => {
      req.flash("success_msg", "Borrado Exitoso");
      res.locals.message = req.flash();
      res.redirect("/coordinacion/Cuentas/Usuarios");
    })
    .catch((error) => console.error(error));
};
export const deleteUser = async (req, res, next) => {
  await login
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      req.flash("success_msg", "Borrado Exitoso");
      res.locals.message = req.flash();
      res.redirect("/coordinacion/Cuentas/Register");
    })
    .catch((error) => console.error(error));
};
export const extraADD = async (req, res, next) => {
  conexion.query(
    "UPDATE users SET municipio_extra = ? WHERE user = ?",
    [req.body.muniADD, req.body.userADDMuni],
    (error) => {
      if (error) {
        req.alert = [
          {
            alertTitle: "Error",
            alertMessage: "Error en la Base de Datos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "coordinacion/Cuentas/Usuarios",
          },
        ];
      } else {
        req.alert = [
          {
            alertTitle: "Conexión exitosa",
            alertMessage: "Municipio de Ayuda Añadido correctamente",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 800,
            ruta: "coordinacion/Cuentas/Usuarios",
          },
        ];
      }
      return next();
    }
  );
};
export const extraDELETE = async (req, res, next) => {
  conexion.query(
    "UPDATE users SET municipio_extra = NULL WHERE user = ?",
    req.body.userDELETEMuni,
    function (err) {
      if (err) {
        req.alert = [
          {
            alertTitle: "Error",
            alertMessage: "Error en la Base de Datos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "coordinacion/Cuentas/Usuarios",
          },
        ];
      } else {
        req.alert = [
          {
            alertTitle: "Conexión exitosa",
            alertMessage: "Municipio de Ayuda Eliminado correctamente",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 800,
            ruta: "coordinacion/Cuentas/Usuarios",
          },
        ];
      }
      return next();
    }
  );
};

// Hojas de Vidas
export const CodigosEstablecimientos = async (req, res, next) => {
  const codigos = await codEsta.find({}).lean();
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
    rSocial,
    direccion,
    rLegal,
    estado,
  } = req.body;

  var estaNew = new hojavida({
    provincia: provincia,
    municipio: municipio,
    grupo: grupEsta,
    codigo: codEsta,
    tipo: tipoEsta,
    nivelRiesgo: Nriesgo,
    razonSocial: rSocial,
    direccion: direccion,
    repreLegal: rLegal,
    estado: estado,
  });
  await estaNew.save();
  req.flash("success_msg", "Note Added Successfully");
  res.locals.message = req.flash();
  res.redirect("/coordinacion/HojaVida/ConsultarHV");
};

export const hojavidaConsult = async (req, res, next) => {
  const hv = await hojavida.find({}).lean();
  req.hojavida = hv;
  return next();
};
//Extras
export const isAuthenticatedCoordinacion = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          return next();
        } else if (results.rol != "coordinacion") {
          return res.redirect("/" + results.rol);
        }
        req.user = results;
        return next();
      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/");
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
