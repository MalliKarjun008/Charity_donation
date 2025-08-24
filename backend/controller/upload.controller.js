const AppError = require("../utils/appError");

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return new AppError("No file uploaded", 400);
  }

  // console.log(req.file);

  res.status(200).json({
    message: "File uploaded successfully",
    filePath: req.file.path,
  });
};
