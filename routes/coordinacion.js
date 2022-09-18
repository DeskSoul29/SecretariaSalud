import { Router } from "express";

import {
  isAuthenticatedCoordinacion,
  fillFields,
  register,
  users,
  logout,
} from "../controllers/coordiController.js";

const router = Router();

router.get("/", isAuthenticatedCoordinacion, (req, res) => {
  res.render("coordinacion/main", { user: req.user });
});

// Apartado: Cuentas

//Register
router.get(
  "/Cuentas/Register",
  isAuthenticatedCoordinacion,
  fillFields,
  (req, res) => {
    res.render("Coordinacion/Cuentas/register", {
      user: req.user,
      fields: req.localidades,
      results: false,
    });
  }
);
router.post(
  "/Cuentas/Register",
  isAuthenticatedCoordinacion,
  register,
  fillFields,
  (req, res) => {
    res.render("Coordinacion/Cuentas/Register", {
      user: req.user,
      fields: req.localidades,
      results: req.register,
    });
  }
);
//Usuarios
router.get(
  "/Cuentas/Usuarios",
  isAuthenticatedCoordinacion,
  users,
  fillFields,
  (req, res) => {
    res.render("Coordinacion/Cuentas/usuarios", {
      user: req.user,
      fields: req.localidades,
      users: req.users,
    });
  }
);
// router.post(
//   "/Cuentas/Usuarios/Delete",
//   deleteUser,
//   isAuthenticatedCoordinacion,
//   users,
//   fillFields,
//   (req, res) => {
//     res.render("Coordinacion/Cuentas/Register", {
//       user: req.user,
//     });
//   }
// );
// router.post(
//   "/Cuentas/Usuarios/Edit",
//   isAuthenticatedCoordinacion,
//   users,
//   fillFields,
//   editUser,
//   (req, res) => {
//     res.render("Coordinacion/Cuentas/Usuarios", {
//       user: req.user,
//       users: req.users,
//       fields: req.field,
//       alert: req.alert,
//     });
//   }
// );
// router.post(
//   "/Cuentas/Usuarios/ExtraADD",
//   isAuthenticatedCoordinacion,
//   users,
//   fillFields,
//   extraADD,
//   (req, res) => {
//     res.render("Coordinacion/Cuentas/Usuarios", {
//       user: req.user,
//       users: req.users,
//       fields: req.field,
//       alert: req.alert,
//     });
//   }
// );
// router.post(
//   "/Cuentas/Usuarios/ExtraDELETE",
//   isAuthenticatedCoordinacion,
//   users,
//   fillFields,
//   extraDELETE,
//   (req, res) => {
//     res.render("Coordinacion/Cuentas/Usuarios", {
//       user: req.user,
//       users: req.users,
//       fields: req.field,
//       alert: req.alert,
//     });
//   }
// );

// Apartado: Consolidaciones
router.get(
  "/Consolidaciones/ConsultarC",
  isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("Coordinacion/Consolidaciones/Consultar", {
      user: req.user,
    });
  }
);
router.get(
  "/Consolidaciones/ReportesC",
  isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("Coordinacion/Consolidaciones/Reportes", {
      user: req.user,
    });
  }
);

//Apartado: Hojas de Vida
router.get("/HojaVida/ConsultarHV", isAuthenticatedCoordinacion, (req, res) => {
  res.render("Coordinacion/HojaVida/ConsultarHV", {
    user: req.user,
  });
});
router.get("/HojaVida/InscribirHV", isAuthenticatedCoordinacion, (req, res) => {
  res.render("Coordinacion/HojaVida/InscribirHV", {
    user: req.user,
  });
});

router.get("/logout", logout);

export default router;
