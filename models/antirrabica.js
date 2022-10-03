import mongoose from "mongoose";
var Schema = mongoose.Schema;

var AntirrabicaSchema = new Schema({
  userResponsable: { type: Number, required: true },
  responsable: { type: String, required: true, max: 100 },

  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },

  canUrb: { type: Number, required: true },
  canRur: { type: Number, required: true },

  felUrb: { type: Number, required: true },
  felRur: { type: Number, required: true },

  totalVac: { type: Number, required: true },

  observaciones: { type: String },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("consolidaciones", AntirrabicaSchema);
