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

  var UpdateConsoli = async (
    req,
    next,
    decodificada,
    tipCon,
    nextCons,
    rutaVer,
    rutaValidar
  ) => {
    var { userTec, nameTec, municipio, criterioProf, motivo } = req.body;

    var report = new reportes({
      tipo: tipCon,

      consolidacion: {
        userTec: userTec,
        nomTec: nameTec,
        provincia: decodificada.provincia,
        municipio: municipio,
        consID: req.params._id,
      },
      profesional: {
        userProf: decodificada.user,
        nomProf: decodificada.nombres + " " + decodificada.apellidos,
      },
      respuestaProf: {
        criterioProf: criterioProf,
        motivoProf: motivo,
      },
    });
    return await report
      .save()
      .then((data) => {
        consolidaciones
          .findByIdAndUpdate(
            req.params._id,
            {
              $set: {
                status: criterioProf,
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
                rutaVer
              );
            } else {
              authProf.isUser(
                req,
                "Conexión exitosa",
                "Consolidación Enviada",
                "success",
                false,
                800,
                rutaValidar + nextCons[0]._id
              );
            }
            return next();
          });
      })
      .catch((error) => {
        console.log(error);
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

  var SearchNextEstablecimiento = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
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

  var SearchNextMorgue = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        tipo: "MORGUES",
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

  var SearchNextCementerio = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        tipo: "CEMENTERIOS (CON O SIN MORGUE)",
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

  var SearchNextEstaRotulado = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.rotulado": { $eq: "on" },
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

  var SearchNextEstaPublicidad = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.publicidad": { $eq: "on" },
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

  var SearchNextMedEstable = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.MSEstablecimientos": { $eq: "on" },
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

  var SearchNextMedProduct = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.MSProductos": { $eq: "on" },
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

  var SearchNextEventSaludPubli = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.EvenSaludPubli": { $eq: "on" },
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

  var SearchNextQuejas = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.quejas": { $eq: "on" },
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

  var SearchNextCarnetzados = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.lisCarnets": { $eq: "on" },
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

  var SearchNextEduSanitaria = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.eduSanitaria": { $eq: "on" },
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

  var SearchNextVehiculos = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.vehiculos": { $eq: "on" },
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

  var SearchNextTomaMuestra = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.tomaMuestra": { $eq: "on" },
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

  var SearchNextAntirrabica = async (req, provincia) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: provincia,
        },
        "consolidacion.antirrabica": { $eq: "on" },
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
    UpdateActa: UpdateActa,
    SearchNextEstablecimiento: SearchNextEstablecimiento,
    SearchNextMorgue: SearchNextMorgue,
    SearchNextCementerio: SearchNextCementerio,
    SearchNextMedEstable: SearchNextMedEstable,
    SearchNextEstaPublicidad: SearchNextEstaPublicidad,
    SearchNextEstaRotulado: SearchNextEstaRotulado,
    SearchNextMedProduct: SearchNextMedProduct,
    SearchNextEventSaludPubli: SearchNextEventSaludPubli,
    SearchNextQuejas: SearchNextQuejas,
    SearchNextAntirrabica: SearchNextAntirrabica,
    SearchNextEduSanitaria: SearchNextEduSanitaria,
    SearchNextCarnetzados: SearchNextCarnetzados,
    SearchNextVehiculos: SearchNextVehiculos,
    SearchNextTomaMuestra: SearchNextTomaMuestra,
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
export const LisConsolidaRechazadas = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    await reportes
      .find({
        "profesional.userProf": {
          $eq: decodificada.user,
        },
        "respuestaCoordi.criterioCoordi": { $eq: "Rechazado" },
      })
      .sort({ fechaRes: 1 })
      .then((data) => {
        req.ListRechazo = data;
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

// Apartado: Consolidaciones

//Consolidaciones - Novedades Administrativas
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
    fechInfor,
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
        fechInfor: fechInfor,
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
      .lean();
    req.allConso = Estables;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};

export const SeeProfEstablecimiento = async (req, res, next) => {
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
        "consolidacion.establecimiento": { $eq: "on" },
      })
      .lean();
    req.consultEstable = Estables;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEstablecimiento = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextEstablecimiento(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Establecimiento",
    nextCons,
    "/profesional/Consolidaciones/Ver/Establecimientos",
    "/profesional/Consolidaciones/Validar/Establecimientos/"
  );
};

export const SeeProfMorgues = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Morgues = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        tipo: "MORGUES",
      })
      .lean();
    req.morgues = Morgues;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportMorgues = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextMorgue(req, decodificada.provincia);

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Establecimiento",
    nextCons,
    "/profesional/Consolidaciones/Ver/Morgues",
    "/profesional/Consolidaciones/Validar/Morgues/"
  );
};

