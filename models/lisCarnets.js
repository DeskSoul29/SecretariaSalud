import mongoose from "mongoose";
var Schema = mongoose.Schema;

var ListCarnetsSchema = new Schema({
  userResponsable: { type: Number, required: true },
  responsable: { type: String, required: true, max: 100 },

  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },

  expCarnet: { type: Date, required: true },
  idenCarnet: { type: Number, required: true },
  nombreCarnet: { type: String, required: true },
  establecimientoCarnet: { type: String, required: true },
  direccionCarnet: { type: String, required: true },

  observaciones: { type: String },

  file1: { type: String, required: true },
  file2: { type: String },
  file3: { type: String },
  file4: { type: String },
  file5: { type: String },

  estado: { type: String, default: "Pendiente" },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("listcarnets", ListCarnetsSchema);
