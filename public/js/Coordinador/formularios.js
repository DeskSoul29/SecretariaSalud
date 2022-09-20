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
    document.getElementById("provinciaID").value == "Seleccione la Provincia" ||
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

function hvForm(e) {
  if (
    document.getElementById("estado").value == "Seleccione el Estado" ||
    document.getElementById("rLegal").value == 0 ||
    document.getElementById("direccion").value == 0 ||
    document.getElementById("rSocial").value == 0 ||
    document.getElementById("Nriesgo").value == 0 ||
    document.getElementById("tipoEsta").value == 0 ||
    document.getElementById("codEsta").value == "Seleccione el Codigo" ||
    document.getElementById("provinciaID").value == "Seleccione la Provincia" ||
    document.getElementById("muniSelect").value == "Seleccione el Municipio" ||
    document.getElementById("grupEsta").value == "Seleccione el Grupo"
  ) {
    toast.toastInfo("Advertencia", "Ingresar todos los Campos");
    e.preventDefault();
  }
}

// custom toast
$("#customClick").click(function () {
  iziToast.show({
    color: "dark",
    icon: "fa fa-user",
    title: "Hey",
    message: "Custom Toast!",
    progressBarColor: "rgb(0, 255, 184)",
    buttons: [
      [
        "<button>Ok</button>",
        function (instance, toast) {
          alert("Hello world!");
        },
      ],
      [
        "<button>Close</button>",
        function (instance, toast) {
          instance.hide(
            {
              transitionOut: "fadeOutUp",
            },
            toast
          );
        },
      ],
    ],
  });
});
