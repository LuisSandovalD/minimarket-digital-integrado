const express =
  require("express");

const path =
  require("path");

module.exports = (app) => {

  app.use(

    "/uploads",

    express.static(

      path.join(
        __dirname,
        "..",
        "uploads"
      )

    )

  );

};