Dropzone.autoDiscover = false;
var myDropzone = new Dropzone("#dropzone", {
  url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
  paramName: "file", // The name that will be used to transfer the file
  maxFiles: 10,
  maxFilesize: 30, // MB
  addRemoveLinks: true,
  accept: function (file, done) {
    if (file.name == "H1.jpg") {
      done("Naha, you don't.");
    } else {
      done();
    }
  },
});
