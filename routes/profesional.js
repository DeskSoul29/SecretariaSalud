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
  SendConsolidacion,
  EditConsolidacionRech,
  CountActas,
  SendReport,
  EditReport,
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
      consRechProf: req.consRechProf,
      allConso: req.allConso,
      visitAcep: req.visitAcep,
      vacunas: req.vacunas,
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

//Consolidaciones - Enviar
router.get("/Consolidaciones/Enviar", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Visitas/mainEnviar", {
    user: req.user,
  });
});
router.get(
  "/Consolidaciones/Enviar/NoveAdministrativa",
  isAuthenticatedProf,
  fillMunicipio,
  CountActas,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/nAdmin", {
      user: req.user,
      fields: req.localidades,
      actaAnul: req.actaAnul,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/NoveAdministrativa/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/nAdmin", {
      user: req.user,
      fields: false,
      actaAnul: false,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/Establecimientos",
  isAuthenticatedProf,
  CodigosEstablecimientos,
  hojavidaConsultAllProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/establecimientos", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/Establecimientos/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/establecimientos", {
      user: req.user,
      codigos: null,
      hojavida: null,
      alert: req.alert,
      fields: false,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/Vehiculos",
  isAuthenticatedProf,
  CodigosEstablecimientos,
  hojavidaConsultAllProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/vehiculos", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/Vehiculos/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/vehiculos", {
      user: req.user,
      codigos: null,
      hojavida: null,
      alert: req.alert,
      fields: false,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/EventosSaludPublica",
  isAuthenticatedProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/eventSaludPublic", {
      user: req.user,
      alert: undefined,
      fields: req.localidades,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/EventosSaludPublica/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/eventSaludPublic", {
      user: req.user,
      alert: req.alert,
      fields: false,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/TomaMuestras",
  isAuthenticatedProf,
  CodigosEstablecimientos,
  hojavidaConsultAllProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/tomamuestras", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
      alert: undefined,
      fields: req.localidades,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/TomaMuestras/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/tomamuestras", {
      user: req.user,
      codigos: null,
      hojavida: null,
      fields: false,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/EduSanitaria",
  isAuthenticatedProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/eduSanitaria", {
      user: req.user,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/EduSanitaria/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/eduSanitaria", {
      user: req.user,
      fields: false,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/ListadoCarnetizados",
  isAuthenticatedProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/listCarnets", {
      user: req.user,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/ListadoCarnetizados/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/listCarnets", {
      user: req.user,
      fields: false,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/AntirrabicaAnimal",
  isAuthenticatedProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/antirrabica", {
      user: req.user,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/AntirrabicaAnimal/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/antirrabica", {
      user: req.user,
      fields: false,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/Quejas",
  isAuthenticatedProf,
  CodigosEstablecimientos,
  hojavidaConsultAllProf,
  fillMunicipio,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/quejas", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/Quejas/:user",
  isAuthenticatedProf,
  SendConsolidacion,
  (req, res) => {
    res.render("profesional/Visitas/Enviar/quejas", {
      user: req.user,
      fields: false,
      codigos: null,
      hojavida: null,
      alert: req.alert,
    });
  }
);
//Consolidaciones - Rechazos
router.get(
  "/Consolidaciones/Rechazado/Establecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/Establecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/AntirrabicaAnimal/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/AntirrabicaAnimal/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/ListadoCarnetizados/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/ListadoCarnetizados/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/EduSanitaria/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/EduSanitaria/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/TomaMuestras/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/TomaMuestras/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/EventosSaludPublica/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/EventosSaludPublica/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/Vehiculos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/Vehiculos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/Quejas/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/Quejas/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/NoveAdministrativa/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/nAdmin", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/NoveAdministrativa/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("profesional/Visitas/Rechazado/nAdmin", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
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
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/establecimientos", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Morgues",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/morgues", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Cementerios",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/cementerios", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCRotulado",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/rotulado", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCPublicidad",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/publicidad", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniEstablecimientos",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/medestablecimiento", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniProductos",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/medproducto", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Vehiculos",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/vehiculos", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EventosSaludPublica",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/EventSalPubli", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/TomaMuestras",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/tomamuestras", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EduSanitaria",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/eduSanitaria", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/ListadoCarnetizados",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/listCarnets", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/AntirrabicaAnimal",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/antirrabica", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Quejas",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/quejas", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/NoveAdministrativa",
  isAuthenticatedProf,
  SeeProfConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/nAdmin", {
      user: req.user,
      allConso: req.allConso,
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
  SendReport,
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
  SendReport,
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
  SendReport,
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
  SendReport,
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
  SendReport,
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
  SendReport,
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
  SendReport,
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
  SendReport,
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
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/Establecimientos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReport,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/Vehiculos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/Vehiculos/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReport,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/EventosSaludPublica/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/EventosSaludPublica/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReport,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/TomaMuestras/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/TomaMuestras/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReport,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/EduSanitaria/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/EduSanitaria/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReport,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/ListadoCarnetizados/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/ListadoCarnetizados/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReport,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/AntirrabicaAnimal/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/AntirrabicaAnimal/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReport,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Correccion/Quejas/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Correccion/Quejas/:_id",
  isAuthenticatedProf,
  ValConsolidaciones,
  EditReport,
  (req, res) => {
    res.render("profesional/Visitas/Ver/Correccion/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);

router.get("/evidencia/:id", isAuthenticatedProf, DownloadFile);

router.get("/logout", logout);

export default router;
