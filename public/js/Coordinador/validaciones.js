const modalsUsuarios = (function () {
  var llenadoMunicipiosEditHV = function (selectM, selectP, provincia) {
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
    selectM.value = provincia;
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

  var deleteMuni = function (user, nombre, muniEx) {
    document.getElementById("userDELETEMuni").value = user;
    document.getElementById("nombreDELETEMuni").value = nombre;
    document.getElementById("muniDELETE").value = muniEx;
  };

  var addMuni = function (
    user,
    nombre,
    provincia,
    municipio,
    municipio1,
    municipio2,
    municipio3
  ) {
    document.getElementById("userADDMuni").value = user;
    document.getElementById("nombreADDMuni").value = nombre;
    const muniApoyos1 = document.getElementById("municipiosApoyo1");
    const muniApoyos2 = document.getElementById("municipiosApoyo2");
    const muniApoyos3 = document.getElementById("municipiosApoyo3");

    if (municipio1 == "") {
      muniApoyos1.innerHTML = `<label class="mr-sm-2" for="muniSelect">Municipio 1</label>
      <select id="muniADD1" name="muniADD1" class="custom-select mr-sm-2" required>
        <option selected disabled>Seleccione el Municipio</option>
      </select>`;
    } else {
      muniApoyos1.innerHTML =
        `<label class="mr-sm-2" for="muniSelect">Municipio 1</label>
    <input type="text" class="form-control" name="muniADD1" id="muniADD1" value="` +
        municipio1 +
        `" readonly>`;
    }

    if (municipio2 == "") {
      muniApoyos2.innerHTML = `<label class="mr-sm-2" for="muniSelect">Municipio 2</label>
      <select id="muniADD2" name="muniADD2" class="custom-select mr-sm-2" required>
        <option selected disabled>Seleccione el Municipio</option>
      </select>`;
    } else {
      muniApoyos2.innerHTML =
        `<label class="mr-sm-2" for="muniSelect">Municipio 2</label>
          <input type="text" class="form-control" name="muniADD1" id="muniADD1" value="` +
        municipio2 +
        `" readonly>`;
    }

    if (municipio3 == "") {
      muniApoyos3.innerHTML = `<label class="mr-sm-2" for="muniSelect">Municipio 3</label>
      <select id="muniADD3" name="muniADD3" class="custom-select mr-sm-2" required>
        <option selected disabled>Seleccione el Municipio</option>
      </select>`;
    } else {
      muniApoyos3.innerHTML =
        `<label class="mr-sm-2" for="muniSelect">Municipio 3</label>
          <input type="text" class="form-control" name="muniADD1" id="muniADD1" value="` +
        municipio3 +
        `" readonly>`;
    }

    const muni1 = document.getElementById("muniADD1");
    const muni2 = document.getElementById("muniADD2");
    const muni3 = document.getElementById("muniADD3");

    if (muni1.value === "Seleccione el Municipio") {
    }
    const selectMEx = muni1;

    //Eliminar el listado de Municipios si hay mas de 1
    for (let i = selectMEx.options.length; i >= 1; i--) {
      selectMEx.remove(i);
    }
    for (var i = 0; i < array.length; i++) {
      if (
        array[i] == provincia &&
        array[i + 1] != "VELEZ" &&
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
