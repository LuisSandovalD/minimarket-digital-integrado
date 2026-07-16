// ========================================
// features/auth/components/login/TwoFactorLoginModal.jsx
// ========================================
import { Loader2, MailCheck, X } from "lucide-react";
import { useState } from "react";
import { verifyTwoFactorService } from "../../services/twofactor.service";

export default function TwoFactorLoginModal({ open, userId, email, onSuccess, onClose }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (token.length !== 6) return;

    try {
      setLoading(true);
      setError("");

      // 🚀 Flujo de Login: Se envía el código recibido por CORREO ELECTRÓNICO
      const response = await verifyTwoFactorService({
        userId,
        email,
        token,
        code: token,
      });

      onSuccess(response);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Código incorrecto o expirado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 border dark:border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          type="button"
        >
          <X size={18} />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
            <MailCheck size={24} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Verificación de Seguridad</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hemos enviado un código de 6 dígitos a tu correo electrónico registrado.
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              autoFocus
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-3 text-center text-2xl font-mono tracking-[0.2em] font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 text-center">
              Ingresa el código que acabas de recibir en tu bandeja de entrada.
            </p>
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-2.5 rounded-xl text-center">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading || token.length !== 6}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/10"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verificando...
                </>
              ) : (
                "Confirmar Código"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
