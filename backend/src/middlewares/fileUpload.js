const Errors = require("../errors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const MAX_SIZE = 7 * 1024 * 1024; // 7MB

const FILE_FILTER = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf",
  "application/octet-stream",
];

function getFileFieldName(fileType) {
  console.log(
    "🚀  ~ file: fileUpload.js:11 ~ getFileFieldName ~ fileType:",
    fileType
  );
  if (FILE_FILTER.includes(fileType)) {
    return "file";
  } else {
    return Errors.BadRequestError(
      `File types must be of ${fileType.join(", ")} only`
    );
  }
}

const fileDestinations = {
  file: "files",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("🚀  ~ file: fileUpload.js:35 ~ file:", file);

    const fieldName = file.fieldname;
    const fileRootDir = path.join(__dirname, "../../public/uploads");

    fs.mkdirSync(fileRootDir, { recursive: true });
    const uploadPath = path.join(fileRootDir, fileDestinations[fieldName]);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const fileTypes = {
  file: FILE_FILTER,
};

const fileFilter = (req, file, cb) => {
  console.log("🚀  ~ file: fileUpload.js:81 ~ fileFilter ~ file:", file);

  if (file.fieldname === "file") {
    file.fieldname = getFileFieldName(file.mimetype);
  }

  req.fieldName = file.fieldname;

  const fileType = fileTypes[file.fieldname];

  console.log(fileType, file.mimetype);

  if (!fileType.includes(file.mimetype)) {
    return cb(
      Errors.invalidRequestError(
        `File types must be of ${fileType.join(", ")} only`
      ),
      false
    );
  }
  cb(null, true);
};

const fileUpload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: fileFilter,
});

module.exports = fileUpload;
