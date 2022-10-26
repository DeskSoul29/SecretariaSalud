import login from "../models/user.js";
import local from "../models/localidades.js";
import hojavida from "../models/hojavida.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import fs from "fs";
import consolidaciones from "../models/consolidaciones.js";
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

  var DeleteFile = async (nameFile) => {
    try {
      fs.unlinkSync("./upload/" + nameFile);
    } catch (err) {
      console.error("Something wrong happened removing the file", err);
    }
  };

  var DeleteConsolidacion = async (req, fileName, next) => {
    await consolidaciones
      .findByIdAndDelete(req.params.id)
      .then((result) => {
        authCoordi.isUser(
          req,
          "Conexión exitosa",
          "Eliminado Correctamente",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver"
        );
        authCoordi.DeleteFile(fileName);
      })
      .catch((error) => console.error(error));
    return next();
  };

  var UpdateCorreccion = async (req, next, nextCons) => {
    var { criterio, motivo } = req.body;

    await consolidaciones
      .findByIdAndUpdate(
        req.params._id,
        {
          $set: {
            status: criterio,
            "reporte.motivo": motivo,
            "reporte.fechRepor": new Date(),
          },
        },
        { new: true }
      )
      .then((result) => {
        if (nextCons.length === 0) {
          authCoordi.isUser(
            req,
            "Reportes Terminados",
            "Ha Terminado El Listado",
            "success",
            true,
            false,
            "/coordinacion/Consolidaciones/Ver"
          );
        } else {
          if (nextCons[0].consolidacion.establecimiento == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/Establecimientos/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.antirrabica == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/AntirrabicaAnimal/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.eduSanitaria == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/EduSanitaria/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.EvenSaludPubli == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/EventosSaludPublica/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.lisCarnets == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/ListadoCarnetizados/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.vehiculos == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/Vehiculos/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.tomaMuestra == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/TomaMuestras/" +
              nextCons[0]._id;
          } else if (nextCons[0].consolidacion.quejas == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/Quejas/" + nextCons[0]._id;
          } else if (nextCons[0].consolidacion.noveadministrativa == "on") {
            var rutaValidar =
              "/coordinacion/Consolidaciones/Validar/NoveAdministrativas/" +
              nextCons[0]._id;
          }
          authCoordi.isUser(
            req,
            "Conexión exitosa",
            "Consolidación Enviada",
            "success",
            false,
            800,
            rutaValidar
          );
        }
        return next();
      });
  };

  var SearchNextConsolidacion = async (req) => {
    return await consolidaciones
      .find({
        status: {
          $eq: "Enviado",
        },
        SendNovAd: {
          $eq: "on",
        },
        _id: {
          $ne: req.params._id,
        },
        "consolidacion.noveadministrativa": {
          $ne: "on",
        },
      })
      .sort({ createdAt: -1 })
      .limit(1);
  };

  var UpdateAllCemenMorg = async (req, tipos, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.establecimiento": "on",
          status: "Enviado",
          tipo: tipos,
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/Establecimientos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllAntirrabica = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.antirrabica": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/AntirrabicaAnimal"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllEstablecimiento = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.establecimiento": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/Establecimientos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllIVCPublicidad = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.publicidad": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/IVCPublicidad"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllIVCRotulado = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.rotulado": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/IVCRotulado"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllMSEstablecimientos = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.MSEstablecimientos": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/MedSaniEstablecimientos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllMSProductos = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.MSProductos": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/MedSaniProductos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllEduSanitaria = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.eduSanitaria": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/EduSanitaria"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllEventosSaludPublica = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.EvenSaludPubli": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/EventosSaludPublica"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllListadoCarnetizados = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.lisCarnets": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/ListadoCarnetizados"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllVehiculos = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.vehiculos": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/Vehiculos"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllTomaMuestras = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.tomaMuestra": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/TomaMuestras"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllQuejas = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.quejas": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/Quejas"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var UpdateAllNoveAdministrativas = async (req, next) => {
    await consolidaciones
      .updateMany(
        {
          "consolidacion.noveadministrativa": "on",
          status: "Enviado",
          SendNovAd: "on",
        },
        {
          $set: {
            status: "Aceptado",
          },
        }
      )
      .then((result) => {
        authCoordi.isUser(
          req,
          "Reportes Enviados",
          "Consolidaciones Enviadas",
          "success",
          false,
          800,
          "/coordinacion/Consolidaciones/Ver/NoveAdministrativas"
        );
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    isUser: isUser,
    DeleteFile: DeleteFile,
    DeleteConsolidacion: DeleteConsolidacion,
    UpdateCorreccion: UpdateCorreccion,
    SearchNextConsolidacion: SearchNextConsolidacion,
    UpdateAllCemenMorg: UpdateAllCemenMorg,
    UpdateAllAntirrabica: UpdateAllAntirrabica,
    UpdateAllEstablecimiento: UpdateAllEstablecimiento,
    UpdateAllIVCPublicidad: UpdateAllIVCPublicidad,
    UpdateAllIVCRotulado: UpdateAllIVCRotulado,
    UpdateAllMSEstablecimientos: UpdateAllMSEstablecimientos,
    UpdateAllMSProductos: UpdateAllMSProductos,
    UpdateAllEduSanitaria: UpdateAllEduSanitaria,
    UpdateAllEventosSaludPublica: UpdateAllEventosSaludPublica,
    UpdateAllListadoCarnetizados: UpdateAllListadoCarnetizados,
    UpdateAllVehiculos: UpdateAllVehiculos,
    UpdateAllTomaMuestras: UpdateAllTomaMuestras,
    UpdateAllQuejas: UpdateAllQuejas,
    UpdateAllNoveAdministrativas: UpdateAllNoveAdministrativas,
  };
})();

