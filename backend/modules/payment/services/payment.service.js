const repository =
  require('../repositories/payment.repository');

exports.getAll = async () => {

  return repository.getAll();

};
