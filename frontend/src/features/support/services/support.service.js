import api from "@/api/axios";

// ========================================
// TICKETS
// ========================================

export const getTickets = async () => {
  const res = await api.get("/support-ticket");

  return res.data.data || [];
};

// ========================================
// MESSAGES
// ========================================

export const getTicketMessages = async (ticketId) => {
  const res = await api.get(`/ticket-comment/ticket/${ticketId}`);

  return res.data.data || [];
};

// ========================================
// CREATE TICKET
// ========================================

export const createTicket = async (data) => {
  const res = await api.post("/support-ticket", data);

  return res.data;
};

// ========================================
// SEND MESSAGE
// ========================================

export const sendTicketMessage = async (ticketId, data) => {
  const res = await api.post(`/ticket-comment/ticket/${ticketId}`, data);

  return res.data;
};

// ========================================
// UPDATE STATUS
// ========================================

export const updateTicketStatus = async (ticketId, status) => {
  const res = await api.patch(`/support-ticket/${ticketId}/status`, {
    status,
  });

  return res.data;
};
