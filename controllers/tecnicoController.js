import consolidaciones from "../models/consolidaciones.js";

import hojavida from "../models/hojavida.js";

import jwt from "jsonwebtoken";
import upload from "../middleware/upload.js";
import fs from "fs";
import { promisify } from "util";

var authTec = (function () {
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

  var EventSalPubli = async (req, res, next) => {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      var {
        mes,
        provincia,
        municipio,
        etasPresent,
        etasAtend,
        intoxPresent,
        intoxAtend,
        agrePresent,
        agreAtend,
        trueFalse,
        fReunion,
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new consolidaciones({
        provincia: provincia,
        municipio: municipio,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable:
            decodificada.nombres + " " + decodificada.apellidos,
        },
        consolidacion: {
          EvenSaludPubli: "on",
        },
        ForEvenSPublica: {
          mes: mes,
          presentEtas: etasPresent,
          atendEtas: etasAtend,
          presentIntox: intoxPresent,
          atendIntox: intoxAtend,
          presentAgre: agrePresent,
          atendAgre: agreAtend,
          covePart: trueFalse,
          coveFech: fReunion,
        },
        evidencias: {
          file1: req.files[0].filename,
          file2: file2,
          file3: file3,
          file4: file4,
          file5: file5,
        },
        observaciones: observacion,
      })
        .save()
        .then((result) => {
          if (result) {
            authTec.isUser(
              req,
              "Conexión exitosa",
              "Consolidación Enviada",
              "success",
              false,
              800,
              "/tecnico/Consolidaciones/Enviar"
            );
          } else {
            authTec.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/tecnico/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      return error;
    }
  };

  var Establecimientos = async (req, res, next) => {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      var {
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
        fVisit,
        score,
        concepto,
        accion,
        //Cementerio
        NecroMorg,
        //Establecimiento
        acta,
        actaLey,
        //Rotulado
        rotuladoON,
        productoRotulado,
        //Publicidad
        publicidadON,
        medPubli,
        permisoSanitario,
        productoPublicidad,
        marcaPublicidad,
        //MEDEstablecimientos
        establecimientosON,
        medidaApliEstable,
        motivoApli,
        observacionMedEsta,
        //MEDProductos
        productosON,
        medidaApliProduc,
        permisoProduco,
        productoMed,
        marcaProduct,
        motivoProduct,
        presentProduct,
        cantProdu,
        fabriProduc,
        loteProduc,
        fechProduc,
        observacionMedProd,
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new consolidaciones({
        provincia: provincia,
        municipio: municipio,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable:
            decodificada.nombres + " " + decodificada.apellidos,
        },
        consolidacion: {
          establecimiento: "on",
          rotulado: rotuladoON,
          publicidad: publicidadON,
          MSProductos: productosON,
          MSEstablecimientos: establecimientosON,
        },
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
        fvisit: fVisit,
        score: score,
        concepto: concepto,
        accion: accion,
        salaNM: NecroMorg,
        acta: acta,
        actaLey: actaLey,
        ForRotulado: {
          productoRotulado: productoRotulado,
        },
        ForPublicidad: {
          medioPublicitario: medPubli,
          registroSanitario: permisoSanitario,
          productoPublicidad: productoPublicidad,
          marcaPublicidad: marcaPublicidad,
        },
        ForMSEstablecimientos: {
          medidaMSEstablecimientos: medidaApliEstable,
          motivoMSEstablecimientos: motivoApli,
          observacionMedEsta: observacionMedEsta,
        },
        ForMSProductos: {
          medidaMSProductos: medidaApliProduc,
          permisoMSProductos: permisoProduco,
          productoMSProductos: productoMed,
          marcaMSProductos: marcaProduct,
          motivoMSProductos: motivoProduct,
          presentacionMSProductos: presentProduct,
          cantidadMSProductos: cantProdu,
          fabricanteMSProductos: fabriProduc,
          loteMSProductos: loteProduc,
          vencimientoMSProductos: fechProduc,
          observacionMedProd: observacionMedProd,
        },

        evidencias: {
          file1: req.files[0].filename,
          file2: file2,
          file3: file3,
          file4: file4,
          file5: file5,
        },
        observaciones: observacion,
      })
        .save()
        .then((result) => {
          if (result) {
            authTec.isUser(
              req,
              "Conexión exitosa",
              "Consolidación Enviada",
              "success",
              false,
              800,
              "/tecnico/Consolidaciones/Enviar"
            );
          } else {
            authTec.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/tecnico/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      return error;
    }
  };

  var Quejas = async (req, res, next) => {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      var {
        provincia,
        municipio,
        municipioComuni,
        grupEsta,
        codEsta,
        Nriesgo,
        tipoEsta,
        rSocial,
        tIden,
        inputIden,
        phone,
        rLegal,
        direccion,
        estado,
        tipQueja,
        fechRece,
        fVisit,
        perCausa,
        perAfec,
        descQueja,
        requeQueja,
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new consolidaciones({
        provincia: provincia,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable:
            decodificada.nombres + " " + decodificada.apellidos,
        },
        consolidacion: {
          quejas: "on",
        },
        grupo: grupEsta,
        codigo: codEsta,
        tipo: tipoEsta,
        nivelRiesgo: Nriesgo,
        tipoIdentificacion: tIden,
        identificacion: inputIden,
        telefono: phone,
        razonSocial: rSocial,
        direccion: direccion,
        repreLegal: rLegal,
        estado: estado,
        fvisit: fVisit,
        ForQuejas: {
          municipioEstable: municipio,
          municipioComuni: municipioComuni,
          tipoQueja: tipQueja,
          frecep: fechRece,
          perCausaQueja: perCausa,
          perAfectQueja: perAfec,
          descQueja: descQueja,
          reqQueja: requeQueja,
        },
        evidencias: {
          file1: req.files[0].filename,
          file2: file2,
          file3: file3,
          file4: file4,
          file5: file5,
        },
        observaciones: observacion,
      })
        .save()
        .then((result) => {
          if (result) {
            authTec.isUser(
              req,
              "Conexión exitosa",
              "Consolidación Enviada",
              "success",
              false,
              800,
              "/tecnico/Consolidaciones/Enviar"
            );
          } else {
            authTec.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/tecnico/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      return error;
    }
  };

  var AntiRabica = async (req, res, next) => {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      var {
        provincia,
        municipio,
        Pcanina,
        Pfelina,
        caninosUrbano,
        caninosRural,
        felinosUrbano,
        felinosRural,
        totalVacunados,
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new consolidaciones({
        provincia: provincia,
        municipio: municipio,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable:
            decodificada.nombres + " " + decodificada.apellidos,
        },
        consolidacion: {
          antirrabica: "on",
        },
        ForAntirrabica: {
          Pcanina: Pcanina,
          Pfelina: Pfelina,
          canUrb: caninosUrbano,
          canRur: caninosRural,
          felUrb: felinosUrbano,
          felRur: felinosRural,
          totalVac: totalVacunados,
        },
        evidencias: {
          file1: req.files[0].filename,
          file2: file2,
          file3: file3,
          file4: file4,
          file5: file5,
        },
        observaciones: observacion,
      })
        .save()
        .then((result) => {
          if (result) {
            authTec.isUser(
              req,
              "Conexión exitosa",
              "Consolidación Enviada",
              "success",
              false,
              800,
              "/tecnico/Consolidaciones/Enviar"
            );
          } else {
            authTec.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/tecnico/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      return error;
    }
  };

  var Carnetizados = async (req, res, next) => {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      var {
        provincia,
        municipio,
        expCarnet,
        idenCarnet,
        nameCarnet,
        estableciCarnet,
        direcCarnet,
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new consolidaciones({
        provincia: provincia,
        municipio: municipio,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable:
            decodificada.nombres + " " + decodificada.apellidos,
        },
        consolidacion: {
          lisCarnets: "on",
        },
        ForCarnets: {
          expCarnet: expCarnet,
          idenCarnet: idenCarnet,
          nombreCarnet: nameCarnet,
          establecimientoCarnet: estableciCarnet,
          direccionCarnet: direcCarnet,
        },
        evidencias: {
          file1: req.files[0].filename,
          file2: file2,
          file3: file3,
          file4: file4,
          file5: file5,
        },
        observaciones: observacion,
      })
        .save()
        .then((result) => {
          if (result) {
            authTec.isUser(
              req,
              "Conexión exitosa",
              "Consolidación Enviada",
              "success",
              false,
              800,
              "/tecnico/Consolidaciones/Enviar"
            );
          } else {
            authTec.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/tecnico/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      return error;
    }
  };

  var EduSanitaria = async (req, res, next) => {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      var {
        provincia,
        municipio,
        temaCap,
        otrosCap,
        fechaCap,
        intensidadCap,
        lugCap,
        personalCap,
        totalPersCap,
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new consolidaciones({
        provincia: provincia,
        municipio: municipio,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable:
            decodificada.nombres + " " + decodificada.apellidos,
        },
        consolidacion: {
          eduSanitaria: "on",
        },
        ForEduSanitaria: {
          tema: temaCap,
          otroTema: otrosCap,
          fechaCap: fechaCap,
          intensidad: intensidadCap,
          lugarCapa: lugCap,
          personalDiri: personalCap,
          totalPersCap: totalPersCap,
        },
        evidencias: {
          file1: req.files[0].filename,
          file2: file2,
          file3: file3,
          file4: file4,
          file5: file5,
        },
        observaciones: observacion,
      })
        .save()
        .then((result) => {
          if (result) {
            authTec.isUser(
              req,
              "Conexión exitosa",
              "Consolidación Enviada",
              "success",
              false,
              800,
              "/tecnico/Consolidaciones/Enviar"
            );
          } else {
            authTec.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/tecnico/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      return error;
    }
  };

  var TomaMuestras = async (req, res, next) => {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );

      var {
        provincia,
        municipio,
        grupEsta,
        codEsta,
        Nriesgo,
        tipoEsta,
        rSocial,
        tIden,
        inputIden,
        phone,
        rLegal,
        direccion,
        estado,
        tipMues,
        descripTip,
        tipAnali,
        zona,
        objEst,
        fVisit,
        acompananteEmp,
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new consolidaciones({
        provincia: provincia,
        municipio: municipio,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable:
            decodificada.nombres + " " + decodificada.apellidos,
        },
        consolidacion: {
          tomaMuestra: "on",
        },
        grupo: grupEsta,
        codigo: codEsta,
        tipo: tipoEsta,
        nivelRiesgo: Nriesgo,
        tipoIdentificacion: tIden,
        identificacion: inputIden,
        telefono: phone,
        razonSocial: rSocial,
        direccion: direccion,
        repreLegal: rLegal,
        estado: estado,
        fvisit: fVisit,
        ForTomaMuestras: {
          tipMuestra: tipMues,
          descMuestra: descripTip,
          tipAnalisis: tipAnali,
          zona: zona,
          objAnalisis: objEst,
          acompanante: acompananteEmp,
        },
        evidencias: {
          file1: req.files[0].filename,
          file2: file2,
          file3: file3,
          file4: file4,
          file5: file5,
        },
        observaciones: observacion,
      })
        .save()
        .then((result) => {
          if (result) {
            authTec.isUser(
              req,
              "Conexión exitosa",
              "Consolidación Enviada",
              "success",
              false,
              800,
              "/tecnico/Consolidaciones/Enviar"
            );
          } else {
            authTec.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/tecnico/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      return error;
    }
  };

  var Vehiculs = async (req, res, next) => {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );

      var {
        provincia,
        municipio,
        grupEsta,
        codEsta,
        Nriesgo,
        tipoEsta,
        rSocial,
        tIden,
        inputIden,
        phone,
        rLegal,
        direccion,
        estado,
        fVisit,
        score,
        concepto,
        classVehi,
        otroV,
        placa,
        refriV,
        nInscrip,
        produTrans,
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new consolidaciones({
        provincia: provincia,
        municipio: municipio,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable:
            decodificada.nombres + " " + decodificada.apellidos,
        },
        consolidacion: {
          vehiculos: "on",
        },
        grupo: grupEsta,
        codigo: codEsta,
        tipo: tipoEsta,
        nivelRiesgo: Nriesgo,
        tipoIdentificacion: tIden,
        identificacion: inputIden,
        telefono: phone,
        razonSocial: rSocial,
        direccion: direccion,
        repreLegal: rLegal,
        estado: estado,
        fvisit: fVisit,
        score: score,
        concepto: concepto,
        ForVehiculos: {
          claseVehiculo: classVehi,
          otraClase: otroV,
          placa: placa,
          refrigeracion: refriV,
          nInscripcion: nInscrip,
          productosVehiculo: produTrans,
        },
        evidencias: {
          file1: req.files[0].filename,
          file2: file2,
          file3: file3,
          file4: file4,
          file5: file5,
        },
        observaciones: observacion,
      })
        .save()
        .then((result) => {
          if (result) {
            authTec.isUser(
              req,
              "Conexión exitosa",
              "Consolidación Enviada",
              "success",
              false,
              800,
              "/tecnico/Consolidaciones/Enviar"
            );
          } else {
            authTec.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/tecnico/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      return error;
    }
  };

  return {
    isUser: isUser,
    Establecimientos: Establecimientos,
    EventSalPubli: EventSalPubli,
    Quejas: Quejas,
    AntiRabica: AntiRabica,
    Carnetizados: Carnetizados,
    EduSanitaria: EduSanitaria,
    TomaMuestras: TomaMuestras,
    Vehiculs: Vehiculs,
  };
})();

//Apartado: Inicio
export const ConsolidaEnviadas = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
        },
      })
      .count()
      .then((data) => {
        req.consEnv = data;
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
export const ConsolidaRechazadas = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
        },
        status: { $eq: "Rechazado" },
      })
      .count()
      .then((data) => {
        req.consRech = data;
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

//Apartado: Hojas de Vida
export const hojavidaConsultAllTec = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      const hv = await hojavida
        .find({
          provincia: decodificada.provincia,
          $or: [
            { municipio: decodificada.municipio },
            { municipio: decodificada.municipioExtra1 },
            { municipio: decodificada.municipioExtra2 },
            { municipio: decodificada.municipioExtra3 },
          ],
        })
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
export const SendEstablecimiento = async (req, res, next) => {
  await upload(req, res, function (err, res) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.Establecimientos(req, res, next);
  });
};
export const SeeEstablecimiento = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Estables = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SeeMorgues = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Morgues = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SeeCementerios = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Cementerios = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SeeEstaRotulado = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Rotulado = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SeeEstaPublicidad = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Publicidad = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SeeMedEstable = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const MedEstable = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SeeMedProduct = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const MedProduct = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SendEventSaludPubli = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.EventSalPubli(req, res, next);
  });
};
export const SeeEventSaludPubli = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const EventSalud = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SendQuejas = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.Quejas(req, res, next);
  });
};
export const SeeQuejas = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Queja = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SendAntirrabica = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.AntiRabica(req, res, next);
  });
};
export const SeeAntirrabica = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const AntiRa = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SendCarnetizados = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.Carnetizados(req, res, next);
  });
};
export const SeeCarnetizados = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Carnets = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SendEduSanitaria = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.EduSanitaria(req, res, next);
  });
};
export const SeeEduSanitaria = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const EduSani = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SendVehiculos = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.Vehiculs(req, res, next);
  });
};
export const SeeVehiculos = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Vehicu = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
export const SendTomaMuestra = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.TomaMuestras(req, res, next, function (err) {
      console.log(er);
    });
  });
};
export const SeeTomaMuestra = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const TomaM = await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
