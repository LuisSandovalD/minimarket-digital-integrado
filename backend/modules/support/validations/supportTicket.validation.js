// validations/supportTicket.validation.js

const { z } = require("zod");

const ticketStatus =
    [
      "OPEN",
      "IN_PROGRESS",
      "WAITING",
      "RESOLVED",
      "CLOSED",
      "REOPENED",
    ];

const ticketPriority =
    [
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ];

const createTicketSchema =
    z.object({
      title: z
        .string({
          required_error:
                    "El título es obligatorio",
        })
        .trim()
        .min(
          3,
          "El título debe tener al menos 3 caracteres",
        )
        .max(
          255,
          "El título no puede superar los 255 caracteres",
        ),

      description: z
        .string({
          required_error:
                    "La descripción es obligatoria",
        })
        .trim()
        .min(
          5,
          "La descripción debe tener al menos 5 caracteres",
        ),

      priority: z
        .enum(
          ticketPriority,
          {
            errorMap:
                        () => ({
                          message:
                                "Prioridad inválida",
                        }),
          },
        )
        .default(
          "MEDIUM",
        ),

      attachments:
            z.string().optional(),
    });

const updateTicketSchema =
    z
      .object({
        title:
                z
                  .string()
                  .trim()
                  .min(
                    3,
                  )
                  .max(
                    255,
                  )
                  .optional(),

        description:
                z
                  .string()
                  .trim()
                  .min(
                    5,
                  )
                  .optional(),

        priority:
                z
                  .enum(
                    ticketPriority,
                  )
                  .optional(),

        status:
                z
                  .enum(
                    ticketStatus,
                  )
                  .optional(),

        assignedTo:
                z
                  .number()
                  .int()
                  .positive()
                  .optional(),

        resolutionNotes:
                z
                  .string()
                  .optional(),

        attachments:
                z
                  .string()
                  .optional(),
      })
      .refine(
        (data) => {
          if (
            data.status ===
                    "RESOLVED" &&
                    !data.resolutionNotes
          ) {
            return false;
          }

          return true;
        },
        {
          message:
                    "Las notas de resolución son obligatorias al resolver un ticket",

          path: [
            "resolutionNotes",
          ],
        },
      );

module.exports = {
  createTicketSchema,
  updateTicketSchema,
};
