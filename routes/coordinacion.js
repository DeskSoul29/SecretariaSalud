import { Router } from "express";

import {
  fillFields,
  register,
  users,
  deleteUser,
  editUser,
  changePass,
  hojavidaConsultAll,
  HVConsultOne,
  editHV,
} from "../controllers/coordiController.js";

import {
  isAuthenticatedCoordinacion,
  CodigosEstablecimientos,
  consultUser,
  inscribirEstablecimiento,
  logout,
} from "../helpers/auth.js";

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
      consultUser: req.consultUser,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/Edit/:id",
  isAuthenticatedCoordinacion,
  editUser,
  (req, res) => {
    res.render("coordinacion/Cuentas/EditUser", {
      user: req.user,
      fields: false,
      consultUser: false,
      alert: req.alert,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/Delete/:id",
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
router.post(
  "/Cuentas/Usuarios/ChangePass/:id",
  isAuthenticatedCoordinacion,
  changePass,
  (req, res) => {
    res.render("coordinacion/Cuentas/usuarios", {
      user: req.user,
      users: false,
      fields: false,
      alert: req.alert,
    });
  }
);

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
router.post(
  "/HojaVida/ConsultarHV/Edit/:id",
  isAuthenticatedCoordinacion,
  editHV,
  (req, res) => {
    res.render("coordinacion/HojaVida/EditHV", {
      user: req.user,
      alert: req.alert,
      consultHV: false,
      fields: false,
      codigos: false,
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
