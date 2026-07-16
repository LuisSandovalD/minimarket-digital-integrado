import { ModernButton, SubmitButton } from "@/components/buttons";
import { FooterModal } from "@/components/overlays";

export default function RegisterFooter({ step, loading, nextStep, prevStep, handleSubmit }) {
  return (
    <FooterModal>
      <div className="flex w-full items-center justify-between">
        <div className="text-sm font-medium text-[#6096ba]">Paso {step} de 3</div>

        <div className="flex items-center gap-3">
          {step > 1 && <ModernButton text="Volver" variant="outline" onClick={prevStep} />}

          {step < 3 ? (
            <ModernButton text="Continuar" onClick={nextStep} />
          ) : (
            <SubmitButton
              text={loading ? "Creando cuenta..." : "Finalizar Registro"}
              loading={loading}
              disabled={loading}
              onClick={handleSubmit}
            />
          )}
        </div>
      </div>
    </FooterModal>
  );
}
