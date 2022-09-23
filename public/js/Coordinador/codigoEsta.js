// Llenado de Municipios al cambiar el Select en el boton que abre el modal "Edit"
const selectP = document.getElementById("provinciaID");
const selectM = document.getElementById("muniSelect");

var extraMuni1 = document.getElementById("extraMuni1");
var extraMuni2 = document.getElementById("extraMuni2");
var extraMuni3 = document.getElementById("extraMuni3");

// Llenado de Municipios
selectP.addEventListener("change", function () {
  var selectedOption = this.options[selectP.selectedIndex];

  //Eliminar el listado de Municipios si hay mas de 1
  for (let i = selectM.options.length; i >= 1; i--) {
    selectM.remove(i);
  }

  // Llenado de Municipios
  modalsUsuarios.municipioExtra(selectM);
  modalsUsuarios.municipioExtra(extraMuni1);
  modalsUsuarios.municipioExtra(extraMuni2);
  modalsUsuarios.municipioExtra(extraMuni3);
});

//Codigos de Establecimientos
const grupEsta = document.getElementById("grupEsta");
const tipoEsta = document.getElementById("tipoEsta");
const codEsta = document.getElementById("codEsta");
const Nriesgo = document.getElementById("Nriesgo");

grupEsta.addEventListener("change", function () {
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

tipoEsta.addEventListener("change", function () {
  var selectedOption = this.options[tipoEsta.selectedIndex];

  // Llenado de Tipo y Riesgo
  for (var i = 0; i < arrayCod.length; i++) {
    if (arrayCod[i + 1] == selectedOption.value) {
      codEsta.value = arrayCod[i];
      Nriesgo.value = arrayCod[i + 2];
    }
  }
});