export const SeeProfCementerios = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Cementerios = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        tipo: "CEMENTERIOS (CON O SIN MORGUE)",
      })
      .lean();
    req.consultCementerios = Cementerios;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportCementerios = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextCementerio(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Establecimiento",
    nextCons,
    "/profesional/Consolidaciones/Ver/Cementerios",
    "/profesional/Consolidaciones/Validar/Cementerios/"
  );
};

export const SeeProfEstaRotulado = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Rotulado = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.rotulado": { $eq: "on" },
      })
      .lean();
    req.consultRotulado = Rotulado;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEstaRotulado = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextEstaRotulado(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Establecimiento",
    nextCons,
    "/profesional/Consolidaciones/Ver/IVCRotulado",
    "/profesional/Consolidaciones/Validar/IVCRotulado/"
  );
};

export const SeeProfEstaPublicidad = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Publicidad = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.publicidad": { $eq: "on" },
      })
      .lean();
    req.consultPublicidad = Publicidad;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEstaPublicidad = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextEstaPublicidad(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Establecimiento",
    nextCons,
    "/profesional/Consolidaciones/Ver/IVCPublicidad",
    "/profesional/Consolidaciones/Validar/IVCPublicidad/"
  );
};

export const SeeProfMedEstable = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const MedEstable = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.MSEstablecimientos": { $eq: "on" },
      })
      .lean();
    req.consultMedEstable = MedEstable;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportMedEstable = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextMedEstable(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Establecimiento",
    nextCons,
    "/profesional/Consolidaciones/Ver/MedSaniEstablecimientos",
    "/profesional/Consolidaciones/Validar/MedSaniEstablecimientos/"
  );
};

export const SeeProfMedProduct = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const MedProduct = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.MSProductos": { $eq: "on" },
      })
      .lean();
    req.consultMedProduct = MedProduct;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportMedProduct = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextMedProduct(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Establecimiento",
    nextCons,
    "/profesional/Consolidaciones/Ver/MedSaniProductos",
    "/profesional/Consolidaciones/Validar/MedSaniProductos/"
  );
};

export const SeeProfEventSaludPubli = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const EventSalud = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.EvenSaludPubli": { $eq: "on" },
      })
      .lean();
    req.consultES = EventSalud;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEventSaludPubli = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextEventSaludPubli(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Eventos Salud Publica",
    nextCons,
    "/profesional/Consolidaciones/Ver/EventosSaludPublica",
    "/profesional/Consolidaciones/Validar/EventosSaludPublica/"
  );
};

export const SeeProfQuejas = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Queja = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.quejas": { $eq: "on" },
      })
      .lean();
    req.consultQueja = Queja;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportQuejas = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextQuejas(req, decodificada.provincia);

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Quejas",
    nextCons,
    "/profesional/Consolidaciones/Ver/Quejas",
    "/profesional/Consolidaciones/Validar/Quejas/"
  );
};

export const SeeProfAntirrabica = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const AntiRa = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.antirrabica": { $eq: "on" },
      })
      .lean();
    req.consultAntirrabi = AntiRa;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportAntirrabica = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextAntirrabica(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Antirrabica",
    nextCons,
    "/profesional/Consolidaciones/Ver/AntirrabicaAnimal",
    "/profesional/Consolidaciones/Validar/AntirrabicaAnimal/"
  );
};

export const SeeProfCarnetizados = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Carnets = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.lisCarnets": { $eq: "on" },
      })
      .lean();
    req.consultCarnetiz = Carnets;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportCarnetzados = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextCarnetzados(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Carnetizados",
    nextCons,
    "/profesional/Consolidaciones/Ver/ListadoCarnetizados",
    "/profesional/Consolidaciones/Validar/ListadoCarnetizados/"
  );
};

export const SeeProfEduSanitaria = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const EduSani = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.eduSanitaria": { $eq: "on" },
      })
      .lean();
    req.consultEdusani = EduSani;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEduSanitaria = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextEduSanitaria(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Edu. Sanitaria",
    nextCons,
    "/profesional/Consolidaciones/Ver/EduSanitaria",
    "/profesional/Consolidaciones/Validar/EduSanitaria/"
  );
};

export const SeeProfVehiculos = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Vehicu = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.vehiculos": { $eq: "on" },
      })
      .lean();
    req.consultVehiculos = Vehicu;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportVehiculos = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextVehiculos(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Vehiculos",
    nextCons,
    "/profesional/Consolidaciones/Ver/Vehiculos",
    "/profesional/Consolidaciones/Validar/Vehiculos/"
  );
};

export const SeeProfTomaMuestra = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const TomaM = await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        "consolidacion.tomaMuestra": { $eq: "on" },
      })
      .lean();
    req.consultTomaM = TomaM;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportTomaMuestra = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  var nextCons = await authProf.SearchNextTomaMuestra(
    req,
    decodificada.provincia
  );

  authProf.UpdateConsoli(
    req,
    next,
    decodificada,
    "Toma de Muestra",
    nextCons,
    "/profesional/Consolidaciones/Ver/TomaMuestras",
    "/profesional/Consolidaciones/Validar/TomaMuestras/"
  );
};
