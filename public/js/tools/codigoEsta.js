//Codigos de Establecimientos
const grupEsta = document.getElementById("grupEsta");
const tipoEsta = document.getElementById("tipoEsta");
const codEsta = document.getElementById("codEsta");
const Nriesgo = document.getElementById("Nriesgo");

grupEsta.addEventListener("change", function () {
  var selectedOption = this.options[grupEsta.selectedIndex];

  //Eliminar el listado de Codigos si hay mas de 1
  for (let i = tipoEsta.options.length; i >= 1; i--) {
    tipoEsta.remove(i);
    razonSocial.remove(i);
    razonSocial.selectedIndex = "Seleccione El Establecimiento";

    codEsta.value = "";
    Nriesgo.value = "";
    codEsta.value = "";
    Nriesgo.value = "";
    tipIdentificacion.value = "";
    identificacion.value = "";
    direccion.value = "";
    representante.value = "";
    estado.value = "";
    phone.value = "";
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

tipoEsta.addEventListener("change", function () {
  var selectedOption = this.options[tipoEsta.selectedIndex];

  tipIdentificacion.value = "";
  identificacion.value = "";
  direccion.value = "";
  representante.value = "";
  estado.value = "";
  phone.value = "";
  razonSocial.selectedIndex = "Seleccione El Establecimiento";
  // Llenado de Tipo y Riesgo
  for (var i = 0; i < arrayCod.length; i++) {
    if (arrayCod[i + 1] == selectedOption.value) {
      codEsta.value = arrayCod[i];
      Nriesgo.value = arrayCod[i + 2];
    }
  }
});
