import DemoVideo from "@/assets/videos/minimarket_digital_integrado.mp4";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import { Play, Tv } from "lucide-react";

export default function VideoDemoModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} size="xl" blur>
      {/* Header */}
      <HeaderModal
        title="Demo Interactiva ERP POS"
        subtitle="Flujo e integración en vivo para comercios"
        icon={Tv}
        size="md"
        onClose={onClose}
      />

      {/* Body */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <div className="w-full">
          <div className="overflow-hidden">
            {/* Barra simulada */}
            <div className="flex items-center justify-between  px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Play size={11} className="fill-emerald-400 text-emerald-400" />
                <span className="truncate">minimarket-demo-v1.mp4</span>
              </div>

              <div className="hidden w-12 sm:block" />
            </div>

            {/* Video */}
            <video
              className="block aspect-video w-full object-contain bg-transparent"
              controls
              autoPlay
              muted
              preload="metadata"
              playsInline
            >
              <source src={DemoVideo} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterModal align="between">
        <div className="flex w-full items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
              Entorno en producción activo
            </span>
          </div>

          <span className="font-mono text-[11px] opacity-70">v1.0.4</span>
        </div>
      </FooterModal>
    </Modal>
  );
}
