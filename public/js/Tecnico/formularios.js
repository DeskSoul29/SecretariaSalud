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

var time = (function () {
  var formatDate = function (date) {
    return (
      date.getFullYear() +
      "-" +
      time.pad(date.getMonth() + 1) +
      "-" +
      time.pad(date.getDate())
    );
  };

  var max = function (date) {
    if (date.getDate() < 5) {
      return date.getFullYear() + "-" + time.pad(date.getMonth() + 1) + "-04";
    } else {
      if (date.getMonth() + 2 != 13) {
        return date.getFullYear() + "-" + time.pad(date.getMonth() + 2) + "-04";
      } else {
        return date.getFullYear() + 1 + "-01-04";
      }
    }
  };

  var min = function (date) {
    return date.getFullYear() + "-" + time.pad(date.getMonth()) + "-01";
  };

  var padMin = function (number) {
    if (number == 0) {
      return "12";
    } else if (number >= 1 && number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  };

  var pad = function (number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  };

  return {
    formatDate: formatDate,
    padMin: padMin,
    pad: pad,
    min: min,
    max: max,
  };
})();

let MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const date = new Date();

if (document.getElementById("mes") != null) {
  if (date.getDate() < 5) {
    document.getElementById("mes").value = MESES[date.getMonth() - 1];
  } else {
    document.getElementById("mes").value = MESES[date.getMonth()];
  }
}

if (document.getElementById("fVisit") != null) {
  document.getElementById("fVisit").value = time.formatDate(date);
  document.getElementById("fVisit").setAttribute("max", time.formatDate(date));

  if (date.getDate() > 4) {
    document
      .getElementById("fVisit")
      .setAttribute(
        "min",
        date.getFullYear() + "-" + time.pad(date.getMonth() + 1) + "-01"
      );
  } else {
    if (date.getMonth() == 0) {
      date.setMonth(date.getMonth() - 12);
      document.getElementById("fVisit").setAttribute("min", time.min(date));
    } else {
      document.getElementById("fVisit").setAttribute("min", time.min(date));
    }
  }
}

function eventSalud(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("etasPresent").value == "" ||
    document.getElementById("etasAtend").value == "" ||
    document.getElementById("intoxPresent").value == "" ||
    document.getElementById("intoxAtend").value == "" ||
    document.getElementById("agrePresent").value == "" ||
    document.getElementById("agreAtend").value == "" ||
    document.getElementById("myFile").files.length == 0 ||
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
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
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
    document.getElementById("acompananteEmp").value == 0 ||
    document.getElementById("myFile").files.length == 0
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
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function tomMuestraForm_2(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("tipMues").value == "Seleccione" ||
    document.getElementById("tipAnali").value == "Seleccione" ||
    document.getElementById("zona").value == "Seleccione" ||
    document.getElementById("objEst").value == "Seleccione" ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("acompananteEmp").value == 0 ||
    document.getElementById("myFile").files.length == 0 ||
    document.getElementById("myFile2").files.length == 0
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
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
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
    document.getElementById("personalCap").value == "Seleccione" ||
    document.getElementById("myFile").files.length == 0
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
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function listCarnetsForm(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("expCarnet").value == 0 ||
    document.getElementById("idenCarnet").value == "" ||
    document.getElementById("nameCarnet").value == 0 ||
    document.getElementById("estableciCarnet").value == 0 ||
    document.getElementById("direcCarnet").value == 0 ||
    document.getElementById("myFile").files.length == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function antirrabicalAnimalForm(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("Pcanina").value === "" ||
    document.getElementById("Pfelina").value === "" ||
    document.getElementById("caninosUrbano").value === "" ||
    document.getElementById("caninosRural").value === "" ||
    document.getElementById("felinosUrbano").value === "" ||
    document.getElementById("felinosRural").value === "" ||
    document.getElementById("myFile").files.length == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function establecimientosForm(e) {
  if (
    document.getElementById("rSocial").value ==
      "Seleccione El Establecimiento" ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("score").value == 0 ||
    document.getElementById("accion").value == "Seleccione La Acci??n" ||
    document.getElementById("actaLey").value == "Seleccione" ||
    document.getElementById("acta").value == "Seleccione" ||
    document.getElementById("myFile").files.length == 0 ||
    document.getElementById("idHV").value == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("score").value > 100) {
    toast.toastInfo("Advertencia", "Ingresar un puntaje menor a 100");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }

  if (document.getElementById("actaAnul") != null) {
    if (document.getElementById("actaAnul").value == "Seleccione") {
      toast.toastInfo("Advertencia", "Seleccione si el acta esta anulada");
      e.preventDefault();
    }
  }

  if (
    document.getElementById("tipoEsta").value ==
    "CEMENTERIOS (CON O SIN MORGUE)"
  ) {
    if (document.getElementById("NecroMorg").value == "Seleccione") {
      toast.toastInfo("Advertencia", "Seleccionar la respuesta de la Sala");
      e.preventDefault();
    }
  } else if (
    document.getElementById("tipoEsta").value != "MORGUES" &&
    document.getElementById("tipoEsta").value !=
      "CEMENTERIOS (CON O SIN MORGUE)"
  ) {
    //Publicidad
    if (document.getElementById("publicidadON").checked) {
      if (
        document.getElementById("permisoSanitario").value == 0 ||
        document.getElementById("productoPublicidad").value == 0 ||
        document.getElementById("marcaPublicidad").value == 0 ||
        document.getElementById("medPubli").value == "Seleccione"
      ) {
        toast.toastInfo(
          "Advertencia",
          "Ingresar todos los Campos de IVC Publicidad"
        );
        e.preventDefault();
      }
    }

    //Rotulado
    if (document.getElementById("rotuladoON").checked) {
      if (document.getElementById("productoRotulado").value == 0) {
        toast.toastInfo(
          "Advertencia",
          "Ingresar todos los Campos de IVC Rotulado"
        );
        e.preventDefault();
      }
    }

    //Medidas Sanitarias a Establecimientos
    if (document.getElementById("establecimientosON").checked) {
      if (
        document.getElementById("motivoApli").value == 0 ||
        document.getElementById("medidaApliEstable").value == "Seleccione"
      ) {
        toast.toastInfo(
          "Advertencia",
          "Ingresar todos los Campos de Medidas Sanitarias a Establecimientos"
        );
        e.preventDefault();
      }
    }

    //Medidas Sanitarias a Productos
    if (document.getElementById("productosON").checked) {
      if (
        document.getElementById("medidaApliProduc").value == "Seleccione" ||
        document.getElementById("permisoProduco").value == 0 ||
        document.getElementById("productoMed").value == 0 ||
        document.getElementById("marcaProduct").value == 0 ||
        document.getElementById("motivoProduct").value == 0 ||
        document.getElementById("presentProduct").value == 0 ||
        document.getElementById("cantProdu").value == 0 ||
        document.getElementById("fabriProduc").value == 0 ||
        document.getElementById("loteProduc").value == 0
      ) {
        toast.toastInfo(
          "Advertencia",
          "Ingresar todos los Campos de Medidas Sanitarias a Productos"
        );
        e.preventDefault();
      }
    }
  }
}

function quejasFormRech(e) {
  if (
    document.getElementById("tipQueja").value == "Seleccione" ||
    document.getElementById("fechRece").value == 0 ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("perCausa").value == 0 ||
    document.getElementById("perAfec").value == 0 ||
    document.getElementById("descQueja").value == 0 ||
    document.getElementById("requeQueja").value == 0 ||
    document.getElementById("myFile").files.length == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function quejasForm(e) {
  if (document.getElementById("comuniQuejas").checked) {
    if (
      document.getElementById("muniSelect2").value == "Seleccione el Municipio"
    ) {
      toast.toastInfo("Advertencia", "Elija el Municipio");
      e.preventDefault();
    }
  } else if (document.getElementById("estableQueja").checked) {
    if (
      document.getElementById("rSocial").value ==
        "Seleccione El Establecimiento" ||
      document.getElementById("idHV").value == 0
    ) {
      toast.toastInfo("Advertencia", "Elija un Establecimiento");
      e.preventDefault();
    }
  }

  if (
    document.getElementById("tipQueja").value == "Seleccione" ||
    document.getElementById("fechRece").value == 0 ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("perCausa").value == 0 ||
    document.getElementById("perAfec").value == 0 ||
    document.getElementById("descQueja").value == 0 ||
    document.getElementById("requeQueja").value == 0 ||
    document.getElementById("myFile").files.length == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
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
    document.getElementById("myFile").files.length == 0 ||
    document.getElementById("idHV").value == 0
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
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function VivSaludableForm(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("vereda").value == 0 ||
    document.getElementById("vivienda").value == "Seleccione" ||
    document.getElementById("direccion").value == 0 ||
    document.getElementById("fVisit").value == 0 ||
    document.getElementById("myFile").files.length == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function alertSaniForm(e) {
  if (
    document.getElementById("tipAlert").value == 0 ||
    document.getElementById("myFile").files.length == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function InsVivForm(e) {
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("vereda").value == 0 ||
    document.getElementById("vivienda").value == 0 ||
    document.getElementById("direccion").value == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  }
}

function validConsolidacion(e) {
  if (document.getElementById("criterio").value == "Seleccione") {
    toast.toastInfo("Advertencia", "Seleccione un Criterio");
    e.preventDefault();
  } else if (
    document.getElementById("criterio").value == "Rechazado" &&
    document.getElementById("motivo").value == ""
  ) {
    toast.toastInfo("Advertencia", "Escribe el motivo");
    e.preventDefault();
  }

  if (document.getElementById("actaAnul").value == "Seleccione") {
    toast.toastInfo("Advertencia", "Seleccione si el Acta fue anulada");
    e.preventDefault();
  }
}

function UploadCronograma(e) {
  if (
    document.getElementById("mesCron").value == "Seleccione" ||
    document.getElementById("myFileCron").files.length == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function UploadPermanencia(e) {
  if (document.getElementById("myFile").files.length == 0) {
    toast.toastInfo("Advertencia", "Debe subir un documento");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}

function UploadResultTM(e) {
  if (document.getElementById("myFile").files.length == 0) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (document.getElementById("myFile").files[0].size > 10000000) {
    toast.toastWarning("Advertencia", "Archivo muy pesado");
    e.preventDefault();
  }
}
