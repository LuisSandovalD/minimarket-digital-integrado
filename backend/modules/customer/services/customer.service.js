const repository =
  require('../repositories/customer.repository');

exports.getAll = async () => {

  return repository.getAll();

};
