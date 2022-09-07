const express = require("express");
const router = express.Router();

const coordinacionController = require("../controllers/coordiController");

router.get(
  "/",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/main", { user: req.user });
  }
);

// Apartado: Cuentas

//Register
router.get(
  "/Cuentas/Register",
  coordinacionController.isAuthenticatedCoordinacion,
  coordinacionController.fillFields,
  (req, res) => {
    res.render("coordinacion/Cuentas/register", {
      user: req.user,
      fields: req.field,
      alert: undefined,
    });
  }
);
router.post(
  "/Cuentas/Register",
  coordinacionController.register,
  coordinacionController.fillFields,
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Cuentas/Register", {
      alert: req.alert,
      fields: req.field,
      user: req.user,
    });
  }
);

//Usuarios
router.get(
  "/Cuentas/Usuarios",
  coordinacionController.isAuthenticatedCoordinacion,
  coordinacionController.users,
  coordinacionController.fillFields,
  (req, res) => {
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      users: req.users,
      fields: req.field,
      alert: undefined,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/Delete",
  coordinacionController.deleteUser,
  coordinacionController.isAuthenticatedCoordinacion,
  coordinacionController.users,
  coordinacionController.fillFields,
  (req, res) => {
    res.render("coordinacion/Cuentas/Usuarios", {
      alert: req.alert,
      user: req.user,
      users: req.users,
      fields: req.field,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/Edit",
  coordinacionController.isAuthenticatedCoordinacion,
  coordinacionController.users,
  coordinacionController.fillFields,
  coordinacionController.editUser,
  (req, res) => {
    res.render("coordinacion/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.field,
      alert: req.alert,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/ExtraADD",
  coordinacionController.isAuthenticatedCoordinacion,
  coordinacionController.users,
  coordinacionController.fillFields,
  coordinacionController.extraADD,
  (req, res) => {
    res.render("coordinacion/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.field,
      alert: req.alert,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/ExtraDELETE",
  coordinacionController.isAuthenticatedCoordinacion,
  coordinacionController.users,
  coordinacionController.fillFields,
  coordinacionController.extraDELETE,
  (req, res) => {
    res.render("coordinacion/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.field,
      alert: req.alert,
    });
  }
);

// Apartado: Consolidaciones
router.get(
  "/Consolidaciones/NAdministrativas",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/NAdministrativas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ESPublica",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/ESPublica", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Establecimientos",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Vehiculos",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/Vehiculos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Cementerios",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/Cementerios", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Morgues",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/Morgues", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSEstablecimientos",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSProductos",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/MSProductos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Quejas",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/Quejas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/TomaMuestras",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/TomaMuestras", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ViviendaSaludable",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/CarnetsBPM",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/CarnetsBPM", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/IVCRotulado",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/IVCRotulado", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/IVCPublicidad",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/IVCPublicidad", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/EduSanitaria",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/EduSanitaria", {
      user: req.user,
    });
  }
);

router.get("/logout", coordinacionController.logout);

module.exports = router;
