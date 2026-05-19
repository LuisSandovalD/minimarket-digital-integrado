const repository =
  require('../repositories/search.repository');

exports.getAll = async () => {

  return repository.getAll();

};
