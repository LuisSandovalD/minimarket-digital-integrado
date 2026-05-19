exports.getRoles = async (req, res) => {

  res.json([
    "ADMIN",
    "MANAGER",
    "SUPERVISOR",
    "EMPLOYEE",
    "VIEWER"
  ]);

};
