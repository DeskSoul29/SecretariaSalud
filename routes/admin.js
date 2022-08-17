const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.isAuthenticatedAdmin, (req, res) => {
  res.render("admin/main", { user: req.user });
});

// Apartado: Cuentas
router.get(
  "/Cuentas/Register",
  adminController.isAuthenticatedAdmin,
  adminController.fillFields,
  (req, res) => {
    res.render("admin/Cuentas/register", {
      alert: false,
      user: req.user,
      fields: req.field,
    });
  }
);

router.get(
  "/Cuentas/Usuarios",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Cuentas/usuarios", {
      user: req.user,
    });
  }
);

// Apartado: Consolidaciones
router.get(
  "/Consolidaciones/NAdministrativas",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/NAdministrativas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ESPublica",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/ESPublica", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Establecimientos",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Vehiculos",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/Vehiculos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Cementerios",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/Cementerios", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Morgues",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/Morgues", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSEstablecimientos",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSProductos",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/MSProductos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Quejas",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/Quejas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/TomaMuestras",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/TomaMuestras", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ViviendaSaludable",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/CarnetsBPM",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/CarnetsBPM", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/IVCRotulado",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/IVCRotulado", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/IVCPublicidad",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/IVCPublicidad", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/EduSanitaria",
  adminController.isAuthenticatedAdmin,
  (req, res) => {
    res.render("admin/Consolidaciones/EduSanitaria", {
      user: req.user,
    });
  }
);

router.post("/Cuentas/register", adminController.register);
router.get("/logout", adminController.logout);

module.exports = router;
