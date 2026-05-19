const prisma =
  require("../../../prisma/client");

const {

  AUDIT_LIMIT

} = require("../constants/audit.constants");

// ======================================
// GET AUDITS
// ======================================

exports.getAudits =
(companyId) => {

  return prisma.auditLog.findMany({

    where: {
      companyId
    },

    take:
      AUDIT_LIMIT,

    orderBy: {
      createdAt: "desc"
    },

    include: {
      user: true
    }

  });

};

// ======================================
// GET AUDIT BY ID
// ======================================

exports.getAuditById =
(id, companyId) => {

  return prisma.auditLog.findFirst({

    where: {

      id,

      companyId

    },

    include: {
      user: true
    }

  });

};

// ======================================
// CREATE AUDIT
// ======================================

exports.createAudit =
(data) => {

  return prisma.auditLog.create({

    data

  });

};

// ======================================
// DELETE AUDIT
// ======================================

exports.deleteAudit =
(id, companyId) => {

  return prisma.auditLog.deleteMany({

    where: {

      id,

      companyId

    }

  });

};
