const repository =
  require('../repositories/dashboard.repository');

exports.getAll = async () => {

  return repository.getAll();

};
