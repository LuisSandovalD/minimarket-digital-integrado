const repository =
  require('../repositories/metrics.repository');

exports.getAll = async () => {

  return repository.getAll();

};
