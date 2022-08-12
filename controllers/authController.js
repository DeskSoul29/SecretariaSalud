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

exports.login = async (req, res) => {
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
                id: results[0].id,
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
            //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
            console.log("TOKEN: " + token + " para el USUARIO : " + user);

            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            res.render("login", {
              alert: true,
              alertTitle: "Conexión exitosa",
              alertMessage: "¡BIENVENIDO!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 800,
              ruta: "admin",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.isAuthenticated = async (req, res, next) => {
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
