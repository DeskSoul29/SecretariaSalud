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

const modalsEstablecimientos = (function () {
  var consolidacion = function (consolidacion) {
    if (consolidacion.value == "Eventos en Salud Pública") {
      window.open(
        "/tecnico/Consolidaciones/Enviar/EventosSaludPublica",
        "_self"
      );
    } else if (consolidacion.value == "Vehiculos") {
      window.open("/tecnico/Consolidaciones/Enviar/Vehiculos", "_self");
    } else if (consolidacion.value == "Establecimientos") {
      window.open("/tecnico/Consolidaciones/Enviar/Establecimientos", "_self");
    } else if (consolidacion.value == "Toma de Muestras") {
      window.open("/tecnico/Consolidaciones/Enviar/TomaMuestras", "_self");
    } else if (consolidacion.value == "Educación Sanitaria") {
      window.open("/tecnico/Consolidaciones/Enviar/EduSanitaria", "_self");
    } else if (consolidacion.value == "Listado De Carnetizados") {
      window.open(
        "/tecnico/Consolidaciones/Enviar/ListadoCarnetizados",
        "_self"
      );
    } else if (consolidacion.value == "Antirrabica Animal") {
      window.open("/tecnico/Consolidaciones/Enviar/AntirrabicaAnimal", "_self");
    } else if (consolidacion.value == "Quejas") {
      window.open("/tecnico/Consolidaciones/Enviar/Quejas", "_self");
    }
  };

  var consolidacionVer = function (consolidacion) {
    if (consolidacion.value == "Eventos en Salud Pública") {
      window.open("/tecnico/Consolidaciones/Ver/EventosSaludPublica", "_self");
    } else if (consolidacion.value == "Establecimientos") {
      window.open("/tecnico/Consolidaciones/Ver/Establecimientos", "_self");
    } else if (consolidacion.value == "Morgues") {
      window.open("/tecnico/Consolidaciones/Ver/Morgues", "_self");
    } else if (consolidacion.value == "Cementerios") {
      window.open("/tecnico/Consolidaciones/Ver/Cementerios", "_self");
    } else if (consolidacion.value == "I.V.C. Publicidad") {
      window.open("/tecnico/Consolidaciones/Ver/IVCPublicidad", "_self");
    } else if (consolidacion.value == "I.V.C. Rotulado") {
      window.open("/tecnico/Consolidaciones/Ver/IVCRotulado", "_self");
    } else if (consolidacion.value == "Medidas Sanitarias a Establecimientos") {
      window.open(
        "/tecnico/Consolidaciones/Ver/MedSaniEstablecimientos",
        "_self"
      );
    } else if (consolidacion.value == "Medidas Sanitarias a Productos") {
      window.open("/tecnico/Consolidaciones/Ver/MedSaniProductos", "_self");
    } else if (consolidacion.value == "Vehiculos") {
      window.open("/tecnico/Consolidaciones/Ver/Vehiculos", "_self");
    } else if (consolidacion.value == "Quejas") {
      window.open("/tecnico/Consolidaciones/Ver/Quejas", "_self");
    } else if (consolidacion.value == "Toma de Muestras") {
      window.open("/tecnico/Consolidaciones/Ver/TomaMuestras", "_self");
    } else if (consolidacion.value == "Educación Sanitaria") {
      window.open("/tecnico/Consolidaciones/Ver/EduSanitaria", "_self");
    } else if (consolidacion.value == "Listado De Carnetizados") {
      window.open("/tecnico/Consolidaciones/Ver/ListadoCarnetizados", "_self");
    } else if (consolidacion.value == "Antirrabica Animal") {
      window.open("/tecnico/Consolidaciones/Ver/AntirrabicaAnimal", "_self");
    } else if (consolidacion.value == "Cronograma de Actividades") {
      window.open("/tecnico/Consolidaciones/Ver/", "_self");
    }
  };

  return {
    consolidacion: consolidacion,
    consolidacionVer: consolidacionVer,
  };
})();

$("#btnConsolidacion").click(function () {
  if (
    document.getElementById("consoID").value == "Seleccione la Consolidación"
  ) {
    toast.toastInfo("Advertencia", "Seleccione un Formato");
  } else {
    document.getElementById("consolidacion").style = "display:none";
    modalsEstablecimientos.consolidacion(document.getElementById("consoID"));
  }
});

$("#btnConsolidacionVer").click(function () {
  if (
    document.getElementById("consoID").value == "Seleccione la Consolidación"
  ) {
    toast.toastInfo("Advertencia", "Seleccione un Formato");
  } else {
    document.getElementById("consolidacionVer").style = "display:none";
    modalsEstablecimientos.consolidacionVer(document.getElementById("consoID"));
  }
});
