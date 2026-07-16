const {
  TAX,
} = require("../constants/tax.constants");

function calculateTax(amount = 0) {

  return Number(
    (amount * TAX.IGV).toFixed(2),
  );

}

module.exports = {
  calculateTax,
};
