const express = require("express");
const router = express.Router();

const tecnicoController = require("../controllers/tecnicoController");

router.get("/", tecnicoController.isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/main", { user: req.user });
});

// Apartado: Consolidaciones
router.get(
  "/Consolidaciones/ESPublica",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/ESPublica", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Establecimientos",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Vehiculos",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/Vehiculos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Cementerios",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/Cementerios", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Morgues",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/Morgues", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSEstablecimientos",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/MSProductos",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/MSProductos", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/Quejas",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/Quejas", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/TomaMuestras",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/TomaMuestras", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/ViviendaSaludable",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/CarnetsBPM",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/CarnetsBPM", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/IVCRotulado",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/IVCRotulado", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/IVCPublicidad",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/IVCPublicidad", {
      user: req.user,
    });
  }
);

router.get(
  "/Consolidaciones/EduSanitaria",
  tecnicoController.isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Consolidaciones/EduSanitaria", {
      user: req.user,
    });
  }
);

router.get("/logout", tecnicoController.logout);

module.exports = router;
