export default function FooterModal({ children, align = "right" }) {
  const aligns = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={`
        relative
        flex
        items-center
        gap-3
        overflow-hidden
        border-t
        border-[#d7e0e7]
       
        px-6
        p-5
        dark:border-[#365d86]/20

        ${aligns[align]}
      `}
    >
      {/* LIGHT EFFECT */}
      <div className="absolute left-0 top-0 h-full w-32 " />

      {/* CONTENT */}
      <div className="relative z-10 flex w-full items-center">{children}</div>
    </div>
  );
}
