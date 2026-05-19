const router = require("express").Router();

router.get("/", (req, res) => {

  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date()
  });

});

module.exports = router;
