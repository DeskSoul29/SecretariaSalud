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

function registerForm(e) {
  if (
    document.getElementById("name").value == 0 ||
    document.getElementById("lastname").value == 0 ||
    document.getElementById("user").value == 0 ||
    document.getElementById("pass").value == 0 ||
    document.getElementById("repass").value == 0 ||
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("rol").value == "Seleccione el Rol"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (
    document.getElementById("user").value.length < 8 ||
    document.getElementById("user").value.length >= 11
  ) {
    toast.toastInfo("Advertencia", "Escribe una Identificación Correcta");
    e.preventDefault();
  } else if (
    document.getElementById("pass").value !=
    document.getElementById("repass").value
  ) {
    toast.toastInfo("Advertencia", "Contraseñas Diferentes");
    e.preventDefault();
  } else if (document.getElementById("pass").value.length < 4) {
    toast.toastInfo(
      "Advertencia",
      "La Contraseña debe tener mas de 4 Caracteres"
    );
    e.preventDefault();
  }
}

function editUserForm(e) {
  if (
    document.getElementById("name").value == 0 ||
    document.getElementById("lastname").value == 0 ||
    document.getElementById("user").value == 0 ||
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("rol").value == "Seleccione el Rol"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (
    document.getElementById("user").value.length < 8 ||
    document.getElementById("user").value.length >= 11
  ) {
    toast.toastInfo("Advertencia", "Escribe una Identificación Correcta");
    e.preventDefault();
  } else if (document.getElementById("rol").value == "tecnico") {
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

function hvForm(e) {
  if (
    document.getElementById("estado").value == "Seleccione el Estado" ||
    document.getElementById("rLegal").value == 0 ||
    document.getElementById("direccion").value == 0 ||
    document.getElementById("rSocial").value == 0 ||
    document.getElementById("Nriesgo").value == 0 ||
    document.getElementById("codEsta").value == 0 ||
    document.getElementById("tipoEsta").value == "Seleccione el Tipo" ||
    document.getElementById("inputIden").value == 0 ||
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("grupEsta").value == "Seleccione el Grupo" ||
    document.getElementById("tIden").value == "Seleccione"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (
    document.getElementById("user").value.length < 6 ||
    document.getElementById("user").value.length >= 11
  ) {
    toast.toastInfo("Advertencia", "Escribe una Identificación Correcta");
    e.preventDefault();
  }
}
