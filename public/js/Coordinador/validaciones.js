const modalsUsuarios = (function () {
  var llenadoMunicipiosEditUser = function (
    selectM,
    selectP,
    municipio,
    apoyo1,
    apoyo2,
    apoyo3
  ) {
    // Llenado de Municipios
    for (var i = 0; i < array.length; i++) {
      if (array[i] == selectP.value && array[i + 1] != "SOTO") {
        const option = document.createElement("option");
        const valor = array[i + 1];
        option.value = valor;
        option.text = valor;
        selectM.add(option);
        document.getElementById("extraMuni1").add(option);
      }
    }
    selectM.value = municipio;
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

  var editar_modal = function (
    _id,
    user,
    nombre,
    apellido,
    provincia,
    municipio,
    rol
  ) {
    document.getElementById("user").value = user;
    document.getElementById("name").value = nombre;
    document.getElementById("lastname").value = apellido;
    document.getElementById("rol").value = rol;
  };

  return {
    editar_modal: editar_modal,
    eliminar_modal: eliminar_modal,
    llenadoMunicipiosEditUser: llenadoMunicipiosEditUser,
    llenadoMunicipiosEditHV: llenadoMunicipiosEditHV,
    llenadoCodigosEditHV: llenadoCodigosEditHV,
  };
})();

// Llenado de Municipios al cambiar el Select en el boton que abre el modal "Edit"
const selectP = document.getElementById("provinciaID");
const selectM = document.getElementById("muniSelect");

// Llenado de Municipios
selectP.addEventListener("change", function () {
  var selectedOption = this.options[selectP.selectedIndex];

  //Eliminar el listado de Municipios si hay mas de 1
  for (let i = selectM.options.length; i >= 1; i--) {
    selectM.remove(i);
  }

  // Llenado de Municipios
  for (var i = 0; i < array.length; i++) {
    if (array[i] == selectedOption.value && array[i + 1] != "SOTO") {
      const option = document.createElement("option");
      const valor = array[i + 1];
      option.value = valor;
      option.text = valor;
      selectM.add(option);
    }
  }
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
