import { Menu } from "lucide-react";

export default function NavbarMobileButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#d0d5da] text-[#274c77] transition-all duration-300 hover:bg-[#e7ecef] hover:border-[#6096ba] hover:-translate-y-0.5 lg:hidden"
    >
      <Menu size={22} />
    </button>
  );
}