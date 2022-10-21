import mongoose from "mongoose";
var Schema = mongoose.Schema;

var CronogramaSchema = new Schema({
  user: { type: Number, required: true },
  nameTec: { type: String, required: true },
  provincia: { type: String, required: true },
  mes: { type: String, required: true },
  nameFile: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("cronogramas", CronogramaSchema);
