import establecimientos from "../models/establecimientos.js";
import eventsalud from "../models/EvenSaludPubli.js";
import antirrabica from "../models/antirrabica.js";
import eduSanitaria from "../models/eduSanitaria.js";
import listCarnets from "../models/lisCarnets.js";
import quejas from "../models/quejas.js";
import tomamuestras from "../models/tomaMuestra.js";
import vehiculos from "../models/vehiculos.js";

import hojavida from "../models/hojavida.js";
import jwt from "jsonwebtoken";
import upload from "../middleware/upload.js";
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

  const EventSalPubli = async (req, res, next) => {
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

      new eventsalud({
        userResponsable: decodificada.user,
        responsable: decodificada.nombres + " " + decodificada.apellidos,
        provincia: provincia,
        municipio: municipio,
        mes: mes,
        presentEtas: etasPresent,
        atendEtas: etasAtend,
        presentIntox: intoxPresent,
        atendIntox: intoxAtend,
        presentAgre: agrePresent,
        atendAgre: agreAtend,
        covePart: trueFalse,
        coveFech: fReunion,
        observaciones: observacion,
        file1: req.files[0].filename,
        file2: file2,
        file3: file3,
        file4: file4,
        file5: file5,
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

  const estableSend = async (req, res, next) => {
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
        observacion,
      } = req.body;

      var file2 = req.files[1] === undefined ? false : req.files[1].filename;
      var file3 = req.files[2] === undefined ? false : req.files[2].filename;
      var file4 = req.files[3] === undefined ? false : req.files[3].filename;
      var file5 = req.files[4] === undefined ? false : req.files[4].filename;

      new establecimientos({
        userResponsable: decodificada.user,
        responsable: decodificada.nombres + " " + decodificada.apellidos,
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
        fvisit: fVisit,
        score: score,
        concepto: concepto,
        accion: accion,
        salaNM: NecroMorg,
        acta: acta,
        actaLey: actaLey,
        rotulado: rotuladoON,
        productoRotulado: productoRotulado,
        publicidad: publicidadON,
        medioPublicitario: medPubli,
        registroSanitario: permisoSanitario,
        productoPublicidad: productoPublicidad,
        marcaPublicidad: marcaPublicidad,
        MSEstableciientos: establecimientosON,
        medidaMSEstablecimientos: medidaApliEstable,
        motivoMSEstablecimientos: motivoApli,
        MSProductos: productosON,
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
        observaciones: observacion,
        file1: req.files[0].filename,
        file2: file2,
        file3: file3,
        file4: file4,
        file5: file5,
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

  const quejas = async (req, res, next) => {
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

      new quejas({
        userResponsable: decodificada.user,
        responsable: decodificada.nombres + " " + decodificada.apellidos,
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
        fvisit: fVisit,
        score: score,
        accion: accion,

        observaciones: observacion,
        file1: req.files[0].filename,
        file2: file2,
        file3: file3,
        file4: file4,
        file5: file5,
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
    estableSend: estableSend,
    EventSalPubli: EventSalPubli,
    quejas: quejas,
  };
})();

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
    authTec.estableSend(req, res, next);
  });
};
export const SendEventSaludPubli = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.EventSalPubli(req, res, next);
  });
};
export const SendQuejas = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.Quejas(req, res, next);
  });
};
export const SendAntirrabica = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.EventSalPubli(req, res, next);
  });
};
export const SendCarnetizados = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.EventSalPubli(req, res, next);
  });
};
export const SendEduSanitaria = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.EventSalPubli(req, res, next);
  });
};
export const SendVehiculos = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.EventSalPubli(req, res, next);
  });
};
export const SendTomaMuestra = async (req, res, next) => {
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.EventSalPubli(req, res, next);
  });
};

/*
//Antirrabica Animal
var {
  provincia,
  municipio,
  caninosUrbano,
  caninosRural,
  felinosUrbano,
  felinosRural,
  totalVacunados,
  observacion,
} = req.body;
//Edu Sanitaria
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
//Eventos Salu Publica
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
//listado de carnets
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
//Quejas
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
  tipQueja,
  fechRece,
  fVisit,
  perCausa,
  perAfec,
  descQueja,
  requeQueja,
  observacion,
} = req.body;
//Toma Muestras
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
  acompañante,
  observacion,
} = req.body;
//vehiculos
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
  classVehi,
  otroV,
  placa,
  refriV,
  nInscrip,
  produTrans,
  fVisit,
  score,
  concepto,
  observacion,
} = req.body;

*/
// if (tipoEsta == "CEMENTERIOS (CON O SIN MORGUE)") {
//   //Cementerio
//   console.log("Cementerios");
// } else if (
//   tipoEsta != "CEMENTERIOS (CON O SIN MORGUE)" &&
//   tipoEsta != "MORGUES"
// ) {
//   console.log("Establecimiento General");
//   //Establecimiento
//   if (rotuladoON == "on") {
//     console.log("rotulado");
//   }
//   if (publicidadON == "on") {
//     console.log("Publicidad");
//   }
//   if (establecimientosON == "on") {
//     console.log("Establecimientos");
//   }
//   if (productosON == "on") {
//     console.log("Products");
//   }
// } else {
//   console.log("morgue");
// }
//
