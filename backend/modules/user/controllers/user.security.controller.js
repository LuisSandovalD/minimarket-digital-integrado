const service = require("../services/user.service");

const toggleUserStatus = async (req, res) => {
  try {
    const user = await service.toggleUserStatus(
      Number(req.params.id),
      req.user.companyId,
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  toggleUserStatus,
};
