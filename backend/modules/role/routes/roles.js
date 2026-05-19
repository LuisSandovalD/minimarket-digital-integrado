const router = require("express").Router();

const auth = require("../../../middleware/auth");

router.get("/", auth, (req, res) => {

  res.json([
    "ADMIN",
    "MANAGER",
    "SUPERVISOR",
    "EMPLOYEE",
    "VIEWER"
  ]);

});

module.exports = router;
