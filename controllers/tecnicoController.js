import login from "../models/user.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

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

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
