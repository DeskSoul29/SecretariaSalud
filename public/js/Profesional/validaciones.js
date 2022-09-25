const modalsUsuarios = (function () {
  var changePass_modal = function (id, user) {
    document.getElementById("formChangePass").action =
      "/profesional/Cuentas/Usuarios/ChangePass/" + id;
    document.getElementById("userPass").value = user;
  };

  return {
    changePass_modal: changePass_modal,
  };
})();
