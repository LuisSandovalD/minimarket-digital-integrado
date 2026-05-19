const speakeasy = require("speakeasy");

const QRCode = require("qrcode");

const prisma = require("../../../prisma/client");

exports.generate2FA = async (req, res) => {

  try {

    const secret = speakeasy.generateSecret({
      name: `ERP POS (${req.user.email})`
    });

    await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
        twoFactorSecret: secret.base32
      }
    });

    const qrCode = await QRCode.toDataURL(
      secret.otpauth_url
    );

    res.json({
      secret: secret.base32,
      qrCode
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.verify2FA = async (req, res) => {

  try {

    const { token } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      }
    });

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token
    });

    if (!verified) {

      return res.status(400).json({
        success: false,
        message: "Código inválido"
      });

    }

    await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
        twoFactorEnabled: true
      }
    });

    res.json({
      success: true,
      message: "2FA activado"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.disable2FA = async (req, res) => {

  try {

    await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null
      }
    });

    res.json({
      success: true,
      message: "2FA desactivado"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
