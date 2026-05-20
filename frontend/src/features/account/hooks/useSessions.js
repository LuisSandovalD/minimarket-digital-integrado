// ========================================
// features/account/hooks/useSessions.js
// ========================================

import { useEffect } from "react";

import useAccountStore from "../store/account.store";

export default function useSessions() {
  const sessions = useAccountStore((state) => state.sessions);

  const sessionsLoading = useAccountStore((state) => state.sessionsLoading);

  const fetchSessions = useAccountStore((state) => state.fetchSessions);

  const closeSession = useAccountStore((state) => state.closeSession);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,

    sessionsLoading,

    fetchSessions,

    closeSession,
  };
}
