import { useState } from "react";

import { verifyTwoFactorService } from "../services/twofactor.service";

export default function useTwoFactor({ userId, onSuccess, onClose }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyCode = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await verifyTwoFactorService({
        userId,
        token,
      });

      onSuccess(response);

      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.message || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  return {
    token,
    setToken,
    loading,
    error,
    verifyCode,
  };
}
