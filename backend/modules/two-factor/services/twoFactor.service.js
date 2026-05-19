const repository =
  require('../repositories/twoFactor.repository');

exports.getAll = async () => {

  return repository.getAll();

};
