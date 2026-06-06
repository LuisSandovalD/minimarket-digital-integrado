export function PaymentReferenceCard({ icon, label, value, onChange }) {
  return (
    <div
      className="
        rounded-3xl

       bg-white/80
       dark:bg-white/[0.03]

       border
       border-black/[0.06]
       dark:border-white/[0.05]

       backdrop-blur-md


        p-4
      "
    >
      <Input
        label={label}
        icon={icon}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
