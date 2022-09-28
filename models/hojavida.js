import mongoose from "mongoose";
var Schema = mongoose.Schema;

var HojaVidaSchema = new Schema({
  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },
  grupo: { type: String, required: true, max: 100 },
  codigo: { type: Number, required: true, max: 100 },
  tipo: { type: String, required: true, max: 100 },
  nivelRiesgo: { type: String, required: true, max: 100 },
  tipoIdentificacion: { type: String, required: true, max: 100 },
  identificacion: { type: Number, required: true },
  telefono: { type: Number, required: true },
  razonSocial: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  repreLegal: { type: String, required: true, max: 100 },
  estado: { type: String, required: true, max: 100 },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("hojavidas", HojaVidaSchema);
