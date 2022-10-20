import consolidaciones from "../models/consolidaciones.js";
import reportes from "../models/reportes.js";
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

  var SendCorreccion = async (req, res, next, decodificada) => {
    var {
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
    console.log(lisCarnetsON);

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
          observaciones: observacion,
          createdAt: new Date(),
        },
      })
      .then((result) => {
        if (result != null) {
          authTec.EditReport(req, next, decodificada);
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
  };

  var EditReport = async (req, next, decodificada) => {
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
    SendCorreccion: SendCorreccion,
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

    //Totas de Visitas - IVC Publicidad
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
        "consolidacion.publicidad": { $eq: "on" },
      })
      .count()
      .then((data) => {
        req.visitIVCPubli = data;
      });

    //Totas de Visitas -IVC Rotulado
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
        "consolidacion.rotulado": { $eq: "on" },
      })
      .count()
      .then((data) => {
        req.visitRotu = data;
      });

    //Totas de Visitas - MS Establecimientos
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
        "consolidacion.MSEstablecimientos": { $eq: "on" },
      })
      .count()
      .then((data) => {
        req.visitMSEstab = data;
      });

    //Totas de Visitas - MS Productos
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
        "consolidacion.MSProductos": { $eq: "on" },
      })
      .count()
      .then((data) => {
        req.visitMSProd = data;
      });

    //Totas de Visitas - Cementerios
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
        tipo: "CEMENTERIOS (CON O SIN MORGUE)",
      })
      .count()
      .then((data) => {
        req.visitCemen = data;
      });

    //Totas de Visitas - Morgues
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
        tipo: "MORGUES",
      })
      .count()
      .then((data) => {
        req.visitMorg = data;
      });

    //Totas de Visitas - Vacunaciones
    await consolidaciones
      .aggregate([
        {
          $match: {
            "consolidacion.antirrabica": "on",
            status: "Aceptado",
            municipio: decodificada.municipio,
          },
        },
        { $group: { _id: null, suma: { $sum: "$ForAntirrabica.totalVac" } } },
      ])
      .then((data) => {
        console.log(decodificada.user);
        console.log(data);
        if (data.length === 0) {
          req.vacunas = 0;
        } else {
          req.vacunas = data;
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
    await reportes
      .find({
        "consolidacion.userTec": {
          $eq: decodificada.user,
        },
        "respuesta.criterio": { $eq: "Rechazado" },
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
    authTec.SendConsolidacion(req, next, "on", "", "", "", "", "", "", "");
  });
};

//Consolidaciones - Rechazos
export const EditConsolidacionRech = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  req.params.user = decodificada.user;
  await upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    authTec.SendCorreccion(req, res, next, decodificada);
  });
};
export const ConsolidaRechazada = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    await reportes
      .findOne({
        "consolidacion.consID": { $eq: req.params._id },
        "consolidacion.userTec": {
          $eq: decodificada.user,
        },
        "respuesta.criterio": { $eq: "Rechazado" },
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
