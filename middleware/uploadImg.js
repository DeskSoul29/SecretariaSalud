import { promisify } from "util";
import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/");
  },
  filename: (req, file, cb) => {
    cb(null, "login" + path.extname(file.originalname));
  },
});

var uploadFiles = multer({
  storage: storage,
  limits: { fileSize: 20000000 },
}).single("myFile");

var uploadFilesMiddleware = promisify(uploadFiles);

export default uploadFilesMiddleware;
