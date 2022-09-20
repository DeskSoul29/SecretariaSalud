import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true, max: 100 },
  apellido: { type: String, required: true, max: 100 },
  pass: { type: String, required: true, max: 100 },
  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },
  municipioExtra1: { type: String, max: 100 },
  municipioExtra2: { type: String, max: 100 },
  municipioExtra3: { type: String, max: 100 },
  rol: { type: String, required: true, max: 100 },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("users", UserSchema);
