function isValidRuc(ruc) {
  if (!ruc) return false;

  if (!/^\d{11}$/.test(ruc)) {
    return false;
  }

  const factors = [5,4,3,2,7,6,5,4,3,2];

  let sum = 0;

  for (let i = 0; i < factors.length; i++) {
    sum += parseInt(ruc[i]) * factors[i];
  }

  const remainder = sum % 11;
  const checkDigit = 11 - remainder;

  const expectedDigit =
    checkDigit === 10
      ? 0
      : checkDigit === 11
        ? 1
        : checkDigit;

  return expectedDigit === parseInt(ruc[10]);
}

module.exports = {
  isValidRuc,
};
