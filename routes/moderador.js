const express = require("express");
const router = express.Router();

const moderController = require("../controllers/moderController");

router.get("/", moderController.isAuthenticatedModer, (req, res) => {
  res.render("moderador/main", { user: req.user });
});

// Apartado: Cuentas

// Register
router.get(
  "/Cuentas/Register",
  moderController.isAuthenticatedModer,
  moderController.fillMunicipio,
  (req, res) => {
    res.render("moderador/Cuentas/register", {
      alert: undefined,
      user: req.user,
      fields: req.fields,
    });
  }
);
router.post(
  "/Cuentas/Register",
  moderController.register,
  moderController.fillMunicipio,
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Cuentas/Register", {
      alert: req.alert,
      fields: req.fields,
      user: req.user,
    });
  }
);

// Usuarios
router.get(
  "/Cuentas/Usuarios",
  moderController.isAuthenticatedModer,
  moderController.users,
  moderController.fillMunicipio,
  (req, res) => {
    res.render("moderador/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.fields,
      alert: undefined,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/Delete",
  moderController.deleteUser,
  moderController.isAuthenticatedModer,
  moderController.users,
  moderController.fillMunicipio,
  (req, res) => {
    res.render("moderador/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.fields,
      alert: req.alert,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/Edit",
  moderController.editUser,
  moderController.isAuthenticatedModer,
  moderController.users,
  moderController.fillMunicipio,
  (req, res) => {
    res.render("moderador/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.fields,
      alert: req.alert,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/ExtraADD",
  moderController.extraADD,
  moderController.isAuthenticatedModer,
  moderController.users,
  moderController.fillMunicipio,
  (req, res) => {
    res.render("moderador/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.fields,
      alert: req.alert,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/ExtraDELETE",
  moderController.ExtraDELETE,
  moderController.isAuthenticatedModer,
  moderController.users,
  moderController.fillMunicipio,
  (req, res) => {
    res.render("moderador/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.fields,
      alert: req.alert,
    });
  }
);

// Apartado: Consolidaciones
router.get(
  "/Consolidaciones/NAdministrativas",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/NAdministrativas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ESPublica",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/ESPublica", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/Establecimientos",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Vehiculos",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Vehiculos", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/Cementerios",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Cementerios", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/Morgues",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Morgues", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/MSEstablecimientos",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSProductos",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/MSProductos", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/Quejas",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/Quejas", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/TomaMuestras",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/TomaMuestras", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/ViviendaSaludable",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/CarnetsBPM",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/CarnetsBPM", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/IVCRotulado",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/IVCRotulado", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/IVCPublicidad",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/IVCPublicidad", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/EduSanitaria",
  moderController.isAuthenticatedModer,
  (req, res) => {
    res.render("moderador/Consolidaciones/EduSanitaria", { user: req.user });
  }
);

router.get("/logout", moderController.logout);

module.exports = router;
