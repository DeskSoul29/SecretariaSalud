import login from "../models/user.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";

var authLogin = (function () {
  var isUser = function (res, title, mess, icon, button, timer, user) {
    return res.render("login", {
      alert: true,
      alertTitle: title,
      alertMessage: mess,
      alertIcon: icon,
      showConfirmButton: button,
      timer: timer,
      ruta: user,
    });
  };

  var token = function (user, nombre, apellido, provincia, municipio, rol) {
    return jwt.sign(
      {
        user: user,
        nombres: nombre,
        apellidos: apellido,
        provincia: provincia,
        municipio: municipio,
        rol: rol,
      },
      process.env.JWT_SECRETO,
      {
        expiresIn: process.env.JWT_TIEMPO_EXPIRA,
      }
    );
  };

  return {
    isUser: isUser,
    token: token,
  };
})();

export const signin = async (req, res) => {
  try {
    const { user, pass } = req.body;

    if (!user || !pass) {
      authLogin.isUser(
        res,
        "Advertencia",
        "Ingrese un Usuario y Contraseña",
        "info",
        true,
        false,
        ""
      );
    } else {
      login.findOne({ user: user }).exec(async (err, results) => {
        if (!results || !(await bcryptjs.compare(pass, results.pass))) {
          authLogin.isUser(
            res,
            "Advertencia",
            "Usuario y/o Contraseña incorrecta",
            "error",
            true,
            false,
            ""
          );
        } else {
          // Inicio de sesión OK
          const token = authLogin.token(
            user,
            results.nombre,
            results.apellido,
            results.provincia,
            results.municipio,
            results.rol
          );
          // Generamos el token SIN fecha de expiracion
          const cookiesOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("jwt", token, cookiesOptions);
          authLogin.isUser(
            res,
            "Conexión exitosa",
            "¡BIENVENIDO!",
            "success",
            false,
            800,
            results.rol
          );
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
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
