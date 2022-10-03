import { Router } from "express";

import {
  hojavidaConsultAllTec,
  uploadFiles,
} from "../controllers/tecnicoController.js";
import {
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  inscribirEstablecimiento,
  logout,
} from "../helpers/auth.js";

const router = Router();
// Dashboard
router.get("/", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/main", { user: req.user });
});

// Apartado: Consolidaciones
router.get("/Consolidaciones/Ver", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/Visitas/mainVer", {
    user: req.user,
  });
});
router.get("/Consolidaciones/Enviar", isAuthenticatedTecnic, (req, res) => {
  res.render("tecnico/Visitas/mainEnviar", {
    user: req.user,
  });
});
router.get(
  "/Consolidaciones/Enviar/Establecimientos",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/Visitas/Consolidaciones/establecimientos", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/Vehiculos",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/Visitas/Consolidaciones/vehiculos", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/EventosSaludPublica",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Consolidaciones/eventSaludPublic", {
      user: req.user,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/TomaMuestras",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/Visitas/Consolidaciones/tomamuestras", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/EduSanitaria",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Consolidaciones/eduSanitaria", {
      user: req.user,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/ListadoCarnetizados",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Consolidaciones/listCarnets", {
      user: req.user,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/AntirrabicaAnimal",
  isAuthenticatedTecnic,
  (req, res) => {
    res.render("tecnico/Visitas/Consolidaciones/antirrabica", {
      user: req.user,
    });
  }
);
router.get(
  "/Consolidaciones/Enviar/Quejas",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/Visitas/Consolidaciones/quejas", {
      user: req.user,
      codigos: req.codigos,
      hojavida: req.hojavida,
    });
  }
);

//Apartado: Hojas de Vida
router.get(
  "/HojaVida/ConsultarHV",
  isAuthenticatedTecnic,
  hojavidaConsultAllTec,
  (req, res) => {
    res.render("tecnico/HojaVida/ConsultarHVTec", {
      user: req.user,
      hojavida: req.hojavida,
    });
  }
);
router.get(
  "/HojaVida/InscribirHV",
  isAuthenticatedTecnic,
  CodigosEstablecimientos,
  (req, res) => {
    res.render("tecnico/HojaVida/InscribirHVTec", {
      user: req.user,
      codigos: req.codigos,
      alert: undefined,
    });
  }
);
router.post(
  "/HojaVida/InscribirHV",
  isAuthenticatedTecnic,
  inscribirEstablecimiento,
  (req, res) => {
    res.render("tecnico/HojaVida/InscribirHVTec", {
      user: req.user,
      alert: req.alert,
      codigos: false,
    });
  }
);

router.post("/update", uploadFiles);

// router.post("/update", upload.array("myFiles", 12), (req, res, next) => {
//   const files = req.files;
//   if (!files) {
//     const error = new Error("Please choose files");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(files);
// });

router.get("/logout", logout);

export default router;
