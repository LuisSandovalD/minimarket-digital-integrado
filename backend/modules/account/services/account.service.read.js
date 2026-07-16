const repository = require("../repositories/account.repository");
const mapper = require("../utils/account.mapper");

exports.getMyAccount = async (userId) => {
  const user = await repository.getByIdWithRelations(userId);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return mapper(user);
};

exports.getSessions = async (userId) => {
  return repository.getActiveSessions(userId);
};
