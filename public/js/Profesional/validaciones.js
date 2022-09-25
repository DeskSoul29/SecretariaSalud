const modalsUsuarios = (function () {
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

  var changePass_modal = function (id, user) {
    document.getElementById("formChangePass").action =
      "/profesional/Cuentas/Usuarios/ChangePass/" + id;
    document.getElementById("userPass").value = user;
  };

  return {
    changePass_modal: changePass_modal,
    llenadoCodigosEditHV: llenadoCodigosEditHV,
  };
})();
