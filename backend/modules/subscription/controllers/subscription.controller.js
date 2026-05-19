const prisma = require("../../../prisma/client");

exports.getSubscription = async (req, res) => {

  try {

    const company = await prisma.company.findUnique({
      where: {
        id: req.user.companyId
      }
    });

    res.json({
      subscriptionTier: company.subscriptionTier
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.updateSubscription = async (req, res) => {

  try {

    const company = await prisma.company.update({
      where: {
        id: req.user.companyId
      },
      data: {
        subscriptionTier: req.body.subscriptionTier
      }
    });

    res.json(company);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
