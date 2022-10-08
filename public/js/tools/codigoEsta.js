//Codigos de Establecimientos
const grupEsta = document.getElementById("grupEsta");
const tipoEsta = document.getElementById("tipoEsta");
const codEsta = document.getElementById("codEsta");
const Nriesgo = document.getElementById("Nriesgo");
const razonSocial = document.getElementById("rSocial");
const tipIdentificacion = document.getElementById("tIden");
const identificacion = document.getElementById("inputIden");
const direccion = document.getElementById("direccion");
const representante = document.getElementById("rLegal");
const estado = document.getElementById("estado");
const phone = document.getElementById("phone");

//Si el tipo de establecimiento es cambiado entonces me elimine los campos anteriores
if (tipoEsta != null) {
  tipoEsta.addEventListener("change", function () {
    var selectedOption = this.options[tipoEsta.selectedIndex];

    for (var i = 0; i < arrayCod.length; i++) {
      if (arrayCod[i + 1] == selectedOption.value) {
        codEsta.value = arrayCod[i];
        Nriesgo.value = arrayCod[i + 2];
      }
    }
  });
}

//Si el grupo de establecimiento es cambiado que me borre los valores asignados y me llene el select TipoEsta
if (grupEsta != null) {
  grupEsta.addEventListener("change", function () {
    var selectedOption = this.options[grupEsta.selectedIndex];

    if (document.getElementById("templeCementerios") != null) {
      document.getElementById("score").value = "";
      document.getElementById("concepto").value = "NO APLICA";

      document.getElementById("templeCementerios").style = "display:none";
      document.getElementById("extraEstablecimientoIVC").style = "display:none";
      document.getElementById("extraEstablecimientoMD").style = "display:none";

      //Deseleccionar los formularios extras en establecimientos
      document
        .querySelectorAll("#extraEstablecimiento input[type=checkbox]")
        .forEach(function (checkElement) {
          checkElement.checked = false;
        });
      document.getElementById("rotuladoTemplate").style = "display:none";
      document.getElementById("publicidadTemplate").style = "display:none";
      document.getElementById("MedProductosTemplate").style = "display:none";
      document.getElementById("MedEstablecimientosTemplate").style =
        "display:none";
    }

    //Eliminar el listado de Codigos si hay mas de 1
    for (let i = tipoEsta.options.length; i >= 1; i--) {
      tipoEsta.remove(i);
      codEsta.value = "Ninguno";
      Nriesgo.value = "Ninguno";
    }

    // Llenado de Codigos
    for (var i = 0; i < arrayCod.length; i++) {
      if (arrayCod[i] == selectedOption.value) {
        const option = document.createElement("option");

        const valor = arrayCod[i + 2];
        option.value = valor;
        option.text = valor;
        tipoEsta.add(option);
      }
    }
  });
}
