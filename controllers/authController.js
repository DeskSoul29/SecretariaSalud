const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
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
      conexion.query(
        "SELECT * FROM users WHERE user = ?",
        [user],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(pass, results[0].pass))
          ) {
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
                nombres: results[0].nombre,
                apellidos: results[0].apellido,
                provincia: results[0].provincia,
                municipio: results[0].municipio,
                rol: results[0].rol,
              },
              process.env.JWT_SECRETO,
              {
                expiresIn: process.env.JWT_TIEMPO_EXPIRA,
              }
            );
            // Generamos el token SIN fecha de expiracion
            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            if (results[0].rol == "coordinacion") {
              isCoordinacion(res);
            } else if (results[0].rol == "profesional") {
              isProfesional(res);
            } else {
              isTecnico(res);
            }
          }
        }
      );
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
      conexion.query(
        "SELECT * FROM users WHERE user = ?",
        [decodificada.user],
        (error, results) => {
          if (!results) {
            return next();
          } else {
            return res.redirect("/" + results[0].rol);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    return next();
  }
};

module.exports = authController;
