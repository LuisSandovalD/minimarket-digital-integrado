const repository =
  require('../repositories/role.repository');

exports.getAll = async () => {

  return repository.getAll();

};
