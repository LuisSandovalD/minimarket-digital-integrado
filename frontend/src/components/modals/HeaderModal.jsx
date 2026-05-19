import { X } from "lucide-react";

export default function HeaderModal({
  title = "Título del Modal",
  subtitle = "Descripción breve",
  icon: Icon,

  onClose,
}) {
  return (
    <div
      className="
        relative
        overflow-hidden
        border-b
        border-[#d7e0e7]
        bg-gradient-to-r
        from-[#f8fbfd]
        via-[#eef4f8]
        to-[#f8fbfd]
        px-6
        py-5

        dark:border-[#365d86]/20
        dark:from-[#0f172a]
        dark:via-[#13263b]
        dark:to-[#0f172a]
      "
    >
      {/* BACKGROUND EFFECT */}
      <div
        className="
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          bg-[#6096ba]/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          h-24
          w-24
          rounded-full
          bg-[#274c77]/10
          blur-2xl
        "
      />

      <div className="relative flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-4">
          
          {Icon && (
            <div
              className="
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
                border
                border-[#6096ba]/20
                bg-gradient-to-br
                from-[#274c77]
                via-[#365d86]
                to-[#6096ba]
                text-white
                shadow-xl
                shadow-[#274c77]/20
              "
            >
              {/* SHINE */}
              <span
                className="
                  absolute
                  inset-0
                  bg-gradient-to-tr
                  from-transparent
                  via-white/10
                  to-transparent
                "
              />

              <Icon
                size={24}
                className="relative z-10"
              />
            </div>
          )}

          {/* TEXT */}
          <div>
            <h2
              className="
                text-xl
                font-black
                tracking-tight
                text-[#274c77]
                dark:text-white
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-1
                max-w-md
                text-sm
                leading-relaxed
                text-[#6096ba]
                dark:text-[#8fb8d8]
              "
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            group
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-[#d7e0e7]
            bg-white/70
            text-[#274c77]
            shadow-sm
            backdrop-blur-xl
            transition-all
            duration-300

            hover:scale-105
            hover:border-red-200
            hover:bg-red-50
            hover:text-red-500

            dark:border-[#365d86]/20
            dark:bg-[#0f172a]/60
            dark:text-[#a3cef1]
            dark:hover:border-red-900/30
            dark:hover:bg-red-950/20
            dark:hover:text-red-400
          "
        >
          <X
            size={20}
            className="
              transition-transform
              duration-300
              group-hover:rotate-90
            "
          />
        </button>
      </div>
    </div>
  );
}