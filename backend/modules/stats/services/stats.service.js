const repository =
  require('../repositories/stats.repository');

exports.getAll = async () => {

  return repository.getAll();

};
