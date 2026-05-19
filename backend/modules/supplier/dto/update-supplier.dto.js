class UpdateSupplierDTO {
  constructor(data) {
    this.name = data.name
    this.ruc = data.ruc
    this.email = data.email
    this.phone = data.phone
    this.address = data.address
    this.contactPerson = data.contactPerson
    this.website = data.website
    this.notes = data.notes
    this.isActive = data.isActive
  }
}

module.exports = UpdateSupplierDTO