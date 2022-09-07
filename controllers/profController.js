const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { promisify } = require("util");

// Apartado: Cuentas - Register
exports.register = async (req, res, next) => {
  try {
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
      req.alert = [
        {
          alertTitle: "Error",
          alertMessage: "Ingresar todos los campos",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "profesional/Cuentas/Register",
        },
      ];
      return next();
    } else if (pass != repass) {
      //Contraseñas Diferentes
      req.alert = [
        {
          alertTitle: "Error",
          alertMessage: "Contraseñas Diferentes",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "profesional/Cuentas/Register",
        },
      ];
      return next();
    } else {
      conexion.query(
        "SELECT * FROM users WHERE user = ?",
        [user],
        async (error, results) => {
          if (results.length == 1) {
            //Usuario ya registrado
            req.alert = [
              {
                alertTitle: "Error",
                alertMessage: "Usuario ya registrado",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: "profesional/Cuentas/Register",
              },
            ];
            return next();
          } else {
            let passHash = await bcryptjs.hash(pass, 8);

            conexion.query(
              "INSERT INTO users SET ?",
              {
                user: user,
                nombre: name,
                apellido: lastname,
                pass: passHash,
                provincia: provincia,
                municipio: municipio,
                rol: rol,
              },
              (error) => {
                if (error) {
                  console.log(error);
                  req.alert = [
                    {
                      alertTitle: "Error",
                      alertMessage: "Error en la Base de Datos",
                      alertIcon: "error",
                      showConfirmButton: true,
                      timer: false,
                      ruta: "profesional/Cuentas/Register",
                    },
                  ];
                } else {
                  //Registrado correctamente
                  req.alert = [
                    {
                      alertTitle: "Conexión exitosa",
                      alertMessage: "Registrado correctamente",
                      alertIcon: "success",
                      showConfirmButton: false,
                      timer: 800,
                      ruta: "profesional/Cuentas/Register",
                    },
                  ];
                }
                return next();
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

exports.fillMunicipio = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    conexion.query(
      "SELECT provincias.nombre_provincia, municipios.nombre_municipio FROM provincias LEFT JOIN municipios ON municipios.id_provincia = provincias.id_provincia WHERE provincias.nombre_provincia = ?",
      [decodificada.provincia],
      function (err, result) {
        if (err) throw err;
        req.fields = result;
        return next();
      }
    );
  } catch (error) {
    console.log(error);
    return next();
  }
};

// Apartado: Cuentas - Usuarios
exports.deleteUser = async (req, res, next) => {
  conexion.query(
    "DELETE FROM users WHERE user = ?",
    req.body.userDel,
    function (err) {
      if (err) {
        req.alert = [
          {
            alertTitle: "Error",
            alertMessage: "No se encuentra el Usuario",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "profesional/Cuentas/Usuarios",
          },
        ];
      } else {
        req.alert = [
          {
            alertTitle: "Conexión exitosa",
            alertMessage: "Eliminado correctamente",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 800,
            ruta: "profesional/Cuentas/Usuarios",
          },
        ];
      }
      return next();
    }
  );
};

exports.editUser = async (req, res, next) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const user = req.body.user;
  const pass = req.body.pass;
  const repass = req.body.repass;
  const municipio = req.body.municipio;
  const rol = req.body.rol;

  if (!name || !lastname || !user || !pass || !repass || !municipio || !rol) {
    //Ingresar todos los campos
    req.alert = [
      {
        alertTitle: "Error",
        alertMessage: "Ingresar todos los campos",
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "profesional/Cuentas/Usuarios",
      },
    ];
    return next();
  } else if (pass != repass) {
    //Contraseñas Diferentes
    req.alert = [
      {
        alertTitle: "Error",
        alertMessage: "Contraseñas Diferentes",
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "profesional/Cuentas/Usuarios",
      },
    ];
    return next();
  } else {
    let passHash = await bcryptjs.hash(pass, 8);
    conexion.query(
      "UPDATE users SET user = ?, nombre = ?, apellido = ?, pass = ?, municipio = ?, rol = ? WHERE user = ?",
      [user, name, lastname, passHash, municipio, rol, user],
      (error) => {
        if (error) {
          console.log(error);
        } else {
          req.alert = [
            {
              alertTitle: "Conexión exitosa",
              alertMessage: "Registrado correctamente",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 800,
              ruta: "profesional/Cuentas/Usuarios",
            },
          ];
          return next();
        }
      }
    );
  }
};

exports.extraADD = async (req, res, next) => {
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
            ruta: "profesional/Cuentas/Usuarios",
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
            ruta: "profesional/Cuentas/Usuarios",
          },
        ];
      }
      return next();
    }
  );
};

exports.ExtraDELETE = async (req, res, next) => {
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
            ruta: "profesional/Cuentas/Usuarios",
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
            ruta: "profesional/Cuentas/Usuarios",
          },
        ];
      }
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
      "SELECT * FROM users WHERE user != ? AND rol != 'coordinacion' AND provincia = ?",
      [decodificada.user, decodificada.provincia],
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

// Apartado: Consolidaciones

exports.isAuthenticatedModer = async (req, res, next) => {
  if (req.cookies.jwt) {
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
          } else if (results[0].rol != "profesional") {
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
    res.redirect("/");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
