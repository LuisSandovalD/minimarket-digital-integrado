export default function FormDivider({ text = "o continuar con" }) {
  return (
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#d7e0e7] dark:border-[#365d86]/20" />
      </div>

      <div className="relative flex justify-center">
        <span
          className="
            bg-white
            px-4
            text-xs
            font-medium
            text-[#6096ba]

            dark:bg-[#0f172a]
            dark:text-[#8fb8d8]
          "
        >
          {text}
        </span>
      </div>
    </div>
  );
}
