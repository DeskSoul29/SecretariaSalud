import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  cronogramaStart: Number,
  cronogramaEnd: Number,
  infMensStart: Number,
  infMensEnd: Number,

  createdAt: { type: Date },
});

export default mongoose.model("configuraciones", UserSchema);
