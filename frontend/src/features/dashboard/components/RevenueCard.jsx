export default function RevenueCard({ title, value }) {
  return (
    <div
      className="
        rounded-3xl

        border
        border-slate-200/70
        dark:border-slate-800/70

        bg-white/70
        dark:bg-slate-900/70

        p-5

        shadow-sm
        backdrop-blur-xl
      "
    >
      <p
        className="
          text-sm

          text-slate-500
          dark:text-slate-400
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-2

          text-2xl
          font-bold

          text-slate-800
          dark:text-white
        "
      >
        {value}
      </h3>
    </div>
  );
}
