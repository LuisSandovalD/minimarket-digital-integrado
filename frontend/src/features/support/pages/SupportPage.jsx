import { useEffect, useMemo, useRef, useState } from "react";

import {
    Loader2,
    MessageSquare,
    Paperclip,
    Plus,
    Search,
    Send,
} from "lucide-react";

import api from "../../../api/axios";

export default function SupportPage() {
  const messagesEndRef = useRef(null);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const currentUserId = user?.id;

  const currentUserRole = user?.role;

  const isSupport = ["ADMIN", "MANAGER", "SUPPORT"].includes(currentUserRole);

  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");

  const [loadingTickets, setLoadingTickets] = useState(false);

  const [loadingMessages, setLoadingMessages] = useState(false);

  const [sending, setSending] = useState(false);

  const [creating, setCreating] = useState(false);

  const [showCreate, setShowCreate] = useState(false);

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  const fetchTickets = async () => {
    try {
      setLoadingTickets(true);

      const res = await api.get("/support-ticket");

      setTickets(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTickets(false);
    }
  };

  const fetchMessages = async (ticketId) => {
    try {
      setLoadingMessages(true);

      const res = await api.get(`/ticket-comment/ticket/${ticketId}`);

      setMessages(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSelectTicket = async (ticket) => {
    setSelectedTicket(ticket);

    await fetchMessages(ticket.id);
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedTicket) {
      return;
    }

    try {
      setSending(true);

      await api.post(`/ticket-comment/ticket/${selectedTicket.id}`, {
        message,
        messageType: "TEXT",
      });

      setMessage("");

      await fetchMessages(selectedTicket.id);

      await fetchTickets();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Error enviando mensaje");
    } finally {
      setSending(false);
    }
  };

  const createTicket = async () => {
    if (!newTicket.title || !newTicket.description) {
      return alert("Completa todos los campos");
    }

    try {
      setCreating(true);

      await api.post("/support-ticket", newTicket);

      setNewTicket({
        title: "",
        description: "",
        priority: "MEDIUM",
      });

      setShowCreate(false);

      await fetchTickets();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Error creando ticket");
    } finally {
      setCreating(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      await api.patch(`/support-ticket/${selectedTicket.id}/status`, {
        status,
      });

      await fetchTickets();

      await fetchMessages(selectedTicket.id);

      setSelectedTicket((prev) => ({
        ...prev,
        status,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (!selectedTicket) {
      return;
    }

    const interval = setInterval(() => {
      fetchMessages(selectedTicket.id);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedTicket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a] text-white">
      <div className="flex w-[360px] flex-col border-r border-white/10 bg-[#111827]">
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Soporte</h1>

            <button
              onClick={() => setShowCreate(!showCreate)}
              className="rounded-lg bg-blue-600 p-2 hover:bg-blue-700"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="mt-4 flex items-center rounded-xl bg-[#1f2937] px-3">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-transparent p-3 outline-none"
            />
          </div>

          {showCreate && (
            <div className="mt-4 space-y-3 rounded-xl bg-[#1f2937] p-4">
              <input
                type="text"
                placeholder="Título"
                value={newTicket.title}
                onChange={(e) =>
                  setNewTicket((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full rounded-lg bg-[#111827] p-3 outline-none"
              />

              <textarea
                placeholder="Descripción"
                value={newTicket.description}
                onChange={(e) =>
                  setNewTicket((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="h-24 w-full resize-none rounded-lg bg-[#111827] p-3 outline-none"
              />

              <select
                value={newTicket.priority}
                onChange={(e) =>
                  setNewTicket((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }))
                }
                className="w-full rounded-lg bg-[#111827] p-3 outline-none"
              >
                <option value="LOW">LOW</option>

                <option value="MEDIUM">MEDIUM</option>

                <option value="HIGH">HIGH</option>

                <option value="CRITICAL">CRITICAL</option>
              </select>

              <button
                onClick={createTicket}
                disabled={creating}
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
              >
                {creating ? "Creando..." : "Crear Ticket"}
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingTickets ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="animate-spin" />
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-6 text-center text-gray-400">No hay tickets</div>
          ) : (
            filteredTickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => handleSelectTicket(ticket)}
                className={`flex w-full gap-3 border-b border-white/5 p-4 text-left transition hover:bg-white/5 ${
                  selectedTicket?.id === ticket.id ? "bg-white/10" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold">
                  {ticket.title?.charAt(0)?.toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate font-semibold">{ticket.title}</h3>

                    <span className="text-xs text-gray-400">
                      {new Date(ticket.updatedAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="truncate text-sm text-gray-400">
                    {ticket.description}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
                      {ticket.priority}
                    </span>

                    <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
                      {ticket.status}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {!selectedTicket ? (
          <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
            <MessageSquare size={60} className="mb-4 opacity-50" />

            <p>Selecciona una conversación</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-white/10 bg-[#111827] px-6 py-4">
              <div>
                <h2 className="font-semibold">{selectedTicket.title}</h2>

                <p className="text-sm text-gray-400">{selectedTicket.status}</p>
              </div>

              {isSupport && (
                <select
                  value={selectedTicket.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="rounded-lg bg-[#1f2937] p-2 outline-none"
                >
                  <option value="OPEN">OPEN</option>

                  <option value="IN_PROGRESS">IN_PROGRESS</option>

                  <option value="WAITING">WAITING</option>

                  <option value="RESOLVED">RESOLVED</option>

                  <option value="CLOSED">CLOSED</option>

                  <option value="REOPENED">REOPENED</option>
                </select>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loadingMessages ? (
                <div className="flex items-center justify-center p-10">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isMine = msg.userId === currentUserId;

                    return (
                      <div
                        key={msg.id}
                        className={`flex ${
                          isMine ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                            isMine ? "bg-blue-600" : "bg-[#1e293b]"
                          }`}
                        >
                          <div className="mb-1 text-xs font-semibold text-gray-300">
                            {msg.user?.name || "Usuario"}
                          </div>

                          <p className="break-words text-sm">{msg.message}</p>

                          <div className="mt-2 text-right text-xs opacity-60">
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div ref={messagesEndRef} />
                </div>
              )}
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
                  disabled={sending}
                  onClick={sendMessage}
                  className="rounded-full bg-blue-600 p-3 hover:bg-blue-700"
                >
                  {sending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
