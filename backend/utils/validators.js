exports.validateEmail = (email) => {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);

};

exports.validatePassword = (password) => {

  return password.length >= 8;

};

exports.validatePhone = (phone) => {

  return /^[0-9]{9,15}$/.test(phone);

};

exports.validateRUC = (ruc) => {

  return /^[0-9]{11}$/.test(ruc);

};