//Dashboard
export const ConsolidaEstadosCoor = async (req, res, next) => {
  //Consoldiaciones Enviadas
  await consolidaciones
    .find({
      status: {
        $eq: "Enviado",
      },
      SendNovAd: {
        $eq: "on",
      },
    })
    .count()
    .then((data) => {
      req.consEnv = data;
    });

  //Consolidaciones Aceptadas
  await consolidaciones
    .find({
      status: {
        $eq: "Aceptado",
      },
      SendNovAd: {
        $eq: "on",
      },
    })
    .count()
    .then((data) => {
      req.consAcep = data;
    });

  //Vacunas Antirrabica
  await consolidaciones
    .aggregate([
      {
        $match: {
          "consolidacion.antirrabica": "on",
          status: "Aceptado",
          SendNovAd: "on",
        },
      },
      { $group: { _id: null, suma: { $sum: "$ForAntirrabica.totalVac" } } },
    ])
    .then((data) => {
      if (data.length === 0) {
        req.vacunas = 0;
      } else {
        req.vacunas = data[0].suma;
      }
    });

  //Totas de Visitas
  await consolidaciones
    .find({
      status: {
        $eq: "Aceptado",
      },
      SendNovAd: {
        $eq: "on",
      },
      "consolidacion.establecimiento": {
        $eq: "on",
      },
    })
    .count()
    .then((data) => {
      req.visitAcep = data;
    });

  await consolidaciones
    .find({ "consolidacion.noveadministrativa": "on" })
    .then((data) => {
      req.estCon = data;
    });

  return next();
};

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
          "/coordinacion/Cuentas/Register"
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
        "/coordinacion/Cuentas/Usuarios"
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
        "/coordinacion/Cuentas/Usuarios"
      );
    })
    .catch((error) => console.error(error));
  return next();
};

