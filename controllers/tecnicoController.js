import consolidaciones from "../models/consolidaciones.js";
import hojavida from "../models/hojavida.js";
import cronograma from "../models/cronograma.js";

import fs from "fs";
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

  var DeleteFile = async (nameFile) => {
    try {
      fs.unlinkSync("./upload/" + nameFile);
      console.log("File removed");
    } catch (err) {
      console.error("Something wrong happened removing the file", err);
    }
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
        //Vehiculos
        vehiculosON,
        classVehi,
        otroV,
        placa,
        refriV,
        nInscrip,
        produTrans,
        //Extra
        observacion,
        mesCron,
        cronograma,
      } = req.body;

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
          cronograma: cronograma,
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

        mesCron: mesCron,

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
      console.log(error);
      return error;
    }
  };

  var SendCorreccion = async (req, res, next, decodificada, nameFile) => {
    var {
      motivo,
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

    establecimientoON = establecimientoON == undefined ? "" : establecimientoON;
    rotuladoON = rotuladoON == undefined ? "" : rotuladoON;
    publicidadON = publicidadON == undefined ? "" : publicidadON;
    productosON = productosON == undefined ? "" : productosON;
    establecimientosON =
      establecimientosON == undefined ? "" : establecimientosON;
    antirrabicaON = antirrabicaON == undefined ? "" : antirrabicaON;
    eduSanitariaON = eduSanitariaON == undefined ? "" : eduSanitariaON;
    EvenSaludPubliON = EvenSaludPubliON == undefined ? "" : EvenSaludPubliON;
    lisCarnetsON = lisCarnetsON == undefined ? "" : lisCarnetsON;
    vehiculosON = vehiculosON == undefined ? "" : vehiculosON;
    tomaMuestraON = tomaMuestraON == undefined ? "" : tomaMuestraON;
    quejasON = quejasON == undefined ? "" : quejasON;

    var Ruta = await authTec.NextReport(req, decodificada);

    await consolidaciones
      .findByIdAndUpdate(req.params._id, {
        $set: {
          status: "Corregido",
          fvisit: fVisit,
          score: score,
          concepto: concepto,
          accion: accion,

          acta: acta,
          actaLey: actaLey,

          salaNM: NecroMorg,

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
            motivo: motivo,
            fechRepor: new Date(),
          },
          observaciones: observacion,
        },
      })
      .then((result) => {
        if (result != null) {
          authTec.DeleteFile(nameFile);
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
            if (Ruta[0].consolidacion.establecimiento == "on") {
              var tipoRuta = "Establecimientos/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.quejas == "on") {
              var tipoRuta = "Quejas/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.tomaMuestra == "on") {
              var tipoRuta = "TomaMuestras/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.eduSanitaria == "on") {
              var tipoRuta = "EduSanitaria/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.vehiculos == "on") {
              var tipoRuta = "Vehiculos/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.lisCarnets == "on") {
              var tipoRuta = "ListadoCarnetizados/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.EvenSaludPubli == "on") {
              var tipoRuta = "EventosSaludPublica/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.antirrabica == "on") {
              var tipoRuta = "AntirrabicaAnimal/" + Ruta[0]._id;
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
        } else {
          authTec.isUser(
            req,
            "Error en la Base de Datos",
            "Envio Cancelado",
            "error",
            true,
            false,
            "/tecnico"
          );
          return next();
        }
      })
      .catch((error) => {
        console.log(error);
        authTec.isUser(
          req,
          "Envio Cancelado",
          "No se encontro en la base de datos",
          "error",
          true,
          false,
          "/tecnico"
        );
        return next();
      });
  };

  var NextReport = async (req, decodificada) => {
    return await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
        },
        status: { $eq: "Rechazado" },
        _id: {
          $ne: req.params._id,
        },
      })
      .sort({ createdAt: -1 })
      .limit(1);
  };

  var SendCronograma = async (req, next, decodificada) => {
    new cronograma({
      user: req.params.user,
      nameTec: decodificada.nombres + " " + decodificada.apellidos,
      provincia: decodificada.provincia,
      mes: req.body.mesCron,
      nameFile: req.file.filename,
      createdAt: new Date(),
    })
      .save()
      .then((result) => {
        if (result) {
          authTec.isUser(
            req,
            "Conexión exitosa",
            "Cronograma Enviado",
            "success",
            false,
            800,
            "/tecnico"
          );
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
        }
        return next();
      });
  };

  var ValidarCronograma = async (req, next) => {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    var validar = await consolidaciones.aggregate([
      {
        $match: {
          consolidacion: { cronograma: "on" },
          responsable: { userResponsable: decodificada.user },
          mesCron: req.body.mesCron,
        },
      },
      {
        $group: { _id: { anno: { $year: "$createdAt" } }, count: { $sum: 1 } },
      },
    ]);
    if (validar.length === 0) {
      authTec.SendConsolidacion(req, next);
    } else {
      authTec.DeleteFile(req.file.filename);
      authTec.isUser(
        req,
        "Cronograma Cancelado",
        "Se encontro un cronograma por este mes",
        "error",
        true,
        false,
        "/tecnico"
      );
      return next();
    }
  };

  return {
    isUser: isUser,
    DeleteFile: DeleteFile,
    SendConsolidacion: SendConsolidacion,
    SendCorreccion: SendCorreccion,
    SendCronograma: SendCronograma,
    NextReport: NextReport,
    ValidarCronograma: ValidarCronograma,
  };
})();

