import mongoose from "mongoose";
var Schema = mongoose.Schema;

var HojaVidaSchema = new Schema({
  provincia: { type: String, required: true },
  municipio: { type: String, required: true },
  grupo: { type: String, required: true },
  codigo: { type: Number, required: true },
  tipo: { type: String, required: true },
  nivelRiesgo: { type: String, required: true },
  tipoIdentificacion: { type: String, required: true },
  identificacion: { type: Number, required: true },
  telefono: { type: Number, required: true },
  razonSocial: { type: String, required: true },
  direccion: { type: String, required: true },
  repreLegal: { type: String },
  placa: { type: String },
  estado: { type: String, required: true },
  createdAt: { type: Date },
});

export default mongoose.model("hojavidas", HojaVidaSchema);
