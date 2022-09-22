const update = document.getElementById("#update-button");

if (update) {
  update.addEventListener("click", (_) => {
    fetch("/HojaVida/ConsultarHV/Edit-HV/<%= consultHV._id %>", {
      method: "put",
      headers: { "Content-Type": "application/json" },
    });
  });
}
