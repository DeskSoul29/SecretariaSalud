import mongoose from "mongoose";
var Schema = mongoose.Schema;

var ReporteSchema = new Schema({
  tipo: String,

  consolidacion: {
    userTec: { type: Number, required: true },
    nomTec: { type: String, required: true },
    provincia: { type: String, required: true },
    municipio: { type: String, required: true },
    consID: { type: Schema.ObjectId, required: true, unique: true },
  },

  profesional: {
    userProf: { type: Number, required: true },
    nomProf: { type: String, required: true },
  },
  respuestaProf: {
    criterioProf: { type: String, required: true },
    motivoProf: String,
  },
  coordinador: {
    userCoordi: Number,
    nomCoordi: String,
  },
  respuestaCoordi: {
    fechaRes: { type: Date },
    criterioCoordi: String,
    motivoCoordi: String,
  },

  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("reportes", ReporteSchema);
