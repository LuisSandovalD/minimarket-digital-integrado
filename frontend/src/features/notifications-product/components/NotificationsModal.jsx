// ========================================
// NotificationsDropdown.jsx
// ========================================

import { Bell } from "lucide-react";

import { useState } from "react";

import ModernButton from "@/components/buttons/ModernButton";

import Modal from "@/components/modals/Modal";

import HeaderModal from "@/components/modals/HeaderModal";

import FooterModal from "@/components/modals/FooterModal";

import useNotifications from "../hooks/useNotifications";

import NotificationItem from "./NotificationItem";

import NotificationsEmpty from "./NotificationsEmpty";

export default function NotificationsModal() {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    loading,
    unreadCount,
    toggleRead,
    removeNotification,
  } = useNotifications();

  // ========================================
  // CLEAR ALL
  // ========================================

  const handleClearAll = () => {
    notifications.forEach((notification) => {
      removeNotification(notification.id);
    });
  };

  return (
    <>
      {/* BUTTON */}

      <div className="relative">
        <ModernButton
          onClick={() => setOpen(true)}
          icon={Bell}
          variant="ghost"
          text=""
          size="icon"
          className="
            relative
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            shadow-[0_4px_20px_rgba(0,0,0,0.12)]
            hover:bg-white/[0.06]
          "
        />

        {/* BADGE */}

        {unreadCount > 0 && (
          <span
            className="
              absolute
              top-2
              right-2

              flex
              items-center
              justify-center

              min-w-[18px]
              h-[18px]

              rounded-full

              bg-rose-500

              px-1

              text-[10px]
              font-semibold

              text-white
            "
          >
            {unreadCount}
          </span>
        )}
      </div>

      {/* MODAL */}

      <Modal open={open} onClose={() => setOpen(false)} size="lg">
        {/* HEADER */}

        <HeaderModal
          title="Notificaciones"
          subtitle={`${unreadCount} alertas pendientes`}
          onClose={() => setOpen(false)}
        />

        {/* CONTENT */}

        <div
          className="
            max-h-[550px]
            overflow-y-auto
            p-5
            space-y-3
          "
        >
          {loading ? (
            <div
              className="
                flex
                items-center
                justify-center
                py-10
              "
            >
              <div
                className="
                  h-5
                  w-5
                  rounded-full
                  border-2
                  border-slate-500
                  border-t-blue-500
                  animate-spin
                "
              />
            </div>
          ) : notifications.length === 0 ? (
            <NotificationsEmpty />
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onToggleRead={toggleRead}
              />
            ))
          )}
        </div>

        {/* FOOTER */}

        <FooterModal align="center">
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {notifications.length} notificaciones
          </p>
        </FooterModal>
      </Modal>
    </>
  );
}
