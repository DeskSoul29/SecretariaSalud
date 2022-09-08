const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { promisify } = require("util");

var login = require("../models/user");
var localidades = require("../models/localidades");

var profesionalController = {};

// Apartado: Cuentas - Usuarios
profesionalController.fillMunicipio = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    login
      .find({ provincia: { $eq: decodificada.provincia } }, { municipio: 1 })
      .exec(async (err, result) => {
        if (err) throw err;
        req.fields = result;
        return next();
      });
  } catch (error) {
    console.log(error);
    return next();
  }
};

// exports.extraADD = async (req, res, next) => {
//   conexion.query(
//     "UPDATE users SET municipio_extra = ? WHERE user = ?",
//     [req.body.muniADD, req.body.userADDMuni],
//     (error) => {
//       if (error) {
//         req.alert = [
//           {
//             alertTitle: "Error",
//             alertMessage: "Error en la Base de Datos",
//             alertIcon: "error",
//             showConfirmButton: true,
//             timer: false,
//             ruta: "profesional/Cuentas/Usuarios",
//           },
//         ];
//       } else {
//         req.alert = [
//           {
//             alertTitle: "Conexión exitosa",
//             alertMessage: "Municipio de Ayuda Añadido correctamente",
//             alertIcon: "success",
//             showConfirmButton: false,
//             timer: 800,
//             ruta: "profesional/Cuentas/Usuarios",
//           },
//         ];
//       }
//       return next();
//     }
//   );
// };

// exports.ExtraDELETE = async (req, res, next) => {
//   conexion.query(
//     "UPDATE users SET municipio_extra = NULL WHERE user = ?",
//     req.body.userDELETEMuni,
//     function (err) {
//       if (err) {
//         req.alert = [
//           {
//             alertTitle: "Error",
//             alertMessage: "Error en la Base de Datos",
//             alertIcon: "error",
//             showConfirmButton: true,
//             timer: false,
//             ruta: "profesional/Cuentas/Usuarios",
//           },
//         ];
//       } else {
//         req.alert = [
//           {
//             alertTitle: "Conexión exitosa",
//             alertMessage: "Municipio de Ayuda Eliminado correctamente",
//             alertIcon: "success",
//             showConfirmButton: false,
//             timer: 800,
//             ruta: "profesional/Cuentas/Usuarios",
//           },
//         ];
//       }
//       return next();
//     }
//   );
// };

profesionalController.users = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    login
      .find({
        user: { $ne: decodificada.user },
        provincia: {
          $eq: decodificada.provincia,
        },
        rol: {
          $ne: "coordinacion",
        },
      })
      .exec(async (err, result) => {
        if (err) throw err;
        req.users = result;
        return next();
      });
  } catch (error) {
    console.log(error);
    return next();
  }
};

// Apartado: Consolidaciones

// Extras
profesionalController.isAuthenticatedProf = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          return next();
        } else if (results.rol != "profesional") {
          return res.redirect("/" + results.rol);
        }
        req.user = results;
        return next();
      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/");
  }
};

profesionalController.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};

module.exports = profesionalController;
