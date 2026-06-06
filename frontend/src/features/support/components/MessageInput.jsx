import EmojiPicker from "emoji-picker-react";
import { Loader2, Paperclip, Send, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MessageInput({ onSend, sending }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]); // Guarda [{ file, preview, type }]

  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Cerrar el selector de emojis si se hace click afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar selección de archivos (Imágenes / Videos)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newAttachments = files.map((file) => ({
      file,
      type: file.type.startsWith("video/") ? "VIDEO" : "IMAGE",
      preview: URL.createObjectURL(file), // Genera URL temporal para renderizarlo
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    e.target.value = ""; // Limpia el input nativo
  };

  // Remover un archivo antes de enviar
  const removeAttachment = (index) => {
    setAttachments((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview); // Libera memoria
      updated.splice(index, 1);
      return updated;
    });
  };

  // Añadir emoji al texto actual
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSend = () => {
    const hasMessage = message.trim();
    const hasFiles = attachments.length > 0;

    if (!hasMessage && !hasFiles) return;

    // Adaptamos los parámetros basándonos en tu hook mutador.
    // Pasamos el texto y la lista de archivos preparados para subida.
    onSend({
      text: message,
      attachments: attachments.map((att) => ({
        file: att.file,
        type: att.type,
      })),
    });

    // Resetear todo el input tras disparar la acción
    setMessage("");
    setAttachments([]);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative">
      {/* ========================================
       * CONTENEDOR FLOTANTE DE EMOJIS
       * ====================================== */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-20 left-4 z-50 shadow-2xl animate-fade-in"
        >
          <EmojiPicker
            theme="dark"
            onEmojiClick={handleEmojiClick}
            searchPlaceholder="Buscar emoji..."
            width={320}
            height={400}
          />
        </div>
      )}

      {/* Input nativo oculto para gestionar la carga multimedia */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        multiple
        className="hidden"
      />

      {/* Contenedor Principal Estilo Bubble */}
      <div className="flex flex-col gap-2 rounded-2xl bg-slate-100 dark:bg-[#1f2937] px-4 py-3 border border-slate-200/50 dark:border-transparent">
        {/* ========================================
         * PANEL DE VISTAS PREVIAS (Fila superior si hay adjuntos)
         * ====================================== */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-700/50">
            {attachments.map((att, idx) => (
              <div
                key={idx}
                className="relative group h-20 w-20 rounded-xl overflow-hidden bg-black border border-slate-700"
              >
                {att.type === "IMAGE" ? (
                  <img
                    src={att.preview}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={att.preview}
                    className="h-full w-full object-cover"
                  />
                )}

                {/* Botón flotante para eliminar el archivo individual de la cola */}
                <button
                  type="button"
                  onClick={() => removeAttachment(idx)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ========================================
         * BARRA DE ACCIONES Y TEXTO
         * ====================================== */}
        <div className="flex items-center gap-3">
          {/* Botón de Adjuntos Multimedia */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-slate-400 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Adjuntar imagen o video"
            >
              <Paperclip size={20} />
            </button>

            {/* Botón de Emojis */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`p-1.5 rounded-lg transition-colors ${showEmojiPicker ? "text-blue-500 bg-slate-200 dark:bg-slate-800" : "text-slate-400 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"}`}
              title="Añadir emoji"
            >
              <Smile size={20} />
            </button>
          </div>

          {/* Campo de Texto */}
          <input
            type="text"
            value={message}
            placeholder={
              attachments.length > 0
                ? "Añade un comentario al archivo..."
                : "Escribe un mensaje..."
            }
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !sending) {
                handleSend();
              }
            }}
            className="flex-1 bg-transparent text-slate-900 dark:text-white text-sm outline-none placeholder-slate-400 dark:placeholder-gray-500"
          />

          {/* Botón Acción Enviar */}
          <button
            type="button"
            disabled={sending || (!message.trim() && attachments.length === 0)}
            onClick={handleSend}
            className="
              flex h-10 w-10 items-center justify-center rounded-full 
              bg-blue-600 text-white shadow-md shadow-blue-600/10
              transition-all duration-200 
              hover:bg-blue-700 active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100
            "
          >
            {sending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={16} className="ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
