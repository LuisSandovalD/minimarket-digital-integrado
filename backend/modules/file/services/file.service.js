const repository =
  require('../repositories/file.repository');

exports.getAll = async () => {

  return repository.getAll();

};
