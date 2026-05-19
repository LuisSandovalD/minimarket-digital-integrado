const express = require("express");

const prisma = require("../../../prisma/client");
const auth = require("../../../middleware/auth");

const router = express.Router();

router.get("/:ticketId", auth, async (req, res) => {

  const comments = await prisma.ticketComment.findMany({
    where: {
      ticketId: parseInt(req.params.ticketId)
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  res.json(comments);

});

router.post("/", auth, async (req, res) => {

  const comment = await prisma.ticketComment.create({
    data: {
      ...req.body,
      userId: req.user.id
    }
  });

  res.json(comment);

});

router.put("/:id", auth, async (req, res) => {

  const comment = await prisma.ticketComment.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  });

  res.json(comment);

});

router.delete("/:id", auth, async (req, res) => {

  await prisma.ticketComment.delete({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.json({
    success: true,
    message: "Comentario eliminado"
  });

});

module.exports = router;
