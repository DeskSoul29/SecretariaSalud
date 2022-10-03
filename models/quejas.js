import mongoose from "mongoose";
var Schema = mongoose.Schema;

var QuejasSchema = new Schema({
  userResponsable: { type: Number, required: true },
  responsable: { type: String, required: true, max: 100 },

  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },

  grupo: { type: String, max: 100 },
  codigo: { type: Number },
  tipo: { type: String, max: 100 },
  nivelRiesgo: { type: String, max: 100 },
  tipoIdentificacion: { type: String, max: 100 },
  identificacion: { type: Number },
  telefono: { type: Number },
  razonSocial: { type: String, max: 100 },
  direccion: { type: String, max: 100 },
  repreLegal: { type: String, max: 100 },
  estado: { type: String, max: 100 },

  tipoQueja: { type: String, required: true, max: 100 },
  frecep: { type: Date, required: true },
  fvisit: { type: Date, required: true },
  perCausaQueja: { type: String, required: true, max: 100 },
  perAfectQueja: { type: String, required: true, max: 100 },
  descQueja: { type: String, required: true },
  reqQueja: { type: String, required: true },

  observaciones: { type: String },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("consolidaciones", QuejasSchema);
