import {
  workflow,
} from "../constants/workflow";

export default function WorkflowSection() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="text-center">
          <span
            className="
              inline-flex
              rounded-full

              border
              border-[#d7e0e7]

              bg-white/70
              px-5
              py-2.5

              text-sm
              font-semibold

              text-[#274c77]

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-white/5
              dark:text-[#a3cef1]
            "
          >
            Flujo Inteligente
          </span>

          <h2
            className="
              mt-7
              text-5xl
              font-black
              tracking-tight

              text-[#0f172a]

              dark:text-white
            "
          >
            Gestiona tu negocio
            <span
              className="
                block

                bg-gradient-to-r
                from-[#274c77]
                via-[#6096ba]
                to-[#a3cef1]

                bg-clip-text
                text-transparent
              "
            >
              en pocos pasos
            </span>
          </h2>
        </div>

        {/* STEPS */}
        <div
          className="
            mt-20
            grid
            gap-8

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {workflow.map((item) => (
            <article
              key={item.step}
              className="
                relative
                overflow-hidden

                rounded-[32px]

                border
                border-[#d7e0e7]

                bg-white/70
                p-8

                shadow-xl
                backdrop-blur-2xl

                dark:border-white/10
                dark:bg-white/5
              "
            >
              {/* NUMBER */}
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-br
                  from-[#274c77]
                  to-[#6096ba]

                  text-2xl
                  font-black
                  text-white
                "
              >
                {item.step}
              </div>

              <h3
                className="
                  mt-6
                  text-xl
                  font-bold

                  text-[#0f172a]

                  dark:text-white
                "
              >
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}