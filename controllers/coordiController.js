import login from "../models/user.js";
import local from "../models/localidades.js";
import hojavida from "../models/hojavida.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import consolidaciones from "../models/consolidaciones.js";
import reportes from "../models/reportes.js";
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

  var UpdateCorreccion = async (req, next, decodificada, nextCons) => {
    var { criterio, motivo } = req.body;

    await consolidaciones
      .findByIdAndUpdate(
        req.params._id,
        {
          $set: {
            status: criterio,
          },
        },
        { new: true }
      )
      .then((result) => {
        reportes
          .findOneAndUpdate(
            { "consolidacion.consID": req.params._id },
            {
              $set: {
                "consolidacion.userRes": decodificada.user,
                "consolidacion.nombreRes":
                  decodificada.nombres + " " + decodificada.apellidos,
                "respuesta.criterio": criterio,
                "respuesta.motivo": motivo,
                createdAt: new Date(),
              },
            },
            { new: true }
          )
          .then((result) => {
            if (nextCons.length === 0) {
              authCoordi.isUser(
                req,
                "Correcciones Terminadas",
                "Ha Terminado El Listado",
                "success",
                true,
                false,
                "/coordinacion/Consolidaciones/Ver"
              );
            } else {
              if (nextCons[0].consolidacion.establecimiento == "on") {
                var rutaValidar =
                  "/coordinacion/Consolidaciones/Correccion/Establecimientos/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.antirrabica == "on") {
                var rutaValidar =
                  "/coordinacion/Consolidaciones/Correccion/AntirrabicaAnimal/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.eduSanitaria == "on") {
                var rutaValidar =
                  "/coordinacion/Consolidaciones/Correccion/EduSanitaria/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.EvenSaludPubli == "on") {
                var rutaValidar =
                  "/coordinacion/Consolidaciones/Correccion/EventosSaludPublica/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.lisCarnets == "on") {
                var rutaValidar =
                  "/coordinacion/Consolidaciones/Correccion/ListadoCarnetizados/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.vehiculos == "on") {
                var rutaValidar =
                  "/coordinacion/Consolidaciones/Correccion/Vehiculos/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.tomaMuestra == "on") {
                var rutaValidar =
                  "/coordinacion/Consolidaciones/Correccion/TomaMuestras/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.quejas == "on") {
                var rutaValidar =
                  "/coordinacion/Consolidaciones/Correccion/Quejas/" +
                  nextCons[0]._id;
              }
              authCoordi.isUser(
                req,
                "Conexión exitosa",
                "Consolidación Enviada",
                "success",
                false,
                800,
                rutaValidar
              );
            }
            return next();
          });
      });
  };

  var SearchNextConsolidacion = async (req) => {
    return await consolidaciones
      .find({
        status: {
          $eq: "Enviado",
        },
        _id: {
          $ne: req.params._id,
        },
      })
      .sort({ createdAt: 1 })
      .limit(1);
  };

  return {
    isUser: isUser,
    UpdateCorreccion: UpdateCorreccion,
    SearchNextConsolidacion: SearchNextConsolidacion,
  };
})();

//Dashboard

//Apartado: Cuentas
// Cuentas: Register
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
        "coordinacion/Cuentas/Register"
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
        createdAt: new Date(),
      });

      await userNew.save().then((result) => {
        authCoordi.isUser(
          req,
          "Conexión exitosa",
          "Registrado Correctamente",
          "success",
          false,
          800,
          "coordinacion/Cuentas/Register"
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
// Cuentas: Usuarios
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

  if (rol != "tecnico") {
    extraMuni1 = "";
    extraMuni2 = "";
    extraMuni3 = "";
  }
  extraMuni1 = extraMuni1 == "Ninguno" ? "" : extraMuni1;
  extraMuni2 = extraMuni2 == "Ninguno" ? "" : extraMuni2;
  extraMuni3 = extraMuni3 == "Ninguno" ? "" : extraMuni3;

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
    .findByIdAndDelete(req.params.id)
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
export const changePass = async (req, res, next) => {
  var { pass } = req.body;

  await login
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          pass: await bcryptjs.hash(pass, 8),
        },
      },
      { new: true }
    )
    .then((result) => {
      authCoordi.isUser(
        req,
        "Conexión exitosa",
        "Contraseña Actualizada Correctamente",
        "success",
        false,
        800,
        "coordinacion/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};

//Apartado: Consolidaciones

//Consolidaciones - Consultar
export const SeeCoorConsolidaciones = async (req, res, next) => {
  req.allConso = await consolidaciones.find({
    $or: [{ status: { $eq: "Enviado" } }, { status: { $eq: "Aceptado" } }],
  });
  return next();
};

//Consolidaciones - Validar
export const ConsolidaEnviada = async (req, res, next) => {
  await reportes
    .findOne({
      "consolidacion.consID": { $eq: req.params._id },
      "respuesta.criterio": { $eq: "Enviada" },
    })
    .then((data) => {
      if (data == null) {
        res.redirect("/404");
      } else {
        req.consRech = data;
      }
      return next();
    })
    .catch((error) => {
      console.log(error);
    });
};
export const SendReport = async (req, res, next) => {
  var validar = await consolidaciones.findById(req.params._id);
  if (validar.status == "Enviado") {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    var nextCons = await authCoordi.SearchNextConsolidacion(
      req,
      decodificada.provincia
    );
    authCoordi.UpdateCorreccion(req, next, decodificada, nextCons);
  } else {
    authCoordi.isUser(
      req,
      "Reporte Cancelado",
      "No se encuentra en estado Enviado",
      "error",
      true,
      false,
      "/coordinacion/Consolidaciones/Ver"
    );
    return next();
  }
};

// Hojas de Vidas
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
    phone,
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
          telefono: phone,
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
