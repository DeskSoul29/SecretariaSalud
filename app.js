// import express from "./main.js";
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

var login = require("./routes/login");
var coordinacion = require("./routes/coordinacion");
var profesional = require("./routes/profesional");
var tecnico = require("./routes/tecnico");

const app = express();

//BD
const usuario = "desksoul29";
const password = "desk123";
const dbName = "SecretariaSalud";

const uri = `mongodb+srv://${usuario}:${password}@clusterup.yuxje.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("¡Conectado a la base de datos MongoDB! 👋"))
  .catch((e) => console.log("Error de conexión: ", e));

// Seteamos el motor de plantillas
app.set("view engine", "ejs");

// Seteamos la carpeta public para archivos estáticos
// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

// Para procesar datos enviados desde forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
// app.use((req, res, next) => {
//   res.status(404).render("/404");
// });
app.use((req, res, next) => {
  res.status(404).redirect("/404");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("🍉🍉🍉 http://localhost:" + PORT));
