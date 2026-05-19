const repository =
  require('../repositories/webhook.repository');

exports.getAll = async () => {

  return repository.getAll();

};
