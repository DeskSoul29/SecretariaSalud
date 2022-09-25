const modalsUsuarios = (function () {
  var llenadoMunicipiosEditUser = function (selectP, municipio) {
    //Eliminar el listado de Municipios si hay mas de 1
    for (let i = municipio.options.length; i >= 1; i--) {
      municipio.remove(i);
    }

    // Llenado de Municipios
    for (var i = 0; i < array.length; i++) {
      if (array[i] == selectP.value && array[i + 1] != "SOTO") {
        const valor = array[i + 1];
        var option = document.createElement("option");
        option.value = valor;
        option.text = valor;
        municipio.add(option);
      }
    }
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

  var changePass_modal = function (id, user) {
    document.getElementById("userPass").value = user;
  };

  return {
    eliminar_modal: eliminar_modal,
    changePass_modal: changePass_modal,
    llenadoMunicipiosEditUser: llenadoMunicipiosEditUser,
    llenadoMunicipiosEditHV: llenadoMunicipiosEditHV,
    llenadoCodigosEditHV: llenadoCodigosEditHV,
  };
})();

// Llenado de Municipios
var selectP = document.getElementById("provinciaID");
var selectM = document.getElementById("muniSelect");
var rol = document.getElementById("rol");

var extraMuni1 = document.getElementById("extraMuni1");
var extraMuni2 = document.getElementById("extraMuni2");
var extraMuni3 = document.getElementById("extraMuni3");

// Llenado de Municipios
if (selectP != undefined) {
  selectP.addEventListener("change", function () {
    modalsUsuarios.llenadoMunicipiosEditUser(selectP, selectM);
  });
}

if (rol != undefined) {
  rol.addEventListener("change", function () {
    if (rol.value == "tecnico") {
      document.getElementById("inputApoyo").removeAttribute("style");
      modalsUsuarios.llenadoMunicipiosEditUser(selectP, extraMuni1);
      modalsUsuarios.llenadoMunicipiosEditUser(selectP, extraMuni2);
      modalsUsuarios.llenadoMunicipiosEditUser(selectP, extraMuni3);
    } else {
      document.getElementById("inputApoyo").style = "display:none";
    }
  });
}
