import mongoose from "mongoose";
var Schema = mongoose.Schema;

var EvenSaludPubliSchema = new Schema({
  userResponsable: { type: Number, required: true },
  responsable: { type: String, required: true, max: 100 },

  mes: { type: String, required: true, max: 100 },
  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },

  presentEtas: { type: Number, required: true },
  atendEtas: { type: Number, required: true },

  presentIntox: { type: Number, required: true },
  atendIntox: { type: Number, required: true },

  presentAgre: { type: Number, required: true },
  atendAgre: { type: Number, required: true },

  covePart: { type: String, required: true, max: 100 },
  coveFech: { type: Date, required: true },

  observaciones: { type: String },

  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("consolidaciones", EvenSaludPubliSchema);
