import mongoose from "mongoose";
var Schema = mongoose.Schema;

var EduSanitariaSchema = new Schema({
  userResponsable: { type: Number, required: true },
  responsable: { type: String, required: true, max: 100 },
  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },

  tema: { type: String, required: true, max: 100 },
  otroTema: { type: String, max: 100 },
  fvisit: { type: Date, required: true },
  intensidad: { type: Number, required: true },
  lugarCapa: { type: String, required: true, max: 100 },
  personalDiri: { type: String, required: true, max: 100 },
  persCapacit: { type: Number, required: true },

  observaciones: { type: String },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("consolidaciones", EduSanitariaSchema);
