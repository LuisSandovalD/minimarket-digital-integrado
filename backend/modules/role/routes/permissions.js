const router = require("express").Router();

const auth = require("../../../middleware/auth");

router.get("/", auth, (req, res) => {

  const permissions = {

    ADMIN: [
      "ALL"
    ],

    MANAGER: [
      "READ",
      "WRITE",
      "UPDATE"
    ],

    SUPERVISOR: [
      "READ",
      "UPDATE"
    ],

    EMPLOYEE: [
      "READ"
    ],

    VIEWER: [
      "VIEW_ONLY"
    ]

  };

  res.json(permissions);

});

module.exports = router;
