// features/components/SecurityFeatures.jsx

import { ShieldCheck, LockKeyhole } from "lucide-react";

import { security } from "../constants/security.js";

import FeatureCard from "./FeatureCard";

export default function SecurityFeatures() {
  return (
    <section className="relative py-20 max-w-7xl mx-auto px-6">
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          gap-8

          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        {/* LEFT */}
        <div className="max-w-3xl">
          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-[#d7e0e7]

              bg-white/10
              px-4
              py-2

              text-sm
              font-semibold

              text-[#274c77]

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/[0.03]
              dark:text-[#a3cef1]
            "
          >
            <ShieldCheck size={16} />
            Seguridad Empresarial
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-7

              text-4xl
              font-black
              leading-tight
              tracking-tight

              text-[#0f172a]

              dark:text-[#e7ecef]

              md:text-5xl
            "
          >
            Protección avanzada para tu empresa
            <span
              className="
                mt-2
                block

                bg-gradient-to-r
                from-[#274c77]
                via-[#6096ba]
                to-[#a3cef1]

                bg-clip-text
                text-transparent
              "
            >
              seguridad moderna y confiable
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              max-w-2xl

              text-base
              leading-relaxed

              text-[#5b6472]

              dark:text-[#cbd5e1]

              md:text-lg
            "
          >
            Protege usuarios, accesos, operaciones y datos empresariales con
            autenticación segura, permisos avanzados y monitoreo inteligente.
          </p>
        </div>

        {/* RIGHT INFO */}
        <div
          className="
            flex
            items-center
            gap-4

            rounded-2xl

            border
            border-[#d7e0e7]

            bg-white/[0.04]
            px-5
            py-4

            backdrop-blur-xl

            dark:border-white/10
            dark:bg-white/[0.03]
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-xl

              bg-gradient-to-br
              from-[#274c77]
              to-[#6096ba]

              text-white
            "
          >
            <LockKeyhole size={22} />
          </div>

          <div>
            <h4
              className="
                text-sm
                font-bold

                text-[#0f172a]

                dark:text-white
              "
            >
              Protección Inteligente
            </h4>

            <p
              className="
                text-xs

                text-[#5b6472]

                dark:text-[#cbd5e1]
              "
            >
              Seguridad integrada en todo el sistema ERP.
            </p>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div
        className="
          mt-16

          grid
          gap-8

          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {security.map((item, index) => (
          <FeatureCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
