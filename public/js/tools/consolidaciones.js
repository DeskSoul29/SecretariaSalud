//Codigos de Establecimientos
var municipio = document.getElementById("muniSelect");
var tipEsta = document.getElementById("tipoEsta");

var razonSocial = document.getElementById("rSocial");
var identificacion = document.getElementById("inputIden");
var tipIdentificacion = document.getElementById("tIden");
var direccion = document.getElementById("direccion");
var estado = document.getElementById("estado");
var representante = document.getElementById("rLegal");
var phone = document.getElementById("phone");

var actaLeyIVC = document.getElementById("IVC");

tipEsta.addEventListener("change", function () {
  var selectedOption = this.options[tipEsta.selectedIndex];

  for (let i = razonSocial.options.length; i >= 1; i--) {
    razonSocial.remove(i);
  }

  for (var i = 0; i < arrayEsta.length; i++) {
    if (
      arrayEsta[i + 3] == selectedOption.value &&
      arrayEsta[i + 2] == municipio.value
    ) {
      const option = document.createElement("option");
      const valor = arrayEsta[i + 4];
      option.value = valor;
      option.text = valor;
      razonSocial.add(option);
    }
  }
});

razonSocial.addEventListener("change", function () {
  var selectedOption = this.options[razonSocial.selectedIndex];

  for (var i = 0; i < arrayEsta.length; i++) {
    if (
      arrayEsta[i + 4] == selectedOption.value &&
      arrayEsta[i + 2] == municipio.value
    ) {
      tipIdentificacion.value = arrayEsta[i + 5];
      identificacion.value = arrayEsta[i + 6];
      direccion.value = arrayEsta[i + 7];
      representante.value = arrayEsta[i + 8];
      estado.value = arrayEsta[i + 9];
      phone.value = arrayEsta[i + 10];
    }
  }
});

municipio.addEventListener("change", function () {
  codEsta.value = "";
  Nriesgo.value = "";
  tipIdentificacion.value = "";
  identificacion.value = "";
  direccion.value = "";
  representante.value = "";
  estado.value = "";
  grupEsta.selectedIndex = "Seleccione el Grupo";
  tipEsta.selectedIndex = "Seleccione el Tipo";
  razonSocial.selectedIndex = "Seleccione El Establecimiento";
  phone.value = "";

  for (let i = razonSocial.options.length; i >= 1; i--) {
    razonSocial.remove(i);
  }

  for (let i = tipEsta.options.length; i >= 1; i--) {
    tipEsta.remove(i);
  }
});

if (actaLeyIVC != null) {
  actaLeyIVC.addEventListener("change", function () {
    if (actaLeyIVC.value == "ROTULADO") {
      document.getElementById("rotuladoTemplate").removeAttribute("style");
      document.getElementById("publicidadTemplate").style = "display:none";
    } else if (actaLeyIVC.value == "PUBLICIDAD") {
      document.getElementById("publicidadTemplate").removeAttribute("style");
      document.getElementById("rotuladoTemplate").style = "display:none";
    } else {
      document.getElementById("publicidadTemplate").style = "display:none";
      document.getElementById("rotuladoTemplate").style = "display:none";
    }
  });
}
