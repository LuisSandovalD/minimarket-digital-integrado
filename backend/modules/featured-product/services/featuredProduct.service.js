const repository =
  require('../repositories/featuredProduct.repository');

exports.getAll = async () => {

  return repository.getAll();

};
