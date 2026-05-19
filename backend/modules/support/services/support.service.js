const repository =
  require('../repositories/support.repository');

exports.getAll = async () => {

  return repository.getAll();

};
