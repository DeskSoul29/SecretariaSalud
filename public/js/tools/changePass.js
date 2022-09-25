function formChangePassUserOne(e) {
  if (
    document.getElementById("actPass").value == "" ||
    document.getElementById("pass").value == "" ||
    document.getElementById("repass").value == ""
  ) {
    iziToast.info({
      title: "Advertencia",
      message: "Ingresar todos los Campos",
    });
    e.preventDefault();
  } else if (
    document.getElementById("pass").value !=
    document.getElementById("repass").value
  ) {
    iziToast.info({
      title: "Advertencia",
      message: "Contraseñas Nuevas Diferentes",
    });
    e.preventDefault();
  }
}
