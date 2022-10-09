import login from "../models/user.js";
import local from "../models/localidades.js";
import hojavida from "../models/hojavida.js";
import consolidaciones from "../models/consolidaciones.js";
import reportes from "../models/reportes.js";

import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";

var authProf = (function () {
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

  var UpdateConsoli = async (req, next, criterioProf, ruta) => {
    consolidaciones
      .findByIdAndUpdate(
        req.params._id,
        {
          $set: {
            status: criterioProf,
          },
        },
        { new: true }
      )
      .then((result) => {
        authProf.isUser(
          req,
          "Conexión exitosa",
          "Consolidación Enviada",
          "success",
          false,
          800,
          "profesional/Consolidaciones/Validar/AntirrabicaAnimal/" + ruta
        );
      });
    return next();
  };

  var SearchNextAntirrabica = async (req, next, provincia) => {
    return next();
  };

  return {
    isUser: isUser,
    UpdateConsoli: UpdateConsoli,
    SearchNextAntirrabica: SearchNextAntirrabica,
  };
})();

// Apartado: Cuentas - Usuarios
export const fillMunicipio = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      const localidades = await local.find({
        Provincia: decodificada.Provincia,
      });
      req.localidades = localidades;
      return next();
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
};
export const users = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    login
      .find({
        user: { $ne: decodificada.user },
        Provincia: {
          $eq: decodificada.Provincia,
        },
        rol: {
          $ne: "coordinacion",
        },
      })
      .exec(async (err, result) => {
        if (err) throw err;
        req.users = result;
        return next();
      });
  } catch (error) {
    console.log(error);
    return next();
  }
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
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Contraseña Actualizada Correctamente",
        "success",
        false,
        800,
        "profesional/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};
export const addMuniApoyo = async (req, res, next) => {
  var { extraMuni1, extraMuni2, extraMuni3 } = req.body;

  extraMuni1 = extraMuni1 == "Ninguno" ? "" : extraMuni1;
  extraMuni2 = extraMuni2 == "Ninguno" ? "" : extraMuni2;
  extraMuni3 = extraMuni3 == "Ninguno" ? "" : extraMuni3;

  await login
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          municipioExtra1: extraMuni1,
          municipioExtra2: extraMuni2,
          municipioExtra3: extraMuni3,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Municipios Añadidos Correctamente",
        "success",
        false,
        800,
        "profesional/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};

//Apartado: Hojas de Vida
export const hojavidaConsultAllProf = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      const hv = await hojavida
        .find({ Provincia: decodificada.Provincia })
        .lean();
      req.hojavida = hv;
      return next();
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
};

// Apartado: Consolidaciones
export const SeeProfEstablecimiento = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Estables = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
      })
      .lean();
    req.consultEstable = Estables;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEstablecimiento = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Establecimientos"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.establecimiento": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Establecimientos"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/Establecimientos/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfMorgues = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Morgues = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        tipo: "MORGUES",
      })
      .lean();
    req.morgues = Morgues;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportMorgues = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Morgues"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.establecimiento": { $eq: "on" },
      tipo: "MORGUES",
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Morgues"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/Morgues/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfCementerios = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Cementerios = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        tipo: "CEMENTERIOS (CON O SIN MORGUE)",
      })
      .lean();
    req.consultCementerios = Cementerios;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportCementerios = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Cementerios"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.establecimiento": { $eq: "on" },
      tipo: "CEMENTERIOS (CON O SIN MORGUE)",
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/Cementerios/" + ruta
      );
    })
    .catch((error) => console.error(error));

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Cementerios"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }
  return next();
};

