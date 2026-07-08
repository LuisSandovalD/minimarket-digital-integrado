// features/components/CTAFeatures.jsx

export default function CTAFeatures() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-12">
      <div className="rounded-[36px] border border-[#d7e0e7] bg-white/10 px-10 py-20 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
        <h2 className="text-4xl font-black sm:text-5xl text-[#0f172a] dark:text-white">
          Lleva tu empresa al siguiente nivel
        </h2>

        <p className="mt-6 text-lg text-[#5b6472] dark:text-[#cbd5e1]">
          Gestiona todo desde una plataforma moderna.
        </p>

        <button className="mt-10 rounded-2xl bg-[#274c77] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#1f3e61]">
          Comenzar ahora
        </button>
      </div>
    </section>
  );
}
