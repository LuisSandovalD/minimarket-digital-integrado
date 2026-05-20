// ============================================
// components/ui/table/Table.jsx
// ============================================

export default function Table({ children, className = "" }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.18)]
        ${className}
      `}
    >
      {/* Glass Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.05]
          via-transparent
          to-white/[0.02]
        "
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">{children}</table>
      </div>
    </div>
  );
}
