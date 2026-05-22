import { useEffect, useRef, useState } from "react";

import { MoreVertical, Paperclip, Search, Send } from "lucide-react";

import api from "@/lib/api";

export default function SupportCenter() {
  const messagesEndRef = useRef(null);

  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await api.get("/support-ticket");

      setTickets(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (ticketId) => {
    try {
      const res = await api.get(`/ticket-comment/ticket/${ticketId}`);

      setMessages(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectTicket = async (ticket) => {
    setSelectedTicket(ticket);

    fetchMessages(ticket.id);
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedTicket) {
      return;
    }

    try {
      await api.post(`/ticket-comment/ticket/${selectedTicket.id}`, {
        message,
        messageType: "TEXT",
      });

      setMessage("");

      await fetchMessages(selectedTicket.id);

      await fetchTickets();
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
      <div className="flex w-[360px] flex-col border-r border-white/10 bg-[#111827]">
        <div className="border-b border-white/10 p-5">
          <h1 className="text-2xl font-bold">Centro de Mensajes</h1>

          <div className="mt-4 flex items-center rounded-xl bg-[#1f2937] px-3">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-transparent p-3 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-5 text-center text-gray-400">Cargando...</div>
          ) : (
            tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => handleSelectTicket(ticket)}
                className={`flex w-full gap-3 border-b border-white/5 p-4 text-left transition hover:bg-white/5 ${
                  selectedTicket?.id === ticket.id ? "bg-white/10" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold">
                  {ticket.title?.charAt(0)?.toUpperCase()}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate font-semibold">{ticket.title}</h3>

                    <span className="text-xs text-gray-400">
                      {new Date(ticket.updatedAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="truncate text-sm text-gray-400">
                    {ticket.description}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {selectedTicket ? (
          <>
            <div className="flex items-center justify-between border-b border-white/10 bg-[#111827] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold">
                  {selectedTicket.title?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h2 className="font-semibold">{selectedTicket.title}</h2>

                  <p className="text-sm text-green-400">
                    {selectedTicket.status}
                  </p>
                </div>
              </div>

              <button className="rounded-full p-2 hover:bg-white/10">
                <MoreVertical size={20} />
              </button>
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
                      className={`max-w-[75%] rounded-3xl px-5 py-3 ${
                        isMine
                          ? "rounded-br-md bg-blue-500"
                          : "rounded-bl-md bg-[#1e293b]"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>

                      <div className="mt-2 flex justify-end text-xs opacity-70">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 bg-[#111827] p-4">
              <div className="flex items-center gap-3 rounded-2xl bg-[#1f2937] px-4 py-3">
                <button className="text-gray-400 hover:text-white">
                  <Paperclip size={20} />
                </button>

                <input
                  type="text"
                  value={message}
                  placeholder="Escribe un mensaje..."
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
