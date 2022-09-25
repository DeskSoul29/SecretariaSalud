import login from "../models/user.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

var authLogin = (function () {
  var isUser = function (req, title, mess, icon, button, timer, ruta) {
    return (req.alert = [
      {
        alert: true,
        alertTitle: title,
        alertMessage: mess,
        alertIcon: icon,
        showConfirmButton: button,
        timer: timer,
        ruta: ruta,
      },
    ]);
  };

  return {
    isUser: isUser,
  };
})();

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

export const isAuthenticatedCoordinacion = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          res.redirect("/");
        } else if (results.rol != "coordinacion") {
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

export const isAuthenticatedProf = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          res.redirect("/");
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

export const isAuthenticatedTecnic = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          res.redirect("/");
        } else if (results.rol != "tecnico") {
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

export const searchPass = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          return res.redirect("/");
        } else {
          req.user = results;
          return next();
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
};

export const changePass = async (req, res, next) => {
  var { user, actPass, pass } = req.body;

  await login.findOne({ user: user }).exec(async (err, results) => {
    if (!results || !(await bcryptjs.compare(actPass, results.pass))) {
      authLogin.isUser(
        req,
        "Advertencia",
        "Contraseña Actual Incorrecta",
        "error",
        true,
        false,
        "Tools/changePassword"
      );
    } else {
      await login
        .findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              pass: await bcryptjs.hash(pass, 8),
            },
          },
          { new: true }
        )
        .then((result) => {
          authLogin.isUser(
            req,
            "Conexión exitosa",
            "Contraseña Actualizada Correctamente",
            "success",
            false,
            800,
            ""
          );
          res.clearCookie("jwt");
        })
        .catch((error) => console.error(error));
    }
    return next();
  });
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
