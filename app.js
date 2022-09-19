import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { MONGODB_URI, PORT } from "./config/config.js";

import login from "./routes/login.js";
import coordinacion from "./routes/coordinacion.js";
import profesional from "./routes/profesional.js";
import tecnico from "./routes/tecnico.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", PORT);
app.set("views", join(__dirname, "views"));

// Seteamos el motor de plantillas
app.set("view engine", "ejs");

// Seteamos la carpeta public para archivos estáticos
app.use(express.static(join(__dirname, "/public")));

// Para procesar datos enviados desde forms
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
// Seteamos las variables de entorno
dotenv.config({ path: "./env/.env" });

// Para poder trabajar con las cookies
app.use(cookieParser());

// Llamar al router
app.use("/", login);
app.use("/coordinacion", coordinacion);
app.use("/profesional", profesional);
app.use("/tecnico", tecnico);

// Para eliminar la cache
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

// Error 404
app.use((req, res, next) => {
  return res.status(404).redirect("/404");
});

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.render("error", {
//     error,
//   });
// });

export default app;
