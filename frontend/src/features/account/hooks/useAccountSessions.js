// ========================================
// hooks/useAccountSessions.js
// ========================================
import { useCallback, useEffect } from "react";
import useAccountStore from "../store/account.store";

export default function useAccountSessions() {
    const sessions = useAccountStore((state) => state.sessions);
    const sessionsLoading = useAccountStore((state) => state.sessionsLoading);
    const serverError = useAccountStore((state) => state.error);

    const fetchSessions = useAccountStore((state) => state.fetchSessions);
    const closeSession = useAccountStore((state) => state.closeSession);

    // Carga automática al montar la pestaña de dispositivos
    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    // Forzar refresco manual desde un botón de la interfaz
    const refreshSessions = useCallback(async () => {
        await fetchSessions();
    }, [fetchSessions]);

    // Cierre remoto de dispositivo
    const handleRevokeSession = async (sessionId) => {
        try {
            await closeSession(sessionId);
            return true;
        } catch (err) {
            return false;
        }
    };

    return {
        sessions, // Cada item contiene: id, ipAddress, deviceLabel, createdAt, isActive
        sessionsLoading,
        serverError,
        refreshSessions,
        handleRevokeSession,
    };
}
