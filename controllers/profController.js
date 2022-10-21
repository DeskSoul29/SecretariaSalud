import login from "../models/user.js";
import local from "../models/localidades.js";
import hojavida from "../models/hojavida.js";
import consolidaciones from "../models/consolidaciones.js";

import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";
import upload from "../middleware/upload.js";

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

  var SendConsolidacion = async (req, next) => {
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
        establecimientoON,
        acta,
        actaLey,
        actaAnul,
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
        antirrabicaON,
        Pcanina,
        Pfelina,
        caninosUrbano,
        caninosRural,
        felinosUrbano,
        felinosRural,
        totalVacunados,
        //EduSanitaria
        eduSanitariaON,
        temaCap,
        otrosCap,
        fechaCap,
        intensidadCap,
        lugCap,
        personalCap,
        totalPersCap,
        //EvenSalPublica
        EvenSaludPubliON,
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
        lisCarnetsON,
        expCarnet,
        idenCarnet,
        nameCarnet,
        estableciCarnet,
        direcCarnet,
        //Quejas
        quejasON,
        tipQueja,
        fechRece,
        perCausa,
        perAfec,
        descQueja,
        requeQueja,
        //Toma de Muestras
        tomaMuestraON,
        tipMues,
        descripTip,
        tipAnali,
        zona,
        objEst,
        acompananteEmp,
        observacion,
        //Vehiculos
        vehiculosON,
        classVehi,
        otroV,
        placa,
        refriV,
        nInscrip,
        produTrans,
      } = req.body;

      new consolidaciones({
        status: "Enviado",
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
        actaAnul: actaAnul,

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
        evidencia: {
          file: req.file.filename,
        },
        reporte: {
          motivo: "",
          fechRepor: new Date(),
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
              "/profesional/Consolidaciones/Enviar"
            );
          } else {
            authProf.isUser(
              req,
              "Error en la Base de Datos",
              "Envio Cancelado",
              "error",
              false,
              false,
              "/profesional/Consolidaciones/Enviar"
            );
          }
          return next();
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  var UpdateConsoli = async (req, next, nextCons) => {
    var { criterio, motivo, tipCon } = req.body;

    await consolidaciones
      .findByIdAndUpdate(req.params._id, {
        $set: {
          status: criterio,
          reporte: {
            motivo: motivo,
            fechRepor: new Date(),
          },
        },
      })
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
              "/profesional/Consolidaciones/Validar/Quejas/" + nextCons[0]._id;
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
  };

  var UpdateCorreccion = async (req, next, nextCons) => {
    var { criterio, motivo, tipCon } = req.body;

    await consolidaciones
      .findByIdAndUpdate(
        req.params._id,
        {
          $set: {
            status: criterio,
            "reporte.motivo": motivo,
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

  var SearchNextPendien = async (req, provincia) => {
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

  var SearchNextCorreg = async (req, provincia) => {
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
    SendConsolidacion: SendConsolidacion,
    UpdateConsoli: UpdateConsoli,
    UpdateCorreccion: UpdateCorreccion,
    UpdateActa: UpdateActa,
    SearchNextPendien: SearchNextPendien,
    SearchNextCorreg: SearchNextCorreg,
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

    //Consolidaciones Pendientes
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

    //Consolidaciones Corregidas
    await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        status: {
          $eq: "Corregido",
        },
      })
      .count()
      .then((data) => {
        req.consCorre = data;
      });

    //Consolidaciones Enviadas
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

    //Consolidaciones Rechazadas Del Profesional
    await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
        },
        provincia: {
          $eq: decodificada.provincia,
        },
        status: {
          $eq: "Rechazado",
        },
      })
      .count()
      .then((data) => {
        req.consRechProf = data;
      });

    //Consolidaciones Aceptadas
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

    //Totas de Visitas
    await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
        status: {
          $eq: "Aceptado",
        },
        "consolidacion.establecimiento": {
          $eq: "on",
        },
      })
      .count()
      .then((data) => {
        req.visitAcep = data;
      });

    //Total de Visitas - Vacunaciones
    await consolidaciones
      .aggregate([
        {
          $match: {
            provincia: decodificada.provincia,
            "consolidacion.antirrabica": "on",
            status: "Aceptado",
          },
        },
        { $group: { _id: null, suma: { $sum: "$ForAntirrabica.totalVac" } } },
      ])
      .then((data) => {
        if (data.length === 0) {
          req.vacunas = 0;
        } else {
          req.vacunas = data[0].suma;
        }
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
export const SendConsolidacion = async (req, res, next) => {
  await upload(req, res, function (err, res) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authProf.SendConsolidacion(req, next);
  });
};
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

    var nextCons = await authProf.SearchNextPendien(
      req,
      decodificada.provincia
    );

    authProf.UpdateConsoli(req, next, nextCons);
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
export const EditReport = async (req, res, next) => {
  var validar = await consolidaciones.findById(req.params._id);
  if (validar.status == "Corregido") {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    var nextCons = await authProf.SearchNextCorreg(req, decodificada.provincia);
    authProf.UpdateCorreccion(req, next, nextCons);
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
