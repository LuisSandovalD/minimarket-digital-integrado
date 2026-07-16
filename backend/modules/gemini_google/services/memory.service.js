// ========================================
// services/memory.service.js
// ========================================

const conversations = new Map();

const getConversation = (
  conversationId,
) => {
  return (
    conversations.get(conversationId) ||
        []
  );
};

const saveMessage = (
  conversationId,
  role,
  text,
) => {
  const history =
        getConversation(conversationId);

  history.push({
    role,
    parts: [{ text }],
  });

  conversations.set(
    conversationId,
    history,
  );
};

const clearConversation = (
  conversationId,
) => {
  conversations.delete(
    conversationId,
  );
};

module.exports = {
  getConversation,
  saveMessage,
  clearConversation,
};
