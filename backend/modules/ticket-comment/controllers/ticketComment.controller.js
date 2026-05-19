const prisma = require("../../../prisma/client");

exports.getComments = async (req, res) => {

  const comments = await prisma.ticketComment.findMany({
    where: {
      ticketId: parseInt(req.params.ticketId)
    },
    include: {
      user: true
    }
  });

  res.json(comments);

};

exports.createComment = async (req, res) => {

  const comment = await prisma.ticketComment.create({
    data: {
      ...req.body,
      userId: req.user.id
    }
  });

  res.json(comment);

};

exports.updateComment = async (req, res) => {

  const comment = await prisma.ticketComment.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  });

  res.json(comment);

};

exports.deleteComment = async (req, res) => {

  await prisma.ticketComment.delete({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.json({
    success: true
  });

};
