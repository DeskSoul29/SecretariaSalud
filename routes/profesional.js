const express = require("express");
const router = express.Router();

const profController = require("../controllers/profController");

router.get("/", profController.isAuthenticatedProf, (req, res) => {
  res.render("profesional/main", { user: req.user });
});

// Apartado: Usuarios
router.get(
  "/Cuentas/Usuarios",
  profController.isAuthenticatedProf,
  profController.users,
  profController.fillMunicipio,
  (req, res) => {
    res.render("profesional/Cuentas/Usuarios", {
      user: req.user,
      users: req.users,
      fields: req.fields,
      alert: undefined,
    });
  }
);

// router.post(
//   "/Cuentas/Usuarios/ExtraADD",
//   profController.extraADD,
//   profController.isAuthenticatedProf,
//   profController.users,
//   profController.fillMunicipio,
//   (req, res) => {
//     res.render("profesional/Cuentas/Usuarios", {
//       user: req.user,
//       users: req.users,
//       fields: req.fields,
//       alert: req.alert,
//     });
//   }
// );
// router.post(
//   "/Cuentas/Usuarios/ExtraDELETE",
//   profController.ExtraDELETE,
//   profController.isAuthenticatedProf,
//   profController.users,
//   profController.fillMunicipio,
//   (req, res) => {
//     res.render("profesional/Cuentas/Usuarios", {
//       user: req.user,
//       users: req.users,
//       fields: req.fields,
//       alert: req.alert,
//     });
//   }
// );

// Apartado: Consolidaciones
router.get(
  "/Consolidaciones/NAdministrativas",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/NAdministrativas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ESPublica",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/ESPublica", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/Establecimientos",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Vehiculos",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/Vehiculos", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/Cementerios",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/Cementerios", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/Morgues",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/Morgues", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/MSEstablecimientos",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSProductos",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/MSProductos", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/Quejas",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/Quejas", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/TomaMuestras",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/TomaMuestras", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/ViviendaSaludable",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/CarnetsBPM",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/CarnetsBPM", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/IVCRotulado",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/IVCRotulado", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/IVCPublicidad",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/IVCPublicidad", { user: req.user });
  }
);

router.get(
  "/Consolidaciones/EduSanitaria",
  profController.isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/EduSanitaria", { user: req.user });
  }
);

router.get("/logout", profController.logout);

module.exports = router;
