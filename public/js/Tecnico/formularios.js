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

function establecimientosForm(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("score").value == 0 ||
    document.getElementById("concepto").value == "Seleccione El Concepto" ||
    document.getElementById("accion").value == "Seleccione La Acción" ||
    document.getElementById("acta").value == 0 ||
    document.getElementById("actaAnul").value == "Seleccione" ||
    document.getElementById("actaLey").value == "Seleccione"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("score").value > 100) {
    toast.toastInfo("Advertencia", "Ingresar un puntaje menor a 100");
    e.preventDefault();
  }

  if (document.getElementById("IVC").value == "ROTULADO") {
    if (document.getElementById("productoRotulado").value == 0) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    }
  }

  if (document.getElementById("IVC").value == "PUBLICIDAD") {
    if (
      document.getElementById("permisoSanitario").value == 0 ||
      document.getElementById("productoPublicidad").value == 0 ||
      document.getElementById("marca").value == 0 ||
      document.getElementById("medPubli").value == "Seleccione"
    ) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    }
  }
}

function vehiculosForm(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("classVehi").value == "Seleccione" ||
    document.getElementById("placa").value == 0 ||
    document.getElementById("refriV").value == "Seleccione" ||
    document.getElementById("nInscrip").value == 0 ||
    document.getElementById("produTrans").value == 0 ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("score").value == 0 ||
    document.getElementById("concepto").value == "Seleccione El Concepto"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("puntaje").value > 100) {
    toast.toastInfo("Advertencia", "Ingresar un puntaje menor a 100");
    e.preventDefault();
  } else if (
    document.getElementById("classVehi").value == "OTRO" &&
    document.getElementById("otroV").value == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  }
}

function cementerioForm(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("concepto").value == "Seleccione El Concepto" ||
    document.getElementById("accion").value == "Seleccione La Acción" ||
    document.getElementById("NecroMorg").value == "Seleccione"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  }
}
