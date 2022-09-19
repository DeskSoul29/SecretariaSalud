import { Router } from "express";

import {
  isAuthenticatedCoordinacion,
  fillFields,
  register,
  users,
  deleteUser,
  editUser,
  logout,
  CodigosEstablecimientos,
  hojavidaConsult,
  inscribirEstablecimiento,
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
    res.render("coordinacion/Cuentas/register", {
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
    res.render("coordinacion/Cuentas/register", {
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
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      fields: req.localidades,
      users: req.users,
      deleteU: false,
      editU: false,
    });
  }
);
router.delete(
  "/Cuentas/Usuarios/Delete/:id",
  deleteUser,
  isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      deleteU: req.delete,
    });
  }
);
router.put(
  "/Cuentas/Usuarios/Edit/:id",
  isAuthenticatedCoordinacion,
  users,
  fillFields,
  editUser,
  (req, res) => {
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      users: req.users,
      fields: req.localidades,
      editU: req.edit,
    });
  }
);
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
    res.render("coordinacion/Consolidaciones/Consultar", {
      user: req.user,
    });
  }
);
router.get(
  "/Consolidaciones/ReportesC",
  isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Consolidaciones/Reportes", {
      user: req.user,
    });
  }
);

//Apartado: Hojas de Vida
router.get(
  "/HojaVida/ConsultarHV",
  isAuthenticatedCoordinacion,
  hojavidaConsult,
  (req, res) => {
    res.render("coordinacion/HojaVida/ConsultarHV", {
      user: req.user,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/HojaVida/InscribirHV",
  isAuthenticatedCoordinacion,
  fillFields,
  CodigosEstablecimientos,
  (req, res) => {
    res.render("coordinacion/HojaVida/InscribirHV", {
      user: req.user,
      fields: req.localidades,
      codigos: req.codigos,
    });
  }
);
router.post(
  "/HojaVida/InscribirHV",
  isAuthenticatedCoordinacion,
  inscribirEstablecimiento,
  (req, res) => {
    res.render("coordinacion/HojaVida/InscribirHV", {
      user: req.user,
    });
  }
);

router.get("/logout", logout);

export default router;
