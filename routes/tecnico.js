import { Router } from "express";
import moment from "moment";

import {
  ConsolidaEnviadas,
  hojavidaConsultAllTec,
  SendEstablecimiento,
  SeeEstablecimiento,
  SeeMorgues,
  SeeCementerios,
  SeeEstaRotulado,
  SeeEstaPublicidad,
  SeeMedEstable,
  SeeMedProduct,
  SendEventSaludPubli,
  SeeEventSaludPubli,
  SendQuejas,
  SeeQuejas,
  SendAntirrabica,
  SeeAntirrabica,
  SendCarnetizados,
  SeeCarnetizados,
  SendEduSanitaria,
  SeeEduSanitaria,
  SendVehiculos,
  SeeVehiculos,
  SendTomaMuestra,
  SeeTomaMuestra,
} from "../controllers/tecnicoController.js";

import {
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  inscribirEstablecimiento,
  logout,
} from "../helpers/auth.js";

const router = Router();

// Dashboard
router.get("/", isAuthenticatedTecnic, ConsolidaEnviadas, (req, res) => {
  res.render("tecnico/main", { user: req.user, consEnv: req.consEnv });
});

// Apartado: Consolidaciones
router.get("/Consolidaciones/Ver", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/Visitas/mainVer", {
    user: req.user,
  });
});
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
  SendEstablecimiento,
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
  "/Consolidaciones/Ver/Establecimientos",
  isAuthenticatedTecnic,
  SeeEstablecimiento,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/establecimientos", {
      user: req.user,
      Estable: req.consultEstable,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Morgues",
  isAuthenticatedTecnic,
  SeeMorgues,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/morgues", {
      user: req.user,
      morgues: req.morgues,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Cementerios",
  isAuthenticatedTecnic,
  SeeCementerios,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/cementerios", {
      user: req.user,
      cementerio: req.consultCementerios,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCRotulado",
  isAuthenticatedTecnic,
  SeeEstaRotulado,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/rotulado", {
      user: req.user,
      rotulado: req.consultRotulado,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCPublicidad",
  isAuthenticatedTecnic,
  SeeEstaPublicidad,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/publicidad", {
      user: req.user,
      publicidad: req.consultPublicidad,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniEstablecimientos",
  isAuthenticatedTecnic,
  SeeMedEstable,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/medestablecimiento", {
      user: req.user,
      medEstable: req.consultMedEstable,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniProductos",
  isAuthenticatedTecnic,
  SeeMedProduct,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/medproducto", {
      user: req.user,
      medProduc: req.consultMedProduct,
      moment: moment,
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
  SendVehiculos,
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
  "/Consolidaciones/Ver/Vehiculos",
  isAuthenticatedTecnic,
  SeeVehiculos,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/vehiculos", {
      user: req.user,
      Vehiculo: req.consultVehiculos,
      moment: moment,
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
  SendEventSaludPubli,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/eventSaludPublic", {
      user: req.user,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EventosSaludPublica",
  isAuthenticatedTecnic,
  SeeEventSaludPubli,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/EventSalPubli", {
      user: req.user,
      consultES: req.consultES,
      moment: moment,
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
  SendTomaMuestra,
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
  "/Consolidaciones/Ver/TomaMuestras",
  isAuthenticatedTecnic,
  SeeTomaMuestra,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/tomamuestras", {
      user: req.user,
      TomaM: req.consultTomaM,
      moment: moment,
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
  SendEduSanitaria,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/eduSanitaria", {
      user: req.user,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EduSanitaria",
  isAuthenticatedTecnic,
  SeeEduSanitaria,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/eduSanitaria", {
      user: req.user,
      EduSani: req.consultEdusani,
      moment: moment,
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
  SendCarnetizados,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/listCarnets", {
      user: req.user,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/ListadoCarnetizados",
  isAuthenticatedTecnic,
  SeeCarnetizados,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/listCarnets", {
      user: req.user,
      Carnetiz: req.consultCarnetiz,
      moment: moment,
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
  SendAntirrabica,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/antirrabica", {
      user: req.user,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/AntirrabicaAnimal",
  isAuthenticatedTecnic,
  SeeAntirrabica,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/antirrabica", {
      user: req.user,
      Antirrabi: req.consultAntirrabi,
      moment: moment,
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
  SendQuejas,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/quejas", {
      user: req.user,
      codigos: null,
      hojavida: null,
      alert: req.alert,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Quejas",
  isAuthenticatedTecnic,
  SeeQuejas,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/quejas", {
      user: req.user,
      Queja: req.consultQueja,
      moment: moment,
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

router.get("/logout", logout);

export default router;
