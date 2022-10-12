import { Router } from "express";
import moment from "moment";

import {
  users,
  fillMunicipio,
  hojavidaConsultAllProf,
  changePass,
  addMuniApoyo,
  SeeProfConsolidaciones,
  ConsolidaEstadosProf,
  LisConsolidaRechazadas,
  SendNovedad,
  SeeProfEstablecimiento,
  SendReportEstablecimiento,
  SeeProfMorgues,
  SendReportMorgues,
  SeeProfCementerios,
  SendReportCementerios,
  SeeProfEstaRotulado,
  SendReportEstaRotulado,
  SeeProfEstaPublicidad,
  SendReportEstaPublicidad,
  SeeProfMedEstable,
  SendReportMedEstable,
  SeeProfMedProduct,
  SendReportMedProduct,
  SeeProfEventSaludPubli,
  SendReportEventSaludPubli,
  SeeProfQuejas,
  SendReportQuejas,
  SeeProfAntirrabica,
  SendReportAntirrabica,
  SeeProfCarnetizados,
  SendReportCarnetzados,
  SeeProfEduSanitaria,
  SendReportEduSanitaria,
  SeeProfVehiculos,
  SendReportVehiculos,
  SeeProfTomaMuestra,
  SendReportTomaMuestra,
} from "../controllers/profController.js";

import {
  isAuthenticatedProf,
  CodigosEstablecimientos,
  consultUser,
  inscribirEstablecimiento,
  ValConsolidaciones,
  logout,
} from "../helpers/auth.js";

const router = Router();

router.get(
  "/",
  isAuthenticatedProf,
  ConsolidaEstadosProf,
  LisConsolidaRechazadas,
  (req, res) => {
    res.render("profesional/main", {
      user: req.user,
      consPend: req.consPend,
      consEnv: req.consEnv,
      consAcep: req.consAcep,
      consRech: req.consRech,
      ListRechazo: req.ListRechazo,
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
  (req, res) => {
    res.render("profesional/Visitas/mainVer", {
      user: req.user,
      allConso: req.allConso,
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
  "/Consolidaciones/Validar/Morgues/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/morgues", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/Morgues/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportMorgues,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/morgues", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
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
  "/Consolidaciones/Validar/Cementerios/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/cementerios", {
      user: req.user,
      moment: moment,
      consolidacion: req.consolidacion,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/Cementerios/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportCementerios,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/cementerios", {
      user: req.user,
      moment: moment,
      consolidacion: req.consolidacion,
      alert: req.alert,
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
  "/Consolidaciones/Validar/IVCRotulado/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/rotulado", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/IVCRotulado/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportEstaRotulado,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/rotulado", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
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
  "/Consolidaciones/Validar/IVCPublicidad/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/publicidad", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/IVCPublicidad/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportEstaPublicidad,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/publicidad", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
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
  "/Consolidaciones/Validar/MedSaniEstablecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/medEstablecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/MedSaniEstablecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportMedEstable,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/medEstablecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
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
  "/Consolidaciones/Validar/MedSaniProductos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/medProductos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/MedSaniProductos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  SendReportMedProduct,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Validar/medProductos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
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

//Consolidaciones - Reportes

//Consolidaciones - Enviar Novedades
router.get(
  "/Consolidaciones/EnviarNA",
  isAuthenticatedProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/EnviarNAdmin/mainEnviarNA", {
      user: req.user,
      fields: req.localidades,
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
      alert: req.alert,
    });
  }
);

router.get("/logout", logout);

export default router;
