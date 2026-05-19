const repository =
  require('../repositories/profit.repository');

exports.getAll = async () => {

  return repository.getAll();

};
