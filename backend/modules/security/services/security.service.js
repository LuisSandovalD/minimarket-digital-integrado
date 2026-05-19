const repository =
  require('../repositories/security.repository');

exports.getAll = async () => {

  return repository.getAll();

};
