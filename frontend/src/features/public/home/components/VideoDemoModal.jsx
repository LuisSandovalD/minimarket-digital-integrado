import DemoVideo from "@/assets/videos/minimarket_digital_integrado.mp4";
import { ModernButton } from "@/components/buttons";
import { Modal } from "@/components/overlays";
import { X } from "lucide-react";

export default function VideoDemoModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="relative group">
        {/* Glow animado de fondo */}
        <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-r from-cyan-500/30 via-blue-500/25 to-emerald-500/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 blur-md" />

        {/* Contenedor principal */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-950 shadow-[0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Barra superior */}
          <div className="flex items-center gap-2 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 to-slate-900/90 px-4 py-2.5">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 rounded-full bg-slate-800/60 px-3 py-1 border border-slate-700/50">
              <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
              <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.6)]" />
              <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            </div>

            {/* Nombre del archivo */}
            <div className="mx-auto flex items-center gap-2 rounded-md bg-slate-800/60 px-3 py-1 text-xs text-slate-400 border border-slate-700/50">
              <span className="text-emerald-400 text-[10px]">▶</span>
              <span className="truncate max-w-[220px]">
                minimarket-demo.mp4
              </span>
            </div>

            {/* Badge Demo */}
            <ModernButton onClick={onClose} variant="ghost" icon={X} text="" />
          </div>

          {/* Video */}
          <div className="relative">
            <video
              className="w-full aspect-video object-cover block"
              controls
              autoPlay
              muted
              preload="metadata"
            >
              <source src={DemoVideo} type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
          </div>

          {/* Barra inferior */}
          <div className="flex items-center justify-between border-t border-slate-800/60 bg-slate-900/80 px-4 py-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sistema en vivo
            </span>
            <span>Minimarket Digital v1.0</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
