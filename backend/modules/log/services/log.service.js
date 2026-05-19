const repository =
  require('../repositories/log.repository');

exports.getAll = async () => {

  return repository.getAll();

};
