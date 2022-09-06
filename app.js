const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

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
app.use("/", require("./routes/login"));
app.use("/coordinacion", require("./routes/coordinacion"));
app.use("/profesional", require("./routes/profesional"));
app.use("/tecnico", require("./routes/tecnico"));

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
