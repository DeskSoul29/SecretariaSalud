import login from "../models/user.js";
import local from "../models/localidades.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";

// Apartado: Cuentas - Register
export const register = async (req, res, next) => {
  const { name, lastname, user, pass, provincia, municipio, rol } = req.body;

  login.find({ user: user }).exec(async (err, results) => {
    if (results.length != 0) {
      //Usuario ya registrado
      req.register = "found";
    } else {
      var userNew = new login({
        user: user,
        nombre: name,
        apellido: lastname,
        pass: await bcryptjs.hash(pass, 8),
        provincia: provincia,
        municipio: municipio,
        rol: rol,
      });
      await userNew.save(function (err, results) {
        req.register = results;
      });
    }
    return next();
  });
};

export const fillFields = async (req, res, next) => {
  const localidades = await local.find({}).lean();
  req.localidades = localidades;
  return next();
};

//Apartado Cuentas - Usuarios
export const users = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const users = await login.find({ user: { $ne: decodificada.user } });
    req.users = users;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const editUser = async (req, res, next) => {
  const { user, name, lastname, pass, provincia, municipio, rol } = req.body;

  await login.updateOne(
    { user: user },
    {
      nombre: name,
      apellido: lastname,
      pass: await bcryptjs.hash(pass, 8),
      provincia: provincia,
      municipio: municipio,
      rol: rol,
    },
    function (err) {
      if (err) {
        //No se encontro el Usuario
        req.edit = "NotFound";
      } else {
        req.edit = true;
      }
      return next();
    }
  );
};
export const deleteUser = async (req, res, next) => {
  await login.deleteOne({ user: req.body.userDel });
  req.flash("success_msg", "Borrado Exitoso");
  res.locals.message = req.flash();
  res.redirect("/coordinacion/Cuentas/Usuarios");
  // req.delete = true;
  // return next();
};
export const extraADD = async (req, res, next) => {
  conexion.query(
    "UPDATE users SET municipio_extra = ? WHERE user = ?",
    [req.body.muniADD, req.body.userADDMuni],
    (error) => {
      if (error) {
        req.alert = [
          {
            alertTitle: "Error",
            alertMessage: "Error en la Base de Datos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "coordinacion/Cuentas/Usuarios",
          },
        ];
      } else {
        req.alert = [
          {
            alertTitle: "Conexión exitosa",
            alertMessage: "Municipio de Ayuda Añadido correctamente",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 800,
            ruta: "coordinacion/Cuentas/Usuarios",
          },
        ];
      }
      return next();
    }
  );
};
export const extraDELETE = async (req, res, next) => {
  conexion.query(
    "UPDATE users SET municipio_extra = NULL WHERE user = ?",
    req.body.userDELETEMuni,
    function (err) {
      if (err) {
        req.alert = [
          {
            alertTitle: "Error",
            alertMessage: "Error en la Base de Datos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "coordinacion/Cuentas/Usuarios",
          },
        ];
      } else {
        req.alert = [
          {
            alertTitle: "Conexión exitosa",
            alertMessage: "Municipio de Ayuda Eliminado correctamente",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 800,
            ruta: "coordinacion/Cuentas/Usuarios",
          },
        ];
      }
      return next();
    }
  );
};

//Extras
export const isAuthenticatedCoordinacion = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          return next();
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

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
