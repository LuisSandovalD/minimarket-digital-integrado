const purchaseInclude = {

  buyer: {
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true
    }
  },

  supplier: {
    select: {
      id: true,
      name: true,
      phone: true,
      email: true
    }
  },

  branch: {
    select: {
      id: true,
      name: true,
      code: true
    }
  },

  company: {
    select: {
      id: true,
      name: true
    }
  },

  details: {
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          salePrice: true,
          purchasePrice: true
        }
      }
    }
  },

  payments: true
};

module.exports = {
  purchaseInclude
};