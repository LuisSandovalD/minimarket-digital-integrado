// modules/customer/includes/customer.include.js

const customerSelect = {
  id: true,
  name: true,
  documentType: true,
  documentNumber: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  notes: true,
  creditLimit: true,
  currentDebt: true,
  isActive: true,
  createdAt: true,
  company: {
    select: {
      id: true,
      name: true,
    },
  },
};

module.exports = { customerSelect };