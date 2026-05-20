export default function AsideBadge({ value }) {
  if (!value) return null;

  return (
    <span
      className="
        ml-auto
        min-w-[22px]
        h-5
        px-1.5
        flex
        items-center
        justify-center
        rounded-full
        bg-indigo-500
        text-white
        text-xs
        font-semibold
      "
    >
      {value}
    </span>
  );
}
