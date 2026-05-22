
const prisma =
    require("../../../prisma/client");

const repository = require(
    "../repositories/ticketComment.repository"
);

const getComments =
    async (ticketId) => {
        return repository.findByTicket(
            Number(ticketId)
        );
    };

const createComment =
    async ({
        ticketId,
        userId,
        message,
        attachments,
        messageType,
    }) => {
        const comment =
            await repository.create({
                ticketId:
                    Number(ticketId),

                userId,

                message,

                attachments,

                messageType:
                    messageType ||
                    "TEXT",
            });

        await prisma.supportTicket.update(
            {
                where: {
                    id: Number(ticketId),
                },

                data: {
                    lastMessage:
                        message,

                    lastMessageAt:
                        new Date(),

                    unreadCount: {
                        increment: 1,
                    },

                    status:
                        "REOPENED",
                },
            }
        );

        return comment;
    };

const markAsRead =
    async (id) => {
        return repository.update(
            Number(id),
            {
                isRead: true,
                readAt:
                    new Date(),
            }
        );
    };

const deleteComment =
    async (id) => {
        return repository.remove(
            Number(id)
        );
    };

module.exports = {
    getComments,
    createComment,
    markAsRead,
    deleteComment,
};