// utils/generateTicketNumber.js

const generateTicketNumber = () => {
    const random = Math.floor(
        1000 + Math.random() * 9000
    );

    return `TK-${Date.now()}-${random}`;
};

module.exports =
    generateTicketNumber;