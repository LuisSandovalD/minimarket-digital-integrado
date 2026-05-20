import { features } from "../constants/features";

export default function InventoryFeatures() {
  return (
    <section className="py-20">
      <div className="max-w-7xl">
        <div className="max-w-3xl">
          <span
            className="
              text-sm
              font-semibold
              text-[#6096ba]
            "
          >
            Funcionalidades
          </span>

          <h2
            className="
              mt-4

              text-5xl
              font-black

              text-[#0f172a]

              dark:text-white
            "
          >
            Todo lo que necesitas para tu inventario
          </h2>
        </div>

        <div
          className="
            mt-16

            grid
            gap-8

            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={index}
                className="
                  overflow-hidden

                  rounded-[30px]

                  border
                  border-[#d7e0e7]

                  bg-white/10

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:-translate-y-2

                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    h-56
                    w-full

                    object-cover
                  "
                />

                <div className="p-7">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center

                      rounded-xl

                      bg-[#274c77]
                      text-white
                    "
                  >
                    <Icon size={22} />
                  </div>

                  <h3
                    className="
                      mt-5

                      text-2xl
                      font-black

                      text-[#0f172a]

                      dark:text-white
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-3

                      text-sm
                      leading-relaxed

                      text-[#5b6472]

                      dark:text-[#cbd5e1]
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
