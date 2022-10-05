import { Router } from "express";

import {
  hojavidaConsultAllTec,
  SendEstablecimiento,
  SendEventSaludPubli,
  SeeEventSaludPubli,
  SendQuejas,
  SendAntirrabica,
  SendCarnetizados,
  SendEduSanitaria,
  SendVehiculos,
  SendTomaMuestra,
} from "../controllers/tecnicoController.js";

import {
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  inscribirEstablecimiento,
  logout,
} from "../helpers/auth.js";

const router = Router();

// Dashboard
router.get("/", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/main", { user: req.user });
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
