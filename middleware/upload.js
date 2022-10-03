import { promisify } from "util";
import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var uploadFiles = multer({
  storage: storage,
  limits: { fileSize: 20000000 },
}).array("myFiles", 10);

var uploadFilesMiddleware = promisify(uploadFiles);

export default uploadFilesMiddleware;
