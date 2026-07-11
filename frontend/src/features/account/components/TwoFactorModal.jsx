// ========================================
// features/account/components/TwoFactorModal.jsx
// ========================================
import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Lock,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import useTwoFactor from "../hooks/useTwoFactor";

export default function TwoFactorModal({ open, onClose }) {
  const {
    enabled,
    twoFactorLoading,
    serverError,
    init2FA,
    confirm2FA,
    turnOff2FA,
  } = useTwoFactor();

  // Estados internos del flujo guiado
  const [step, setStep] = useState(1); // 1: Info/Estado, 2: Configurar QR, 3: Mostrar Códigos de Respaldo
  const [qrData, setQrData] = useState(null);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [backupCodes, setBackupCodes] = useState(null);

  // Sincronizar el estado inicial cada vez que se abre el modal
  useEffect(() => {
    if (open) {
      setStep(1);
      setToken("");
      setPassword("");
      setQrData(null);
      setBackupCodes(null);
    }
  }, [open, enabled]);

  /* ======================================
   * FLUJO: INICIAR ACTIVACIÓN (PASO 1)
   * ==================================== */
  async function handleStartSetup() {
    const res = await init2FA();
    if (res) {
      setQrData(res); // Contiene { secret, qrCode }
      setStep(2);
    }
  }

  /* ======================================
   * FLUJO: CONFIRMAR CONFIGURACIÓN (PASO 2)
   * ==================================== */
  async function handleVerifyAndEnable(e) {
    if (e) e.preventDefault();
    if (!password || token.length !== 6) return;

    const res = await confirm2FA({ token, password });

    if (res) {
      // Extraemos de forma segura los códigos de respaldo sin importar la estructura de la respuesta
      const codes = res.backupCodes || res.data?.backupCodes || res.data;

      if (Array.isArray(codes)) {
        setBackupCodes(codes);
        setStep(3);
      } else {
        // Si no devuelve códigos pero fue exitoso, simplemente cerramos el modal
        onClose();
      }
    }
  }

  /* ======================================
   * FLUJO: DESACTIVACIÓN MEDIANTE PASSWORD
   * ==================================== */
  async function handleDisableAccount(e) {
    if (e) e.preventDefault();
    if (!password) return;
    const success = await turnOff2FA(password);
    if (success) {
      onClose();
    }
  }

  return (
    <Modal open={open} onClose={onClose} size="md">
      <HeaderModal
        title="Autenticación de Dos Factores (MFA / 2FA)"
        subtitle="Añade una capa extra de seguridad criptográfica a tu sesión corporativa"
        onClose={onClose}
        icon={Lock}
      />

      {/* ========================================
       * ENTORNO DEL PASO 2: VINCULACIÓN DE QR
       * ======================================== */}
      {step === 2 && qrData ? (
        <form onSubmit={handleVerifyAndEnable} className="flex flex-col flex-1">
          <div className="px-6 py-6 flex-1 space-y-5 text-center">
            {serverError && (
              <div className="p-3.5 text-xs text-left font-semibold rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-950/30">
                {serverError}
              </div>
            )}

            <div className="text-left bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Pasos para la vinculación:
              </p>
              <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal list-inside font-medium">
                <li>Abre tu aplicación autenticadora en tu teléfono móvil.</li>
                <li>Escanea el código QR que se muestra a continuación.</li>
                <li>Ingresa tu contraseña y el token temporal de 6 dígitos.</li>
              </ol>
            </div>

            <div className="bg-white p-3.5 w-48 h-48 mx-auto rounded-3xl border flex items-center justify-center shadow-inner">
              {qrData.qrCode ? (
                <img
                  src={qrData.qrCode}
                  alt="Código QR de Configuración MFA"
                  className="w-full h-full object-contain"
                />
              ) : (
                <QrCode size={48} className="text-slate-300 animate-pulse" />
              )}
            </div>

            <div className="space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                ¿No puedes escanearlo? Clave manual:
              </span>
              <br />
              <p className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg select-all border dark:border-slate-800 inline-block text-slate-700 dark:text-slate-300 break-all max-w-xs">
                {qrData.secret}
              </p>
            </div>

            <div className="max-w-xs mx-auto space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Contraseña de tu cuenta
                </label>
                <input
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-2.5 rounded-xl text-sm bg-transparent border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
                  Código de Verificación (6 dígitos del App)
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
                  className="w-full border p-2.5 rounded-xl text-center font-mono tracking-widest text-lg bg-transparent border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  maxLength={6}
                  required
                />
              </div>
            </div>
          </div>

          <FooterModal>
            <div className="flex justify-end gap-3 w-full">
              <ModernButton
                text="Volver"
                variant="outline"
                type="button"
                onClick={() => {
                  setStep(1);
                  setToken("");
                }}
                disabled={twoFactorLoading}
              />
              <ModernButton
                text={twoFactorLoading ? "Verificando..." : "Activar 2FA"}
                icon={ArrowRight}
                type="submit"
                disabled={twoFactorLoading || token.length !== 6 || !password}
                variant="primary"
              />
            </div>
          </FooterModal>
        </form>
      ) : (
        /* ========================================
         * ENTORNO DE PASOS 1 Y 3 (FORMULARIO GENERAL)
         * ======================================== */
        <form
          onSubmit={
            enabled && step === 1
              ? handleDisableAccount
              : (e) => e.preventDefault()
          }
          className="flex flex-col flex-1"
        >
          <div className="px-6 py-6 flex-1">
            <div className="space-y-5">
              {serverError && (
                <div className="p-3.5 text-xs font-semibold rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-950/30">
                  {serverError}
                </div>
              )}

              {step === 1 && (
                <>
                  {enabled ? (
                    <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/70 dark:bg-emerald-900/10 p-5">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                          <CheckCircle
                            size={20}
                            className="text-emerald-600 dark:text-emerald-400"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                            Protección activada correctamente
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-emerald-700/90 dark:text-emerald-300">
                            Tu cuenta ahora se encuentra protegida. Cada inicio
                            de sesión requerirá el token dinámico de tu
                            dispositivo móvil.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/70 dark:bg-amber-900/10 p-5">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                          <AlertCircle
                            size={20}
                            className="text-amber-600 dark:text-amber-400"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                            Protección desactivada
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-amber-700/90 dark:text-amber-300">
                            Activa la autenticación de dos factores para blindar
                            tus accesos frente a intentos de intrusión no
                            autorizados.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800">
                        <Lock
                          size={18}
                          className="text-slate-600 dark:text-slate-300"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          ¿Cómo funciona?
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          Vincularás una app de autenticación (Google
                          Authenticator, Authy, Microsoft Authenticator)
                          escaneando un código QR único generado de forma
                          segura.
                        </p>
                      </div>
                    </div>
                  </div>

                  {enabled && (
                    <div className="pt-2 space-y-3">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Para deshabilitar la protección, confirma tu contraseña
                        actual:
                      </label>
                      <input
                        type="password"
                        placeholder="Escribe tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2.5 rounded-xl text-sm bg-transparent border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        required={enabled}
                      />
                    </div>
                  )}
                </>
              )}

              {/* ========================================
               * PROTECCIÓN CRÍTICA EN PASO 3: CÓDIGOS DE RESPALDO
               * ======================================== */}
              {step === 3 && (
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      ¡Doble factor configurado con éxito!
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      Guarda estos códigos de recuperación en un lugar seguro.
                      No volverán a mostrarse:
                    </p>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl grid grid-cols-2 gap-2.5 font-mono text-xs border dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-inner font-bold tracking-wider">
                    {Array.isArray(backupCodes) ? (
                      backupCodes.map((code, idx) => (
                        <span
                          key={idx}
                          className="bg-white dark:bg-slate-950 py-1.5 px-2 rounded-lg border dark:border-slate-800/60 shadow-sm"
                        >
                          {code}
                        </span>
                      ))
                    ) : (
                      <p className="col-span-2 text-center text-xs font-sans py-2 font-normal text-slate-500">
                        Generando identificadores de respaldo...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <FooterModal>
            <div className="flex justify-end gap-3 w-full">
              {step !== 3 && (
                <ModernButton
                  text="Cancelar"
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={twoFactorLoading}
                />
              )}

              {step === 1 && (
                <ModernButton
                  text={
                    twoFactorLoading
                      ? "Procesando..."
                      : enabled
                        ? "Desactivar Protección"
                        : "Configurar 2FA"
                  }
                  icon={Lock}
                  type={enabled ? "submit" : "button"}
                  onClick={!enabled ? handleStartSetup : undefined}
                  disabled={twoFactorLoading || (enabled && !password)}
                  variant={enabled ? "danger" : "default"}
                />
              )}

              {step === 3 && (
                <ModernButton
                  text="Finalizar y Cerrar"
                  type="button"
                  onClick={onClose}
                  variant="primary"
                  className="w-full justify-center"
                />
              )}
            </div>
          </FooterModal>
        </form>
      )}
    </Modal>
  );
}
