const repository =
  require('../repositories/database.repository');

exports.getAll = async () => {

  return repository.getAll();

};
