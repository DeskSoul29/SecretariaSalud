import login from "../models/user.js";
import local from "../models/localidades.js";
import hojavida from "../models/hojavida.js";
import consolidaciones from "../models/consolidaciones.js";
import reportes from "../models/reportes.js";

import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";

var authProf = (function () {
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

  var UpdateConsoli = async (req, next, decodificada, nextCons) => {
    var { userTec, nameTec, municipio, criterio, motivo, tipCon } = req.body;

    var report = new reportes({
      tipo: tipCon,

      consolidacion: {
        userTec: userTec,
        nomTec: nameTec,
        provincia: decodificada.provincia,
        municipio: municipio,
        consID: req.params._id,
      },
      respuesta: {
        userRes: decodificada.user,
        nombreRes: decodificada.nombres + " " + decodificada.apellidos,
        rol: decodificada.rol,
        criterio: criterio,
        motivo: motivo,
      },
      createdAt: new Date(),
    });
    return await report
      .save()
      .then((data) => {
        consolidaciones
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
            if (tipCon == "Establecimiento") {
              authProf.UpdateActa(req);
            }
            if (nextCons.length === 0) {
              authProf.isUser(
                req,
                "Reportes Terminados",
                "Ha Terminado El Listado",
                "success",
                true,
                false,
                "/profesional/Consolidaciones/Ver"
              );
            } else {
              if (nextCons[0].consolidacion.establecimiento == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Validar/Establecimientos/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.antirrabica == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Validar/AntirrabicaAnimal/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.eduSanitaria == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Validar/EduSanitaria/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.EvenSaludPubli == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Validar/EventosSaludPublica/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.lisCarnets == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Validar/ListadoCarnetizados/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.vehiculos == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Validar/Vehiculos/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.tomaMuestra == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Validar/TomaMuestras/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.quejas == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Validar/Quejas/" +
                  nextCons[0]._id;
              }
              authProf.isUser(
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
      })
      .catch((error) => {
        if (tipCon == "Establecimiento") {
          var rutaVer = "/profesional/Consolidaciones/Ver/Establecimientos";
        } else if (tipCon == "Eventos Salud Publica") {
          var rutaVer = "/profesional/Consolidaciones/Ver/EventosSaludPublica";
        } else if (tipCon == "Quejas") {
          var rutaVer = "/profesional/Consolidaciones/Ver/Quejas";
        } else if (tipCon == "Antirrabica") {
          var rutaVer = "/profesional/Consolidaciones/Ver/AntirrabicaAnimal";
        } else if (tipCon == "Carnetizados") {
          var rutaVer = "/profesional/Consolidaciones/Ver/ListadoCarnetizados";
        } else if (tipCon == "Edu. Sanitaria") {
          var rutaVer = "/profesional/Consolidaciones/Ver/EduSanitaria";
        } else if (tipCon == "Vehiculos") {
          var rutaVer = "/profesional/Consolidaciones/Ver/Vehiculos";
        } else if (tipCon == "Toma de Muestra") {
          var rutaVer = "/profesional/Consolidaciones/Ver/TomaMuestras";
        }
        authProf.isUser(
          req,
          "Reporte Cancelado",
          "Ya se encuentra un reporte en la Base de Datos",
          "error",
          true,
          false,
          rutaVer
        );
        return next();
      });
  };

  var UpdateCorreccion = async (req, next, decodificada, nextCons) => {
    var { criterio, motivo, tipCon } = req.body;

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
                "respuesta.userRes": decodificada.user,
                "respuesta.nombreRes":
                  decodificada.nombres + " " + decodificada.apellidos,
                "respuesta.criterio": criterio,
                "respuesta.motivo": motivo,
                createdAt: new Date(),
              },
            },
            { new: true }
          )
          .then((result) => {
            if (tipCon == "Establecimiento") {
              authProf.UpdateActa(req);
            }
            if (nextCons.length === 0) {
              authProf.isUser(
                req,
                "Correcciones Terminadas",
                "Ha Terminado El Listado",
                "success",
                true,
                false,
                "/profesional/Consolidaciones/Ver"
              );
            } else {
              if (nextCons[0].consolidacion.establecimiento == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Correccion/Establecimientos/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.antirrabica == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Correccion/AntirrabicaAnimal/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.eduSanitaria == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Correccion/EduSanitaria/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.EvenSaludPubli == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Correccion/EventosSaludPublica/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.lisCarnets == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Correccion/ListadoCarnetizados/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.vehiculos == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Correccion/Vehiculos/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.tomaMuestra == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Correccion/TomaMuestras/" +
                  nextCons[0]._id;
              } else if (nextCons[0].consolidacion.quejas == "on") {
                var rutaValidar =
                  "/profesional/Consolidaciones/Correccion/Quejas/" +
                  nextCons[0]._id;
              }
              authProf.isUser(
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

  var UpdateActa = async (req) => {
    return await consolidaciones.findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          actaAnul: req.body.actaAnul,
        },
      },
      { new: true }
    );
  };

  var SearchNextConsolidacion = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        status: {
          $eq: "Pendiente",
        },
        _id: {
          $ne: req.params._id,
        },
      })
      .sort({ createdAt: 1 })
      .limit(1);
  };

  var SearchNextCorrec = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        status: {
          $eq: "Corregido",
        },
        _id: {
          $ne: req.params._id,
        },
      })
      .sort({ createdAt: 1 })
      .limit(1);
  };

  var ValidaMunicipio = async (municipio, mes) => {
    let today = new Date();
    console.log(today);
    return await consolidaciones.find({
      municipio: {
        $eq: municipio,
      },
      "ForNAdmin.mesNA": {
        $eq: mes,
      },
      "consolidacion.noveadministrativa": { $eq: "on" },
      $expr: {
        $and: [{ $eq: [{ $year: "$createdAt" }, 2021] }],
      },
    });
  };

  return {
    isUser: isUser,
    UpdateConsoli: UpdateConsoli,
    UpdateCorreccion: UpdateCorreccion,
    UpdateActa: UpdateActa,
    SearchNextConsolidacion: SearchNextConsolidacion,
    SearchNextCorrec: SearchNextCorrec,
    ValidaMunicipio: ValidaMunicipio,
  };
})();