//Apartado: Consolidaciones
export const deleteCons = async (req, res, next) => {
  await consolidaciones
    .findById(req.params.id)
    .then((result) => {
      if (result.SendNovAd == "off") {
        authCoordi.isUser(
          req,
          "Reporte Cancelado",
          "No se a enviado aun esta consolidacion",
          "error",
          true,
          false,
          "/coordinacion/Consolidaciones/Ver"
        );
        return next();
      } else if (result == null) {
        authCoordi.isUser(
          req,
          "Reporte Cancelado",
          "No se encontro la consolidacion",
          "error",
          true,
          false,
          "/coordinacion/Consolidaciones/Ver"
        );
        return next();
      } else {
        authCoordi.DeleteConsolidacion(req, result.evidencia.file, next);
      }
    })
    .catch((error) => {
      console.error(error);
      authCoordi.isUser(
        req,
        "Reporte Cancelado",
        "No Se Encontro la Consolidacion",
        "error",
        true,
        false,
        "/profesional/Consolidaciones/Ver"
      );
      return next();
    });
};
//Consolidaciones - Consultar
export const SeeCoorConsolidaciones = async (req, res, next) => {
  req.allConso = await consolidaciones
    .find({
      $or: [{ status: { $eq: "Enviado" } }, { status: { $eq: "Aceptado" } }],
    })
    .sort({ createdAt: -1 });
  return next();
};
//Consolidaciones - Validar
export const ConsolidaEnviada = async (req, res, next) => {
  await consolidaciones
    .findOne({
      _id: { $eq: req.params._id },
      status: { $eq: "Enviado" },
    })
    .then((data) => {
      if (data == null) {
        res.redirect("/404");
      } else {
        req.consRech = data;
      }
      return next();
    })
    .catch((error) => {
      console.log(error);
    });
};
export const SendManyAcept = async (req, res, next) => {
  if (req.params.tipCons == "establecimiento_cementerios") {
    var tipos = "CEMENTERIOS (CON O SIN MORGUE)";
    authCoordi.UpdateAllCemenMorg(req, tipos, next);
  } else if (req.params.tipCons == "establecimiento_morgues") {
    var tipos = "MORGUES";
    authCoordi.UpdateAllCemenMorg(req, tipos, next);
  } else {
    if (req.params.tipCons == "antirrabica") {
      authCoordi.UpdateAllAntirrabica(req, next);
    } else if (req.params.tipCons == "establecimiento") {
      authCoordi.UpdateAllEstablecimiento(req, next);
    } else if (req.params.tipCons == "publicidad") {
      authCoordi.UpdateAllIVCPublicidad(req, next);
    } else if (req.params.tipCons == "rotulado") {
      authCoordi.UpdateAllIVCRotulado(req, next);
    } else if (req.params.tipCons == "MSEstablecimientos") {
      authCoordi.UpdateAllMSEstablecimientos(req, next);
    } else if (req.params.tipCons == "MSProductos") {
      authCoordi.UpdateAllMSProductos(req, next);
    } else if (req.params.tipCons == "eduSanitaria") {
      authCoordi.UpdateAllEduSanitaria(req, next);
    } else if (req.params.tipCons == "EvenSaludPubli") {
      authCoordi.UpdateAllEventosSaludPublica(req, next);
    } else if (req.params.tipCons == "lisCarnets") {
      authCoordi.UpdateAllListadoCarnetizados(req, next);
    } else if (req.params.tipCons == "vehiculos") {
      authCoordi.UpdateAllVehiculos(req, next);
    } else if (req.params.tipCons == "tomaMuestra") {
      authCoordi.UpdateAllTomaMuestras(req, next);
    } else if (req.params.tipCons == "quejas") {
      authCoordi.UpdateAllQuejas(req, next);
    } else if (req.params.tipCons == "noveadministrativa") {
      authCoordi.UpdateAllNoveAdministrativas(req, next);
    }
  }
};
export const SendReport = async (req, res, next) => {
  var validar = await consolidaciones.findById(req.params._id);
  if (validar.status == "Enviado") {
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    var nextCons = await authCoordi.SearchNextConsolidacion(
      req,
      decodificada.provincia
    );
    authCoordi.UpdateCorreccion(req, next, nextCons);
  } else {
    authCoordi.isUser(
      req,
      "Reporte Cancelado",
      "No se encuentra en estado Enviado",
      "error",
      true,
      false,
      "/coordinacion/Consolidaciones/Ver"
    );
    return next();
  }
};

// Hojas de Vidas
export const hojavidaConsultAll = async (req, res, next) => {
  const hv = await hojavida.find({}).sort({ createdAt: -1 });
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
          "/coordinacion/HojaVida/ConsultarHV"
        );
      } else {
        authCoordi.isUser(
          req,
          "Advertencia",
          "Error en la Base de Datos",
          "error",
          true,
          false,
          "/coordinacion/HojaVida/ConsultarHV"
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return next();
};