export const SeeProfEstaRotulado = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Rotulado = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.rotulado": { $eq: "on" },
      })
      .lean();
    req.consultRotulado = Rotulado;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEstaRotulado = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/IVCRotulado"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.establecimiento": { $eq: "on" },
      "consolidacion.rotulado": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/IVCRotulado"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/IVCRotulado/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfEstaPublicidad = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Publicidad = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.publicidad": { $eq: "on" },
      })
      .lean();
    req.consultPublicidad = Publicidad;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEstaPublicidad = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/IVCPublicidad"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.establecimiento": { $eq: "on" },
      "consolidacion.publicidad": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/IVCPublicidad"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/IVCPublicidad/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfMedEstable = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const MedEstable = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.MSEstablecimientos": { $eq: "on" },
      })
      .lean();
    req.consultMedEstable = MedEstable;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportMedEstable = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/MedSaniEstablecimientos"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.establecimiento": { $eq: "on" },
      "consolidacion.MSEstablecimientos": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/MedSaniEstablecimientos"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/MedSaniEstablecimientos/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfMedProduct = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const MedProduct = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.establecimiento": { $eq: "on" },
        "consolidacion.MSProductos": { $eq: "on" },
      })
      .lean();
    req.consultMedProduct = MedProduct;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportMedProduct = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/MedSaniProductos"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.establecimiento": { $eq: "on" },
      "consolidacion.MSProductos": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/MedSaniProductos"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/MedSaniProductos/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfEventSaludPubli = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const EventSalud = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.EvenSaludPubli": { $eq: "on" },
      })
      .lean();
    req.consultES = EventSalud;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEventSaludPubli = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/EventosSaludPublica"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.EvenSaludPubli": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/EventosSaludPublica"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/EventosSaludPublica/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfQuejas = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Queja = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.quejas": { $eq: "on" },
      })
      .lean();
    req.consultQueja = Queja;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportQuejas = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Quejas"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.quejas": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Quejas"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/Quejas/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfAntirrabica = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const AntiRa = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.antirrabica": { $eq: "on" },
      })
      .lean();
    req.consultAntirrabi = AntiRa;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportAntirrabica = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/AntirrabicaAnimal"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.antirrabica": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/AntirrabicaAnimal"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/AntirrabicaAnimal/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfCarnetizados = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Carnets = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.lisCarnets": { $eq: "on" },
      })
      .lean();
    req.consultCarnetiz = Carnets;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportCarnetzados = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/ListadoCarnetizados"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.lisCarnets": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/ListadoCarnetizados"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/ListadoCarnetizados/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfEduSanitaria = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const EduSani = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.eduSanitaria": { $eq: "on" },
      })
      .lean();
    req.consultEdusani = EduSani;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportEduSanitaria = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/EduSanitaria"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.eduSanitaria": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/EduSanitaria"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/EduSanitaria/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfVehiculos = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const Vehicu = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.vehiculos": { $eq: "on" },
      })
      .lean();
    req.consultVehiculos = Vehicu;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportVehiculos = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Vehiculos"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.vehiculos": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/Vehiculos"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/Vehiculos/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const SeeProfTomaMuestra = async (req, res, next) => {
  try {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    const TomaM = await consolidaciones
      .find({
        Provincia: {
          $eq: decodificada.Provincia,
        },
        "consolidacion.tomaMuestra": { $eq: "on" },
      })
      .lean();
    req.consultTomaM = TomaM;
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
};
export const SendReportTomaMuestra = async (req, res, next) => {
  const decodificada = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETO
  );
  var { userTec, nameTec, criterioProf, motivo } = req.body;

  var report = new reportes({
    consolidacion: {
      userTec: userTec,
      nomTec: nameTec,
      consID: req.params._id,
    },
    profesional: {
      userProf: decodificada.user,
      nomProf: decodificada.nombres + " " + decodificada.apellidos,
    },
    respuestaProf: {
      criterioProf: criterioProf,
      motivoProf: motivo,
    },
  });

  await report.save().catch((error) => {
    authProf.isUser(
      req,
      "Reporte Cancelado",
      "Ya se encuentra un reporte en la Base de Datos",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/TomaMuestras"
    );
    return next();
  });

  const nextCons = await consolidaciones
    .find({
      Provincia: {
        $eq: decodificada.provincia,
      },
      "consolidacion.tomaMuestra": { $eq: "on" },
      status: {
        $eq: "Pendiente",
      },
      _id: {
        $ne: req.params._id,
      },
    })
    .sort({ crearedAt: 1 })
    .limit(1);

  if (nextCons.length === 0) {
    authProf.isUser(
      req,
      "Reportes Terminados",
      "Ha Terminado El Listado",
      "error",
      true,
      false,
      "/profesional/Consolidaciones/Ver/TomaMuestras"
    );
    return next();
  } else {
    var ruta = nextCons[0]._id;
  }

  await consolidaciones
    .findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          status: criterioProf,
        },
      },
      { new: true }
    )
    .then((result) => {
      authProf.isUser(
        req,
        "Conexión exitosa",
        "Consolidación Enviada",
        "success",
        false,
        800,
        "/profesional/Consolidaciones/Validar/TomaMuestras/" + ruta
      );
    })
    .catch((error) => console.error(error));
  return next();
};

export const ValProfConsolidaciones = async (req, res, next) => {
  req.consolidacion = await consolidaciones.findById(req.params._id).lean();
  return next();
};
