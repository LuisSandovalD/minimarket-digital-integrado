import { TICKET_PRIORITY, TICKET_STATUS } from "../constants/support.constants";

// ========================================
// FORMAT TIME
// ========================================

export const formatTicketTime = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ========================================
// FORMAT DATE
// ========================================

export const formatTicketDate = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString();
};

// ========================================
// GET INITIALS
// ========================================

export const getInitials = (text = "") => {
  return text?.trim()?.charAt(0)?.toUpperCase();
};

// ========================================
// FILTER TICKETS
// ========================================

export const filterTickets = (tickets = [], search = "") => {
  return tickets.filter((ticket) => {
    const query = search.toLowerCase();

    return ticket.title?.toLowerCase().includes(query) || ticket.description?.toLowerCase().includes(query);
  });
};

// ========================================
// SORT TICKETS
// ========================================

export const sortTicketsByUpdatedAt = (tickets = []) => {
  return [...tickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

// ========================================
// GROUP BY STATUS
// ========================================

export const groupTicketsByStatus = (tickets = []) => {
  return tickets.reduce((acc, ticket) => {
    const status = ticket.status || "UNKNOWN";

    if (!acc[status]) {
      acc[status] = [];
    }

    acc[status].push(ticket);

    return acc;
  }, {});
};

// ========================================
// GET STATUS COLOR
// ========================================

export const getStatusColor = (status) => {
  switch (status) {
    case TICKET_STATUS.OPEN:
      return "bg-blue-500/20 text-blue-400";

    case TICKET_STATUS.IN_PROGRESS:
      return "bg-yellow-500/20 text-yellow-400";

    case TICKET_STATUS.WAITING:
      return "bg-orange-500/20 text-orange-400";

    case TICKET_STATUS.RESOLVED:
      return "bg-green-500/20 text-green-400";

    case TICKET_STATUS.CLOSED:
      return "bg-gray-500/20 text-gray-400";

    case TICKET_STATUS.REOPENED:
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-white/10 text-white";
  }
};

// ========================================
// GET PRIORITY COLOR
// ========================================

export const getPriorityColor = (priority) => {
  switch (priority) {
    case TICKET_PRIORITY.LOW:
      return "bg-gray-500/20 text-gray-300";

    case TICKET_PRIORITY.MEDIUM:
      return "bg-blue-500/20 text-blue-400";

    case TICKET_PRIORITY.HIGH:
      return "bg-orange-500/20 text-orange-400";

    case TICKET_PRIORITY.CRITICAL:
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-white/10 text-white";
  }
};

// ========================================
// IS TICKET CLOSED
// ========================================

export const isClosedTicket = (status) => {
  return [TICKET_STATUS.CLOSED, TICKET_STATUS.RESOLVED].includes(status);
};

// ========================================
// GET LAST MESSAGE
// ========================================

export const getLastMessage = (messages = []) => {
  if (!messages.length) {
    return null;
  }

  return messages[messages.length - 1];
};

// ========================================
// SCROLL TO BOTTOM
// ========================================

export const scrollToBottom = (ref) => {
  ref?.current?.scrollIntoView({
    behavior: "smooth",
  });
};
