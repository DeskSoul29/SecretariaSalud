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

function eventSalud(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("etasPresent").value == "" ||
    document.getElementById("etasAtend").value == "" ||
    document.getElementById("intoxPresent").value == "" ||
    document.getElementById("intoxAtend").value == "" ||
    document.getElementById("agrePresent").value == "" ||
    document.getElementById("agreAtend").value == "" ||
    document.getElementById("trueFalse").value == "Seleccione"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (
    document.getElementById("etasPresent").value < 0 ||
    document.getElementById("etasAtend").value < 0 ||
    document.getElementById("intoxPresent").value < 0 ||
    document.getElementById("intoxAtend").value < 0 ||
    document.getElementById("agrePresent").value < 0 ||
    document.getElementById("agreAtend").value < 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar un numero mayor o igual a 0");
    e.preventDefault();
  } else if (document.getElementById("trueFalse").value == "SI") {
    if (document.getElementById("fReunion").value == 0) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    }
  }
}

function tomMuestraForm(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("tipMues").value == "Seleccione" ||
    document.getElementById("tipAnali").value == "Seleccione" ||
    document.getElementById("zona").value == "Seleccione" ||
    document.getElementById("objEst").value == "Seleccione" ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("acompañante").value == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (
    document.getElementById("tipMues").value == "ALIMENTOS" ||
    document.getElementById("tipMues").value == "BEBIDAS ALCOHOLICAS"
  ) {
    if (document.getElementById("descripTip").value == 0) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    }
  }
}

function morgueForm(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("accion").value == "Seleccione La Acción" ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("score").value == 0 ||
    document.getElementById("concepto").value == "Seleccione El Concepto"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  }
}

function eduSanitaria(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("temaCap").value == "Seleccione" ||
    document.getElementById("fechaCap").value == 0 ||
    document.getElementById("intensidadCap").value == "" ||
    document.getElementById("totalPersCap").value == "" ||
    document.getElementById("lugCap").value == 0 ||
    document.getElementById("personalCap").value == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("intensidadCap").value <= 0) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("temaCap").value == "OTROS") {
    if (document.getElementById("otrosCap").value == 0) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    }
  }
}

function listCarnetsForm(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("expCarnet").value == 0 ||
    document.getElementById("idenCarnet").value == "" ||
    document.getElementById("nameCarnet").value == 0 ||
    document.getElementById("estableciCarnet").value == 0 ||
    document.getElementById("direcCarnet").value == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  }
}

function antirrabicalAnimalForm(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("caninosUrbano").value === "" ||
    document.getElementById("caninosRural").value === "" ||
    document.getElementById("felinosUrbano").value === "" ||
    document.getElementById("felinosRural").value === ""
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  }
}

function establecimientosForm(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("score").value == 0 ||
    document.getElementById("concepto").value == "Seleccione El Concepto" ||
    document.getElementById("accion").value == "Seleccione La Acción" ||
    document.getElementById("acta").value == "Seleccione" ||
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

function medSaniEstaForm(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("solicitudApli").value == "Seleccione" ||
    document.getElementById("motivoApli").value == 0 ||
    document.getElementById("fApli").value == 0 ||
    document.getElementById("medidaApli").value == "Seleccione"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("solicitudApli").value == "SI") {
    if (document.getElementById("fechSancio").value == 0) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    }
  }
}
