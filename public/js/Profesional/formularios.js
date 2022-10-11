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

document.getElementById("fVisit").setAttribute("min", time.min(date));
document.getElementById("fVisit").setAttribute("max", time.max(date));
document.getElementById("fVisit").value = time.formatDate(date);

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
  if (document.getElementById("criterioProf").value == "Seleccione") {
    toast.toastInfo("Advertencia", "Seleccione un Criterio");
    e.preventDefault();
  } else if (
    document.getElementById("criterioProf").value == "Rechazado" &&
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
  if (
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("entreInfor").value == "Seleccione" ||
    document.getElementById("entreCrono").value == "Seleccione" ||
    document.getElementById("entreAsis").value == "Seleccione" ||
    document.getElementById("entreCircu").value == "Seleccione"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (
    document.getElementById("entreInfor").value == "SI" &&
    document.getElementById("fechInfor").value == 0
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
