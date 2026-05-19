const router =
  require("express").Router();

const multer =
  require("multer");

const path =
  require("path");

const auth =
  require("../../../middleware/auth");

const controller =
  require("../controllers/file.controller");

// ======================================
// MULTER CONFIG
// ======================================

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {

      cb(
        null,
        "uploads/files"
      );

    },

    filename: (
      req,
      file,
      cb
    ) => {

      cb(

        null,

        Date.now() +
        "-" +
        file.originalname

      );

    }

  });

const upload =
  multer({
    storage
  });

// ======================================
// ROUTES
// ======================================

router.get(
  "/",
  auth,
  controller.getFiles
);

router.post(
  "/upload",
  auth,
  upload.single("file"),
  controller.uploadFile
);

router.delete(
  "/:id",
  auth,
  controller.deleteFile
);

module.exports = router;
