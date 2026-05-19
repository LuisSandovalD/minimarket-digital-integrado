const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller = require("../controllers/config.controller");

router.get("/", auth, controller.getConfig);

router.put("/", auth, controller.updateConfig);

module.exports = router;
