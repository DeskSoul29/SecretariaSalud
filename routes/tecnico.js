import { Router } from "express";
import moment from "moment";

import {
  ConsolidaEstados,
  SeeTecConsolidaciones,
  LisConsolidaRechazadas,
  hojavidaConsultAllTec,
  EditConsolidacionRech,
  UploadCronograma,
  SendConsolidacion,
} from "../controllers/tecnicoController.js";

import {
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  inscribirEstablecimiento,
  ValConsolidaciones,
  DownloadFile,
  logout,
} from "../helpers/auth.js";

const router = Router();

// Dashboard
router.get(
  "/",
  isAuthenticatedTecnic,
  ConsolidaEstados,
  LisConsolidaRechazadas,
  (req, res) => {
    res.render("tecnico/main", {
      user: req.user,
      consPend: req.consPend,
      consCorre: req.consCorre,
      consEnv: req.consEnv,
      consAcep: req.consAcep,
      ListconsRech: req.ListconsRech,
      visitAcep: req.visitAcep,
      vacunasExtra1: req.vacunasExtra1,
      vacunasExtra2: req.vacunasExtra2,
      vacunasExtra3: req.vacunasExtra3,
      vacunas: req.vacunas,
      moment: moment,
      alert: undefined,
    });
  }
);
// Dashboad - Cronograma
router.post(
  "/Consolidaciones/Cronograma/:user",
  isAuthenticatedTecnic,
  UploadCronograma,
  (req, res) => {
    res.render("tecnico/main", {
      user: req.user,
      consPend: false,
      consCorre: false,
      consEnv: false,
      consAcep: false,
      ListconsRech: false,
      visitAcep: false,
      vacunasExtra1: false,
      vacunasExtra2: false,
      vacunasExtra3: false,
      vacunas: false,
      moment: false,
      alert: req.alert,
    });
  }
);

// Apartado: Consolidaciones

//Consolidaciones - Ver
router.get(
  "/Consolidaciones/Ver",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/mainVer", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Establecimientos",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/establecimientos", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Morgues",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/morgues", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Cementerios",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/cementerios", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCRotulado",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/rotulado", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCPublicidad",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/publicidad", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniEstablecimientos",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/medestablecimiento", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniProductos",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/medproducto", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Vehiculos",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/vehiculos", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EventosSaludPublica",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/EventSalPubli", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/TomaMuestras",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/tomamuestras", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EduSanitaria",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/eduSanitaria", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/ListadoCarnetizados",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/listCarnets", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/AntirrabicaAnimal",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/antirrabica", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Quejas",
  isAuthenticatedTecnic,
  SeeTecConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/quejas", {
      user: req.user,
      allConso: req.allConso,
      moment: moment,
    });
  }
);

//Consolidaciones - Enviar
router.get("/Consolidaciones/Enviar", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/Visitas/mainEnviar", {
    user: req.user,
  });
});
router.get(
  "/Consolidaciones/Enviar/Establecimientos",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/establecimientos", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/Establecimientos/:user",
  isAuthenticatedTecnic,
  SendConsolidacion,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/establecimientos", {
      user: req.user,
      codigos: null,
      hojavida: null,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/Vehiculos",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/vehiculos", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/Vehiculos/:user",
  isAuthenticatedTecnic,
  SendConsolidacion,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/vehiculos", {
      user: req.user,
      codigos: null,
      hojavida: null,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/EventosSaludPublica",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/eventSaludPublic", {
      user: req.user,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/EventosSaludPublica/:user",
  isAuthenticatedTecnic,
  SendConsolidacion,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/eventSaludPublic", {
      user: req.user,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/TomaMuestras",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/tomamuestras", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/TomaMuestras/:user",
  isAuthenticatedTecnic,
  SendConsolidacion,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/tomamuestras", {
      user: req.user,
      codigos: null,
      hojavida: null,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/EduSanitaria",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/eduSanitaria", {
      user: req.user,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/EduSanitaria/:user",
  isAuthenticatedTecnic,
  SendConsolidacion,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/eduSanitaria", {
      user: req.user,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/ListadoCarnetizados",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/listCarnets", {
      user: req.user,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/ListadoCarnetizados/:user",
  isAuthenticatedTecnic,
  SendConsolidacion,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/listCarnets", {
      user: req.user,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/AntirrabicaAnimal",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/antirrabica", {
      user: req.user,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/AntirrabicaAnimal/:user",
  isAuthenticatedTecnic,
  SendConsolidacion,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/antirrabica", {
      user: req.user,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/Quejas",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/quejas", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Enviar/Quejas/:user",
  isAuthenticatedTecnic,
  SendConsolidacion,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/quejas", {
      user: req.user,
      codigos: null,
      hojavida: null,
      alert: req.alert,
    });
  }
);

//Consolidaciones - Rechazos
router.get(
  "/Consolidaciones/Rechazado/Establecimientos/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/Establecimientos/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/establecimientos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/AntirrabicaAnimal/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/AntirrabicaAnimal/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/antirrabica", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/ListadoCarnetizados/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/ListadoCarnetizados/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/listCarnets", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/EduSanitaria/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/EduSanitaria/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/eduSanitaria", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/TomaMuestras/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: undefined,
      moment: moment,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/TomaMuestras/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/tomamuestras", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/EventosSaludPublica/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/EventosSaludPublica/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/eventSaludPublic", {
      user: req.user,
      consolidacion: req.consolidacion,
      alert: req.alert,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/Vehiculos/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/Vehiculos/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/vehiculos", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Rechazado/Quejas/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: undefined,
    });
  }
);
router.post(
  "/Consolidaciones/Rechazado/Quejas/:_id",
  isAuthenticatedTecnic,
  ValConsolidaciones,
  EditConsolidacionRech,
  (req, res) => {
    res.render("tecnico/Visitas/Rechazado/quejas", {
      user: req.user,
      consolidacion: req.consolidacion,
      moment: moment,
      alert: req.alert,
    });
  }
);

//Apartado: Hojas de Vida
router.get(
  "/HojaVida/ConsultarHV",
  isAuthenticatedTecnic,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/HojaVida/ConsultarHVTec", {
      user: req.user,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/HojaVida/InscribirHV",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  (req, res) => {
    res.render("tecnico/HojaVida/InscribirHVTec", {
      user: req.user,
      codigos: req.codigos,
      alert: undefined,
    });
  }
);
router.post(
  "/HojaVida/InscribirHV",
  isAuthenticatedTecnic,
  inscribirEstablecimiento,
  (req, res) => {
    res.render("tecnico/HojaVida/InscribirHVTec", {
      user: req.user,
      alert: req.alert,
      codigos: false,
    });
  }
);

router.get("/evidencia/:id", isAuthenticatedTecnic, DownloadFile);

router.get("/logout", logout);

export default router;
