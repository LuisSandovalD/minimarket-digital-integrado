const auditService =
  require("../services/audit.service");

// ======================================
// GET AUDITS
// ======================================

exports.getAudits =
async (req, res) => {

  try {

    const data =
      await auditService
        .getAudits(
          req.user.companyId
        );

    res.json({

      success: true,

      data

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Error obteniendo auditorías"

    });

  }

};

// ======================================
// GET AUDIT BY ID
// ======================================

exports.getAuditById =
async (req, res) => {

  try {

    const data =
      await auditService
        .getAuditById(
          req.params.id,
          req.user.companyId
        );

    res.json({

      success: true,

      data

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Error obteniendo auditoría"

    });

  }

};

// ======================================
// CREATE AUDIT
// ======================================

exports.createAudit =
async (req, res) => {

  try {

    const data =
      await auditService
        .createAudit({

          ...req.body,

          companyId:
            req.user.companyId,

          userId:
            req.user.id

        });

    res.status(201).json({

      success: true,

      data

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Error creando auditoría"

    });

  }

};

// ======================================
// DELETE AUDIT
// ======================================

exports.deleteAudit =
async (req, res) => {

  try {

    await auditService
      .deleteAudit(
        req.params.id,
        req.user.companyId
      );

    res.json({

      success: true,

      message:
        "Auditoría eliminada"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Error eliminando auditoría"

    });

  }

};
