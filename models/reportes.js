import mongoose from "mongoose";
var Schema = mongoose.Schema;

var ReporteSchema = new Schema({
  tipo: String,

  consolidacion: {
    consID: { type: Schema.ObjectId, required: true, unique: true },
    userTec: { type: Number, required: true },
    nomTec: { type: String, required: true },
    provincia: { type: String, required: true },
    municipio: { type: String, required: true },
  },

  respuesta: {
    userRes: { type: Number, required: true },
    nombreRes: { type: String, required: true },
    rol: { type: String, required: true },
    criterio: { type: String, required: true },
    motivo: String,
  },

  createdAt: { type: Date },
});

export default mongoose.model("reportes", ReporteSchema);
