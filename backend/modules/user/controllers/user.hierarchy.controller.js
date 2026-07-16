const service = require("../services/user.service");

const getHierarchy = async (req, res) => {
  try {
    const hierarchy = await service.getHierarchy(
      req.user.companyId,
    );

    res.json({
      success: true,
      data: hierarchy,
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
  getHierarchy,
};
