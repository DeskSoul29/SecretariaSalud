const modalsUsuarios = (function () {
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
    var nodo = document.getElementById("formEditU");
    var a = document.createAttribute("action");
    a.value("/coordinacion/Cuentas/Usuarios/Edit/" + _id + "?_method=PUT");
    nodo.setAttributeNode(a);
    alert(nodo.getAttribute("action"));

    document.getElementById("rol2").value = rol;
    $("#rol2").val(rol);
  };

  var deleteMuni = function (user, nombre, muniEx) {
    document.getElementById("userDELETEMuni").value = user;
    document.getElementById("nombreDELETEMuni").value = nombre;
    document.getElementById("muniDELETE").value = muniEx;
  };

  var addMuni = function (user, nombre, provincia, municipio) {
    document.getElementById("userADDMuni").value = user;
    document.getElementById("nombreADDMuni").value = nombre;
    const selectMEx = document.getElementById("muniADD");
    //Eliminar el listado de Municipios si hay mas de 1
    for (let i = selectMEx.options.length; i >= 1; i--) {
      selectMEx.remove(i);
    }
    for (var i = 0; i < array.length; i++) {
      if (
        array[i] == provincia &&
        array[i + 1] != "SOTO" &&
        municipio != array[i + 1]
      ) {
        const option = document.createElement("option");
        const valor = array[i + 1];
        option.value = valor;
        option.text = valor;
        selectMEx.add(option);
      }
    }
  };

  return {
    addMuni: addMuni,
    deleteMuni: deleteMuni,
    editar_modal: editar_modal,
    eliminar_modal: eliminar_modal,
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
const codEsta = document.getElementById("codEsta");

grupEsta.addEventListener("change", function () {
  var selectedOption = this.options[grupEsta.selectedIndex];

  //Eliminar el listado de Codigos si hay mas de 1
  for (let i = codEsta.options.length; i >= 1; i--) {
    codEsta.remove(i);
  }

  // Llenado de Codigos
  for (var i = 0; i < arrayCod.length; i++) {
    if (arrayCod[i] == selectedOption.value) {
      const option = document.createElement("option");

      const valor = arrayCod[i + 1];
      option.value = valor;
      option.text = valor;
      codEsta.add(option);
    }
  }
});

codEsta.addEventListener("change", function () {
  var selectedOption = this.options[codEsta.selectedIndex];

  // Llenado de Tipo y Riesgo
  for (var i = 0; i < arrayCod.length; i++) {
    if (arrayCod[i + 1] == selectedOption.value) {
      document.getElementById("tipoEsta").value = arrayCod[i + 2];
      document.getElementById("Nriesgo").value = arrayCod[i + 3];
    }
  }
});
