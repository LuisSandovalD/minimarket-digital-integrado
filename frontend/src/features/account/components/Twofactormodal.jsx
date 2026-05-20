import {
  useEffect,
  useState,
} from "react";

import {
  Lock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import {
  Modal,
  HeaderModal,
  FooterModal,
} from "@/components/modals";

import {
  ModernButton,
} from "@/components/buttons";

import useTwoFactor
  from "../hooks/useTwoFactor";

export default function TwoFactorModal({

  open,
  onClose,

}) {

  const {

    toggleTwoFactor,

    twoFactorLoading,

    enabled,

  } = useTwoFactor();

  const [status, setStatus] =
    useState(false);

  useEffect(() => {

    setStatus(
      Boolean(enabled)
    );

  }, [enabled]);

  /* ======================================
   * TOGGLE 2FA
   * ==================================== */

  async function handleToggle() {

    try {

      const newStatus =
        !status;

      await toggleTwoFactor(
        newStatus
      );

      setStatus(
        newStatus
      );

    } catch (error) {

      console.error(
        "2FA ERROR:",
        error
      );

    }

  }

  return (

    <Modal
      open={open}
      onClose={onClose}
      size="md"
    >
      <HeaderModal
        title="Autenticación de Dos Factores"
        subtitle="
          Añade una capa extra
          de seguridad a tu cuenta
        "
        onClose={onClose}
      />

      <div className="px-6 py-6">

        <div className="space-y-5">

          {/* ======================================
           * STATUS CARD
           * ==================================== */}

          {status ? (

            <div
              className="
                rounded-2xl
                border

                border-emerald-200
                dark:border-emerald-900/40

                bg-emerald-50/70
                dark:bg-emerald-900/10

                p-5
              "
            >

              <div className="flex gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-xl

                    bg-emerald-100
                    dark:bg-emerald-900/30
                  "
                >

                  <CheckCircle
                    size={20}
                    className="
                      text-emerald-600
                      dark:text-emerald-400
                    "
                  />

                </div>

                <div className="flex-1">

                  <p
                    className="
                      text-sm
                      font-semibold

                      text-emerald-700
                      dark:text-emerald-400
                    "
                  >
                    Protección activada
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm

                      leading-relaxed

                      text-emerald-700/90
                      dark:text-emerald-300
                    "
                  >
                    Tu cuenta ahora requiere
                    una verificación adicional
                    al iniciar sesión desde
                    nuevos dispositivos.
                  </p>

                </div>

              </div>

            </div>

          ) : (

            <div
              className="
                rounded-2xl
                border

                border-amber-200
                dark:border-amber-900/40

                bg-amber-50/70
                dark:bg-amber-900/10

                p-5
              "
            >

              <div className="flex gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-xl

                    bg-amber-100
                    dark:bg-amber-900/30
                  "
                >

                  <AlertCircle
                    size={20}
                    className="
                      text-amber-600
                      dark:text-amber-400
                    "
                  />

                </div>

                <div className="flex-1">

                  <p
                    className="
                      text-sm
                      font-semibold

                      text-amber-700
                      dark:text-amber-400
                    "
                  >
                    Protección desactivada
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm

                      leading-relaxed

                      text-amber-700/90
                      dark:text-amber-300
                    "
                  >
                    Activa la autenticación
                    de dos factores para
                    proteger tu cuenta frente
                    a accesos no autorizados.
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* ======================================
           * INFO
           * ==================================== */}

          <div
            className="
              rounded-2xl
              border

              border-slate-200
              dark:border-slate-800

              bg-slate-50/70
              dark:bg-slate-900/40

              p-4
            "
          >

            <div className="flex gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  bg-slate-200
                  dark:bg-slate-800
                "
              >

                <Lock
                  size={18}
                  className="
                    text-slate-600
                    dark:text-slate-300
                  "
                />

              </div>

              <div>

                <p
                  className="
                    text-sm
                    font-medium

                    text-slate-900
                    dark:text-white
                  "
                >
                  Seguridad adicional
                </p>

                <p
                  className="
                    mt-1
                    text-sm

                    leading-relaxed

                    text-slate-600
                    dark:text-slate-400
                  "
                >
                  Cuando el 2FA está activado,
                  necesitarás confirmar tu
                  identidad mediante un código
                  temporal durante el inicio
                  de sesión.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <FooterModal>

        <div
          className="
            flex
            justify-end
            gap-3
            w-full

          "
        >

          <ModernButton
            text="Cancelar"
            variant="outline"
            onClick={onClose}
          />

          <ModernButton
            text={
              twoFactorLoading
                ? "Procesando..."
                : status
                  ? "Desactivar"
                  : "Activar"
            }
            icon={Lock}
            onClick={handleToggle}
            disabled={
              twoFactorLoading
            }
            variant={
              status
                ? "outline"
                : "default"
            }
          />

        </div>

      </FooterModal>

    </Modal>

  );

}