// sockets/support.socket.js

module.exports = (io) => {
  io.on(
    "connection",
    (socket) => {
      socket.on(
        "join-ticket",
        (ticketId) => {
          socket.join(
            `ticket-${ticketId}`,
          );
        },
      );

      socket.on(
        "leave-ticket",
        (ticketId) => {
          socket.leave(
            `ticket-${ticketId}`,
          );
        },
      );

      socket.on(
        "typing",
        (ticketId) => {
          socket.to(
            `ticket-${ticketId}`,
          ).emit(
            "typing",
          );
        },
      );
    },
  );
};
