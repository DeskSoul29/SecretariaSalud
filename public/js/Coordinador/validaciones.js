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

const modalsUsuarios = (function () {
  var llenadoMunicipios = function (selectP, municipio) {
    //Eliminar el listado de Municipios si hay mas de 1
    for (let i = municipio.options.length; i >= 1; i--) {
      municipio.remove(i);
    }

    // Llenado de Municipios
    for (var i = 0; i < array.length; i++) {
      if (array[i] == selectP.value && array[i + 1] != "SOTO") {
        const valor = array[i + 1];
        var option = document.createElement("option");
        option.value = valor;
        option.text = valor;
        municipio.add(option);
      }
    }
  };

  var llenadoCodigosEditHV = function (grupEsta, tipoEsta, tipo) {
    //Llenado de Codigos
    for (var i = 0; i < arrayCod.length; i++) {
      if (arrayCod[i] == grupEsta.value) {
        const option = document.createElement("option");
        const valor = arrayCod[i + 2];
        option.value = valor;
        option.text = valor;
        tipoEsta.add(option);
      }
    }
    tipoEsta.value = tipo;
  };

  var eliminar_cons = function (id) {
    document
      .getElementById("formDeleteCons")
      .setAttribute("href", "/coordinacion/Consolidaciones/Delete/" + id);
  };

  var eliminar_modal = function (id, user, nombre) {
    document.getElementById("formDeleteUser").action =
      "/coordinacion/Cuentas/Usuarios/Delete/" + id;
    document.getElementById("userModal").value = user;
    document.getElementById("nombreModal").value = nombre;
  };

  var changePass_modal = function (id, user) {
    document.getElementById("formChangePass").action =
      "/coordinacion/Cuentas/Usuarios/ChangePass/" + id;
    document.getElementById("userPass").value = user;
  };

  var consolidacionVer = function (consolidacion) {
    if (consolidacion.value == "Eventos en Salud Pública") {
      window.open(
        "/coordinacion/Consolidaciones/Ver/EventosSaludPublica",
        "_self"
      );
    } else if (consolidacion.value == "Establecimientos") {
      window.open(
        "/coordinacion/Consolidaciones/Ver/Establecimientos",
        "_self"
      );
    } else if (consolidacion.value == "Morgues") {
      window.open("/coordinacion/Consolidaciones/Ver/Morgues", "_self");
    } else if (consolidacion.value == "Cementerios") {
      window.open("/coordinacion/Consolidaciones/Ver/Cementerios", "_self");
    } else if (consolidacion.value == "I.V.C. Publicidad") {
      window.open("/coordinacion/Consolidaciones/Ver/IVCPublicidad", "_self");
    } else if (consolidacion.value == "I.V.C. Rotulado") {
      window.open("/coordinacion/Consolidaciones/Ver/IVCRotulado", "_self");
    } else if (consolidacion.value == "Medidas Sanitarias a Establecimientos") {
      window.open(
        "/coordinacion/Consolidaciones/Ver/MedSaniEstablecimientos",
        "_self"
      );
    } else if (consolidacion.value == "Medidas Sanitarias a Productos") {
      window.open(
        "/coordinacion/Consolidaciones/Ver/MedSaniProductos",
        "_self"
      );
    } else if (consolidacion.value == "Vehiculos") {
      window.open("/coordinacion/Consolidaciones/Ver/Vehiculos", "_self");
    } else if (consolidacion.value == "Quejas") {
      window.open("/coordinacion/Consolidaciones/Ver/Quejas", "_self");
    } else if (consolidacion.value == "Toma de Muestras") {
      window.open("/coordinacion/Consolidaciones/Ver/TomaMuestras", "_self");
    } else if (consolidacion.value == "Educación Sanitaria") {
      window.open("/coordinacion/Consolidaciones/Ver/EduSanitaria", "_self");
    } else if (consolidacion.value == "Listado De Carnetizados") {
      window.open(
        "/coordinacion/Consolidaciones/Ver/ListadoCarnetizados",
        "_self"
      );
    } else if (consolidacion.value == "Antirrabica Animal") {
      window.open(
        "/coordinacion/Consolidaciones/Ver/AntirrabicaAnimal",
        "_self"
      );
    } else if (consolidacion.value == "Novedades Administrativas") {
      window.open(
        "/coordinacion/Consolidaciones/Ver/NoveAdministrativas",
        "_self"
      );
    }
  };

  return {
    eliminar_modal: eliminar_modal,
    eliminar_cons: eliminar_cons,
    changePass_modal: changePass_modal,
    llenadoMunicipios: llenadoMunicipios,
    llenadoCodigosEditHV: llenadoCodigosEditHV,
    consolidacionVer: consolidacionVer,
  };
})();

// Llenado de Municipios
var selectP = document.getElementById("provinciaID");
var selectM = document.getElementById("muniSelect");
var rol = document.getElementById("rol");

var extraMuni1 = document.getElementById("extraMuni1");
var extraMuni2 = document.getElementById("extraMuni2");
var extraMuni3 = document.getElementById("extraMuni3");

$("#btnConsolidacionVer").click(function () {
  if (
    document.getElementById("consoID").value == "Seleccione la Consolidación"
  ) {
    toast.toastInfo("Advertencia", "Seleccione un Formato");
  } else {
    modalsUsuarios.consolidacionVer(document.getElementById("consoID"));
  }
});

// Llenado de Municipios
if (selectP != undefined) {
  selectP.addEventListener("change", function () {
    modalsUsuarios.llenadoMunicipios(selectP, selectM);
    if (extraMuni1 != null) {
      modalsUsuarios.llenadoMunicipios(selectP, extraMuni1);
      modalsUsuarios.llenadoMunicipios(selectP, extraMuni2);
      modalsUsuarios.llenadoMunicipios(selectP, extraMuni3);
    }
  });
}

if (rol != undefined) {
  rol.addEventListener("change", function () {
    if (rol.value == "tecnico") {
      document.getElementById("inputApoyo").removeAttribute("style");
      modalsUsuarios.llenadoMunicipios(selectP, extraMuni1);
      modalsUsuarios.llenadoMunicipios(selectP, extraMuni2);
      modalsUsuarios.llenadoMunicipios(selectP, extraMuni3);
    } else {
      document.getElementById("inputApoyo").style = "display:none";
    }
  });
}

if (document.getElementById("criterio") != null) {
  document.getElementById("criterio").addEventListener("change", function () {
    if (document.getElementById("criterio").value == "Rechazado") {
      document.getElementById("divMotivo").removeAttribute("style");
      document.getElementById("motivo").value = "";
    } else {
      document.getElementById("divMotivo").style = "display:none";
    }
  });
}