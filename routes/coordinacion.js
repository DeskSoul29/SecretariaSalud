const express = require("express");
const router = express.Router();

const coordinacionController = require("../controllers/coordiController");

router.get(
  "/",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("Coordinacion/main", { user: req.user });
  }
);

// Apartado: Cuentas

//Register
router.get(
  "/Cuentas/Register",
  coordinacionController.isAuthenticatedCoordinacion,
  coordinacionController.fillFields,
  (req, res) => {
    res.render("Coordinacion/Cuentas/register", {
      user: req.user,
      fields: req.field,
      alert: false,
    });
  }
);
router.post(
  "/Cuentas/Register",
  coordinacionController.isAuthenticatedCoordinacion,
  coordinacionController.register,
  (req, res) => {
    res.render("Coordinacion/Cuentas/Register", {
      user: req.user,
      fields: false,
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
    res.render("Coordinacion/Cuentas/usuarios", {
      user: req.user,
      users: req.users,
      fields: req.field,
      alert: undefined,
    });
  }
);
// router.post(
//   "/Cuentas/Usuarios/Delete",
//   coordinacionController.deleteUser,
//   coordinacionController.isAuthenticatedCoordinacion,
//   coordinacionController.users,
//   coordinacionController.fillFields,
//   (req, res) => {
//     res.render("Coordinacion/Cuentas/Register", {
//       user: req.user,
//     });
//   }
// );
// router.post(
//   "/Cuentas/Usuarios/Edit",
//   coordinacionController.isAuthenticatedCoordinacion,
//   coordinacionController.users,
//   coordinacionController.fillFields,
//   coordinacionController.editUser,
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
//   coordinacionController.isAuthenticatedCoordinacion,
//   coordinacionController.users,
//   coordinacionController.fillFields,
//   coordinacionController.extraADD,
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
//   coordinacionController.isAuthenticatedCoordinacion,
//   coordinacionController.users,
//   coordinacionController.fillFields,
//   coordinacionController.extraDELETE,
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
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("Coordinacion/Consolidaciones/Consultar", {
      user: req.user,
    });
  }
);
router.get(
  "/Consolidaciones/ReportesC",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("Coordinacion/Consolidaciones/Reportes", {
      user: req.user,
    });
  }
);

//Apartado: Hojas de Vida
router.get(
  "/HojaVida/ConsultarHV",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("Coordinacion/HojaVida/ConsultarHV", {
      user: req.user,
    });
  }
);
router.get(
  "/HojaVida/InscribirHV",
  coordinacionController.isAuthenticatedCoordinacion,
  (req, res) => {
    res.render("Coordinacion/HojaVida/InscribirHV", {
      user: req.user,
    });
  }
);

router.get("/logout", coordinacionController.logout);

module.exports = router;
