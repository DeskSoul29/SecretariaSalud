import mongoose from "mongoose";
var Schema = mongoose.Schema;

var ListCarnetsSchema = new Schema({
  userResponsable: { type: Number, required: true },
  responsable: { type: String, required: true, max: 100 },

  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },

  expCarnet: { type: Date, required: true },
  identificacion: { type: Number, required: true },
  nombreCarnet: { type: String, required: true },
  establecimientoCarnet: { type: String, required: true },
  direccionCarnet: { type: String, required: true },

  observaciones: { type: String },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("consolidaciones", ListCarnetsSchema);