//Inicio
export const ConsolidaEstadosProf = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.noveadministrativa": {
          $ne: "on",
        },
        status: { $eq: "Pendiente" },
      })
      .count()
      .then((data) => {
        req.consPend = data;
      });

    await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.noveadministrativa": {
          $ne: "on",
        },
        status: {
          $eq: "Corregido",
        },
      })
      .count()
      .then((data) => {
        req.consCorre = data;
      });

    await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.noveadministrativa": {
          $ne: "on",
        },
        status: {
          $eq: "Enviado",
        },
      })
      .count()
      .then((data) => {
        req.consEnv = data;
      });

    await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.noveadministrativa": {
          $ne: "on",
        },
        status: {
          $eq: "Rechazado",
        },
      })
      .count()
      .then((data) => {
        req.consRech = data;
      });

    await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.noveadministrativa": {
          $ne: "on",
        },
        status: {
          $eq: "Aceptado",
        },
      })
      .count()
      .then((data) => {
        req.consAcep = data;
      });

    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};

// Apartado: Cuentas - Usuarios
export const fillMunicipio = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      const localidades = await local.find({
        provincia: { $eq: decodificada.provincia },
      });
      req.localidades = localidades;
      return next();
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
};
export const users = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    login
      .find({
        user: { $ne: decodificada.user },
        provincia: {
          $eq: decodificada.provincia,
        },
        rol: {
          $ne: "coordinacion",
        },
      })
      .exec(async (err, result) => {
        if (err) throw err;
        req.users = result;
        return next();
      });
  } catch (error) {
    console.log(error);
    return next();
  }
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
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Contraseña Actualizada Correctamente",
        "success",
        false,
        800,
        "profesional/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};
