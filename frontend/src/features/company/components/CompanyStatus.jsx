export default function CompanyStatus({ company }) {
  return (
    <section
      className="
        mt-6

        rounded-2xl

        border
        border-slate-200/70

        bg-white

        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4

          p-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* STATUS */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className={`
              h-2.5
              w-2.5
              rounded-full

              ${
                company.isActive
                  ? `
                    bg-emerald-500
                    shadow-[0_0_12px_rgba(16,185,129,0.45)]
                  `
                  : `
                    bg-slate-400
                  `
              }
            `}
          />

          <div>
            <p
              className="
                text-sm
                font-medium

                text-slate-900
                dark:text-slate-100
              "
            >
              {company.isActive ? "Empresa activa" : "Empresa inactiva"}
            </p>

            <span
              className="
                text-xs

                text-slate-500
                dark:text-slate-400
              "
            >
              Estado operacional actual
            </span>
          </div>
        </div>

        {/* PLAN */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              text-xs
              uppercase
              tracking-[0.14em]

              text-slate-400
              dark:text-slate-500
            "
          >
            Plan
          </span>

          <div
            className="
              rounded-full

              border
              border-slate-200

              bg-slate-100

              px-3
              py-1.5

              text-xs
              font-medium

              text-slate-700

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
            "
          >
            {company.subscriptionTier || "Free"}
          </div>
        </div>
      </div>
    </section>
  );
}
