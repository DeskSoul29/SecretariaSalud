import mongoose from "mongoose";
var Schema = mongoose.Schema;

var TomaMuestraSchema = new Schema({
  userResponsable: { type: Number, required: true },
  responsable: { type: String, required: true, max: 100 },

  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },
  grupo: { type: String, required: true, max: 100 },
  codigo: { type: Number, required: true },
  tipo: { type: String, required: true, max: 100 },
  nivelRiesgo: { type: String, required: true, max: 100 },
  tipoIdentificacion: { type: String, required: true, max: 100 },
  identificacion: { type: Number, required: true },
  telefono: { type: Number, required: true },
  razonSocial: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  repreLegal: { type: String, required: true, max: 100 },
  estado: { type: String, required: true, max: 100 },
  fvisit: { type: Date, required: true },

  tipMuestra: { type: String, required: true, max: 100 },
  descMuestra: { type: String, max: 100 },
  tipAnalisis: { type: String, required: true, max: 100 },
  zona: { type: String, required: true, max: 100 },
  objAnalisis: { type: String, required: true, max: 100 },
  acompanante: { type: String, required: true, max: 100 },

  observaciones: { type: String },

  file1: { type: String, required: true },
  file2: { type: String },
  file3: { type: String },
  file4: { type: String },
  file5: { type: String },

  estado: { type: String, default: "Pendiente" },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("tomamuestras", TomaMuestraSchema);
