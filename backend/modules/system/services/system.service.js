const repository =
  require('../repositories/system.repository');

exports.getAll = async () => {

  return repository.getAll();

};
