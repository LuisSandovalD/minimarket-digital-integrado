// services/supportTicket.service.js

const repository = require(
    "../repositories/supportTicket.repository"
);

const generateTicketNumber = require(
    "../utils/generateTicketNumber"
);

const getTickets =
    async (companyId) => {
        return repository.findAll(
            companyId
        );
    };

const getTicketById =
    async (id, companyId) => {
        const ticket =
            await repository.findById(
                Number(id),
                companyId
            );

        if (!ticket) {
            throw new Error(
                "Ticket no encontrado"
            );
        }

        return ticket;
    };

const createTicket =
    async ({
        title,
        description,
        priority,
        attachments,
        companyId,
        userId,
    }) => {
        return repository.create({
            ticketNumber:
                generateTicketNumber(),

            title,
            description,
            priority,
            attachments,

            companyId,
            userId,
        });
    };

const updateTicket =
    async (id, data) => {
        return repository.update(
            Number(id),
            data
        );
    };

const updateStatus =
    async (id, status) => {
        const data = {
            status,
        };

        if (
            status ===
            "RESOLVED"
        ) {
            data.resolvedAt =
                new Date();
        }

        if (
            status ===
            "CLOSED"
        ) {
            data.closedAt =
                new Date();
        }

        return repository.update(
            Number(id),
            data
        );
    };

const deleteTicket =
    async (id) => {
        return repository.remove(
            Number(id)
        );
    };

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    updateStatus,
    deleteTicket,
};