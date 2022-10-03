$(function () {
  $(document)
    .on("click", ".btn-add", function (e) {
      e.preventDefault();

      var controlForm = $(".controls:first"),
        currentEntry = $(this).parents(".entry:first"),
        newEntry = $(currentEntry.clone()).appendTo(controlForm);

      newEntry.find("input").val("");
      controlForm
        .find(".entry:not(:last) .btn-add")
        .removeClass("btn-add")
        .addClass("btn-remove")
        .removeClass("btn-success")
        .addClass("btn-danger")
        .html('<span class="fa fa-trash"></span>');
    })
    .on("click", ".btn-remove", function (e) {
      $(this).parents(".entry:first").remove();

      e.preventDefault();
      return false;
    });
});

// Dropzone.autoDiscover = false;

// var myDropzone = new Dropzone("#dropzone", {
//   url: "/upload", // Set the url for your upload script location
//   paramName: "file", // The name that will be used to transfer the file
//   // acceptedFiles: ".png, .jpg, .jpeg",
//   maxFiles: 10,
//   maxFilesize: 30, // MB
//   addRemoveLinks: true,
//   dictRemoveFile: "Eliminar imagen",
//   dictMaxFilesExceeded: "Maximo 10 archivos",
//   addRemoveLinks: true,
//   accept: function (file, done) {
//     done();
//   },
// });

// var myDropzone = new Dropzone("#dropzone", {
//   url: "/upload",
//   dictDefaultMessage: "Arrastrar y soltar imagenes",
//   acceptedFiles: ".png, .jpg, .jpeg",
//   maxFilesize: 30,
//   maxFiles: 10,
//   parallelUploads: 10,
//   autoProcessQueue: false,
//   addRemoveLinks: true,
//   dictRemoveFile: "Eliminar imagen",
//   dictMaxFilesExceeded: "Maximo 10 imagenes",
//   paramName: "imagen",
//   init: function () {
//     const dropzone = this;
//     const botonPublicar = document.querySelector("#publicar");

//     botonPublicar.addEventListener("click", function () {
//       dropzone.processQueue();
//       dropzone.on("queuecomplete", function () {
//         if (dropzone.getActiveFiles().length == 0) {
//           return (window.location.href = "/upload");
//         }
//       });
//     });
//   },
// });
