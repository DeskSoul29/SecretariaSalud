//Codigos de Establecimientos
const grupEsta = document.getElementById("grupEsta");
const grupEsta2 = document.getElementById("grupEsta2");
const tipoEsta = document.getElementById("tipoEsta");
const tipoEsta2 = document.getElementById("tipoEsta2");
const codEsta = document.getElementById("codEsta");
const Nriesgo = document.getElementById("Nriesgo");
const razonSocial = document.getElementById("rSocial");
const tipIdentificacion = document.getElementById("tIden");
const identificacion = document.getElementById("inputIden");
const direccion = document.getElementById("direccion");
const representante = document.getElementById("rLegal");
const estado = document.getElementById("estado");
const phone = document.getElementById("phone");

// if (grupEsta != null) {
//   grupEsta.addEventListener("change", function () {
//     var selectedOption = this.options[grupEsta.selectedIndex];

//     //Eliminar el listado de Codigos si hay mas de 1
//     for (let i = tipoEsta.options.length; i >= 1; i--) {
//       tipoEsta.remove(i);
//       razonSocial.remove(i);
//       razonSocial.selectedIndex = "Seleccione El Establecimiento";

//       codEsta.value = "";
//       Nriesgo.value = "";
//       codEsta.value = "";
//       Nriesgo.value = "";
//       tipIdentificacion.value = "";
//       identificacion.value = "";
//       direccion.value = "";
//       representante.value = "";
//       estado.value = "";
//       phone.value = "";
//     }

//     // Llenado de Codigos
//     for (var i = 0; i < arrayCod.length; i++) {
//       if (arrayCod[i] == selectedOption.value) {
//         const option = document.createElement("option");

//         const valor = arrayCod[i + 2];
//         option.value = valor;
//         option.text = valor;
//         tipoEsta.add(option);
//       }
//     }
//   });
// }
if (tipoEsta != null) {
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
}

if (grupEsta != null) {
  grupEsta.addEventListener("change", function () {
    var selectedOption = this.options[grupEsta.selectedIndex];

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
if (tipoEsta2 != null) {
  tipoEsta2.addEventListener("change", function () {
    var selectedOption = this.options[tipoEsta2.selectedIndex];

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
}
