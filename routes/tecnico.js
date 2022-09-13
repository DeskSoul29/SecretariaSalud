const express = require("express");
const router = express.Router();

const tecnicoController = require("../controllers/tecnicoController");

// Dashboard
router.get("/", tecnicoController.isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/main", { user: req.user });
});

// Apartado: Visitas

// Visitas - Ver
router.get(
  "/Consolidaciones/Ver",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Ver/mainVer", {
      user: req.user,
    });
  }
);

// Visitas - Enviar
router.get(
  "/Consolidaciones/Enviar",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/mainEnviar", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/ESPublica",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/ESPublica", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Establecimientos",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Vehiculos",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Vehiculos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Cementerios",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Cementerios", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Morgues",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Morgues", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/MSEstablecimientos",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/MSProductos",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/MSProductos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/Quejas",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/Quejas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/TomaMuestras",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/TomaMuestras", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/ViviendaSaludable",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/CarnetsBPM",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/CarnetsBPM", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/IVCRotulado",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/IVCRotulado", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/IVCPublicidad",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/IVCPublicidad", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Enviar/EduSanitaria",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Enviar/Consolidaciones/EduSanitaria", {
      user: req.user,
    });
  }
);

router.get("/logout", tecnicoController.logout);

module.exports = router;
