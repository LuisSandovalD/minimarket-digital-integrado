// ========================================
// utils/inventory-reference.util.js
// ========================================

// ========================================
// FORMAT DATE
// ========================================

const formatDate =
  () => {

    const date =
      new Date();

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    const hours =
      String(
        date.getHours()
      ).padStart(2, "0");

    const minutes =
      String(
        date.getMinutes()
      ).padStart(2, "0");

    const seconds =
      String(
        date.getSeconds()
      ).padStart(2, "0");

    return `${year}${month}${day}-${hours}${minutes}${seconds}`;

  };

// ========================================
// RANDOM CODE
// ========================================

const generateRandomCode =
  (
    length = 4
  ) => {

    return Math.random()
      .toString(36)
      .substring(2, 2 + length)
      .toUpperCase();

  };

// ========================================
// GENERIC REFERENCE
// ========================================

const generateReference =
  (
    prefix
  ) => {

    return `${prefix}-${formatDate()}-${generateRandomCode()}`;

  };

// ========================================
// INVENTORY
// ========================================

exports.generateInventoryReference =
  () => {

    return generateReference(
      "INV"
    );

  };

// ========================================
// TRANSFER
// ========================================

exports.generateTransferReference =
  () => {

    return generateReference(
      "TRF"
    );

  };

// ========================================
// MOVEMENT
// ========================================

exports.generateMovementReference =
  (
    type = "MOV"
  ) => {

    return generateReference(
      type
    );

  };

// ========================================
// DAMAGE
// ========================================

exports.generateDamageReference =
  () => {

    return generateReference(
      "DMG"
    );

  };