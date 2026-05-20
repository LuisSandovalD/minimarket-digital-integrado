// features/components/FeatureCard.jsx

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  image,
}) {
  return (
    <article
      className="
        overflow-hidden
        rounded-[28px]

        border
        border-[#d7e0e7]

        bg-white/10

        transition-all
        duration-300

        hover:-translate-y-2

        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      <img
        src={image}
        alt={title}
        className="
          h-56
          w-full
          object-cover
        "
      />

      <div className="p-6">
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
          <Icon size={20} />
        </div>

        <h3
          className="
            mt-5
            text-2xl
            font-black
          "
        >
          {title}
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
          {description}
        </p>
      </div>
    </article>
  );
}