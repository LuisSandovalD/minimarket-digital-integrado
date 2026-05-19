const router = require("express").Router();

router.get("/", (req, res) => {

  res.json({
    version: "1.0.0",
    api: "ERP POS API",
    releaseDate: "2026-05-07"
  });

});

module.exports = router;
