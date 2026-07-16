exports.generateBarcode = () => {
  const prefix = "20";
  const timestamp = Date.now().toString().slice(-10);
  const random = Math.floor(Math.random() * 90 + 10);

  return `${prefix}${timestamp}${random}`;
};
