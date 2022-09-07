const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
var login = require("../models/user");
const { promisify } = require("util");

var authController = {};

authController.login = async (req, res) => {
  try {
    const user = req.body.user;
    const pass = req.body.pass;

    if (!user || !pass) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un Usuario y Contraseña",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    } else {
      login.findOne({ user: user }).exec(async (err, results) => {
        if (!results || !(await bcryptjs.compare(pass, results.pass))) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o Contraseña incorrecta",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        } else {
          // Inicio de sesión OK
          const token = jwt.sign(
            {
              user: user,
              nombres: results.nombre,
              apellidos: results.apellido,
              provincia: results.provincia,
              municipio: results.municipio,
              rol: results.rol,
            },
            process.env.JWT_SECRETO,
            {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            }
          );
          // Generamos el token SIN fecha de expiracion
          const cookiesOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("jwt", token, cookiesOptions);
          if (results.rol == "coordinacion") {
            isCoordinacion(res);
          } else if (results.rol == "profesional") {
            isProfesional(res);
          } else {
            isTecnico(res);
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

function isCoordinacion(res) {
  res.render("login", {
    alert: true,
    alertTitle: "Conexión exitosa",
    alertMessage: "¡BIENVENIDO!",
    alertIcon: "success",
    showConfirmButton: false,
    timer: 800,
    ruta: "coordinacion",
  });
}

function isProfesional(res) {
  res.render("login", {
    alert: true,
    alertTitle: "Conexión exitosa",
    alertMessage: "¡BIENVENIDO!",
    alertIcon: "success",
    showConfirmButton: false,
    timer: 800,
    ruta: "profesional",
  });
}

function isTecnico(res) {
  res.render("login", {
    alert: true,
    alertTitle: "Conexión exitosa",
    alertMessage: "¡BIENVENIDO!",
    alertIcon: "success",
    showConfirmButton: false,
    timer: 800,
    ruta: "tecnico",
  });
}

authController.isAuthenticated = async (req, res, next) => {
  if (JSON.stringify(req.cookies) != "{}") {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          return next();
        } else {
          return res.redirect("/" + results.rol);
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return next();
  }
};

module.exports = authController;
