import { Router } from "express";

import {} from "../controllers/tecnicoController.js";
import { isAuthenticatedTecnic, logout } from "../helpers/auth.js";

const router = Router();
// Dashboard
router.get("/", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/main", { user: req.user });
});

// Apartado: Visitas

// Visitas - Ver
router.get("/Consolidaciones/Ver", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/Visitas/Ver/mainVer", {
    user: req.user,
  });
});

// Visitas - Enviar
router.get("/Consolidaciones/Enviar", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/Visitas/Enviar/mainEnviar", {
    user: req.user,
  });
});

router.get(
  "/Consolidaciones/Enviar/ESPublica",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/ESPublica", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Establecimientos",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Vehiculos",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Vehiculos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Cementerios",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Cementerios", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Morgues",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Morgues", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/MSEstablecimientos",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/MSProductos",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/MSProductos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Quejas",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Quejas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/TomaMuestras",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/TomaMuestras", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/ViviendaSaludable",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/CarnetsBPM",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/CarnetsBPM", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/IVCRotulado",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/IVCRotulado", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/IVCPublicidad",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/IVCPublicidad", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/EduSanitaria",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/EduSanitaria", {
      user: req.user,
    });
  }
);

router.get("/logout", logout);

export default router;
