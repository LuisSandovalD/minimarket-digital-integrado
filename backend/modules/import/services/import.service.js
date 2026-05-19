const repository =
  require('../repositories/import.repository');

exports.getAll = async () => {

  return repository.getAll();

};
