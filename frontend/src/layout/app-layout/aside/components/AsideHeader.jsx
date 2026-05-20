import { ShieldCheck, Sparkles } from "lucide-react";

export default function AsideHeader({ isCollapsed }) {
  return (
    <div
      className="
        relative
        border-b
        border-slate-200
        dark:border-slate-800

        bg-gradient-to-br
        from-slate-50
        to-white

        dark:from-slate-900
        dark:to-slate-950

        overflow-hidden
      "
    >
      {/* Glow decorativo */}
      <div
        className="
          absolute
          -top-10
          -right-10
          w-28
          h-28
          bg-indigo-500/10
          blur-3xl
          rounded-full
        "
      />

      <div
        className={`
          relative
          flex
          items-center
          gap-4
          transition-all
          duration-300

          ${isCollapsed ? "justify-center px-2 py-5" : "px-5 py-6"}
        `}
      >
        {/* Logo */}
        <div
          className="
            relative
            flex
            items-center
            justify-center

            w-12
            h-12

            rounded-2xl

            bg-gradient-to-br
            from-indigo-500
            via-violet-500
            to-purple-600

            shadow-lg
            shadow-indigo-500/20

            flex-shrink-0
          "
        >
          <ShieldCheck className="w-6 h-6 text-white" />

          <div
            className="
              absolute
              -top-1
              -right-1

              w-5
              h-5

              rounded-full

              bg-white
              dark:bg-slate-900

              flex
              items-center
              justify-center

              shadow-md
            "
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>
        </div>

        {/* Información */}
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <h1
              className="
                text-base
                font-bold
                tracking-tight

                text-slate-900
                dark:text-white

                truncate
              "
            >
              DevCore ERP
            </h1>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400

                mt-1
                truncate
              "
            >
              Enterprise Management System
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