export const addMuniApoyo = async (req, res, next) => {
  var { extraMuni1, extraMuni2, extraMuni3 } = req.body;

  extraMuni1 = extraMuni1 == "Ninguno" ? "" : extraMuni1;
  extraMuni2 = extraMuni2 == "Ninguno" ? "" : extraMuni2;
  extraMuni3 = extraMuni3 == "Ninguno" ? "" : extraMuni3;

  await login
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          municipioExtra1: extraMuni1,
          municipioExtra2: extraMuni2,
          municipioExtra3: extraMuni3,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Municipios Añadidos Correctamente",
        "success",
        false,
        800,
        "profesional/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};

//Apartado: Hojas de Vida
export const hojavidaConsultAllProf = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      const hv = await hojavida
        .find({ provincia: decodificada.provincia })
        .lean();
      req.hojavida = hv;
      return next();
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
};

//Apartado: Consolidaciones
//Consolidaciones - Novedades Administrativas
export const CountActas = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.establecimiento": {
          $eq: "on",
        },
        actaAnul: {
          $eq: "SI",
        },
      })
      .count()
      .then((data) => {
        req.actaAnul = data;
      });

    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendNovedad = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var {
    mes,
    provincia,
    municipio,
    entreInfor,
    entreCrono,
    fechCrono,
    entreAsis,
    fechAsis,
    entreCircu,
    NumCir,
    numActas,
    nomActas,
    motDevol,
    observacion,
  } = req.body;

  var validaMuni = await authProf.ValidaMunicipio(municipio, mes);
  console.log(validaMuni);
  console.log(validaMuni.length === 0);
  if (validaMuni.length === 0) {
    authProf.isUser(
      req,
      "Advertencia",
      "Ya se envio un reporte en el mes actual",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/EnviarNA"
    );
  } else {
    new consolidaciones({
      status: "Enviado",
      provincia: provincia,
      municipio: municipio,
      responsable: {
        userResponsable: decodificada.user,
        nombreResponsable: decodificada.nombres + " " + decodificada.apellidos,
      },
      consolidacion: {
        noveadministrativa: "on",
      },
      ForNAdmin: {
        mesNA: mes,
        entreInfor: entreInfor,
        entreCrono: entreCrono,
        fechCrono: fechCrono,
        entreAsis: entreAsis,
        fechAsis: fechAsis,
        entreCircu: entreCircu,
        NumCir: NumCir,
        numActas: numActas,
        nomActas: nomActas,
        motDevol: motDevol,
      },
      createdAt: new Date(),
      observaciones: observacion,
    })
      .save()
      .then((result) => {
        if (result) {
          authProf.isUser(
            req,
            "Conexión exitosa",
            "Consolidación Enviada",
            "success",
            false,
            800,
            "/profesional/Consolidaciones/EnviarNA"
          );
        } else {
          authProf.isUser(
            req,
            "Error en la Base de Datos",
            "Envio Cancelado",
            "error",
            false,
            false,
            "/profesional/Consolidaciones/EnviarNA"
          );
        }
      });
  }
  return next();
};

//Consolidaciones - Consultar
export const SeeProfConsolidaciones = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Estables = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
      })
      .sort({ createdAt: -1 });
    req.allConso = Estables;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};

//Consolidaciones - Validar
export const SendReport = async (req, res, next) => {
  var validar = await consolidaciones.findById(req.params._id);

  if (validar.status == "Pendiente") {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    var nextCons = await authProf.SearchNextConsolidacion(
      req,
      decodificada.provincia
    );

    authProf.UpdateConsoli(req, next, decodificada, nextCons);
  } else {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "No se encuentra en estado Pendiente",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver"
    );
    return next();
  }
};

//Consolidaciones - Correccion
export const SearchConsolidaRechazada = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    await reportes
      .findOne({
        "consolidacion.provincia": { $eq: decodificada.provincia },
        "consolidacion.consID": { $eq: req.params._id },
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
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const EditReport = async (req, res, next) => {
  var validar = await consolidaciones.findById(req.params._id);
  if (validar.status == "Corregido") {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    var nextCons = await authProf.SearchNextCorrec(req, decodificada.provincia);
    authProf.UpdateCorreccion(req, next, decodificada, nextCons);
  } else {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "No se encuentra en estado Corregido",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver"
    );
    return next();
  }
};
