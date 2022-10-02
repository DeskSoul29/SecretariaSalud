var municipio = document.getElementById("muniSelect");
var tipEsta = document.getElementById("tipoEsta");

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

  if (document.getElementById("templeCementerios")) {
    if (tipoEsta.value == "CEMENTERIOS (CON O SIN MORGUE)") {
      document.getElementById("templeCementerios").removeAttribute("style");
      document.getElementById("templeEstablecimientos").style = "display:none";
      document.getElementById("extraEstablecimiento").style = "display:none";
    } else if (
      tipoEsta.value == "MORGUES" ||
      tipoEsta.value == "Seleccione el Tipo"
    ) {
      document.getElementById("templeCementerios").style = "display:none";
      document.getElementById("templeEstablecimientos").style = "display:none";
      document.getElementById("extraEstablecimiento").style = "display:none";
    } else {
      document.getElementById("templeCementerios").style = "display:none";
      document
        .getElementById("templeEstablecimientos")
        .removeAttribute("style");
      document.getElementById("extraEstablecimiento").removeAttribute("style");
    }
  }

  for (let i = razonSocial.options.length; i >= 1; i--) {
    razonSocial.remove(i);
    razonSocial.selectedIndex = "Seleccione El Establecimiento";
  }

  for (var i = 0; i < arrayEsta.length; i++) {
    if (
      arrayEsta[i + 3] == selectedOption.value &&
      arrayEsta[i + 2] == municipio.value
    ) {
      const option = document.createElement("option");
      const valor = arrayEsta[i + 4];
      option.value = valor;
      option.text = valor;
      razonSocial.add(option);
    }
  }
});

razonSocial.addEventListener("change", function () {
  var selectedOption = this.options[razonSocial.selectedIndex];

  for (var i = 0; i < arrayEsta.length; i++) {
    if (
      arrayEsta[i + 4] == selectedOption.value &&
      arrayEsta[i + 2] == municipio.value
    ) {
      tipIdentificacion.value = arrayEsta[i + 5];
      identificacion.value = arrayEsta[i + 6];
      direccion.value = arrayEsta[i + 7];
      representante.value = arrayEsta[i + 8];
      estado.value = arrayEsta[i + 9];
      phone.value = arrayEsta[i + 10];
    }
  }
});

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
  if (document.getElementById("templeCementerios")) {
    document.getElementById("templeCementerios").style = "display:none";
    document.getElementById("templeEstablecimientos").style = "display:none";
    document.getElementById("extraEstablecimiento").style = "display:none";
  }
  for (let i = razonSocial.options.length; i >= 1; i--) {
    razonSocial.remove(i);
  }

  for (let i = tipEsta.options.length; i >= 1; i--) {
    tipEsta.remove(i);
  }
});
