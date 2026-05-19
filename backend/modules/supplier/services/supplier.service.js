module.exports = {
  ...require('./supplier-create.service'),
  ...require('./supplier-update.service'),
  ...require('./supplier-delete.service'),
  ...require('./supplier-query.service')
}