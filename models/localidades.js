import mongoose from "mongoose";
var Schema = mongoose.Schema;

var LocalidadesSchema = new Schema({
  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },
});

export default mongoose.model("provinciasxmunicipios", LocalidadesSchema);