//Apartado: Inicio
export const ConsolidaEstados = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    var fecha = await cronograma.find({
      $and: [
        { $year: new Date("2022-10-21") },
        { $year: new Date("2021-10-21") },
      ],
    });
    console.log(fecha);

    //Consolidaciones Pendientes
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

    //Consolidaciones Corregidas
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

    //Consolidaciones Enviadas
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

    //Consolidaciones Aceptadas
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

    //Totas de Visitas
    await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
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

    //Totas de Visitas - Vacunaciones
    await consolidaciones
      .aggregate([
        {
          $match: {
            municipio: decodificada.municipio,
            "consolidacion.antirrabica": "on",
            status: "Aceptado",
          },
        },
        { $group: { _id: null, suma: { $sum: "$ForAntirrabica.totalVac" } } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.vacunas = 0;
        } else {
          req.vacunas = data[0].suma;
        }
      });

    //Totas de Visitas - Vacunaciones
    await consolidaciones
      .aggregate([
        {
          $match: {
            municipio: decodificada.municipioExtra1,
            "consolidacion.antirrabica": "on",
            status: "Aceptado",
          },
        },
        { $group: { _id: null, suma: { $sum: "$ForAntirrabica.totalVac" } } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.vacunasExtra1 = 0;
        } else {
          req.vacunasExtra1 = data[0].suma;
        }
      });

    //Totas de Visitas - Vacunaciones
    await consolidaciones
      .aggregate([
        {
          $match: {
            municipio: decodificada.municipioExtra2,
            "consolidacion.antirrabica": "on",
            status: "Aceptado",
          },
        },
        { $group: { _id: null, suma: { $sum: "$ForAntirrabica.totalVac" } } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.vacunasExtra2 = 0;
        } else {
          req.vacunasExtra2 = data[0].suma;
        }
      });

    //Totas de Visitas - Vacunaciones
    await consolidaciones
      .aggregate([
        {
          $match: {
            municipio: decodificada.municipioExtra3,
            "consolidacion.antirrabica": "on",
            status: "Aceptado",
          },
        },
        { $group: { _id: null, suma: { $sum: "$ForAntirrabica.totalVac" } } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.vacunasExtra3 = 0;
        } else {
          req.vacunasExtra3 = data[0].suma;
        }
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
    await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
        },
        status: { $eq: "Rechazado" },
      })
      .sort({ createdAt: -1 })
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
export const UploadCronograma = async (req, res, next) => {
  await upload(req, res, function (err, res) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.ValidarCronograma(req, next);
  });
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
    const Estables = await consolidaciones.find({
      "responsable.userResponsable": {
        $eq: decodificada.user,
      },
      "consolidaciones.noveadministrativa": {
        $ne: "on",
      },
    });
    req.allConso = Estables;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
//Consolidaciones - Enviar
export const SendConsolidacion = async (req, res, next) => {
  await upload(req, res, function (err, res) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendConsolidacion(req, next);
  });
};
//Consolidaciones - Rechazos
export const EditConsolidacionRech = async (req, res, next) => {
  var validar = await consolidaciones.findById(req.params._id);
  if (validar.status == "Rechazado") {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    req.params.user = decodificada.user;
    await upload(req, res, function (err) {
      if (err) {
        return res.end("Error uploading file.");
      }
      authTec.SendCorreccion(
        req,
        res,
        next,
        decodificada,
        validar.evidencia.file
      );
    });
  } else {
    authTec.isUser(
      req,
      "Reporte Cancelado",
      "No se encuentra en estado Rechazado",
      "error",
      true,
      false,
      "/tecnico/Consolidaciones/Ver"
    );
    return next();
  }
};
