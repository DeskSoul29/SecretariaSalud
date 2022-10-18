import login from "../models/user.js";
import local from "../models/localidades.js";
import hojavida from "../models/hojavida.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import consolidaciones from "../models/consolidaciones.js";
import reportes from "../models/reportes.js";
import { promisify } from "util";

var authCoordi = (function () {
  var isUser = function (req, title, mess, icon, button, timer, ruta) {
    return (req.alert = [
      {
        alert: true,
        alertTitle: title,
        alertMessage: mess,
        alertIcon: icon,
        showConfirmButton: button,
        timer: timer,
        ruta: ruta,
      },
    ]);
  };

  return {
    isUser: isUser,
  };
})();

//Dashboard

//Apartado: Cuentas
// Cuentas: Register
export const register = async (req, res, next) => {
  const { name, lastname, user, pass, provincia, municipio, rol } = req.body;

  login.find({ user: user }).exec(async (err, results) => {
    if (results.length != 0) {
      //Usuario ya registrado
      authCoordi.isUser(
        req,
        "Advertencia",
        "Usuario ya Registrado",
        "error",
        true,
        false,
        "coordinacion/Cuentas/Register"
      );
    } else {
      var userNew = new login({
        user: user,
        nombre: name,
        apellido: lastname,
        pass: await bcryptjs.hash(pass, 8),
        provincia: provincia,
        municipio: municipio,
        rol: rol,
        createdAt: new Date(),
      });

      await userNew.save().then((result) => {
        authCoordi.isUser(
          req,
          "Conexión exitosa",
          "Registrado Correctamente",
          "success",
          false,
          800,
          "coordinacion/Cuentas/Register"
        );
      });
    }
    return next();
  });
};
export const fillFields = async (req, res, next) => {
  const localidades = await local.find();
  req.localidades = localidades;
  return next();
};
// Cuentas: Usuarios
export const users = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const users = await login.find({ user: { $ne: decodificada.user } });
    req.users = users;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const editUser = async (req, res, next) => {
  var {
    name,
    lastname,
    provincia,
    municipio,
    rol,
    extraMuni1,
    extraMuni2,
    extraMuni3,
  } = req.body;

  if (rol != "tecnico") {
    extraMuni1 = "";
    extraMuni2 = "";
    extraMuni3 = "";
  }
  extraMuni1 = extraMuni1 == "Ninguno" ? "" : extraMuni1;
  extraMuni2 = extraMuni2 == "Ninguno" ? "" : extraMuni2;
  extraMuni3 = extraMuni3 == "Ninguno" ? "" : extraMuni3;

  await login
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          nombre: name,
          apellido: lastname,
          provincia: provincia,
          municipio: municipio,
          rol: rol,
          municipioExtra1: extraMuni1,
          municipioExtra2: extraMuni2,
          municipioExtra3: extraMuni3,
        },
      },
      { new: true }
    )
    .then((result) => {
      authCoordi.isUser(
        req,
        "Conexión exitosa",
        "Editado Correctamente",
        "success",
        false,
        800,
        "coordinacion/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};
export const deleteUser = async (req, res, next) => {
  await login
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      authCoordi.isUser(
        req,
        "Conexión exitosa",
        "Eliminado Correctamente",
        "success",
        false,
        800,
        "coordinacion/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};
export const changePass = async (req, res, next) => {
  var { pass } = req.body;

  await login
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          pass: await bcryptjs.hash(pass, 8),
        },
      },
      { new: true }
    )
    .then((result) => {
      authCoordi.isUser(
        req,
        "Conexión exitosa",
        "Contraseña Actualizada Correctamente",
        "success",
        false,
        800,
        "coordinacion/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};

//Apartado: Consolidaciones
//Consolidaciones - Main
export const SeeCoorConsolidaciones = async (req, res, next) => {
  req.allConso = await consolidaciones.find({});
  return next();
};
//Consolidaciones - Consultar
export const SeeCoorNAdmin = async (req, res, next) => {
  const Estables = await consolidaciones.find({
    "consolidacion.noveadministrativa": {
      $eq: "on",
    },
  });
  req.allNAdmin = Estables;
  return next();
};
export const SeeCoorEstablecimiento = async (req, res, next) => {
  const Estables = await consolidaciones
    .find({
      "consolidacion.establecimiento": { $eq: "on" },
    })
    .lean();
  req.consultEstable = Estables;
  return next();
};
export const SeeCoorMorgues = async (req, res, next) => {
  const Morgues = await consolidaciones
    .find({
      "consolidacion.establecimiento": { $eq: "on" },
      tipo: "MORGUES",
    })
    .lean();
  req.morgues = Morgues;
  return next();
};
export const SeeCoorCementerios = async (req, res, next) => {
  const Cementerios = await consolidaciones
    .find({
      "consolidacion.establecimiento": { $eq: "on" },
      tipo: "CEMENTERIOS (CON O SIN MORGUE)",
    })
    .lean();
  req.consultCementerios = Cementerios;
  return next();
};
export const SeeCoorEstaRotulado = async (req, res, next) => {
  const Rotulado = await consolidaciones
    .find({
      provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.establecimiento": { $eq: "on" },
      "consolidacion.rotulado": { $eq: "on" },
    })
    .lean();
  req.consultRotulado = Rotulado;
  return next();
};
export const SeeCoorEstaPublicidad = async (req, res, next) => {
  const Publicidad = await consolidaciones
    .find({
      "consolidacion.establecimiento": { $eq: "on" },
      "consolidacion.publicidad": { $eq: "on" },
    })
    .lean();
  req.consultPublicidad = Publicidad;
  return next();
};
export const SeeCoorMedEstable = async (req, res, next) => {
  const MedEstable = await consolidaciones
    .find({
      "consolidacion.establecimiento": { $eq: "on" },
      "consolidacion.MSEstablecimientos": { $eq: "on" },
    })
    .lean();
  req.consultMedEstable = MedEstable;
  return next();
};
export const SeeCoorMedProduct = async (req, res, next) => {
  const MedProduct = await consolidaciones
    .find({
      "consolidacion.establecimiento": { $eq: "on" },
      "consolidacion.MSProductos": { $eq: "on" },
    })
    .lean();
  req.consultMedProduct = MedProduct;
  return next();
};
export const SeeCoorEventSaludPubli = async (req, res, next) => {
  const EventSalud = await consolidaciones
    .find({
      "consolidacion.EvenSaludPubli": { $eq: "on" },
    })
    .lean();
  req.consultES = EventSalud;
  return next();
};
export const SeeCoorQuejas = async (req, res, next) => {
  const Queja = await consolidaciones
    .find({
      "consolidacion.quejas": { $eq: "on" },
    })
    .lean();
  req.consultQueja = Queja;
  return next();
};
export const SeeCoorAntirrabica = async (req, res, next) => {
  const AntiRa = await consolidaciones
    .find({
      "consolidacion.antirrabica": { $eq: "on" },
    })
    .lean();
  req.consultAntirrabi = AntiRa;
  return next();
};
export const SeeCoorCarnetizados = async (req, res, next) => {
  const Carnets = await consolidaciones
    .find({
      "consolidacion.lisCarnets": { $eq: "on" },
    })
    .lean();
  req.consultCarnetiz = Carnets;
  return next();
};
export const SeeCoorEduSanitaria = async (req, res, next) => {
  const EduSani = await consolidaciones
    .find({
      "consolidacion.eduSanitaria": { $eq: "on" },
    })
    .lean();
  req.consultEdusani = EduSani;
  return next();
};
export const SeeCoorVehiculos = async (req, res, next) => {
  const Vehicu = await consolidaciones
    .find({
      "consolidacion.vehiculos": { $eq: "on" },
    })
    .lean();
  req.consultVehiculos = Vehicu;
  return next();
};
export const SeeCoorTomaMuestra = async (req, res, next) => {
  const TomaM = await consolidaciones
    .find({
      "consolidacion.tomaMuestra": { $eq: "on" },
    })
    .lean();
  req.consultTomaM = TomaM;
  return next();
};

// Hojas de Vidas
export const hojavidaConsultAll = async (req, res, next) => {
  const hv = await hojavida.find({}).lean();
  req.hojavida = hv;
  return next();
};
export const HVConsultOne = async (req, res, next) => {
  const CHVida = await hojavida.findById(req.params.id).lean();
  req.consultHV = CHVida;
  return next();
};
export const editHV = async (req, res, next) => {
  const {
    provincia,
    municipio,
    grupEsta,
    codEsta,
    tipoEsta,
    Nriesgo,
    tIden,
    phone,
    inputIden,
    rSocial,
    direccion,
    rLegal,
    estado,
  } = req.body;

  await hojavida
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          provincia: provincia,
          municipio: municipio,
          grupo: grupEsta,
          codigo: codEsta,
          tipo: tipoEsta,
          nivelRiesgo: Nriesgo,
          tipoIdentificacion: tIden,
          telefono: phone,
          identificacion: inputIden,
          razonSocial: rSocial,
          direccion: direccion,
          repreLegal: rLegal,
          estado: estado,
        },
      },
      { new: true }
    )
    .then((result) => {
      if (result) {
        authCoordi.isUser(
          req,
          "Conexión exitosa",
          "Establecimiento Actualizado Correctamente",
          "success",
          false,
          800,
          "coordinacion/HojaVida/ConsultarHV"
        );
      } else {
        authCoordi.isUser(
          req,
          "Advertencia",
          "Error en la Base de Datos",
          "error",
          true,
          false,
          "coordinacion/HojaVida/ConsultarHV"
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return next();
};
