const repository = require("../repositories/unit.repository");

exports.getAll = async (companyId) => {

  return repository.getAll(companyId);

};

exports.getById = async (id, companyId) => {

  return repository.getById(id, companyId);

};

exports.create = async (data) => {

  return repository.create(data);

};

exports.update = async (id, data) => {

  return repository.update(id, data);

};

exports.delete = async (id) => {

  return repository.delete(id);

};