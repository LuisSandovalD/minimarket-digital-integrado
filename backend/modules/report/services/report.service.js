const repository =
  require('../repositories/report.repository');

exports.getAll = async () => {

  return repository.getAll();

};
