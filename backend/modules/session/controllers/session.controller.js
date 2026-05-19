const sessionService =
  require("../services/session.service");

// ======================================
// CREATE SESSION
// ======================================

exports.create =
async (req, res) => {

  try {

    const data =
      await sessionService
        .createSession(req.body);

    res.json({

      success: true,

      ...data

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};