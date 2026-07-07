const multer = require("multer");
const storage = require("../storage/cloudinary.storage");

const upload = multer({ storage });

module.exports = upload;
