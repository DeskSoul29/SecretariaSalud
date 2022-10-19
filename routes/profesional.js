import { Router } from "express";
import moment from "moment";

import {
  users,
  fillMunicipio,
  hojavidaConsultAllProf,
  changePass,
  addMuniApoyo,
  SeeProfConsolidaciones,
  SeeProfNAdmin,
  ConsolidaEstadosProf,
  SendNovedad,
  CountActas,
  SeeProfEstablecimiento,
  SendReportEstablecimiento,
  EditReportEstablecimiento,
  SeeProfMorgues,
  SeeProfCementerios,
  SeeProfEstaRotulado,
  SeeProfEstaPublicidad,
  SeeProfMedEstable,
  SeeProfMedProduct,
  SeeProfEventSaludPubli,
  SendReportEventSaludPubli,
  EditReportEventSaludPubli,
  SeeProfQuejas,
  SendReportQuejas,
  EditReportQuejas,
  SeeProfAntirrabica,
  SendReportAntirrabica,
  EditReportAntirrabica,
  SeeProfCarnetizados,
  SendReportCarnetzados,
  EditReportCarnetzados,
  SeeProfEduSanitaria,
  SendReportEduSanitaria,
  EditReportEduSanitaria,
  SeeProfVehiculos,
  SendReportVehiculos,
  EditReportVehiculos,
  SeeProfTomaMuestra,
  SendReportTomaMuestra,
  EditReportTomaMuestra,
  ConsolidaRechazada,
} from "../controllers/profController.js";

import {
  isAuthenticatedProf,
  CodigosEstablecimientos,
  consultUser,
  inscribirEstablecimiento,
  ValConsolidaciones,
  DownloadFile,
  logout,
} from "../helpers/auth.js";

const router = Router();

router.get(
  "/",
  isAuthenticatedProf,
  ConsolidaEstadosProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/main", {
      user: req.user,
      consPend: req.consPend,
      consEnv: req.consEnv,
      consCorre: req.consCorre,
      consAcep: req.consAcep,
      consRech: req.consRech,
      allConso: req.allConso,
      moment: moment,
    });
  }
);

