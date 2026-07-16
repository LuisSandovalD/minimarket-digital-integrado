const IMAGE = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop";

export default function RegisterSidebar() {
  return (
    <div className="relative hidden w-[38%] shrink-0 overflow-hidden lg:block">
      <img src={IMAGE} alt="ERP Empresarial" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/70 via-[#0f172a]/40 to-[#274c77]/20" />
    </div>
  );
}
