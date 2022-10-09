const modalsUsuarios = (function () {
  var changePass_modal = function (id, user) {
    document.getElementById("formChangePass").action =
      "/profesional/Cuentas/Usuarios/ChangePass/" + id;
    document.getElementById("userPass").value = user;
  };

  return {
    changePass_modal: changePass_modal,
  };
})();
const modalsEstablecimientos = (function () {
  var consolidacionVer = function (consolidacion) {
    if (consolidacion.value == "Eventos en Salud Pública") {
      window.open(
        "/profesional/Consolidaciones/Ver/EventosSaludPublica",
        "_self"
      );
    } else if (consolidacion.value == "Establecimientos") {
      window.open("/profesional/Consolidaciones/Ver/Establecimientos", "_self");
    } else if (consolidacion.value == "Morgues") {
      window.open("/profesional/Consolidaciones/Ver/Morgues", "_self");
    } else if (consolidacion.value == "Cementerios") {
      window.open("/profesional/Consolidaciones/Ver/Cementerios", "_self");
    } else if (consolidacion.value == "I.V.C. Publicidad") {
      window.open("/profesional/Consolidaciones/Ver/IVCPublicidad", "_self");
    } else if (consolidacion.value == "I.V.C. Rotulado") {
      window.open("/profesional/Consolidaciones/Ver/IVCRotulado", "_self");
    } else if (consolidacion.value == "Medidas Sanitarias a Establecimientos") {
      window.open(
        "/profesional/Consolidaciones/Ver/MedSaniEstablecimientos",
        "_self"
      );
    } else if (consolidacion.value == "Medidas Sanitarias a Productos") {
      window.open("/profesional/Consolidaciones/Ver/MedSaniProductos", "_self");
    } else if (consolidacion.value == "Vehiculos") {
      window.open("/profesional/Consolidaciones/Ver/Vehiculos", "_self");
    } else if (consolidacion.value == "Quejas") {
      window.open("/profesional/Consolidaciones/Ver/Quejas", "_self");
    } else if (consolidacion.value == "Toma de Muestras") {
      window.open("/profesional/Consolidaciones/Ver/TomaMuestras", "_self");
    } else if (consolidacion.value == "Educación Sanitaria") {
      window.open("/profesional/Consolidaciones/Ver/EduSanitaria", "_self");
    } else if (consolidacion.value == "Listado De Carnetizados") {
      window.open(
        "/profesional/Consolidaciones/Ver/ListadoCarnetizados",
        "_self"
      );
    } else if (consolidacion.value == "Antirrabica Animal") {
      window.open(
        "/profesional/Consolidaciones/Ver/AntirrabicaAnimal",
        "_self"
      );
    }
  };

  return {
    consolidacionVer: consolidacionVer,
  };
})();

$("#btnConsolidacion").click(function () {
  if (
    document.getElementById("consoID").value == "Seleccione la Consolidación"
  ) {
    toast.toastInfo("Advertencia", "Seleccione un Formato");
  } else {
    document.getElementById("consolidacion").style = "display:none";
    modalsEstablecimientos.consolidacion(document.getElementById("consoID"));
  }
});

$("#btnConsolidacionVer").click(function () {
  if (
    document.getElementById("consoID").value == "Seleccione la Consolidación"
  ) {
    toast.toastInfo("Advertencia", "Seleccione un Formato");
  } else {
    document.getElementById("consolidacionVer").style = "display:none";
    modalsEstablecimientos.consolidacionVer(document.getElementById("consoID"));
  }
});

if (criterioProf != null) {
  document
    .getElementById("criterioProf")
    .addEventListener("change", function () {
      if (document.getElementById("criterioProf").value == "Rechazado") {
        document.getElementById("divMotivo").removeAttribute("style");
        document.getElementById("motivo").value = "";
      } else {
        document.getElementById("divMotivo").style = "display:none";
      }
    });
}
