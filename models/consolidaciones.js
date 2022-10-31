import mongoose from "mongoose";
var Schema = mongoose.Schema;

var EstablecimientosSchema = new Schema({
  status: { type: String, default: "Pendiente" },
  SendNovAd: { type: String, default: "off" },

  provincia: { type: String, required: true, max: 100 },
  municipio: { type: String, max: 100 },

  hojavida: { type: Schema.ObjectId, ref: "hojavidas" },

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
    noveadministrativa: String,
    cronograma: String,
  },

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

  //Cronograma
  mesCron: String,

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

  //Novedades Administrativas
  ForNAdmin: {
    mesNA: String,
    entreInfor: String,
    entreCrono: String,
    fechCrono: Date,
    entreAsis: String,
    fechAsis: Date,
    entreCircu: String,
    NumCir: String,
    numActas: Number,
    nomActas: String,
    motDevol: String,
  },

  // Evidencias
  evidencia: {
    file: { type: String },
  },

  //Reporte
  reporte: {
    motivo: String,
    fechRepor: Date,
  },

  observaciones: { type: String },
  createdAt: { type: Date },
});

export default mongoose.model("consolidaciones", EstablecimientosSchema);
