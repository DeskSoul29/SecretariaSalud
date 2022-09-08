var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  user: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true, max: 100 },
  apellido: { type: String, required: true, max: 100 },
  pass: { type: String, required: true, max: 100 },
  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },
  municipioExtra: {
    municipio1: {
      type: String,
      max: 100,
    },
    municipio2: {
      type: String,
      max: 100,
    },
    municipio3: {
      type: String,
      max: 100,
    },
  },
  rol: { type: String, required: true, max: 100 },
  crearedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", UserSchema);
