const employeeSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  avatar: true,
  role: true,
  isActive: true,
  createdAt: true,

  branch: {
    select: {
      id: true,
      name: true,
    },
  },

  manager: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },

  company: {
    select: {
      id: true,
      name: true,
    },
  },

  employeeProfile: {
    select: {
      position: true,
      department: true,
      shift: true,
    },
  },
};

module.exports = {
  employeeSelect,
};