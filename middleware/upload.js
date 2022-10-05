import { promisify } from "util";
import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      req.params.user + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

var uploadFiles = multer({
  storage: storage,
  limits: { fileSize: 20000000 },
}).array("myFiles", 5);

var uploadFilesMiddleware = promisify(uploadFiles);

export default uploadFilesMiddleware;
