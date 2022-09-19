import mongoose from "mongoose";
var Schema = mongoose.Schema;

var CodEstablecimientosSchema = new Schema({
  grupo: { type: String, required: true, max: 100 },
  codigo: { type: Number, required: true, max: 100, unique: true },
  tipo: { type: String, required: true, max: 100 },
  nivelRiesgo: { type: String, required: true, max: 100 },
});

export default mongoose.model(
  "codigosxestablecimientos",
  CodEstablecimientosSchema
);
