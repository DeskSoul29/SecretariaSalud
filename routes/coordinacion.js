import { Router } from "express";

import {
  isAuthenticatedCoordinacion,
  fillFields,
  register,
  users,
  deleteUser,
  editUser,
  consultUser,
  logout,
  CodigosEstablecimientos,
  hojavidaConsultAll,
  inscribirEstablecimiento,
  HVConsultOne,
  editHV,
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
      alert: undefined,
    });
  }
);
router.post(
  "/Cuentas/Register",
  isAuthenticatedCoordinacion,
  register,
  (req, res) => {
    res.render("coordinacion/Cuentas/register", {
      user: req.user,
      fields: false,
      alert: req.alert,
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
      users: req.users,
      fields: req.localidades,
      alert: undefined,
    });
  }
);
router.get(
  "/Cuentas/Usuarios/Edit/:id",
  isAuthenticatedCoordinacion,
  users,
  fillFields,
  consultUser,
  (req, res) => {
    res.render("coordinacion/Cuentas/EditUser", {
      user: req.user,
      fields: req.localidades,
      alert: undefined,
      editUser: req.editUser,
    });
  }
);

router.post(
  "/Cuentas/Usuarios/Delete",
  deleteUser,
  isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      users: false,
      fields: false,
      alert: req.alert,
    });
  }
);
// router.post(
//   "/Cuentas/Usuarios/Edit",
//   isAuthenticatedCoordinacion,
//   users,
//   fillFields,
//   editUser,
//   (req, res) => {
//     res.render("coordinacion/Cuentas/usuarios", {
//       user: req.user,
//       users: false,
//       fields: false,
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
  hojavidaConsultAll,
  (req, res) => {
    res.render("coordinacion/HojaVida/ConsultarHV", {
      user: req.user,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/HojaVida/ConsultarHV/Edit/:id",
  isAuthenticatedCoordinacion,
  HVConsultOne,
  fillFields,
  CodigosEstablecimientos,
  (req, res) => {
    res.render("coordinacion/HojaVida/EditHV", {
      user: req.user,
      consultHV: req.consultHV,
      fields: req.localidades,
      codigos: req.codigos,
    });
  }
);
router.put("/coordinacion/HojaVida/ConsultarHV/Edit-HV/:id", editHV);
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
      alert: undefined,
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
      alert: req.alert,
      fields: false,
      codigos: false,
    });
  }
);

router.get("/logout", logout);

export default router;
