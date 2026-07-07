export default function FooterModal({ children, align = "right" }) {
  const aligns = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={`flex items-center gap-3 border-t border-[#d7e0e7] px-6 py-5 dark:border-[#365d86]/20 w-full ${aligns[align]}`}
    >
      {children}
    </div>
  );
}
