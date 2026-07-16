const prisma = require("../../../prisma/client");
const repository = require("../repositories/ticketComment.repository");
const { sendEmail } = require("../../../config/email.config");

const sendTicketCommentEmail = async ({ email, name, ticketNumber, title, message, isFromOwner }) => {
  if (!email) return;

  const subject = isFromOwner
    ? `Nueva respuesta del Cliente en Ticket N° ${ticketNumber}`
    : `El Soporte Técnico respondió tu Ticket N° ${ticketNumber}`;

  return await sendEmail({
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
        <h2 style="color: #2563eb;">¡Hola, ${name}!</h2>
        <p>Hay una nueva actualización en el caso de soporte técnico en curso.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #f59e0b;">
          <p style="margin: 4px 0;"><strong>Ticket:</strong> N° ${ticketNumber}</p>
          <p style="margin: 4px 0;"><strong>Asunto global:</strong> ${title}</p>
          <p style="margin: 12px 0 4px 0;"><strong>Nuevo Mensaje:</strong></p>
          <blockquote style="margin: 0; padding: 10px; background: #fff; border-radius: 4px; border: 1px solid #e2e8f0; color: #334155;">
            "${message}"
          </blockquote>
        </div>

        <p style="font-size: 14px; color: #475569;">Por favor, ingresa al panel del sistema ERP POS para responder al hilo de la conversación.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #94a3b8;">Centro de Soporte Integrado - ERP POS System</small>
      </div>
    `,
  });
};

const getComments = async (ticketId) => {
  return repository.findByTicket(Number(ticketId));
};

const createComment = async ({
  ticketId,
  userId,
  message,
  attachments,
  messageType,
}) => {
  const comment = await repository.create({
    ticketId: Number(ticketId),
    userId,
    message,
    attachments,
    messageType: messageType || "TEXT",
  });

  const updatedTicket = await prisma.supportTicket.update({
    where: {
      id: Number(ticketId),
    },
    data: {
      lastMessage: message,
      lastMessageAt: new Date(),
      unreadCount: {
        increment: 1,
      },
      status: "REOPENED",
    },
    include: {
      user: true,
    },
  });

  if (updatedTicket.user && updatedTicket.user.email) {
    const isFromOwner = updatedTicket.userId === userId;
    const targetEmail = isFromOwner ? "soporte@tuempresasass.com" : updatedTicket.user.email;
    const targetName = isFromOwner ? "Equipo de Soporte" : updatedTicket.user.name;

    try {
      await sendTicketCommentEmail({
        email: targetEmail,
        name: targetName,
        ticketNumber: updatedTicket.ticketNumber,
        title: updatedTicket.title,
        message,
        isFromOwner,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de actualización del ticket:", emailError.message || emailError);
    }
  }

  return comment;
};

const markAsRead = async (id) => {
  return repository.update(Number(id), {
    isRead: true,
    readAt: new Date(),
  });
};

const deleteComment = async (id) => {
  return repository.remove(Number(id));
};

module.exports = {
  getComments,
  createComment,
  markAsRead,
  deleteComment,
};
