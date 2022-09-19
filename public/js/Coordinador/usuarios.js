const modalsUsuarios = (function () {
  // Llenado de Municipios al cambiar el Select en el boton que abre el modal "Edit"
  const selectP = document.getElementById("provinciaID");
  const selectM = document.getElementById("muniSelect");

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
    $("#rol").val(rol);
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

  return {
    addMuni: addMuni,
    deleteMuni: deleteMuni,
    editar_modal: editar_modal,
    eliminar_modal: eliminar_modal,
  };
})();
