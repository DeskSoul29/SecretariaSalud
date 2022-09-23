const modalsUsuarios = (function () {
  var municipioExtra = function (selectP, muniExtra) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == selectP.value && array[i + 1] != "SOTO") {
        const valor = array[i + 1];
        var option = document.createElement("option");
        option.value = valor;
        option.text = valor;
        if (municipio != valor) {
          muniExtra.add(option);
        }
      }
    }
  };
  var llenadoMunicipiosEditUser = function (
    selectM,
    selectP,
    municipio,
    apoyo1,
    apoyo2,
    apoyo3
  ) {
    // Llenado de Municipios
    var extraMuni1 = document.getElementById("extraMuni1");
    var extraMuni2 = document.getElementById("extraMuni2");
    var extraMuni3 = document.getElementById("extraMuni3");

    for (var i = 0; i < array.length; i++) {
      if (array[i] == selectP.value && array[i + 1] != "SOTO") {
        const valor = array[i + 1];
        var option = document.createElement("option");
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");

        option.value = valor;
        option.text = valor;

        option1.value = valor;
        option1.text = valor;

        option2.value = valor;
        option2.text = valor;

        option3.value = valor;
        option3.text = valor;

        selectM.add(option);

        if (municipio != valor) {
          extraMuni1.add(option1);
          extraMuni2.add(option2);
          extraMuni3.add(option3);
        }
      }
    }

    selectM.value = municipio;
    extraMuni1.value = apoyo1;
    extraMuni2.value = apoyo2;
    extraMuni3.value = apoyo3;
  };

  var llenadoMunicipiosEditHV = function (selectM, selectP, municipio) {
    // Llenado de Municipios
    for (var i = 0; i < array.length; i++) {
      if (array[i] == selectP.value && array[i + 1] != "SOTO") {
        const option = document.createElement("option");
        const valor = array[i + 1];
        option.value = valor;
        option.text = valor;
        selectM.add(option);
      }
    }
    selectM.value = municipio;
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

  var eliminar_modal = function (user, nombre) {
    document.getElementById("userModal").value = user;
    document.getElementById("nombreModal").value = nombre;
  };

  return {
    municipioExtra: municipioExtra,
    eliminar_modal: eliminar_modal,
    llenadoMunicipiosEditUser: llenadoMunicipiosEditUser,
    llenadoMunicipiosEditHV: llenadoMunicipiosEditHV,
    llenadoCodigosEditHV: llenadoCodigosEditHV,
  };
})();

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
