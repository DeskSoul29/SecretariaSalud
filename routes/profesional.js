import { Router } from "express";
import moment from "moment";

import {
  users,
  fillMunicipio,
  hojavidaConsultAllProf,
  changePass,
  addMuniApoyo,
  SeeProvEstablecimiento,
  SeeProvMorgues,
  SeeProvCementerios,
  SeeProvEstaRotulado,
  SeeProvEstaPublicidad,
  SeeProvMedEstable,
  SeeProvMedProduct,
  SeeProvEventSaludPubli,
  SeeProvQuejas,
  SeeProvAntirrabica,
  SeeProvCarnetizados,
  SeeProvEduSanitaria,
  SeeProvVehiculos,
  SeeProvTomaMuestra,
} from "../controllers/profController.js";

import {
  isAuthenticatedProf,
  CodigosEstablecimientos,
  consultUser,
  inscribirEstablecimiento,
  logout,
} from "../helpers/auth.js";

const router = Router();

router.get("/", isAuthenticatedProf, (req, res) => {
  res.render("profesional/main", { user: req.user });
});

// Apartado: Usuarios
router.get("/Cuentas/Usuarios", isAuthenticatedProf, users, (req, res) => {
  res.render("profesional/Cuentas/usuarios", {
    user: req.user,
    users: req.users,
    alert: undefined,
  });
});
router.get(
  "/Cuentas/Usuarios/AddMuni/:id",
  isAuthenticatedProf,
  fillMunicipio,
  consultUser,
  (req, res) => {
    res.render("profesional/Cuentas/addMuni", {
      user: req.user,
      fields: req.localidades,
      alert: undefined,
      consultUser: req.consultUser,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/AddMuni/:id",
  isAuthenticatedProf,
  addMuniApoyo,
  (req, res) => {
    res.render("profesional/Cuentas/addMuni", {
      user: req.user,
      fields: false,
      alert: req.alert,
      consultUser: false,
    });
  }
);
router.post(
  "/Cuentas/Usuarios/ChangePass/:id",
  isAuthenticatedProf,
  changePass,
  (req, res) => {
    res.render("profesional/Cuentas/usuarios", {
      user: req.user,
      users: false,
      alert: req.alert,
    });
  }
);

//Apartado: Hojas de Vida
router.get(
  "/HojaVida/ConsultarHV",
  isAuthenticatedProf,
  hojavidaConsultAllProf,
  (req, res) => {
    res.render("profesional/HojaVida/ConsultarHVProf", {
      user: req.user,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/HojaVida/InscribirHV",
  isAuthenticatedProf,
  fillMunicipio,
  CodigosEstablecimientos,
  (req, res) => {
    res.render("profesional/HojaVida/InscribirHVProf", {
      user: req.user,
      fields: req.localidades,
      codigos: req.codigos,
      alert: undefined,
    });
  }
);
router.post(
  "/HojaVida/InscribirHV",
  isAuthenticatedProf,
  inscribirEstablecimiento,
  (req, res) => {
    res.render("profesional/HojaVida/InscribirHVProf", {
      user: req.user,
      alert: req.alert,
      fields: false,
      codigos: false,
    });
  }
);

// Apartado: Consolidaciones
router.get("/Consolidaciones/Ver", isAuthenticatedProf, (req, res) => {
  res.render("profesional/Visitas/mainVer", {
    user: req.user,
  });
});
router.get(
  "/Consolidaciones/Ver/Establecimientos",
  isAuthenticatedProf,
  SeeProvEstablecimiento,
  (req, res) => {
    res.render("profesional/Visitas/Ver/establecimientos", {
      user: req.user,
      Estable: req.consultEstable,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Morgues",
  isAuthenticatedProf,
  SeeProvMorgues,
  (req, res) => {
    res.render("profesional/Visitas/Ver/morgues", {
      user: req.user,
      morgues: req.morgues,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Cementerios",
  isAuthenticatedProf,
  SeeProvCementerios,
  (req, res) => {
    res.render("profesional/Visitas/Ver/cementerios", {
      user: req.user,
      cementerio: req.consultCementerios,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCRotulado",
  isAuthenticatedProf,
  SeeProvEstaRotulado,
  (req, res) => {
    res.render("profesional/Visitas/Ver/rotulado", {
      user: req.user,
      rotulado: req.consultRotulado,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/IVCPublicidad",
  isAuthenticatedProf,
  SeeProvEstaPublicidad,
  (req, res) => {
    res.render("profesional/Visitas/Ver/publicidad", {
      user: req.user,
      publicidad: req.consultPublicidad,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniEstablecimientos",
  isAuthenticatedProf,
  SeeProvMedEstable,
  (req, res) => {
    res.render("profesional/Visitas/Ver/medestablecimiento", {
      user: req.user,
      medEstable: req.consultMedEstable,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/MedSaniProductos",
  isAuthenticatedProf,
  SeeProvMedProduct,
  (req, res) => {
    res.render("profesional/Visitas/Ver/medproducto", {
      user: req.user,
      medProduc: req.consultMedProduct,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Vehiculos",
  isAuthenticatedProf,
  SeeProvVehiculos,
  (req, res) => {
    res.render("profesional/Visitas/Ver/vehiculos", {
      user: req.user,
      Vehiculo: req.consultVehiculos,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EventosSaludPublica",
  isAuthenticatedProf,
  SeeProvEventSaludPubli,
  (req, res) => {
    res.render("profesional/Visitas/Ver/EventSalPubli", {
      user: req.user,
      consultES: req.consultES,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/TomaMuestras",
  isAuthenticatedProf,
  SeeProvTomaMuestra,
  (req, res) => {
    res.render("profesional/Visitas/Ver/tomamuestras", {
      user: req.user,
      TomaM: req.consultTomaM,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/EduSanitaria",
  isAuthenticatedProf,
  SeeProvEduSanitaria,
  (req, res) => {
    res.render("profesional/Visitas/Ver/eduSanitaria", {
      user: req.user,
      EduSani: req.consultEdusani,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/ListadoCarnetizados",
  isAuthenticatedProf,
  SeeProvCarnetizados,
  (req, res) => {
    res.render("profesional/Visitas/Ver/listCarnets", {
      user: req.user,
      Carnetiz: req.consultCarnetiz,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/AntirrabicaAnimal",
  isAuthenticatedProf,
  SeeProvAntirrabica,
  (req, res) => {
    res.render("profesional/Visitas/Ver/antirrabica", {
      user: req.user,
      Antirrabi: req.consultAntirrabi,
      moment: moment,
    });
  }
);
router.get(
  "/Consolidaciones/Ver/Quejas",
  isAuthenticatedProf,
  SeeProvQuejas,
  (req, res) => {
    res.render("profesional/Visitas/Ver/quejas", {
      user: req.user,
      Queja: req.consultQueja,
      moment: moment,
    });
  }
);

router.get("/logout", logout);

export default router;
