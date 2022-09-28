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
    if (consolidacion.value == "Vehiculos") {
      window.open("/tecnico/Consolidaciones/Enviar/Vehiculos", "_self");
    } else if (consolidacion.value == "Establecimientos") {
      window.open("/tecnico/Consolidaciones/Enviar/Establecimientos", "_self");
    } else if (consolidacion.value == "Cementerios") {
      window.open("/tecnico/Consolidaciones/Enviar/Cementerios", "_self");
    } else if (consolidacion.value == "Morgues") {
      window.open("/tecnico/Consolidaciones/Enviar/Morgues", "_self");
    }
  };

  return {
    consolidacion: consolidacion,
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
