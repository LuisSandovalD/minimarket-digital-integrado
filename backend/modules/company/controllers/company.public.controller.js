const service = require("../services/company.service");

exports.getPublicCompanies = async (req, res) => {
  try {
    const companies = await service.getPublicCompanies();

    res.json({
      success: true,
      data: companies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
