import User from "../models/user.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  if (JSON.stringify(req.cookies) != "{}") {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      User.findOne({ user: decodificada.user }).exec(async (err, results) => {
        if (!results) {
          return next();
        } else {
          console.log(decodificada.user);
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
