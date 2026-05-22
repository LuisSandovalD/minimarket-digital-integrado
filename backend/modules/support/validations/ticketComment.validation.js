// validations/ticketComment.validation.js

const { z } = require("zod");

const messageTypes = [
    "TEXT",
    "IMAGE",
    "FILE",
    "AUDIO",
    "VIDEO",
];

const createCommentSchema =
    z.object({
        message: z
            .string({
                required_error:
                    "El mensaje es obligatorio",
            })
            .trim()
            .min(
                1,
                "El mensaje no puede estar vacío"
            )
            .max(
                5000,
                "El mensaje es demasiado largo"
            ),

        messageType: z
            .enum(
                messageTypes,
                {
                    errorMap:
                        () => ({
                            message:
                                "Tipo de mensaje inválido",
                        }),
                }
            )
            .default("TEXT"),

        attachments:
            z.string().optional(),
    });

module.exports = {
    createCommentSchema,
};