// features/components/CTAFeatures.jsx

export default function CTAFeatures() {
  return (
    <section>
      <div
        className="
          rounded-[36px]

          border
          border-[#d7e0e7]

          bg-white/10
          px-10
          py-20

          text-center

          dark:border-white/10
          dark:bg-white/[0.03]
        "
      >
        <h2
          className="
            text-5xl
            font-black
          "
        >
          Lleva tu empresa
          al siguiente nivel
        </h2>

        <p
          className="
            mt-6
            text-lg

            text-[#5b6472]

            dark:text-[#cbd5e1]
          "
        >
          Gestiona todo desde
          una plataforma moderna.
        </p>

        <button
          className="
            mt-10

            rounded-2xl

            bg-[#274c77]
            px-8
            py-4

            font-semibold
            text-white
          "
        >
          Comenzar ahora
        </button>
      </div>
    </section>
  );
}