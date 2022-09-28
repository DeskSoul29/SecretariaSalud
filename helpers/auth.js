import login from "../models/user.js";
import { promisify } from "util";
import codEsta from "../models/codigoEstablecimientos.js";
import hojavida from "../models/hojavida.js";
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

//Autenticaciones
export const isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          res.clearCookie("jwt");
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
          res.clearCookie("jwt");
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
          res.clearCookie("jwt");
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
          res.clearCookie("jwt");
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

// EditUser - AddMunicipio
export const consultUser = async (req, res, next) => {
  const consultUser = await login.findById(req.params.id).lean();
  req.consultUser = consultUser;
  return next();
};

//Cambiar Contraseña (General)
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

//Hojas de Vida
export const CodigosEstablecimientos = async (req, res, next) => {
  const codigos = await codEsta.find().sort({ codigo: 1 });
  req.codigos = codigos;
  return next();
};
export const inscribirEstablecimiento = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      var decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      const {
        provincia,
        municipio,
        grupEsta,
        codEsta,
        tipoEsta,
        Nriesgo,
        tIden,
        inputIden,
        rSocial,
        phone,
        direccion,
        rLegal,
        estado,
      } = req.body;

      var salida = false;

      if (tIden == "NIT") {
        await hojavida
          .find({ identificacion: inputIden, tipoIdentificacion: tIden })
          .count()
          .then((result) => {
            if (result >= 1) {
              authLogin.isUser(
                req,
                "Advertencia",
                "NIT ya registrado",
                "error",
                true,
                false
              );
              salida = true;
            }
          });
      } else if (tIden == "Cedula Ciudadania") {
        await hojavida
          .find({
            identificacion: inputIden,
            tipoIdentificacion: tIden,
            grupo: grupEsta,
          })
          .count()
          .then((result) => {
            if (result >= 1) {
              authLogin.isUser(
                req,
                "Advertencia",
                "Usuario con Establecimiento En El Mismo Grupo",
                "error",
                true,
                false
              );
              salida = true;
            }
          });
      }

      if (!salida) {
        var estaNew = new hojavida({
          provincia: provincia,
          municipio: municipio,
          grupo: grupEsta,
          codigo: codEsta,
          tipo: tipoEsta,
          nivelRiesgo: Nriesgo,
          tipoIdentificacion: tIden,
          identificacion: inputIden,
          telefono: phone,
          razonSocial: rSocial,
          direccion: direccion,
          repreLegal: rLegal,
          estado: estado,
        });
        await estaNew
          .save()
          .then((result) => {
            if (result) {
              authLogin.isUser(
                req,
                "Conexión exitosa",
                "Establecimiento Añadido Correctamente",
                "success",
                false,
                800,
                "/" + decodificada.rol + "/HojaVida/InscribirHV"
              );
            } else {
              authLogin.isUser(
                req,
                "Advertencia",
                "Error en la Base de Datos",
                "error",
                true,
                false,
                "/" + decodificada.rol + "/HojaVida/InscribirHV"
              );
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return next();
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
