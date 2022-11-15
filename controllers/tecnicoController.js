import consolidaciones from "../models/consolidaciones.js";
import hojavida from "../models/hojavida.js";

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
        municipio,
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
        //ViviendaSaludable
        viviSaluON,
        vereda,
        direccion,
        vivienda,
        NVisit,
        F101,
        F102,
        F103,
        F104,
        F105,
        Final1,
        F201,
        F202,
        F203,
        F204,
        Final2,
        F301,
        F302,
        F303,
        F304,
        F305,
        Final3,
        F401,
        F402,
        F403,
        F404,
        Final4,
        F501,
        F502,
        F503,
        F504,
        Final5,
        F601,
        F602,
        F603,
        Final6,
        F701,
        F702,
        F703,
        Final7,
        //Vehiculos
        vehiculosON,
        classVehi,
        otroV,
        placa,
        refriV,
        nInscrip,
        produTrans,
        //PermanenciaMunicipio
        permMunicipio,
        //AlertaSanitaria
        alertSaniON,
        tipAlert,
        descripcion,
        //Extra
        observacion,
      } = req.body;
      if (req.body.idHV != "") {
        var idHV = req.body.idHV;
      }
      new consolidaciones({
        provincia: decodificada.provincia,
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
          viviSalu: viviSaluON,
          alertSani: alertSaniON,
          cronograma: req.body.cronograma,
          permMunicipio: permMunicipio,
        },
        mesCron: req.body.mesCron,

        hojavida: idHV,
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
        ForAlertSani: {
          tipAlert: tipAlert,
          descripcionAlert: descripcion,
        },
        ForViviSaludable: {
          vereda: vereda,
          direccion: direccion,
          vivienda: vivienda,
          NVisit: NVisit,
          F101: F101,
          F102: F102,
          F103: F103,
          F104: F104,
          F105: F105,
          Final1: Final1,
          F201: F201,
          F202: F202,
          F203: F203,
          F204: F204,
          Final2: Final2,
          F301: F301,
          F302: F302,
          F303: F303,
          F304: F304,
          F305: F305,
          Final3: Final3,
          F401: F401,
          F402: F402,
          F403: F403,
          F404: F404,
          Final4: Final4,
          F501: F501,
          F502: F502,
          F503: F503,
          F504: F504,
          Final5: Final5,
          F601: F601,
          F602: F602,
          F603: F603,
          Final6: Final6,
          F701: F701,
          F702: F702,
          F703: F703,
          Final7: Final7,
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
      //ViviendaSaludable
      viviSaluON,
      vereda,
      direccion,
      vivienda,
      NVisit,
      F101,
      F102,
      F103,
      F104,
      F105,
      Final1,
      F201,
      F202,
      F203,
      F204,
      Final2,
      F301,
      F302,
      F303,
      F304,
      F305,
      Final3,
      F401,
      F402,
      F403,
      F404,
      Final4,
      F501,
      F502,
      F503,
      F504,
      Final5,
      F601,
      F602,
      F603,
      Final6,
      F701,
      F702,
      F703,
      Final7,
      //Vehiculos
      vehiculosON,
      classVehi,
      otroV,
      placa,
      refriV,
      nInscrip,
      produTrans,
      //Cronograma
      mesCron,
      //PermanenciaMunicipio
      permMunicipio,
      //AlertaSanitaria
      alertSaniON,
      tipAlert,
      descripcion,
      //Extra
      cronograma,
      observacion,
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
    viviSaluON = viviSaluON == undefined ? "" : viviSaluON;
    cronograma = cronograma == undefined ? "" : cronograma;
    permMunicipio = permMunicipio == undefined ? "" : permMunicipio;
    alertSaniON = alertSaniON == undefined ? "" : alertSaniON;

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

          mesCron: mesCron,

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
            viviSalu: viviSaluON,
            alertSani: alertSaniON,
            cronograma: cronograma,
            permMunicipio: permMunicipio,
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
          ForAlertSani: {
            tipAlert: tipAlert,
            descripcionAlert: descripcion,
          },
          ForViviSaludable: {
            vereda: vereda,
            direccion: direccion,
            vivienda: vivienda,
            NVisit: NVisit,
            F101: F101,
            F102: F102,
            F103: F103,
            F104: F104,
            F105: F105,
            Final1: Final1,
            F201: F201,
            F202: F202,
            F203: F203,
            F204: F204,
            Final2: Final2,
            F301: F301,
            F302: F302,
            F303: F303,
            F304: F304,
            F305: F305,
            Final3: Final3,
            F401: F401,
            F402: F402,
            F403: F403,
            F404: F404,
            Final4: Final4,
            F501: F501,
            F502: F502,
            F503: F503,
            F504: F504,
            Final5: Final5,
            F601: F601,
            F602: F602,
            F603: F603,
            Final6: Final6,
            F701: F701,
            F702: F702,
            F703: F703,
            Final7: Final7,
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
            } else if (Ruta[0].consolidacion.viviSalu == "on") {
              var tipoRuta = "ViviendaSaludable/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.cronograma == "on") {
              var tipoRuta = "Cronograma/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.permMunicipio == "on") {
              var tipoRuta = "PermMunicipio/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.alertSani == "on") {
              var tipoRuta = "AlertaSanitaria/" + Ruta[0]._id;
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

  return {
    isUser: isUser,
    DeleteFile: DeleteFile,
    SendConsolidacion: SendConsolidacion,
    SendCorreccion: SendCorreccion,
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

    //Consolidaciones Pendientes
    await consolidaciones
      .find({
        "responsable.userResponsable": {
          $eq: decodificada.user,
        },
        "consolidacion.vivienda": {
          $ne: "on",
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
      .aggregate([
        {
          $match: {
            status: "Aceptado",
            "responsable.userResponsable": parseInt(decodificada.user, 10),
          },
        },
        {
          $group: {
            _id: { anno: { $year: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.anno": -1 } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.consAcep = 0;
        } else {
          req.consAcep = data[0].count;
        }
      });

    //Totas de Visitas
    await consolidaciones
      .aggregate([
        {
          $match: {
            status: "Aceptado",
            "consolidacion.establecimiento": "on",
            "responsable.userResponsable": parseInt(decodificada.user, 10),
          },
        },
        {
          $group: {
            _id: { anno: { $year: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.anno": -1 } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.visitAcep = 0;
        } else {
          req.visitAcep = data[0].count;
        }
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
        {
          $group: {
            _id: { anno: { $year: "$createdAt" } },
            count: { $sum: "$ForAntirrabica.totalVac" },
          },
        },
        { $sort: { "_id.anno": -1 } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.vacunas = 0;
        } else {
          req.vacunas = data[0].count;
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
        {
          $group: {
            _id: { anno: { $year: "$createdAt" } },
            count: { $sum: "$ForAntirrabica.totalVac" },
          },
        },
        { $sort: { "_id.anno": -1 } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.vacunasExtra1 = 0;
        } else {
          req.vacunasExtra1 = data[0].count;
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
        {
          $group: {
            _id: { anno: { $year: "$createdAt" } },
            count: { $sum: "$ForAntirrabica.totalVac" },
          },
        },
        { $sort: { "_id.anno": -1 } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.vacunasExtra2 = 0;
        } else {
          req.vacunasExtra2 = data[0].count;
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
        {
          $group: {
            _id: { anno: { $year: "$createdAt" } },
            count: { $sum: "$ForAntirrabica.totalVac" },
          },
        },
        { $sort: { "_id.anno": -1 } },
      ])
      .then((data) => {
        if (data.length == 0) {
          req.vacunasExtra3 = 0;
        } else {
          req.vacunasExtra3 = data[0].count;
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
export const editHVTec = async (req, res, next) => {
  const { municipio, phone, rSocial, direccion, rLegal, estado } = req.body;

  var nomHV = await hojavida.find({
    _id: {
      $ne: req.params.id,
    },
    municipio: municipio,
    razonSocial: rSocial,
  });

  if (nomHV.length == 0) {
    await hojavida
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            telefono: phone,
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
          authTec.isUser(
            req,
            "Conexión exitosa",
            "Establecimiento Actualizado Correctamente",
            "success",
            false,
            800,
            "tecnico/HojaVida/ConsultarHV"
          );
        } else {
          authTec.isUser(
            req,
            "Advertencia",
            "Error en la Base de Datos",
            "error",
            true,
            false,
            "tecnico/HojaVida/ConsultarHV"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    authTec.isUser(
      req,
      "Advertencia",
      "Ya se encuentra una razón social con el mismo nombre",
      "error",
      true,
      false,
      "tecnico/HojaVida/ConsultarHV/Edit/" + req.params.id
    );
  }
  return next();
};

//Apartado: Consolidaciones
//Consolidaciones - Ver
export const SeeTecConsolidaciones = async (req, res, next) => {
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
        "consolidacion.vivienda": {
          $ne: "on",
        },
      })
      .then((result) => {
        hojavida.populate(result, { path: "hojavida" }, function (err, hv) {
          req.allConso = hv;
          return next();
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
