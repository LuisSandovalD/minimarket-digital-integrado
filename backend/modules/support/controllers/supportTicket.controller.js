// controllers/supportTicket.controller.js

const service = require(
    "../services/supportTicket.service"
);

const getTickets =
    async (req, res, next) => {
        try {
            const data =
                await service.getTickets(
                    req.user.companyId
                );

            return res.json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

const getStats =
    async (req, res, next) => {
        try {
            const data =
                await service.getStats(
                    req.user.companyId
                );

            return res.json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

const getTicketById =
    async (req, res, next) => {
        try {
            const data =
                await service.getTicketById(
                    req.params.id,
                    req.user.companyId
                );

            return res.json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

const createTicket =
    async (req, res, next) => {
        try {
            const data =
                await service.createTicket(
                    {
                        ...req.body,

                        companyId:
                            req.user.companyId,

                        userId:
                            req.user.id,
                    }
                );

            return res.status(201).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

const updateTicket =
    async (req, res, next) => {
        try {
            const data =
                await service.updateTicket(
                    req.params.id,
                    req.body
                );

            return res.json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

const updateStatus =
    async (req, res, next) => {
        try {
            const data =
                await service.updateStatus(
                    req.params.id,
                    req.body.status
                );

            return res.json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

const deleteTicket =
    async (req, res, next) => {
        try {
            await service.deleteTicket(
                req.params.id
            );

            return res.json({
                success: true,
                message:
                    "Ticket eliminado correctamente",
            });
        } catch (error) {
            next(error);
        }
    };

module.exports = {
    getTickets,
    getStats,
    getTicketById,
    createTicket,
    updateTicket,
    updateStatus,
    deleteTicket,
};