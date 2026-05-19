const repository =
  require('../repositories/cron.repository');

exports.getAll = async () => {

  return repository.getAll();

};
