import { Router } from "express";
import { users, fillMunicipio } from "../controllers/profController.js";
import { isAuthenticatedProf, logout } from "../helpers/auth.js";

const router = Router();

router.get("/", isAuthenticatedProf, (req, res) => {
  res.render("profesional/main", { user: req.user });
});

// Apartado: Usuarios
router.get(
  "/Cuentas/Usuarios",
  isAuthenticatedProf,
  users,
  fillMunicipio,
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
//   extraADD,
//   isAuthenticatedProf,
//   users,
//   fillMunicipio,
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
//   ExtraDELETE,
//   isAuthenticatedProf,
//   users,
//   fillMunicipio,
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
  isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/NAdministrativas", {
      user: req.user,
    });
  }
);

router.get("/Consolidaciones/ESPublica", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/ESPublica", { user: req.user });
});

router.get(
  "/Consolidaciones/Establecimientos",
  isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/Establecimientos", {
      user: req.user,
    });
  }
);

router.get("/Consolidaciones/Vehiculos", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/Vehiculos", { user: req.user });
});

router.get("/Consolidaciones/Cementerios", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/Cementerios", { user: req.user });
});

router.get("/Consolidaciones/Morgues", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/Morgues", { user: req.user });
});

router.get(
  "/Consolidaciones/MSEstablecimientos",
  isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/MSEstablecimientos", {
      user: req.user,
    });
  }
);

router.get("/Consolidaciones/MSProductos", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/MSProductos", { user: req.user });
});

router.get("/Consolidaciones/Quejas", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/Quejas", { user: req.user });
});

router.get("/Consolidaciones/TomaMuestras", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/TomaMuestras", { user: req.user });
});

router.get(
  "/Consolidaciones/ViviendaSaludable",
  isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/ViviendaSaludable", {
      user: req.user,
    });
  }
);

router.get("/Consolidaciones/CarnetsBPM", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/CarnetsBPM", { user: req.user });
});

router.get("/Consolidaciones/IVCRotulado", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/IVCRotulado", { user: req.user });
});

router.get(
  "/Consolidaciones/IVCPublicidad",
  isAuthenticatedProf,
  (req, res) => {
    res.render("profesional/Consolidaciones/IVCPublicidad", { user: req.user });
  }
);

router.get("/Consolidaciones/EduSanitaria", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Consolidaciones/EduSanitaria", { user: req.user });
});

router.get("/logout", logout);

export default router;
