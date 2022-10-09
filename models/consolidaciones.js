import mongoose from "mongoose";
var Schema = mongoose.Schema;

var EstablecimientosSchema = new Schema({
  status: { type: String, default: "Pendiente" },

  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, max: 100 },

  responsable: {
    userResponsable: { type: Number, required: true },
    nombreResponsable: { type: String, required: true, max: 200 },
  },

  consolidacion: {
    establecimiento: String,
    rotulado: String,
    publicidad: String,
    MSEstablecimientos: String,
    MSProductos: String,
    antirrabica: String,
    eduSanitaria: String,
    EvenSaludPubli: String,
    lisCarnets: String,
    vehiculos: String,
    tomaMuestra: String,
    quejas: String,
  },

  grupo: String,
  codigo: Number,
  tipo: String,
  nivelRiesgo: String,
  tipoIdentificacion: String,
  identificacion: Number,
  telefono: Number,
  razonSocial: String,
  direccion: String,
  repreLegal: String,
  estado: String,
  fvisit: Date,
  score: Number,
  concepto: String,
  accion: String,

  //Establecimientos
  acta: String,
  actaLey: String,
  actaAnul: String,

  //Cementerios
  salaNM: String,

  //Establecimientos - Rotulado
  ForRotulado: {
    productoRotulado: String,
  },

  //Establecimientos - Publicidad
  ForPublicidad: {
    medioPublicitario: String,
    registroSanitario: String,
    productoPublicidad: String,
    marcaPublicidad: String,
  },

  //Establecimientos - Medidas Sanitarias Establecimientos
  ForMSEstablecimientos: {
    medidaMSEstablecimientos: String,
    motivoMSEstablecimientos: String,
    observacionMedEsta: String,
  },

  //Establecimientos - Medidas Sanitarias Productos
  ForMSProductos: {
    medidaMSProductos: String,
    permisoMSProductos: String,
    productoMSProductos: String,
    marcaMSProductos: String,
    motivoMSProductos: String,
    presentacionMSProductos: String,
    cantidadMSProductos: Number,
    fabricanteMSProductos: String,
    loteMSProductos: String,
    vencimientoMSProductos: Date,
    observacionMedProd: String,
  },

  //Antirrabica
  ForAntirrabica: {
    Pcanina: Number,
    Pfelina: Number,
    canUrb: Number,
    canRur: Number,
    felUrb: Number,
    felRur: Number,
    totalVac: Number,
  },

  //Educación Sanitaria
  ForEduSanitaria: {
    tema: String,
    otroTema: String,
    fechaCap: Date,
    intensidad: Number,
    lugarCapa: String,
    personalDiri: String,
    totalPersCap: Number,
  },

  //Eventos en Salud Publica
  ForEvenSPublica: {
    mes: String,
    presentEtas: Number,
    atendEtas: Number,
    presentIntox: Number,
    atendIntox: Number,
    presentAgre: Number,
    atendAgre: Number,
    covePart: String,
    coveFech: Date,
  },

  //Listado Carnetizados
  ForCarnets: {
    expCarnet: Date,
    idenCarnet: Number,
    nombreCarnet: String,
    establecimientoCarnet: String,
    direccionCarnet: String,
  },

  //Quejas
  ForQuejas: {
    municipioEstable: String,
    municipioComuni: String,
    tipoQueja: String,
    frecep: Date,
    perCausaQueja: String,
    perAfectQueja: String,
    descQueja: String,
    reqQueja: String,
  },

  //Toma de Muestras
  ForTomaMuestras: {
    tipMuestra: String,
    descMuestra: String,
    tipAnalisis: String,
    zona: String,
    objAnalisis: String,
    acompanante: String,
  },

  //Vehiculos
  ForVehiculos: {
    claseVehiculo: String,
    otraClase: String,
    placa: String,
    refrigeracion: String,
    nInscripcion: String,
    productosVehiculo: String,
  },

  // Evidencias
  evidencias: {
    file1: { type: String, required: true },
    file2: { type: String },
    file3: { type: String },
    file4: { type: String },
    file5: { type: String },
  },

  observaciones: { type: String },
  crearedAt: { type: Date, default: Date.now() },
});

export default mongoose.model("consolidaciones", EstablecimientosSchema);
