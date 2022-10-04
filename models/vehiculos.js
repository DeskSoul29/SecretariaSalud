import mongoose from "mongoose";
var Schema = mongoose.Schema;

var VehiculosSchema = new Schema({
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
  score: { type: Number, required: true },
  concepto: { type: String, required: true, max: 100 },

  claseVehiculo: { type: String, required: true, max: 100 },
  otraClase: { type: String, max: 100 },
  placa: { type: String, required: true, max: 100 },
  refrigeracion: { type: String, required: true, max: 100 },
  nInscripcion: { type: String, required: true, max: 100 },
  productosVehiculo: { type: String, required: true, max: 100 },

  observaciones: { type: String },

  file1: { type: String },
  file2: { type: String },
  file3: { type: String },
  file4: { type: String },
  file5: { type: String },

  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("vehiculos", VehiculosSchema);
