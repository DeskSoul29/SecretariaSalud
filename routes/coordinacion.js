import { Router } from "express";
import moment from "moment";

import {
  fillFields,
  register,
  users,
  deleteUser,
  editUser,
  ChangeImg,
  changePass,
  deleteCons,
  DateInfMen,
  DateCrono,
  SeeCoorConsolidaciones,
  ConsolidaEstadosCoor,
  SendReport,
  SendManyAcept,
  hojavidaConsultAll,
  editHV,
} from "../controllers/coordiController.js";

import {
  isAuthenticatedCoordinacion,
  CodigosEstablecimientos,
  consultUser,
  configConsult,
  HVConsultOne,
  HVConsolid,
  ValConsolidaciones,
  LisViviendas,
  inscribirEstablecimiento,
  DownloadFile,
  DownloadFileTM,
  logout,
} from "../helpers/auth.js";

const router = Router();

router.get(
  "/",
  isAuthenticatedCoordinacion,
  ConsolidaEstadosCoor,
  (req, res) => {
    res.render("coordinacion/main", {
      user: req.user,
      consEnv: req.consEnv,
      consAcep: req.consAcep,
      vacunas: req.vacunas,
      estCon: req.estCon,
      visitAcep: req.visitAcep,
      barChaVisit: req.barChaVisit,
      barChaFav: req.barChaFav,
      barChaDes: req.barChaDes,
      barChaFavRe: req.barChaFavRe,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/changeIMG",
  isAuthenticatedCoordinacion,
  ChangeImg,
  (req, res) => {
    res.render("coordinacion/main", {
      user: req.user,
      consEnv: false,
      consAcep: false,
      vacunas: false,
      estCon: false,
      visitAcep: false,
      barChaVisit: false,
      barChaFav: false,
      barChaDes: false,
      barChaFavRe: false,
      alert: req.alert,
    });
  }
);

// Apartado: Cuentas

//Register
router.get(
  "/Cuentas/Register",
  isAuthenticatedCoordinacion,
  fillFields,
  (req, res) => {
    res.render("coordinacion/Cuentas/register", {
      user: req.user,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.post(
  "/Cuentas/Register",
  isAuthenticatedCoordinacion,
  register,
  (req, res) => {
    res.render("coordinacion/Cuentas/register", {
      user: req.user,
      fields: false,
      alert: req.alert,
    });
  }
);
//Usuarios
router.get(
  "/Cuentas/Usuarios",
  isAuthenticatedCoordinacion,
  users,
  fillFields,
  (req, res) => {
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      users: req.users,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.get(
  "/Cuentas/Usuarios/Edit/:id",
  isAuthenticatedCoordinacion,
  users,
  fillFields,
  consultUser,
  (req, res) => {
    res.render("coordinacion/Cuentas/EditUser", {
      user: req.user,
      fields: req.localidades,
      alert: undefined,
      consultUser: req.consultUser,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/Edit/:id",
  isAuthenticatedCoordinacion,
  editUser,
  (req, res) => {
    res.render("coordinacion/Cuentas/EditUser", {
      user: req.user,
      fields: false,
      consultUser: false,
      alert: req.alert,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/Delete/:id",
  deleteUser,
  isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      users: false,
      fields: false,
      alert: req.alert,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/ChangePass/:id",
  isAuthenticatedCoordinacion,
  changePass,
  (req, res) => {
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      users: false,
      fields: false,
      alert: req.alert,
    });
  }
);

// Apartado: Consolidaciones
router.get(
  "/Consolidaciones/Delete/:id",
  isAuthenticatedCoordinacion,
  deleteCons,
  (req, res) => {
    res.render("coordinacion/Visitas/mainVer", {
      user: req.user,
      allConso: undefined,
      allRechazo: undefined,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Ver",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/mainVer", {
      user: req.user,
      allConso: req.allConso,
      alert: undefined,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Pendiente",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/pendientes", {
      user: req.user,
      allConso: req.allConso,
      alert: undefined,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/NoveAdministrativas",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/nAdmin", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/CronogramaMensual",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/cronogramas", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Establecimientos",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/establecimientos", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Morgues",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/morgues", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Cementerios",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/cementerios", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCRotulado",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/rotulado", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCPublicidad",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/publicidad", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniEstablecimientos",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/medestablecimiento", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniProductos",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/medproducto", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Vehiculos",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/vehiculos", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EventosSaludPublica",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/EventSalPubli", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/TomaMuestras",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/tomamuestras", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EduSanitaria",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/eduSanitaria", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/ListadoCarnetizados",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/listCarnets", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/AntirrabicaAnimal",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/antirrabica", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Quejas",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/quejas", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/ViviendaSaludable",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  LisViviendas,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/vivienSalu", {
      user: req.user,
      allConso: req.allConso,
      ListVivi: req.ListVivi,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/AlertaSanitaria",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/alertSani", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/PermMunicipio",
  isAuthenticatedCoordinacion,
  SeeCoorConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/perMuni", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);

//Consolidaciones - Validar
router.get(
  "/Consolidaciones/UpdateAcept/:tipCons",
  isAuthenticatedCoordinacion,
  SendManyAcept,
  (req, res) => {
    res.render("coordinacion/Visitas/mainVer", {
      user: req.user,
      allConso: false,
      moment: false,
      alert: req.alert,
      allConso: req.allConso,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/NoveAdministrativas/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/nAdmin", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/NoveAdministrativas/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/nAdmin", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/ViviendaSaludable/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/vivienSalu", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/ViviendaSaludable/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/vivienSalu", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/AlertaSanitaria/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/alertSani", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/AlertaSanitaria/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/alertSani", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/PermMunicipio/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/perMuni", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/PermMunicipio/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/perMuni", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/CronogramaMensual/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/cronograma", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/CronogramaMensual/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/cronograma", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/Establecimientos/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/Establecimientos/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/Vehiculos/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/Vehiculos/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/EventosSaludPublica/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/EventosSaludPublica/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/TomaMuestras/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/TomaMuestras/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/EduSanitaria/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/EduSanitaria/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/ListadoCarnetizados/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/ListadoCarnetizados/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/AntirrabicaAnimal/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/AntirrabicaAnimal/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Validar/Quejas/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Validar/Quejas/:_id",
  isAuthenticatedCoordinacion,
  ValConsolidaciones,
  SendReport,
  (req, res) => {
    res.render("coordinacion/Visitas/Ver/Validar/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);

//Apartado: Configuraciones
router.get(
  "/Settings",
  isAuthenticatedCoordinacion,
  configConsult,
  (req, res) => {
    res.render("coordinacion/Settings/mainConfig", {
      user: req.user,
      settings: req.settings,
      alert: undefined,
    });
  }
);
router.post(
  "/Settings/Cronograma/:_id",
  isAuthenticatedCoordinacion,
  configConsult,
  DateCrono,
  (req, res) => {
    res.render("coordinacion/Settings/mainConfig", {
      user: req.user,
      settings: req.settings,
      alert: req.alert,
    });
  }
);
router.post(
  "/Settings/InformeMens/:_id",
  isAuthenticatedCoordinacion,
  configConsult,
  DateInfMen,
  (req, res) => {
    res.render("coordinacion/Settings/mainConfig", {
      user: req.user,
      settings: req.settings,
      alert: req.alert,
    });
  }
);

//Apartado: Hojas de Vida
router.get(
  "/HojaVida/ConsultarHV",
  isAuthenticatedCoordinacion,
  hojavidaConsultAll,
  (req, res) => {
    res.render("coordinacion/HojaVida/ConsultarHV", {
      user: req.user,
      hv: req.hojavida,
    });
  }
);
router.get(
  "/HojaVida/ConsultarHV/View/:id",
  isAuthenticatedCoordinacion,
  HVConsultOne,
  HVConsolid,
  (req, res) => {
    res.render("coordinacion/HojaVida/ViewHV", {
      user: req.user,
      consultHV: req.consultHV,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/HojaVida/ConsultarHV/Edit/:id",
  isAuthenticatedCoordinacion,
  HVConsultOne,
  fillFields,
  CodigosEstablecimientos,
  (req, res) => {
    res.render("coordinacion/HojaVida/EditHV", {
      user: req.user,
      consultHV: req.consultHV,
      fields: req.localidades,
      codigos: req.codigos,
    });
  }
);
router.post(
  "/HojaVida/ConsultarHV/Edit/:id",
  isAuthenticatedCoordinacion,
  editHV,
  (req, res) => {
    res.render("coordinacion/HojaVida/EditHV", {
      user: req.user,
      alert: req.alert,
      consultHV: false,
      fields: false,
      codigos: false,
    });
  }
);
router.get(
  "/HojaVida/InscribirHV",
  isAuthenticatedCoordinacion,
  fillFields,
  CodigosEstablecimientos,
  (req, res) => {
    res.render("coordinacion/HojaVida/InscribirHV", {
      user: req.user,
      fields: req.localidades,
      codigos: req.codigos,
      alert: undefined,
    });
  }
);
router.post(
  "/HojaVida/InscribirHV",
  isAuthenticatedCoordinacion,
  inscribirEstablecimiento,
  (req, res) => {
    res.render("coordinacion/HojaVida/InscribirHV", {
      user: req.user,
      alert: req.alert,
      fields: false,
      codigos: false,
    });
  }
);

router.get("/evidencia/:id", isAuthenticatedCoordinacion, DownloadFile);
router.get("/evidenciaTM/:id", isAuthenticatedCoordinacion, DownloadFileTM);

router.get("/logout", logout);

export default router;