// Apartado: Usuarios
router.get("/Cuentas/Usuarios", isAuthenticatedProf, users, (req, res) => {
  res.render("profesional/Cuentas/usuarios", {
    user: req.user,
    users: req.users,
    alert: undefined,
  });
});
router.get(
  "/Cuentas/Usuarios/AddMuni/:id",
  isAuthenticatedProf,
  fillMunicipio,
  consultUser,
  (req, res) => {
    res.render("profesional/Cuentas/addMuni", {
      user: req.user,
      fields: req.localidades,
      alert: undefined,
      consultUser: req.consultUser,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/AddMuni/:id",
  isAuthenticatedProf,
  addMuniApoyo,
  (req, res) => {
    res.render("profesional/Cuentas/addMuni", {
      user: req.user,
      fields: false,
      alert: req.alert,
      consultUser: false,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/ChangePass/:id",
  isAuthenticatedProf,
  changePass,
  (req, res) => {
    res.render("profesional/Cuentas/usuarios", {
      user: req.user,
      users: false,
      alert: req.alert,
    });
  }
);

//Apartado: Hojas de Vida
router.get(
  "/HojaVida/ConsultarHV",
  isAuthenticatedProf,
  hojavidaConsultAllProf,
  (req, res) => {
    res.render("profesional/HojaVida/ConsultarHVProf", {
      user: req.user,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/HojaVida/InscribirHV",
  isAuthenticatedProf,
  fillMunicipio,
  CodigosEstablecimientos,
  (req, res) => {
    res.render("profesional/HojaVida/InscribirHVProf", {
      user: req.user,
      fields: req.localidades,
      codigos: req.codigos,
      alert: undefined,
    });
  }
);
router.post(
  "/HojaVida/InscribirHV",
  isAuthenticatedProf,
  inscribirEstablecimiento,
  (req, res) => {
    res.render("profesional/HojaVida/InscribirHVProf", {
      user: req.user,
      alert: req.alert,
      fields: false,
      codigos: false,
    });
  }
);

// Apartado: Consolidaciones

// Consolidaciones - Consultar
router.get(
  "/Consolidaciones/Ver",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  SeeProfNAdmin,
  (req, res) => {
    res.render("profesional/Visitas/mainVer", {
      user: req.user,
      allConso: req.allConso,
      allNAdmin: req.allNAdmin,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Establecimientos",
  isAuthenticatedProf,
  SeeProfEstablecimiento,
  (req, res) => {
    res.render("profesional/Visitas/Ver/establecimientos", {
      user: req.user,
      Estable: req.consultEstable,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Morgues",
  isAuthenticatedProf,
  SeeProfMorgues,
  (req, res) => {
    res.render("profesional/Visitas/Ver/morgues", {
      user: req.user,
      morgues: req.morgues,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Cementerios",
  isAuthenticatedProf,
  SeeProfCementerios,
  (req, res) => {
    res.render("profesional/Visitas/Ver/cementerios", {
      user: req.user,
      cementerio: req.consultCementerios,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCRotulado",
  isAuthenticatedProf,
  SeeProfEstaRotulado,
  (req, res) => {
    res.render("profesional/Visitas/Ver/rotulado", {
      user: req.user,
      rotulado: req.consultRotulado,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCPublicidad",
  isAuthenticatedProf,
  SeeProfEstaPublicidad,
  (req, res) => {
    res.render("profesional/Visitas/Ver/publicidad", {
      user: req.user,
      publicidad: req.consultPublicidad,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniEstablecimientos",
  isAuthenticatedProf,
  SeeProfMedEstable,
  (req, res) => {
    res.render("profesional/Visitas/Ver/medestablecimiento", {
      user: req.user,
      medEstable: req.consultMedEstable,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniProductos",
  isAuthenticatedProf,
  SeeProfMedProduct,
  (req, res) => {
    res.render("profesional/Visitas/Ver/medproducto", {
      user: req.user,
      medProduc: req.consultMedProduct,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Vehiculos",
  isAuthenticatedProf,
  SeeProfVehiculos,
  (req, res) => {
    res.render("profesional/Visitas/Ver/vehiculos", {
      user: req.user,
      Vehiculo: req.consultVehiculos,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EventosSaludPublica",
  isAuthenticatedProf,
  SeeProfEventSaludPubli,
  (req, res) => {
    res.render("profesional/Visitas/Ver/EventSalPubli", {
      user: req.user,
      consultES: req.consultES,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/TomaMuestras",
  isAuthenticatedProf,
  SeeProfTomaMuestra,
  (req, res) => {
    res.render("profesional/Visitas/Ver/tomamuestras", {
      user: req.user,
      TomaM: req.consultTomaM,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EduSanitaria",
  isAuthenticatedProf,
  SeeProfEduSanitaria,
  (req, res) => {
    res.render("profesional/Visitas/Ver/eduSanitaria", {
      user: req.user,
      EduSani: req.consultEdusani,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/ListadoCarnetizados",
  isAuthenticatedProf,
  SeeProfCarnetizados,
  (req, res) => {
    res.render("profesional/Visitas/Ver/listCarnets", {
      user: req.user,
      Carnetiz: req.consultCarnetiz,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/AntirrabicaAnimal",
  isAuthenticatedProf,
  SeeProfAntirrabica,
  (req, res) => {
    res.render("profesional/Visitas/Ver/antirrabica", {
      user: req.user,
      Antirrabi: req.consultAntirrabi,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Quejas",
  isAuthenticatedProf,
  SeeProfQuejas,
  (req, res) => {
    res.render("profesional/Visitas/Ver/quejas", {
      user: req.user,
      Queja: req.consultQueja,
      moment: moment,
    });
  }
);

//Consolidaciones - Validar
router.get(
  "/Consolidaciones/Validar/Establecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/Establecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportEstablecimiento,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/Vehiculos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/Vehiculos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportVehiculos,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/EventosSaludPublica/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/EventosSaludPublica/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportEventSaludPubli,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/TomaMuestras/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/TomaMuestras/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportTomaMuestra,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/EduSanitaria/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/EduSanitaria/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportEduSanitaria,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/ListadoCarnetizados/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/ListadoCarnetizados/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportCarnetzados,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/AntirrabicaAnimal/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/AntirrabicaAnimal/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportAntirrabica,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/Quejas/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/Quejas/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportQuejas,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);

//Consolidaciones - Correcciones
router.get(
  "/Consolidaciones/Correccion/Establecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/Establecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  EditReportEstablecimiento,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/Vehiculos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/Vehiculos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReportVehiculos,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      consRech: req.consRech,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/EventosSaludPublica/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/EventosSaludPublica/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReportEventSaludPubli,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/TomaMuestras/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/TomaMuestras/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReportTomaMuestra,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/EduSanitaria/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/EduSanitaria/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReportEduSanitaria,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/ListadoCarnetizados/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/ListadoCarnetizados/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReportCarnetzados,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/AntirrabicaAnimal/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/AntirrabicaAnimal/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReportAntirrabica,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/Quejas/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/Quejas/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReportQuejas,
  ConsolidaRechazada,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      consRech: req.consRech,
      alert: req.alert,
      moment: moment,
    });
  }
);

//Consolidaciones - Reportes

//Consolidaciones - Enviar Novedades
router.get(
  "/Consolidaciones/EnviarNA",
  isAuthenticatedProf,
  fillMunicipio,
  CountActas,
  (req, res) => {
    res.render("profesional/EnviarNAdmin/mainEnviarNA", {
      user: req.user,
      fields: req.localidades,
      actaAnul: req.actaAnul,
    });
  }
);
router.post(
  "/Consolidaciones/EnviarNA",
  isAuthenticatedProf,
  SendNovedad,
  (req, res) => {
    res.render("profesional/EnviarNAdmin/mainEnviarNA", {
      user: req.user,
      fields: false,
      actaAnul: false,
      alert: req.alert,
    });
  }
);

router.get("/evidencia/:id", isAuthenticatedProf, DownloadFile);

router.get("/logout", logout);

export default router;
