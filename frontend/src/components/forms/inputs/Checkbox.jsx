export default function Checkbox({ label, ...props }) {
  return (
    <label
      className="
        flex
        items-center
        gap-3
        text-sm
        font-medium
        text-[#6096ba]

        dark:text-[#8fb8d8]
      "
    >
      <input
        type="checkbox"
        className="
          h-4
          w-4
          rounded
          border-[#cbd5e1]
          text-[#274c77]
          focus:ring-[#274c77]
        "
        {...props}
      />

      {label}
    </label>
  );
}
