export default function LoginOptions({ children }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >
      {children}

      <button
        type="button"
        className="
          text-sm
          font-semibold
          text-[#274c77]
          transition-colors
          hover:text-[#1f3c5d]

          dark:text-[#a3cef1]
        "
      >
        ¿Olvidaste tu contraseña?
      </button>
    </div>
  );
}
