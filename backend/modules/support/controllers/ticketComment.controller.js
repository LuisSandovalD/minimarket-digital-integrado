// controllers/ticketComment.controller.js

const service = require(
    "../services/ticketComment.service"
);

const getComments =
    async (req, res, next) => {
        try {
            const data =
                await service.getComments(
                    req.params.ticketId
                );

            return res.json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

const createComment =
    async (req, res, next) => {
        try {
            const data =
                await service.createComment(
                    {
                        ticketId:
                            req.params.ticketId,

                        userId:
                            req.user.id,

                        ...req.body,
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

const markAsRead =
    async (req, res, next) => {
        try {
            const data =
                await service.markAsRead(
                    req.params.id
                );

            return res.json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

const deleteComment =
    async (req, res, next) => {
        try {
            await service.deleteComment(
                req.params.id
            );

            return res.json({
                success: true,
                message:
                    "Comentario eliminado correctamente",
            });
        } catch (error) {
            next(error);
        }
    };

module.exports = {
    getComments,
    createComment,
    markAsRead,
    deleteComment,
};