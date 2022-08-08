const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const authRoutes = require("./routes/auth");
const dashboadRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");

require("dotenv").config();

const app = express();

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusterup.yuxje.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("Error db:", e));

// Capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Route middlewares
app.use("/api/user", authRoutes);
app.use("/api/dashboard", verifyToken, dashboadRoutes);

// *PRUEBA*
app.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "funciona!",
  });
});

// Iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
