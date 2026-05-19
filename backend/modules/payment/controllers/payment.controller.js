const prisma = require("../../../prisma/client");

exports.getPayments = async (req, res) => {

  try {

    const payments = await prisma.payment.findMany({
      where: {
        OR: [
          {
            sale: {
              companyId: req.user.companyId
            }
          },
          {
            purchase: {
              companyId: req.user.companyId
            }
          }
        ]
      },
      include: {
        sale: true,
        purchase: true,
        method: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getPaymentById = async (req, res) => {

  try {

    const payment = await prisma.payment.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        sale: true,
        purchase: true,
        method: true
      }
    });

    res.json(payment);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.createPayment = async (req, res) => {

  try {

    const payment = await prisma.payment.create({
      data: {
        ...req.body
      }
    });

    res.json(payment);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.updatePayment = async (req, res) => {

  try {

    const payment = await prisma.payment.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: req.body
    });

    res.json(payment);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.deletePayment = async (req, res) => {

  try {

    await prisma.payment.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.json({
      success: true,
      message: "Pago eliminado"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
