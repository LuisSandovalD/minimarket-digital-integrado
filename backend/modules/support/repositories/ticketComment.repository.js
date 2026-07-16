// repositories/ticketComment.repository.js

const prisma =
    require("../../../prisma/client");

const findByTicket = (
  ticketId,
) => {
  return prisma.ticketComment.findMany(
    {
      where: {
        ticketId,
        deletedAt: null,
      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    },
  );
};

const create = (data) => {
  return prisma.ticketComment.create({
    data,

    include: {
      user: true,
    },
  });
};

const update = (
  id,
  data,
) => {
  return prisma.ticketComment.update({
    where: {
      id,
    },

    data,
  });
};

const remove = (id) => {
  return prisma.ticketComment.update({
    where: {
      id,
    },

    data: {
      deletedAt:
                new Date(),
    },
  });
};

module.exports = {
  findByTicket,
  create,
  update,
  remove,
};
