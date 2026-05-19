const prisma = require("../../../prisma/client");

exports.getTickets = async (req, res) => {

  try {

    const tickets =
      await prisma.supportTicket.findMany({
        where: {
          companyId: req.user.companyId
        },
        include: {
          user: true,
          assignedUser: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });

    res.json(tickets);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getTicketById = async (req, res) => {

  try {

    const ticket =
      await prisma.supportTicket.findUnique({
        where: {
          id: parseInt(req.params.id)
        },
        include: {
          comments: {
            include: {
              user: true
            }
          }
        }
      });

    res.json(ticket);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.createTicket = async (req, res) => {

  try {

    const ticket =
      await prisma.supportTicket.create({
        data: {
          ...req.body,
          ticketNumber: `TICKET-${Date.now()}`,
          userId: req.user.id,
          companyId: req.user.companyId
        }
      });

    res.json(ticket);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.addComment = async (req, res) => {

  try {

    const comment =
      await prisma.ticketComment.create({
        data: {
          ticketId: req.body.ticketId,
          message: req.body.message,
          userId: req.user.id
        }
      });

    res.json(comment);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.updateTicketStatus = async (
  req,
  res
) => {

  try {

    const ticket =
      await prisma.supportTicket.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: {
          status: req.body.status,
          resolvedAt:
            req.body.status === "RESOLVED"
              ? new Date()
              : null
        }
      });

    res.json(ticket);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
