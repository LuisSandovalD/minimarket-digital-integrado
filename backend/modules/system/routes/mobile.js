const router = require("express").Router();

const auth = require("../../../middleware/auth");

router.get(
  "/dashboard",
  auth,
  (req, res) => {

    res.json({
      success: true,
      message: "Mobile dashboard"
    });

  }
);

module.exports = router;
