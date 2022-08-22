const express = require("express");
const router = express.Router();

const visitController = require("../controllers/visitController");

router.get("/", visitController.isAuthenticatedVisit, (req, res) => {
  res.render("visitante/main", { user: req.user });
});

// Apartado: Consolidaciones
router.get(
  "/Consolidaciones/NAdministrativas",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/NAdministrativas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ESPublica",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/ESPublica", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Establecimientos",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Vehiculos",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/Vehiculos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Cementerios",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/Cementerios", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Morgues",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/Morgues", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSEstablecimientos",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSProductos",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/MSProductos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Quejas",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/Quejas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/TomaMuestras",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/TomaMuestras", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ViviendaSaludable",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/CarnetsBPM",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/CarnetsBPM", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/IVCRotulado",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/IVCRotulado", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/IVCPublicidad",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/IVCPublicidad", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/EduSanitaria",
  visitController.isAuthenticatedVisit,
  (req, res) => {
    res.render("visitante/Consolidaciones/EduSanitaria", {
      user: req.user,
    });
  }
);

router.get("/logout", visitController.logout);

module.exports = router;
