const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const user = req.body.user;
    const pass = req.body.pass;
    const repass = req.body.repass;
    // const provincia = req.body.provincia;
    // const municipio = req.body.municipio;
    // const rol = req.body.rol;

    // if (
    //   !name ||
    //   !lastname ||
    //   !user ||
    //   !pass ||
    //   !repass ||
    //   !provincia ||
    //   !municipio ||
    //   !rol
    // ) {
    if (!name || !lastname || !user || !pass || !repass) {
      res.render("admin/register", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese todos los campos",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "register",
      });
    } else if (pass != repass) {
      res.render("admin/register", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Contraseñas Diferentes",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "register",
      });
    } else {
      conexion.query(
        "SELECT * FROM users WHERE user = ?",
        [user],
        async (error, results) => {
          if (results.length == 1) {
            res.render("admin/register", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario ya registrado",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "register",
            });
          } else {
            let passHash = await bcryptjs.hash(pass, 8);

            conexion.query(
              "INSERT INTO users SET ?",
              {
                user: user,
                name: name,
                pass: passHash,
                // provincia: provincia,
                // municipio: municipio,
                // rol: rol,
              },
              (error, results) => {
                if (error) {
                  console.log(error);
                }
                res.render("admin/register", {
                  alert: true,
                  alertTitle: "Registro exitoso",
                  alertMessage: "¡BIENVENIDO!",
                  alertIcon: "success",
                  showConfirmButton: false,
                  timer: 800,
                  ruta: "login",
                });
                // res.redirect("/");
              }
            );
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.fillFields = async (req, res, next) => {
  conexion.query(
    "SELECT provincias.nombre_provincia, municipios.nombre_municipio FROM provincias LEFT JOIN municipios ON municipios.id_provincia = provincias.id_provincia",
    function (err, result, fields) {
      if (err) throw err;
      req.field = result;
      return next();
    }
  );
};

exports.users = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    conexion.query(
      "SELECT user, nombre, apellido, provincia, municipio, rol FROM users WHERE id != ?",
      [decodificada.id],
      function (err, result) {
        if (err) throw err;
        req.users = result;
        return next();
      }
    );
  } catch (error) {
    console.log(error);
    return next();
  }
};

exports.isAuthenticatedAdmin = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      conexion.query(
        "SELECT * FROM users WHERE id = ?",
        [decodificada.id],
        (error, results) => {
          if (!results) {
            return next();
          } else if (results[0].rol != "admin") {
            return res.redirect("/" + results[0].rol);
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/login");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/login");
};
