const express = require("express");
const router = express.Router();

const moderController = require("../controllers/moderController");

router.get("/", moderController.isAuthenticatedModer, (req, res) => {
  res.render("moderador/main", { user: req.user });
});

// Apartado: Cuentas
router.get(
  "/cuentas/Register",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Cuentas/register", {
      alert: false,
      user: req.user,
    });
  }
);

router.get(
  "/cuentas/Usuarios",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Cuentas/Usuarios", {
      user: req.user,
    });
  }
);

// Apartado: Consolidaciones
router.get(
  "/consolidaciones/NAdministrativas",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/NAdministrativas", {
      user: req.user,
    });
  }
);

router.get(
  "/consolidaciones/ESPublica",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/ESPublica", { user: req.user });
  }
);

router.get(
  "/consolidaciones/Establecimientos",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/consolidaciones/Vehiculos",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Vehiculos", { user: req.user });
  }
);

router.get(
  "/consolidaciones/Cementerios",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Cementerios", { user: req.user });
  }
);

router.get(
  "/consolidaciones/Morgues",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Morgues", { user: req.user });
  }
);

router.get(
  "/consolidaciones/MSEstablecimientos",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/consolidaciones/MSProductos",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/MSProductos", { user: req.user });
  }
);

router.get(
  "/consolidaciones/Quejas",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Quejas", { user: req.user });
  }
);

router.get(
  "/consolidaciones/TomaMuestras",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/TomaMuestras", { user: req.user });
  }
);

router.get(
  "/consolidaciones/ViviendaSaludable",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/consolidaciones/CarnetsBPM",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/CarnetsBPM", { user: req.user });
  }
);

router.get(
  "/consolidaciones/IVCRotulado",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/IVCRotulado", { user: req.user });
  }
);

router.get(
  "/consolidaciones/IVCPublicidad",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/IVCPublicidad", { user: req.user });
  }
);

router.get(
  "/consolidaciones/EduSanitaria",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/EduSanitaria", { user: req.user });
  }
);

router.post("moderador/Cuentas/register", moderController.register);
router.get("/logout", moderController.logout);

module.exports = router;
