const repository =
  require('../repositories/ticketComment.repository');

exports.getAll = async () => {

  return repository.getAll();

};
