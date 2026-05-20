// inventory/components/InventoryPreviewCard.jsx

export default function InventoryPreviewCard({
  title,
  description,
  icon: Icon,
  image,
}) {
  return (
    <article
      className="
        overflow-hidden

        rounded-[30px]

        border
        border-[#d7e0e7]

        bg-white/10

        backdrop-blur-xl

        transition-all
        duration-300

        hover:-translate-y-1

        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            h-60
            w-full

            object-cover

            transition-transform
            duration-500

            hover:scale-105
          "
        />
      </div>

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
          <Icon size={20} />
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
