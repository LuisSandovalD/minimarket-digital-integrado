export default function FormError({
  message,
}) {
  if (!message) return null;

  return (
    <div
      className="
        rounded-2xl
        border
        border-red-200
        bg-red-50/80
        px-4
        py-3
        text-sm
        font-medium
        text-red-500
        backdrop-blur-xl

        dark:border-red-900/30
        dark:bg-red-950/20
      "
    >
      {message}
    </div>
  );
}