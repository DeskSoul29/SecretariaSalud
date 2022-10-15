import consolidaciones from "../models/consolidaciones.js";
import reportes from "../models/reportes.js";

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

  var SendConsolidacion = async (
    req,
    next,
    establecimientoON,
    antirrabicaON,
    eduSanitariaON,
    EvenSaludPubliON,
    lisCarnetsON,
    vehiculosON,
    tomaMuestraON,
    quejasON
  ) => {
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
        //Antirrabica
        Pcanina,
        Pfelina,
        caninosUrbano,
        caninosRural,
        felinosUrbano,
        felinosRural,
        totalVacunados,
        //EduSanitaria
        temaCap,
        otrosCap,
        fechaCap,
        intensidadCap,
        lugCap,
        personalCap,
        totalPersCap,
        //EvenSalPublica
        mes,
        etasPresent,
        etasAtend,
        intoxPresent,
        intoxAtend,
        agrePresent,
        agreAtend,
        trueFalse,
        fReunion,
        //Carnetizados
        expCarnet,
        idenCarnet,
        nameCarnet,
        estableciCarnet,
        direcCarnet,
        //Quejas
        municipioComuni,
        tipQueja,
        fechRece,
        perCausa,
        perAfec,
        descQueja,
        requeQueja,
        //Toma de Muestras
        tipMues,
        descripTip,
        tipAnali,
        zona,
        objEst,
        acompananteEmp,
        observacion,
        //Vehiculos
        classVehi,
        otroV,
        placa,
        refriV,
        nInscrip,
        produTrans,
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
          establecimiento: establecimientoON,
          rotulado: rotuladoON,
          publicidad: publicidadON,
          MSProductos: productosON,
          MSEstablecimientos: establecimientosON,
          antirrabica: antirrabicaON,
          eduSanitaria: eduSanitariaON,
          EvenSaludPubli: EvenSaludPubliON,
          lisCarnets: lisCarnetsON,
          vehiculos: vehiculosON,
          tomaMuestra: tomaMuestraON,
          quejas: quejasON,
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

        acta: acta,
        actaLey: actaLey,
        actaAnul: "",

        salaNM: NecroMorg,

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
        ForAntirrabica: {
          Pcanina: Pcanina,
          Pfelina: Pfelina,
          canUrb: caninosUrbano,
          canRur: caninosRural,
          felUrb: felinosUrbano,
          felRur: felinosRural,
          totalVac: totalVacunados,
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
        ForCarnets: {
          expCarnet: expCarnet,
          idenCarnet: idenCarnet,
          nombreCarnet: nameCarnet,
          establecimientoCarnet: estableciCarnet,
          direccionCarnet: direcCarnet,
        },
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
        ForTomaMuestras: {
          tipMuestra: tipMues,
          descMuestra: descripTip,
          tipAnalisis: tipAnali,
          zona: zona,
          objAnalisis: objEst,
          acompanante: acompananteEmp,
        },
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
        createdAt: new Date(),
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

  var EditReport = async (req, next) => {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    var Ruta = await authTec.NextReport(req, decodificada);
    var tipoRuta = "";
    await reportes
      .findOneAndUpdate(
        { "consolidacion.consID": req.params._id },
        { $set: { "respuesta.criterio": "Corregido" } },
        { new: true }
      )
      .then((result) => {
        if (Ruta.length === 0) {
          authTec.isUser(
            req,
            "Reportes Terminados",
            "Ha Terminado El Listado",
            "success",
            true,
            false,
            "/tecnico"
          );
          return next();
        } else {
          if (Ruta[0].tipo == "Establecimiento") {
            tipoRuta = "Establecimientos/" + Ruta[0].consolidacion.consID;
          } else if (Ruta[0].tipo == "Quejas") {
            tipoRuta = "Quejas/" + Ruta[0].consolidacion.consID;
          } else if (Ruta[0].tipo == "Toma de Muestra") {
            tipoRuta = "TomaMuestras/" + Ruta[0].consolidacion.consID;
          } else if (Ruta[0].tipo == "Edu. Sanitaria") {
            tipoRuta = "EduSanitaria/" + Ruta[0].consolidacion.consID;
          } else if (Ruta[0].tipo == "Vehiculos") {
            tipoRuta = "Vehiculos/" + Ruta[0].consolidacion.consID;
          } else if (Ruta[0].tipo == "Carnetizados") {
            tipoRuta = "ListadoCarnetizados/" + Ruta[0].consolidacion.consID;
          } else if (Ruta[0].tipo == "Eventos Salud Publica") {
            tipoRuta = "EventosSaludPublica/" + Ruta[0].consolidacion.consID;
          } else if (Ruta[0].tipo == "Antirrabica") {
            tipoRuta = "AntirrabicaAnimal/" + Ruta[0].consolidacion.consID;
          }
          authTec.isUser(
            req,
            "Conexión exitosa",
            "Consolidación Enviada",
            "success",
            false,
            800,
            "/tecnico/Consolidaciones/Rechazado/" + tipoRuta
          );
          return next();
        }
      });
  };

  var NextReport = async (req, decodificada) => {
    return await reportes
      .find({
        "consolidacion.userTec": {
          $eq: decodificada.user,
        },
        "respuesta.criterio": { $eq: "Rechazado" },
        "consolidacion.consID": {
          $ne: req.params._id,
        },
      })
      .sort({ createdAt: 1 })
      .limit(1);
  };

  return {
    isUser: isUser,
    SendConsolidacion: SendConsolidacion,
    EditReport: EditReport,
    NextReport: NextReport,
  };
})();

