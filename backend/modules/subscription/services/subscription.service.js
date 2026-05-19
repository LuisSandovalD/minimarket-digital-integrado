const repository =
  require('../repositories/subscription.repository');

exports.getAll = async () => {

  return repository.getAll();

};
