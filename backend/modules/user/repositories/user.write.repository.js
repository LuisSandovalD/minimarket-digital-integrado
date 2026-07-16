const prisma = require("../../../prisma/client");

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  phone: true,
  avatar: true,
  isActive: true,
  isDeleted: true,
  isOnline: true,
  lastLogin: true,
  lastLogout: true,
  twoFactorEnabled: true,
  managerId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  companyId: true,
  branchId: true,
  branch: {
    select: {
      id: true,
      name: true,
      code: true,
      logo: true,
      description: true,
      address: true,
      phone: true,
      email: true,
      city: true,
      state: true,
      country: true,
      postalCode: true,
      isActive: true,
      companyId: true,
    },
  },
  manager: {
    select: {
      id: true,
      name: true,
      role: true,
    },
  },
};

const create = async (data) => {
  return prisma.user.create({
    data,
    select: {
      ...userSelect,
      subordinates: {
        where: {
          isDeleted: false,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          avatar: true,
          isActive: true,
          isOnline: true,
          lastLogin: true,
          createdAt: true,
          companyId: true,
          branchId: true,
          branch: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },
    },
  });
};

const update = async (id, companyId, data) => {
  return prisma.user.update({
    where: {
      id,
      companyId,
    },
    data,
    select: {
      ...userSelect,
      subordinates: {
        where: {
          isDeleted: false,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          avatar: true,
          isActive: true,
          isOnline: true,
          lastLogin: true,
          createdAt: true,
          companyId: true,
          branchId: true,
          branch: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },
    },
  });
};

const toggleStatus = async (id, companyId) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
      companyId,
      isDeleted: false,
    },
    select: {
      isActive: true,
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return prisma.user.update({
    where: {
      id,
      companyId,
    },
    data: {
      isActive: !user.isActive,
    },
    select: userSelect,
  });
};

const softDelete = async (id, companyId) => {
  return prisma.user.updateMany({
    where: {
      id,
      companyId,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });
};

const restore = async (id, companyId) => {
  return prisma.user.updateMany({
    where: {
      id,
      companyId,
    },
    data: {
      isDeleted: false,
      deletedAt: null,
    },
  });
};

module.exports = {
  create,
  update,
  toggleStatus,
  softDelete,
  restore,
};
