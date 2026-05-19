const repository =
  require('../repositories/config.repository');

exports.getAll = async () => {

  return repository.getAll();

};
