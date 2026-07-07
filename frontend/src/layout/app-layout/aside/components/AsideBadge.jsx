export default function AsideBadge({ value }) {
  if (!value) return null;

  return (
    <span className="ml-auto flex h-5 min-w-[22px] items-center justify-center rounded-full bg-indigo-500 px-1.5 text-xs font-semibold text-white">
      {value}
    </span>
  );
}
