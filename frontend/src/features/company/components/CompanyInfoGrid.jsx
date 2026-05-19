import {
  BadgeCheck,
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
  User2,
} from "lucide-react";

export default function CompanyInfoGrid({
  company,
}) {

  const items = [
    {
      label: "Nombre Empresarial",
      value: company.name,
      icon: Building2,
    },

    {
      label: "Slug",
      value: company.slug,
      icon: BadgeCheck,
    },

    {
      label: "RUC",
      value: company.ruc,
      icon: ReceiptText,
    },

    {
      label: "Correo Corporativo",
      value: company.email,
      icon: Mail,
    },

    {
      label: "Teléfono",
      value: company.phone,
      icon: Phone,
    },

    {
      label: "Dirección",
      value: company.address,
      icon: MapPin,
    },

    {
      label: "Sitio Web",
      value: company.website,
      icon: Globe,
    },

    {
      label:
        "Representante Legal",

      value:
        company.legalRepresentative,

      icon: User2,
    },

    {
      label: "Tax ID",
      value: company.taxId,
      icon: ShieldCheck,
    },
  ];

  return (

    <section
      className="
        mt-6

        overflow-hidden

        rounded-2xl

        border
        border-slate-200/70

        bg-white

        dark:border-slate-800
        dark:bg-slate-950
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-slate-200/70

          px-5
          py-4

          dark:border-slate-800
        "
      >

        <div>

          <h3
            className="
              text-sm
              font-semibold

              text-slate-900
              dark:text-slate-100
            "
          >
            Información General
          </h3>

          <p
            className="
              mt-1

              text-xs

              text-slate-500
              dark:text-slate-400
            "
          >
            Datos corporativos y
            administrativos de la empresa
          </p>

        </div>

      </div>

      {/* GRID */}

      <div
        className="
          grid

          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {items.map((item) => {

          const Icon =
            item.icon;

          return (

            <div
              key={item.label}
              className="
                flex
                gap-4

                border-b
                border-r
                border-slate-200/70

                p-5

                transition-colors
                duration-200

                hover:bg-slate-50/70

                dark:border-slate-800
                dark:hover:bg-slate-900/40
              "
            >

              {/* ICON */}

              <div
                className="
                  mt-0.5

                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  bg-slate-100

                  dark:bg-slate-900
                "
              >

                <Icon
                  className="
                    h-4
                    w-4

                    text-slate-600
                    dark:text-slate-400
                  "
                />

              </div>

              {/* CONTENT */}

              <div
                className="
                  min-w-0
                  flex-1
                "
              >

                <p
                  className="
                    mb-1

                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.14em]

                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  {item.label}
                </p>

                <div
                  className="
                    break-words

                    text-sm
                    leading-relaxed

                    text-slate-900
                    dark:text-slate-100
                  "
                >

                  {item.value || (

                    <span
                      className="
                        text-slate-400
                        dark:text-slate-600
                      "
                    >
                      No registrado
                    </span>

                  )}

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}