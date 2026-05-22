import { useEffect, useRef, useState } from "react";

import { MoreVertical, Paperclip, Phone, Send, Video } from "lucide-react";

import api from "@/lib/api";

export default function SupportMessenger() {
  const messagesEndRef = useRef(null);

  const [tickets, setTickets] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const fetchTickets = async () => {
    try {
      const res = await api.get("/support/tickets");

      setTickets(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async (ticketId) => {
    try {
      const res = await api.get(`/support/comments/ticket/${ticketId}`);

      setMessages(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChat = async (ticket) => {
    setSelectedChat(ticket);

    await fetchMessages(ticket.id);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await api.post(`/support/comments/ticket/${selectedChat.id}`, {
        message,
      });

      setMessage("");

      fetchMessages(selectedChat.id);

      fetchTickets();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTickets();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a] text-white">
      <div className="flex w-[350px] flex-col border-r border-white/10 bg-[#111827]">
        <div className="border-b border-white/10 p-5">
          <h1 className="text-2xl font-bold">Soporte</h1>

          <input
            type="text"
            placeholder="Buscar conversación..."
            className="mt-4 w-full rounded-xl border border-white/10 bg-[#1f2937] p-3 outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => handleSelectChat(ticket)}
              className={`flex w-full items-start gap-3 border-b border-white/5 p-4 text-left transition hover:bg-white/5 ${
                selectedChat?.id === ticket.id ? "bg-white/10" : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold">
                {ticket.title?.charAt(0)?.toUpperCase()}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="truncate font-semibold">{ticket.title}</h3>

                  <span className="text-xs text-gray-400">
                    {ticket.lastMessageAt
                      ? new Date(ticket.lastMessageAt).toLocaleTimeString()
                      : ""}
                  </span>
                </div>

                <p className="truncate text-sm text-gray-400">
                  {ticket.lastMessage || "Sin mensajes"}
                </p>
              </div>

              {ticket.unreadCount > 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold">
                  {ticket.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between border-b border-white/10 bg-[#111827] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold">
                  {selectedChat.title?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h2 className="font-semibold">{selectedChat.title}</h2>

                  <p className="text-sm text-green-400">En línea</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="rounded-full bg-white/5 p-3 hover:bg-white/10">
                  <Phone size={18} />
                </button>

                <button className="rounded-full bg-white/5 p-3 hover:bg-white/10">
                  <Video size={18} />
                </button>

                <button className="rounded-full bg-white/5 p-3 hover:bg-white/10">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[#0f172a] p-6">
              {messages.map((msg) => {
                const isMine = msg.userId === 1;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-3xl px-5 py-3 ${
                        isMine
                          ? "rounded-br-md bg-blue-500"
                          : "rounded-bl-md bg-[#1e293b]"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>

                      <div className="mt-2 flex items-center justify-end gap-2 text-xs opacity-70">
                        <span>
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>

                        {isMine && msg.isRead && <span>✓✓</span>}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 bg-[#111827] p-4">
              <div className="flex items-center gap-3 rounded-2xl bg-[#1f2937] p-3">
                <button className="rounded-full p-2 hover:bg-white/10">
                  <Paperclip size={20} />
                </button>

                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  className="flex-1 bg-transparent outline-none"
                />

                <button
                  onClick={sendMessage}
                  className="rounded-full bg-blue-500 p-3 transition hover:bg-blue-600"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-[#0f172a] text-gray-400">
            Selecciona una conversación
          </div>
        )}
      </div>
    </div>
  );
}
