module.exports = {
  ...require('./supplier-create.controller'),
  ...require('./supplier-update.controller'),
  ...require('./supplier-delete.controller'),
  ...require('./supplier-query.controller')
}