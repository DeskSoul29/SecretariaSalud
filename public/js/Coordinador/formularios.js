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
    document.getElementById("user").value.length < 7 ||
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
    document.getElementById("user").value.length < 7 ||
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
    document.getElementById("idenSocial").value == 0 ||
    document.getElementById("direccion").value == 0 ||
    document.getElementById("rSocial").value == 0 ||
    document.getElementById("phone").value == 0 ||
    document.getElementById("tipoEsta").value == "Seleccione el Tipo" ||
    document.getElementById("inputIden").value == 0 ||
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("grupEsta").value == "Seleccione el Grupo" ||
    document.getElementById("tIden").value == "Seleccione"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  } else if (
    document.getElementById("grupEsta").value ==
      "VEHÍCULOS TRANSPORTADORES DE ALIMENTOS Y BEBIDAS" &&
    document.getElementById("placa").value == ""
  ) {
    toast.toastInfo("Advertencia", "Ingresar la placa del vehiculo");
    e.preventDefault();
  } else if (
    document.getElementById("grupEsta").value !=
      "VEHÍCULOS TRANSPORTADORES DE ALIMENTOS Y BEBIDAS" &&
    document.getElementById("rLegal").value == ""
  ) {
    toast.toastInfo("Advertencia", "Ingresar el Representante Legal");
    e.preventDefault();
  } else if (
    document.getElementById("user").value.length < 6 ||
    document.getElementById("user").value.length >= 11
  ) {
    toast.toastInfo("Advertencia", "Escribe una Identificación Correcta");
    e.preventDefault();
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

function changeImgFrom(e) {
  if (document.getElementById("myFile").files.length == 0) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  }
}

function configDateCron(e) {
  if (
    parseInt(document.getElementById("cronMin").value, 10) >=
    parseInt(document.getElementById("cronMax").value, 10)
  ) {
    toast.toastInfo(
      "Advertencia",
      "El 'Dia Minimo' debe ser menor a 'Dia Maximo'"
    );
    e.preventDefault();
  }
}

function configDateInf(e) {
  if (
    parseInt(document.getElementById("infMin").value, 10) >=
    parseInt(document.getElementById("infMax").value, 10)
  ) {
    toast.toastInfo(
      "Advertencia",
      "El 'Dia Minimo' debe ser menor a 'Dia Maximo'"
    );
    e.preventDefault();
  }
}
