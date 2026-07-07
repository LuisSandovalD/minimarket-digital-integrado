import { Modal } from "@/components/overlays";
import PricingCards from "../../../public/pricing/components/PricingCards";
import RegisterHeader from "./RegisterHeader";

export default function PlanComparisonModal({ open, onClose }) {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} size="full">
      {/* Header */}
      <RegisterHeader onClose={onClose} />

      {/* Contenido Principal con scroll independiente */}
      <div className="flex-1 overflow-y-auto">
        <PricingCards />
      </div>
    </Modal>
  );
}
