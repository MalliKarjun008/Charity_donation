const multer = require("multer");
const path = require("path");

// configure storage for uploaded files

const destination = function (req, file, cb) {
  // store based on the file type
  if (file.mimetype.startsWith("image/")) {
    cb(null, "uploads/images");
  } else if (file.mimetype.startsWith("video/")) {
    cb(null, "uploads/videos");
  } else {
    cb(new Error("Unsupported file type"), null);
  }
};

const filename = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  const name = path.basename(file.originalname, ext).replace(/\s+/g, "-"); // replace spaces
  const uniqueName = `${Date.now()}-${name}${ext}`;
  cb(null, uniqueName);
};

const storage = multer.diskStorage({
  destination: destination,
  filename: filename,
});

const fileFilter = (req, file, cb) => {
  // accept only images and videos
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