//Apartado: Inicio
export const ConsolidaEstados = async (req, res, next) => {
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
        status: {
          $eq: "Pendiente",
        },
      })
      .count()
      .then((data) => {
        req.consPend = data;
      });
    await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
        "responsable.userResponsable": {
          $eq: decodificada.user,
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
        "consolidacion.userTec": {
          $eq: decodificada.user,
        },
        "respuesta.criterio": { $eq: "Rechazado" },
      })
      .sort({ createdAt: 1 })
      .then((data) => {
        req.ListconsRech = data;
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

//Consolidaciones - Ver
export const SeeTecConsolidaciones = async (req, res, next) => {
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
        "consolidaciones.noveadministrativa": {
          $ne: "on",
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

//Consolidaciones - Enviar
export const SendEstablecimiento = async (req, res, next) => {
  await upload(req, res, function (err, res) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next, "on", "", "", "", "", "", "", "");
  });
};
export const SendEventSaludPubli = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next, "", "", "", "on", "", "", "", "");
  });
};
export const SendQuejas = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next, "", "", "", "", "", "", "", "on");
  });
};
export const SendAntirrabica = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next, "", "on", "", "", "", "", "", "");
  });
};
export const SendCarnetizados = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next, "", "", "", "", "on", "", "", "");
  });
};
export const SendEduSanitaria = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next, "", "", "on", "", "", "", "", "");
  });
};
export const SendVehiculos = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next, "", "", "", "", "", "on", "", "");
  });
};
export const SendTomaMuestra = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next, "", "", "", "", "", "", "on", "");
  });
};

//Consolidaciones - Rechazos
export const EditConsolidacionRech = async (req, res, next) => {
  try {
    var {
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
      productoRotulado,
      //Publicidad
      medPubli,
      permisoSanitario,
      productoPublicidad,
      marcaPublicidad,
      //MEDEstablecimientos
      medidaApliEstable,
      motivoApli,
      observacionMedEsta,
      //MEDProductos
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
      //Antirrabica
      Pcanina,
      Pfelina,
      caninosUrbano,
      caninosRural,
      felinosUrbano,
      felinosRural,
      totalVacunados,
      //EduSanitaria
      temaCap,
      otrosCap,
      fechaCap,
      intensidadCap,
      lugCap,
      personalCap,
      totalPersCap,
      //EvenSalPublica
      etasPresent,
      etasAtend,
      intoxPresent,
      intoxAtend,
      agrePresent,
      agreAtend,
      trueFalse,
      fReunion,
      //Carnetizados
      expCarnet,
      idenCarnet,
      nameCarnet,
      estableciCarnet,
      direcCarnet,
      //Quejas
      tipQueja,
      fechRece,
      perCausa,
      perAfec,
      descQueja,
      requeQueja,
      //Toma de Muestras
      tipMues,
      descripTip,
      tipAnali,
      zona,
      objEst,
      acompananteEmp,
      observacion,
      //Vehiculos
      classVehi,
      otroV,
      placa,
      refriV,
      nInscrip,
      produTrans,
    } = req.body;

    await consolidaciones
      .findByIdAndUpdate(
        req.params._id,
        {
          $set: {
            status: "Corregido",
            fvisit: fVisit,
            score: score,
            concepto: concepto,
            accion: accion,

            acta: acta,
            actaLey: actaLey,

            salaNM: NecroMorg,

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
            ForAntirrabica: {
              Pcanina: Pcanina,
              Pfelina: Pfelina,
              canUrb: caninosUrbano,
              canRur: caninosRural,
              felUrb: felinosUrbano,
              felRur: felinosRural,
              totalVac: totalVacunados,
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
            ForEvenSPublica: {
              presentEtas: etasPresent,
              atendEtas: etasAtend,
              presentIntox: intoxPresent,
              atendIntox: intoxAtend,
              presentAgre: agrePresent,
              atendAgre: agreAtend,
              covePart: trueFalse,
              coveFech: fReunion,
            },
            ForCarnets: {
              expCarnet: expCarnet,
              idenCarnet: idenCarnet,
              nombreCarnet: nameCarnet,
              establecimientoCarnet: estableciCarnet,
              direccionCarnet: direcCarnet,
            },
            ForQuejas: {
              tipoQueja: tipQueja,
              frecep: fechRece,
              perCausaQueja: perCausa,
              perAfectQueja: perAfec,
              descQueja: descQueja,
              reqQueja: requeQueja,
            },
            ForTomaMuestras: {
              tipMuestra: tipMues,
              descMuestra: descripTip,
              tipAnalisis: tipAnali,
              zona: zona,
              objAnalisis: objEst,
              acompanante: acompananteEmp,
            },
            ForVehiculos: {
              claseVehiculo: classVehi,
              otraClase: otroV,
              placa: placa,
              refrigeracion: refriV,
              nInscripcion: nInscrip,
              productosVehiculo: produTrans,
            },
            // evidencias: {
            //   file1: req.files[0].filename,
            //   file2: file2,
            //   file3: file3,
            //   file4: file4,
            //   file5: file5,
            // },
            observaciones: observacion,
          },
        },
        { new: true }
      )
      .then((result) => {
        if (result != null) {
          authTec.EditReport(req, next);
        } else {
          authTec.isUser(
            req,
            "Error en la Base de Datos",
            "Envio Cancelado",
            "error",
            false,
            false,
            "/tecnico"
          );
          return next();
        }
      });
  } catch (error) {
    return next();
  }
};
