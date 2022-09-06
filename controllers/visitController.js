const jwt = require("jsonwebtoken");
const conexion = require("../database/db");
const { promisify } = require("util");

exports.isAuthenticatedVisit = async (req, res, next) => {
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
          } else if (results[0].rol != "visitante") {
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
  return res.redirect("/");
};
