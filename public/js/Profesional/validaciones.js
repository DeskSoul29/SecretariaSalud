var toast = (function () {
  var toastCheck = function (title, mess) {
    return iziToast.success({
      timeout: 5000,
      icon: "fa fa-check",
      title: title,
      message: mess,
    });
  };

  var toastInfo = function (title, mess) {
    return iziToast.info({
      title: title,
      message: mess,
    });
  };

  var toastError = function (title, mess) {
    return iziToast.error({ title: title, message: mess });
  };

  var toastWarning = function (title, mess) {
    return iziToast.warning({
      title: title,
      message: mess,
    });
  };
  return {
    toastCheck: toastCheck,
    toastInfo: toastInfo,
    toastError: toastError,
    toastWarning: toastWarning,
  };
})();
const modalsUsuarios = (function () {
  var changePass_modal = function (id, user) {
    document.getElementById("formChangePass").action =
      "/profesional/Cuentas/Usuarios/ChangePass/" + id;
    document.getElementById("userPass").value = user;
  };

  return {
    changePass_modal: changePass_modal,
  };
})();
const modalsEstablecimientos = (function () {
  var consolidacion = function (consolidacion) {
    if (consolidacion.value == "Eventos en Salud Pública") {
      window.open(
        "/profesional/Consolidaciones/Enviar/EventosSaludPublica",
        "_self"
      );
    } else if (consolidacion.value == "Vehiculos") {
      window.open("/profesional/Consolidaciones/Enviar/Vehiculos", "_self");
    } else if (consolidacion.value == "Establecimientos") {
      window.open(
        "/profesional/Consolidaciones/Enviar/Establecimientos",
        "_self"
      );
    } else if (consolidacion.value == "Toma de Muestras") {
      window.open("/profesional/Consolidaciones/Enviar/TomaMuestras", "_self");
    } else if (consolidacion.value == "Educación Sanitaria") {
      window.open("/profesional/Consolidaciones/Enviar/EduSanitaria", "_self");
    } else if (consolidacion.value == "Listado De Carnetizados") {
      window.open(
        "/profesional/Consolidaciones/Enviar/ListadoCarnetizados",
        "_self"
      );
    } else if (consolidacion.value == "Antirrabica Animal") {
      window.open(
        "/profesional/Consolidaciones/Enviar/AntirrabicaAnimal",
        "_self"
      );
    } else if (consolidacion.value == "Quejas") {
      window.open("/profesional/Consolidaciones/Enviar/Quejas", "_self");
    } else if (consolidacion.value == "Informe Mensual") {
      window.open(
        "/profesional/Consolidaciones/Enviar/NoveAdministrativa",
        "_self"
      );
    } else if (consolidacion.value == "Vivienda Saludable") {
      window.open(
        "/profesional/Consolidaciones/Enviar/ViviendaSaludable",
        "_self"
      );
    }
  };

  var consolidacionVer = function (consolidacion) {
    if (consolidacion.value == "Eventos en Salud Pública") {
      window.open(
        "/profesional/Consolidaciones/Ver/EventosSaludPublica",
        "_self"
      );
    } else if (consolidacion.value == "Establecimientos") {
      window.open("/profesional/Consolidaciones/Ver/Establecimientos", "_self");
    } else if (consolidacion.value == "Morgues") {
      window.open("/profesional/Consolidaciones/Ver/Morgues", "_self");
    } else if (consolidacion.value == "Cementerios") {
      window.open("/profesional/Consolidaciones/Ver/Cementerios", "_self");
    } else if (consolidacion.value == "I.V.C. Publicidad") {
      window.open("/profesional/Consolidaciones/Ver/IVCPublicidad", "_self");
    } else if (consolidacion.value == "I.V.C. Rotulado") {
      window.open("/profesional/Consolidaciones/Ver/IVCRotulado", "_self");
    } else if (consolidacion.value == "Medidas Sanitarias a Establecimientos") {
      window.open(
        "/profesional/Consolidaciones/Ver/MedSaniEstablecimientos",
        "_self"
      );
    } else if (consolidacion.value == "Medidas Sanitarias a Productos") {
      window.open("/profesional/Consolidaciones/Ver/MedSaniProductos", "_self");
    } else if (consolidacion.value == "Vehiculos") {
      window.open("/profesional/Consolidaciones/Ver/Vehiculos", "_self");
    } else if (consolidacion.value == "Quejas") {
      window.open("/profesional/Consolidaciones/Ver/Quejas", "_self");
    } else if (consolidacion.value == "Toma de Muestras") {
      window.open("/profesional/Consolidaciones/Ver/TomaMuestras", "_self");
    } else if (consolidacion.value == "Educación Sanitaria") {
      window.open("/profesional/Consolidaciones/Ver/EduSanitaria", "_self");
    } else if (consolidacion.value == "Listado De Carnetizados") {
      window.open(
        "/profesional/Consolidaciones/Ver/ListadoCarnetizados",
        "_self"
      );
    } else if (consolidacion.value == "Antirrabica Animal") {
      window.open(
        "/profesional/Consolidaciones/Ver/AntirrabicaAnimal",
        "_self"
      );
    } else if (consolidacion.value == "Informe Mensual") {
      window.open(
        "/profesional/Consolidaciones/Ver/NoveAdministrativa",
        "_self"
      );
    } else if (consolidacion.value == "Cronograma de Actividades") {
      window.open(
        "/profesional/Consolidaciones/Ver/CronogramaMensual",
        "_self"
      );
    } else if (consolidacion.value == "Vivienda Saludable") {
      window.open(
        "/profesional/Consolidaciones/Ver/ViviendaSaludable",
        "_self"
      );
    } else if (consolidacion.value == "Permanencia en Municipio") {
      window.open("/profesional/Consolidaciones/Ver/PermMunicipio", "_self");
    } else if (consolidacion.value == "Alertas Sanitarias") {
      window.open("/profesional/Consolidaciones/Ver/AlertaSanitaria", "_self");
    }
  };

  var eliminar_cons = function (id) {
    document
      .getElementById("formDeleteCons")
      .setAttribute("href", "/profesional/Consolidaciones/Delete/" + id);
  };

  return {
    consolidacionVer: consolidacionVer,
    consolidacion: consolidacion,
    eliminar_cons: eliminar_cons,
  };
})();

$("#btnConsolidacion").click(function () {
  if (
    document.getElementById("consoID").value == "Seleccione la Consolidación"
  ) {
    toast.toastInfo("Advertencia", "Seleccione un Formato");
  } else {
    modalsEstablecimientos.consolidacion(document.getElementById("consoID"));
  }
});

$("#btnConsolidacionVer").click(function () {
  if (
    document.getElementById("consoID").value == "Seleccione la Consolidación"
  ) {
    toast.toastInfo("Advertencia", "Seleccione un Formato");
  } else {
    modalsEstablecimientos.consolidacionVer(document.getElementById("consoID"));
  }
});

if (document.getElementById("criterio") != null) {
  document.getElementById("criterio").addEventListener("change", function () {
    if (document.getElementById("criterio").value == "Rechazado") {
      document.getElementById("divMotivo").removeAttribute("style");
      document.getElementById("motivo").value = "";
    } else {
      document.getElementById("divMotivo").style = "display:none";
    }
  });
}
