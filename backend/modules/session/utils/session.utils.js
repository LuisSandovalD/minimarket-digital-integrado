exports.generateExpirationDate =
(minutes) => {

  return new Date(
    Date.now() +
    1000 * 60 * minutes
  );

};