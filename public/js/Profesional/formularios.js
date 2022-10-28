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

if (document.getElementById("mesNA") != null) {
  if (date.getDate() < 5) {
    document.getElementById("mesNA").value = MESES[date.getMonth() - 1];
  } else {
    document.getElementById("mesNA").value = MESES[date.getMonth()];
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
function formChangePass(e) {
  if (
    document.getElementById("pass").value == 0 ||
    document.getElementById("repass").value == 0
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (
    document.getElementById("pass").value !=
    document.getElementById("repass").value
  ) {
    toast.toastInfo("Advertencia", "Contraseñas Diferentes");
    e.preventDefault();
  }
}

function addMuniForm(e) {
  if (document.getElementById("rol").value == "tecnico") {
    if (document.getElementById("extraMuni1").value != "Ninguno") {
      if (
        document.getElementById("extraMuni1").value ==
          document.getElementById("muniSelect").value ||
        document.getElementById("extraMuni1").value ==
          document.getElementById("extraMuni2").value ||
        document.getElementById("extraMuni1").value ==
          document.getElementById("extraMuni3").value
      ) {
        toast.toastInfo(
          "Advertencia",
          "Municipios de Apoyo Deben ser Diferentes"
        );
        e.preventDefault();
      }
    }

    if (document.getElementById("extraMuni2").value != "Ninguno") {
      if (
        document.getElementById("extraMuni2").value ==
          document.getElementById("muniSelect").value ||
        document.getElementById("extraMuni2").value ==
          document.getElementById("extraMuni3").value
      ) {
        toast.toastInfo(
          "Advertencia",
          "Municipios de Apoyo Deben ser Diferentes"
        );
        e.preventDefault();
      }
    }

    if (document.getElementById("extraMuni3").value != "Ninguno") {
      if (
        document.getElementById("extraMuni3").value ==
        document.getElementById("muniSelect").value
      ) {
        toast.toastInfo(
          "Advertencia",
          "Municipios de Apoyo Deben ser Diferentes"
        );
        e.preventDefault();
      }
    }
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

function novAdminis(e) {
  if (date.getDate() > 6) {
    toast.toastError("Advertencia", "Debe esperar hasta inicio de mes");
    e.preventDefault();
  } else {
    if (
      document.getElementById("muniSelect").value ==
        "Seleccione el Municipio" ||
      document.getElementById("entreCrono").value == "Seleccione" ||
      document.getElementById("entreAsis").value == "Seleccione" ||
      document.getElementById("entreCircu").value == "Seleccione" ||
      document.getElementById("myFile").files.length == 0
    ) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    } else if (
      document.getElementById("entreCrono").value == "SI" &&
      document.getElementById("fechCrono").value == 0
    ) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    } else if (
      document.getElementById("entreAsis").value == "SI" &&
      document.getElementById("fechAsis").value == 0
    ) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    } else if (
      document.getElementById("entreCircu").value == "SI" &&
      document.getElementById("NumCir").value == ""
    ) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    } else if (
      document.getElementById("numActas").value != 0 &&
      (document.getElementById("nomActas").value == "" ||
        document.getElementById("motDevol").value == "")
    ) {
      toast.toastInfo("Advertencia", "Ingresar todos los Campos");
      e.preventDefault();
    }
  }
}
