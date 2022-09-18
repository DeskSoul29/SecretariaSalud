var toastCheck = function (title, mess) {
  return iziToast.success({
    timeout: 5000,
    icon: "fa fa-check",
    title: title,
    message: mess,
  });
};

var toastInfo = function (title, mess) {
  return iziToast.info({
    title: title,
    message: mess,
  });
};

var toastError = function (title, mess) {
  return iziToast.error({ title: title, message: mess });
};

var toastWarning = function (title, mess) {
  return iziToast.warning({
    title: title,
    message: mess,
  });
};
export { toastCheck, toastInfo, toastError, toastWarning };
