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
    toast.toastInfo("Advertencia", "Seleccione una respuesta");
    e.preventDefault();
  } else if (
    document.getElementById("criterioProf").value == "Rechazado" &&
    document.getElementById("motivo").value == ""
  ) {
    toast.toastInfo("Advertencia", "Escribe el motivo");
    e.preventDefault();
  }
}
