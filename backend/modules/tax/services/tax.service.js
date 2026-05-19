const repository =
  require('../repositories/tax.repository');

exports.getAll = async () => {

  return repository.getAll();

};
