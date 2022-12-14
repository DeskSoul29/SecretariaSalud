import login from "../models/user.js";
import local from "../models/localidades.js";
import hojavida from "../models/hojavida.js";
import consolidaciones from "../models/consolidaciones.js";

import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";
import fs from "fs";
import upload from "../middleware/upload.js";
import uploadResult from "../middleware/uploadResult.js";

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
        //Novedad Administrativa
        noveadministrativa,
        mesNA,
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
        //PermanenciaMunicipio
        permMunicipio,
        //Cronograma
        cronograma,
        mesCron,
        //Extra
        observacion,
      } = req.body;

      var Estado = "Enviado";

      if (req.body.idHV != "") {
        var idHV = req.body.idHV;
      }

      var SendNovAdRes = "off";
      if (tomaMuestraON == "on") {
        Estado = "Pendiente";
      } else if (viviSaluON == "on") {
        SendNovAdRes = "on";
      } else if (permMunicipio == "on") {
        SendNovAdRes = "on";
      } else if (cronograma == "on") {
        SendNovAdRes = "on";
      }

      new consolidaciones({
        status: Estado,
        SendNovAd: SendNovAdRes,
        provincia: decodificada.provincia,
        municipio: municipio,
        responsable: {
          userResponsable: decodificada.user,
          nombreResponsable: decodificada.nombres + "" + decodificada.apellidos,
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
          noveadministrativa: noveadministrativa,
          cronograma: cronograma,
          permMunicipio: permMunicipio,
        },
        mesCron: mesCron,

        hojavida: idHV,
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
        ForNAdmin: {
          mesNA: mesNA,
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
            if (noveadministrativa == "on") {
              authProf.UpdateAceptAll(req, decodificada.provincia, municipio);
            }
            authProf.isUser(
              req,
              "Conexi??n exitosa",
              "Consolidaci??n Enviada",
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
              true,
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

  var DeleteConsolidacion = async (req, fileName, next) => {
    await consolidaciones
      .findByIdAndDelete(req.params.id)
      .then((result) => {
        authProf.isUser(
          req,
          "Conexi??n exitosa",
          "Eliminado Correctamente",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver"
        );
        authProf.DeleteFile(fileName);
      })
      .catch((error) => console.error(error));
    return next();
  };

  var UpdateAceptAll = async (req, provincia, municipio) => {
    return await consolidaciones
      .updateMany(
        {
          provincia: provincia,
          municipio: municipio,
          status: "Enviado",
          SendNovAd: "off",
        },
        { $set: { SendNovAd: "on" } }
      )
      .catch((error) => {
        console.log(error);
      });
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
      //Novedad Administrativa
      noveadministrativa,
      mesNA,
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
      //PermanenciaMunicipio
      permMunicipio,
      //Cronograma
      cronograma,
      mesCron,
      //Extra
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
    noveadministrativa =
      noveadministrativa == undefined ? "" : noveadministrativa;
    permMunicipio = permMunicipio == undefined ? "" : permMunicipio;
    cronograma = cronograma == undefined ? "" : cronograma;

    var Ruta = await authProf.NextReport(req, decodificada);

    await consolidaciones
      .findByIdAndUpdate(req.params._id, {
        $set: {
          status: "Enviado",
          fvisit: fVisit,
          score: score,
          concepto: concepto,
          accion: accion,

          mesCron: mesCron,

          acta: acta,
          actaLey: actaLey,
          actaAnul: actaAnul,

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
            viviSalu: viviSaluON,
            noveadministrativa: noveadministrativa,
            permMunicipio: permMunicipio,
            cronograma: cronograma,
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
          ForNAdmin: {
            mesNA: mesNA,
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
          authProf.DeleteFile(nameFile);
          // if (tomaMuestraON == "on") {
          //   authProf.updateResEvi(req, res);
          // }
          if (Ruta.length === 0) {
            authProf.isUser(
              req,
              "Reportes Terminados",
              "Ha Terminado El Listado",
              "success",
              true,
              false,
              "/profesional"
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
            } else if (Ruta[0].consolidacion.noveadministrativa == "on") {
              var tipoRuta = "NoveAdministrativa/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.permMunicipio == "on") {
              var tipoRuta = "PermMunicipio/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.cronograma == "on") {
              var tipoRuta = "Cronograma/" + Ruta[0]._id;
            } else if (Ruta[0].consolidacion.viviSalu == "on") {
              var tipoRuta = "ViviendaSaludable/" + Ruta[0]._id;
            }

            authProf.isUser(
              req,
              "Conexi??n exitosa",
              "Consolidaci??n Enviada",
              "success",
              false,
              800,
              "/profesional/Consolidaciones/Rechazado/" + tipoRuta
            );
            return next();
          }
        } else {
          authProf.isUser(
            req,
            "Error en la Base de Datos",
            "Envio Cancelado",
            "error",
            true,
            false,
            "/profesional"
          );
          return next();
        }
      })
      .catch((error) => {
        console.log(error);
        authProf.isUser(
          req,
          "Envio Cancelado",
          "No se encontro en la base de datos",
          "error",
          true,
          false,
          "/profesional"
        );
        return next();
      });
  };

  var updateResEvi = async (req, res) => {
    await uploadResult(req, res);

    return await consolidaciones.findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          "ForTomaMuestras.resultado": req.file.filename2,
        },
      },
      { new: true }
    );
  };

  var NextReport = async (req, decodificada) => {
    return await consolidaciones
      .find({
        provincia: {
          $eq: decodificada.provincia,
        },
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

  var DeleteFile = async (nameFile) => {
    try {
      fs.unlinkSync("./upload/" + nameFile);
      console.log("File removed");
    } catch (err) {
      console.error("Something wrong happened removing the file", err);
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
          } else if (nextCons[0].consolidacion.quejas == "on") {
            var rutaValidar =
              "/profesional/Consolidaciones/Validar/Quejas/" + nextCons[0]._id;
          } else if (nextCons[0].consolidacion.cronograma == "on") {
            var rutaValidar =
              "/profesional/Consolidaciones/Validar/Cronograma/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.viviSalu == "on") {
            var rutaValidar =
              "/profesional/Consolidaciones/Validar/ViviendaSaludable/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.permMunicipio == "on") {
            var rutaValidar =
              "/profesional/Consolidaciones/Validar/PermMunicipio/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.alertSani == "on") {
            var rutaValidar =
              "/profesional/Consolidaciones/Validar/AlertaSanitaria/" +
              nextCons[0]._id;
          }
          authProf.isUser(
            req,
            "Conexi??n exitosa",
            "Consolidaci??n Enviada",
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
          } else if (nextCons[0].consolidacion.cronograma == "on") {
            var rutaValidar =
              "/profesional/Consolidaciones/Correccion/Cronograma/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.viviSalu == "on") {
            var rutaValidar =
              "/profesional/Consolidaciones/Correccion/ViviendaSaludable/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.permMunicipio == "on") {
            var rutaValidar =
              "/profesional/Consolidaciones/Correccion/PermMunicipio/" +
              nextCons[0]._id;
          }
          authProf.isUser(
            req,
            "Conexi??n exitosa",
            "Consolidaci??n Enviada",
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
        "consolidacion.tomaMuestra": {
          $ne: "on",
        },
        "consolidacion.vivienda": {
          $ne: "on",
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

  var UpdateAllCemenMorg = async (req, tipos, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.establecimiento": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          tipo: tipos,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/Establecimientos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllAntirrabica = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.antirrabica": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/AntirrabicaAnimal"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllEstablecimiento = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.establecimiento": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/Establecimientos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllIVCPublicidad = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.publicidad": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/IVCPublicidad"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllIVCRotulado = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.rotulado": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/IVCRotulado"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllMSEstablecimientos = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.MSEstablecimientos": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/MedSaniEstablecimientos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllMSProductos = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.MSProductos": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/MedSaniProductos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllEduSanitaria = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.eduSanitaria": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/EduSanitaria"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllEventosSaludPublica = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.EvenSaludPubli": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/EventosSaludPublica"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllListadoCarnetizados = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.lisCarnets": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/ListadoCarnetizados"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllVehiculos = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.vehiculos": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/Vehiculos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllQuejas = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.quejas": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/Quejas"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllCronograma = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.cronograma": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/CronogramaMensual"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllViviendaSaludable = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.viviSalu": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
          SendNovAd: "off",
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/ViviendaSaludable"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllPermanenciaMunicipio = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.permMunicipio": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/PermMunicipio"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllAlertaSanitaria = async (req, next, decodificada) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.alertSani": "on",
          status: "Pendiente",
          provincia: decodificada.provincia,
        },
        {
          $set: {
            status: "Enviado",
          },
        }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/profesional/Consolidaciones/Ver/AlertaSanitaria"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // var ValidaMunicipio = async (municipio, mes) => {
  //   let today = new Date();
  //   console.log(today);
  //   return await consolidaciones.find({
  //     municipio: {
  //       $eq: municipio,
  //     },
  //     "ForNAdmin.mesNA": {
  //       $eq: mes,
  //     },
  //     "consolidacion.noveadministrativa": { $eq: "on" },
  //     $expr: {
  //       $and: [{ $eq: [{ $year: "$createdAt" }, 2021] }],
  //     },
  //   });
  // };

  return {
    isUser: isUser,
    SendConsolidacion: SendConsolidacion,
    DeleteConsolidacion: DeleteConsolidacion,
    DeleteFile: DeleteFile,
    SendCorreccion: SendCorreccion,
    NextReport: NextReport,
    UpdateAceptAll: UpdateAceptAll,
    UpdateConsoli: UpdateConsoli,
    UpdateCorreccion: UpdateCorreccion,
    UpdateActa: UpdateActa,
    updateResEvi: updateResEvi,
    SearchNextPendien: SearchNextPendien,
    SearchNextCorreg: SearchNextCorreg,
    UpdateAllCemenMorg: UpdateAllCemenMorg,
    UpdateAllAntirrabica: UpdateAllAntirrabica,
    UpdateAllEstablecimiento: UpdateAllEstablecimiento,
    UpdateAllIVCPublicidad: UpdateAllIVCPublicidad,
    UpdateAllIVCRotulado: UpdateAllIVCRotulado,
    UpdateAllMSEstablecimientos: UpdateAllMSEstablecimientos,
    UpdateAllMSProductos: UpdateAllMSProductos,
    UpdateAllEduSanitaria: UpdateAllEduSanitaria,
    UpdateAllEventosSaludPublica: UpdateAllEventosSaludPublica,
    UpdateAllListadoCarnetizados: UpdateAllListadoCarnetizados,
    UpdateAllVehiculos: UpdateAllVehiculos,
    UpdateAllQuejas: UpdateAllQuejas,
    UpdateAllCronograma: UpdateAllCronograma,
    UpdateAllViviendaSaludable: UpdateAllViviendaSaludable,
    UpdateAllPermanenciaMunicipio: UpdateAllPermanenciaMunicipio,
    UpdateAllAlertaSanitaria: UpdateAllAlertaSanitaria,
    // ValidaMunicipio: ValidaMunicipio,
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
        "consolidacion.tomaMuestra": {
          $ne: "on",
        },
        "consolidacion.vivienda": {
          $ne: "on",
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
      .aggregate([
        {
          $match: {
            provincia: decodificada.provincia,
            status: "Aceptado",
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
            provincia: decodificada.provincia,
            status: "Aceptado",
            "consolidacion.establecimiento": "on",
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
        {
          $group: {
            _id: { anno: { $year: "$createdAt" } },
            count: { $sum: "$ForAntirrabica.totalVac" },
          },
        },
        { $sort: { "_id.anno": -1 } },
      ])
      .then((data) => {
        if (data.length === 0) {
          req.vacunas = 0;
        } else {
          req.vacunas = data[0].count;
        }
      });

    //Bar Chart
    await consolidaciones
      .aggregate([
        {
          $match: {
            status: "Aceptado",
            "consolidacion.establecimiento": "on",
            provincia: decodificada.provincia,
          },
        },
        {
          $group: {
            _id: {
              anno: { $year: "$createdAt" },
              mes: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.mes": 1 } },
      ])
      .then((data) => {
        req.barChaVisit = data;
      });

    // Bar Chart - Favorable
    await consolidaciones
      .aggregate([
        {
          $match: {
            status: "Aceptado",
            "consolidacion.establecimiento": "on",
            concepto: "FAVORABLE",
            provincia: decodificada.provincia,
          },
        },
        {
          $group: {
            _id: {
              anno: { $year: "$createdAt" },
              mes: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.mes": 1 } },
      ])
      .then((data) => {
        req.barChaFav = data;
      });

    // Bar Chart - Desfavorable
    await consolidaciones
      .aggregate([
        {
          $match: {
            status: "Aceptado",
            "consolidacion.establecimiento": "on",
            concepto: "DESFAVORABLE",
            provincia: decodificada.provincia,
          },
        },
        {
          $group: {
            _id: {
              anno: { $year: "$createdAt" },
              mes: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.mes": 1 } },
      ])
      .then((data) => {
        req.barChaDes = data;
      });

    // Bar Chart - Favorable Con Requerimientos
    await consolidaciones
      .aggregate([
        {
          $match: {
            status: "Aceptado",
            "consolidacion.establecimiento": "on",
            concepto: "FAVORABLE CON REQUERIMIENTOS",
            provincia: decodificada.provincia,
          },
        },
        {
          $group: {
            _id: {
              anno: { $year: "$createdAt" },
              mes: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.mes": 1 } },
      ])
      .then((data) => {
        req.barChaFavRe = data;
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
        "Conexi??n exitosa",
        "Contrase??a Actualizada Correctamente",
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
        "Conexi??n exitosa",
        "Municipios A??adidos Correctamente",
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
export const editHVProf = async (req, res, next) => {
  const {
    municipio,
    phone,
    rSocial,
    direccion,
    rLegal,
    estado,
    idenSocial,
    placa,
    iDueno,
    nDueno,
  } = req.body;

  var IdenRep = await hojavida.find({
    _id: {
      $ne: req.params.id,
    },
    idenSocial: idenSocial,
  });

  if (IdenRep.length == 0) {
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
              idenSocial: idenSocial,
              placa: placa,
              estado: estado,
              iDueno: iDueno,
              nDueno: nDueno,
            },
          },
          { new: true }
        )
        .then((result) => {
          if (result) {
            authProf.isUser(
              req,
              "Conexi??n exitosa",
              "Establecimiento Actualizado Correctamente",
              "success",
              false,
              800,
              "profesional/HojaVida/ConsultarHV"
            );
          } else {
            authProf.isUser(
              req,
              "Advertencia",
              "Error en la Base de Datos",
              "error",
              true,
              false,
              "profesional/HojaVida/ConsultarHV"
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      authProf.isUser(
        req,
        "Advertencia",
        "Ya se encuentra una raz??n social con el mismo nombre",
        "error",
        true,
        false,
        "profesional/HojaVida/ConsultarHV/Edit/" + req.params.id
      );
    }
  } else {
    authProf.isUser(
      req,
      "Advertencia",
      "Identificaci??n de la Raz??n Social ya se encuentra inscrita",
      "error",
      true,
      false,
      "profesional/HojaVida/ConsultarHV"
    );
  }
  return next();
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
export const deleteCons = async (req, res, next) => {
  await consolidaciones
    .findById(req.params.id)
    .then((result) => {
      if (result.SendNovAd == "on") {
        authProf.isUser(
          req,
          "Reporte Cancelado",
          "Ya se envio la Novedad Administrativa de Esta Consolidacion",
          "error",
          true,
          false,
          "/profesional/Consolidaciones/Ver"
        );
        return next();
      } else if (result == null) {
        authProf.isUser(
          req,
          "Reporte Cancelado",
          "No se encontro la consolidacion",
          "error",
          true,
          false,
          "/profesional/Consolidaciones/Ver"
        );
        return next();
      } else {
        authProf.DeleteConsolidacion(req, result.evidencia.file, next);
      }
    })
    .catch((error) => {
      console.error(error);
      authProf.isUser(
        req,
        "Reporte Cancelado",
        "No Se Encontro la Consolidacion",
        "error",
        true,
        false,
        "/profesional/Consolidaciones/Ver"
      );
      return next();
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
      .aggregate([
        {
          $match: {
            actaAnul: "SI",
            SendNovAd: "off",
          },
        },
        {
          $group: {
            _id: {
              provincia: decodificada.provincia,
              municipio: "$municipio",
              status: "Enviado",
              consolidaciones: { establecimiento: "on" },
            },
            count: { $sum: 1 },
          },
        },
      ])
      .then((data) => {
        req.actaAnul = data;
        return next();
      });
  } catch (error) {
    console.log(error);
    return next();
  }
};
//Consolidaciones - Consultar
export const SeeProfConsolidaciones = async (req, res, next) => {
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
      })
      .sort({ createdAt: 1 })
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
export const SendManyAcept = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );

  if (req.params.tipCons == "establecimiento_cementerios") {
    authProf.UpdateAllCemenMorg(
      req,
      "CEMENTERIOS (CON O SIN MORGUE)",
      next,
      decodificada
    );
  } else if (req.params.tipCons == "establecimiento_morgues") {
    authProf.UpdateAllCemenMorg(req, "MORGUES", next, decodificada);
  } else {
    if (req.params.tipCons == "antirrabica") {
      authProf.UpdateAllAntirrabica(req, next, decodificada);
    } else if (req.params.tipCons == "establecimiento") {
      authProf.UpdateAllEstablecimiento(req, next, decodificada);
    } else if (req.params.tipCons == "publicidad") {
      authProf.UpdateAllIVCPublicidad(req, next, decodificada);
    } else if (req.params.tipCons == "rotulado") {
      authProf.UpdateAllIVCRotulado(req, next, decodificada);
    } else if (req.params.tipCons == "MSEstablecimientos") {
      authProf.UpdateAllMSEstablecimientos(req, next, decodificada);
    } else if (req.params.tipCons == "MSProductos") {
      authProf.UpdateAllMSProductos(req, next, decodificada);
    } else if (req.params.tipCons == "eduSanitaria") {
      authProf.UpdateAllEduSanitaria(req, next, decodificada);
    } else if (req.params.tipCons == "EvenSaludPubli") {
      authProf.UpdateAllEventosSaludPublica(req, next, decodificada);
    } else if (req.params.tipCons == "lisCarnets") {
      authProf.UpdateAllListadoCarnetizados(req, next, decodificada);
    } else if (req.params.tipCons == "vehiculos") {
      authProf.UpdateAllVehiculos(req, next, decodificada);
    } else if (req.params.tipCons == "quejas") {
      authProf.UpdateAllQuejas(req, next, decodificada);
    } else if (req.params.tipCons == "cronograma") {
      authProf.UpdateAllCronograma(req, next, decodificada);
    } else if (req.params.tipCons == "ViviendaSaludable") {
      authProf.UpdateAllViviendaSaludable(req, next, decodificada);
    } else if (req.params.tipCons == "PermanenciaMunicipio") {
      authProf.UpdateAllPermanenciaMunicipio(req, next, decodificada);
    } else if (req.params.tipCons == "AlertaSanitaria") {
      authProf.UpdateAllAlertaSanitaria(req, next, decodificada);
    }
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
        return res.end(err);
      }
      authProf.SendCorreccion(
        req,
        res,
        next,
        decodificada,
        validar.evidencia.file
      );
    });
  } else {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "No se encuentra en estado Rechazado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver"
    );
    return next();
  }
};
