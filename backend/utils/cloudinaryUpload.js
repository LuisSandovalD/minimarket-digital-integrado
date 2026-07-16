// ========================================
// utils/cloudinaryUpload.js
// ========================================

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImage = (buffer, folder = "general") => {
  return new Promise((resolve, reject) => {

    if (!buffer) {
      return reject(new Error("No se recibió ninguna imagen."));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadImage;
