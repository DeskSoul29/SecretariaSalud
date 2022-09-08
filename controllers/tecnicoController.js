const jwt = require("jsonwebtoken");
const { promisify } = require("util");

var login = require("../models/user");
var localidades = require("../models/localidades");

var tecnicoController = {};

tecnicoController.isAuthenticatedTecnic = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          return next();
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

tecnicoController.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};

module.exports = tecnicoController;
