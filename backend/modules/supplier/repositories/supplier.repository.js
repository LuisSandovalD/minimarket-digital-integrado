module.exports = {
  ...require('./supplier-query.repository'),
  ...require('./supplier-mutation.repository'),
  ...require('./supplier-search.repository')
}