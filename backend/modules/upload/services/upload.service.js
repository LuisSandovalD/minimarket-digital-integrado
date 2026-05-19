const repository =
  require('../repositories/upload.repository');

exports.getAll = async () => {

  return repository.getAll();

};
