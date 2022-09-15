const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { promisify } = require("util");

var login = require("../models/user");
var localidades = require("../models/localidades");

var coordinacionController = {};

var authCoordi = (function () {
  var toastCheck = function (title, mess) {
    return iziToast.success({
      timeout: 5000,
      icon: "fa fa-check",
      title: title,
      message: mess,
    });
  };

  var toastWarning = function (title, mess) {
    return iziToast.warning({
      title: title,
      message: mess,
    });
  };

  var toastError = function (title, mess) {
    return iziToast.error({ title: title, message: mess });
  };

  return {
    toastCheck: toastCheck,
    toastWarning: toastWarning,
    toastError: toastError,
  };
})();

// Apartado: Cuentas - Register
coordinacionController.register = async (req, res, next) => {
  try {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const user = req.body.user;
    const pass = req.body.pass;
    const provincia = req.body.provincia;
    const municipio = req.body.municipio;
    const rol = req.body.rol;

    login.find({ user: user }).exec(async (err, results) => {
      if (results.length != 0) {
        //Usuario ya registrado
        authCoordi.toastWarning("Advertencia", "Usuario ya Registrado");
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

        userNew.save(function (err, result) {
          if (!result) {
            authCoordi.toastError("Advertencia", "Error en la Base de Datos");
          } else {
            //Registrado correctamente
            authCoordi.toastCheck(
              "Conexión exitosa",
              "Registrado Correctamente"
            );
          }
        });
      }
    });
    return next();
  } catch (error) {
    console.log(error);
  }
};

coordinacionController.fillFields = async (req, res, next) => {
  localidades.find({}).exec(async (err, results) => {
    if (err) throw err;
    req.field = results;
    return next();
  });
};

//Apartado Cuentas - Usuarios
coordinacionController.users = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    login
      .find({ user: { $ne: decodificada.user } })
      .exec(async (err, results) => {
        if (err) throw err;
        req.users = results;
        return next();
      });
  } catch (error) {
    console.log(error);
    return next();
  }
};
coordinacionController.editUser = async (req, res, next) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const user = req.body.user;
  const pass = req.body.pass;
  const repass = req.body.repass;
  const provincia = req.body.provincia;
  const municipio = req.body.municipio;
  const rol = req.body.rol;

  if (
    !name ||
    !lastname ||
    !user ||
    !pass ||
    !repass ||
    !provincia ||
    !municipio ||
    !rol
  ) {
    //Ingresar todos los campos
    authCoordi.isUser(
      res,
      "Advertencia",
      "Ingresar todos los campos",
      "error",
      true,
      false
    );
    return next();
  } else if (pass != repass) {
    //Contraseñas Diferentes
    authCoordi.isUser(
      res,
      "Advertencia",
      "Contraseñas Diferentes",
      "error",
      true,
      false
    );
    return next();
  } else {
    login.updateOne(
      { user: user },
      {
        $set: {
          user: user,
          nombre: name,
          apellido: lastname,
          pass: await bcryptjs.hash(pass, 8),
          provincia: provincia,
          municipio: municipio,
          rol: rol,
        },
      },
      function (err, results) {
        if (err) {
        } else {
          authCoordi.isUser(
            res,
            "Conexión Exitosa",
            "Registrado Correctamente",
            "success",
            false,
            800
          );
          return next();
        }
      }
    );
  }
};
coordinacionController.deleteUser = async (req, res, next) => {
  login.deleteOne({ user: req.body.userDel }).exec(async (err, results) => {
    if (err) {
      authCoordi.isUser(
        res,
        "Advertencia",
        "No se Encuentra el Usuario",
        "error",
        true,
        false
      );
    } else {
      res, title, mess, icon, button, timer;
      authCoordi.isUser(
        res,
        "Conexión Exitosa",
        "Eliminado Correctamente",
        "success",
        false,
        800
      );
    }
    return next();
  });
};
coordinacionController.extraADD = async (req, res, next) => {
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
coordinacionController.extraDELETE = async (req, res, next) => {
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
coordinacionController.isAuthenticatedCoordinacion = async (req, res, next) => {
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

coordinacionController.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};

module.exports = coordinacionController;
