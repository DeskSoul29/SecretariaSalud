import mongoose from "mongoose";
var Schema = mongoose.Schema;

var EstablecimientosSchema = new Schema({
  userResponsable: { type: Number, required: true },
  responsable: { type: String, required: true, max: 100 },

  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, required: true, max: 100 },
  grupo: { type: String, required: true, max: 100 },
  codigo: { type: Number, required: true, max: 100 },
  tipo: { type: String, required: true, max: 100 },
  nivelRiesgo: { type: String, required: true, max: 100 },
  tipoIdentificacion: { type: String, required: true, max: 100 },
  identificacion: { type: Number, required: true },
  telefono: { type: Number, required: true },
  razonSocial: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  repreLegal: { type: String, required: true, max: 100 },
  estado: { type: String, required: true, max: 100 },
  fvisit: { type: Date, required: true },
  score: { type: Number, required: true },
  concepto: { type: String, required: true, max: 100 },
  accion: { type: String, required: true, max: 100 },

  //Establecimientos (Sin morgue)
  acta: { type: String, max: 100 },
  actaLey: { type: String, max: 100 },

  //Establecimientos - Rotulado
  productoRotulado: { type: String, max: 100 },

  //Establecimientos - Publicidad
  medioPublicitario: { type: String, max: 100 },
  registroSanitario: { type: String, max: 100 },
  productoPublicidad: { type: String, max: 100 },
  marcaPublicidad: { type: String, max: 100 },

  //Establecimientos - Medidas Sanitarias Establecimientos
  medidaMSEstablecimientos: { type: String, max: 100 },
  motivoMSEstablecimientos: { type: String, max: 100 },

  //Establecimientos - Medidas Sanitarias Productos
  medidaMSProductos: { type: String, max: 100 },
  permisoMSProductos: { type: String, max: 100 },
  productoMSProductos: { type: String, max: 100 },
  marcaMSProductos: { type: String, max: 100 },
  motivoMSProductos: { type: String, max: 100 },
  presentacionMSProductos: { type: String, max: 100 },
  cantidadMSProductos: { type: Number },
  fabricanteMSProductos: { type: String, max: 100 },
  loteMSProductos: { type: String, max: 100 },
  vencimientoMSProductos: { type: Date },

  //Cementerios
  salaNM: { type: String, max: 100 },

  observaciones: { type: String },
  crearedAt: { type: Date, default: Date.now },
});

export default mongoose.model("consolidaciones", EstablecimientosSchema);
