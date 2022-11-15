var municipio = document.getElementById("muniSelect");
var tipEsta = document.getElementById("tipoEsta");
const idHV = document.getElementById("idHV");
const placa = document.getElementById("placa");

//Si el tipo de establecimiento es cambiado entonces me elimine los campos anteriores
tipEsta.addEventListener("change", function () {
  var selectedOption = this.options[tipEsta.selectedIndex];

  tipIdentificacion.value = "";
  identificacion.value = "";
  direccion.value = "";
  representante.value = "";
  estado.value = "";
  razonSocial.selectedIndex = "Seleccione El Establecimiento";
  phone.value = "";
  idHV.value = "";

  if (document.getElementById("templeCementerios")) {
    document.getElementById("score").value = "";
    document.getElementById("concepto").value = "NO APLICA";
    if (tipoEsta.value == "CEMENTERIOS (CON O SIN MORGUE)") {
      document.getElementById("templeCementerios").removeAttribute("style");
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
    } else if (
      tipoEsta.value == "MORGUES" ||
      tipoEsta.value == "Seleccione el Tipo"
    ) {
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
    } else {
      document.getElementById("templeCementerios").style = "display:none";
      document
        .getElementById("extraEstablecimientoIVC")
        .removeAttribute("style");
      document
        .getElementById("extraEstablecimientoMD")
        .removeAttribute("style");
    }
  }

  for (let i = razonSocial.options.length; i >= 1; i--) {
    razonSocial.remove(i);
    razonSocial.selectedIndex = "Seleccione El Establecimiento";
  }

  for (var i = 0; i < arrayEsta.length; i++) {
    if (arrayEsta[i] == municipio.value) {
      if (arrayEsta[i + 1] == selectedOption.value) {
        const option = document.createElement("option");
        const valor = arrayEsta[i + 2];
        option.value = valor;
        option.text = valor;
        razonSocial.add(option);
      }
    }
  }
});

razonSocial.addEventListener("change", function () {
  var selectedOption = this.options[razonSocial.selectedIndex];

  for (var i = 0; i < arrayEsta.length; i++) {
    if (arrayEsta[i] == municipio.value) {
      if (arrayEsta[i + 2] == selectedOption.value) {
        tipIdentificacion.value = arrayEsta[i + 3];
        identificacion.value = arrayEsta[i + 4];
        direccion.value = arrayEsta[i + 5];
        representante.value = arrayEsta[i + 6];
        estado.value = arrayEsta[i + 7];
        phone.value = arrayEsta[i + 8];
        idHV.value = arrayEsta[i + 9];
        if (placa != null) {
          placa.value = arrayEsta[i + 10];
        }
      }
    }
  }
});

if (municipio != null) {
  municipio.addEventListener("change", function () {
    codEsta.value = "";
    Nriesgo.value = "";
    tipIdentificacion.value = "";
    identificacion.value = "";
    direccion.value = "";
    representante.value = "";
    estado.value = "";
    grupEsta.selectedIndex = "Seleccione el Grupo";
    tipEsta.selectedIndex = "Seleccione el Tipo";
    razonSocial.selectedIndex = "Seleccione El Establecimiento";
    phone.value = "";
    idHV.value = "";

    if (document.getElementById("templeCementerios")) {
      document.getElementById("score").value = "";
      document.getElementById("concepto").value = "NO APLICA";
      document.getElementById("templeCementerios").style = "display:none";
      document.getElementById("extraEstablecimientoIVC").style = "display:none";
      document.getElementById("extraEstablecimientoMD").style = "display:none";
    }
    for (let i = razonSocial.options.length; i >= 1; i--) {
      razonSocial.remove(i);
    }

    for (let i = tipEsta.options.length; i >= 1; i--) {
      tipEsta.remove(i);
    }
  });
}
