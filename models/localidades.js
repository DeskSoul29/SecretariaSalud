var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocalidadesSchema = new Schema({
  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },
});

module.exports = mongoose.model("provinciasxmunicipios", LocalidadesSchema);
