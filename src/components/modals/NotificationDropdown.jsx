import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationDropdown = () => {
  const {
    notificationPanelOpen,
    setNotificationPanelOpen,
    notifications,
    setNotifications,
    setCurrentPage,
  } = useApp();

  if (!notificationPanelOpen) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAction = (notif) => {
    setNotificationPanelOpen(false);
    if (notif.actionPath) {
      setCurrentPage(notif.actionPath);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={() => setNotificationPanelOpen(false)}
      />
      <div className="absolute right-4 md:right-16 top-16 mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ink text-[15px]">Notifikasi</span>
            <span className="px-2 py-0.5 rounded-full bg-primary-tint text-primary text-[11px] font-bold">
              {notifications.filter((n) => !n.read).length} baru
            </span>
          </div>
          <button
            type="button"
            onClick={markAllRead}
            className="text-[12px] text-primary hover:underline font-medium"
          >
            Tandai semua dibaca
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-border/60">
          {notifications.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-[36px] text-ink-muted/50 mb-2">
                notifications_off
              </span>
              <p className="text-[14px] font-medium text-ink">Belum ada notifikasi</p>
              <p className="text-[12px] text-ink-muted mt-0.5">
                Pemberitahuan presensi dan status akademik akan muncul di sini.
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 flex items-start gap-3 transition-colors ${
                  notif.read ? 'bg-card' : 'bg-primary-tint/30'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    notif.type === 'absen'
                      ? 'bg-primary-tint text-primary'
                      : notif.type === 'warning'
                      ? 'bg-danger-tint text-danger'
                      : 'bg-info-tint text-info'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {notif.type === 'absen'
                      ? 'qr_code_scanner'
                      : notif.type === 'warning'
                      ? 'error'
                      : 'info'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-[13px] font-semibold text-ink leading-tight">{notif.title}</p>
                    <span className="text-[11px] text-ink-muted whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-[12px] text-ink-muted mt-1 leading-snug">{notif.desc}</p>
                  {notif.actionText && (
                    <button
                      type="button"
                      onClick={() => handleAction(notif)}
                      className="mt-2 text-[12px] font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
                    >
                      <span>{notif.actionText}</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-bg border-t border-border text-center">
          <button
            type="button"
            onClick={() => {
              setNotificationPanelOpen(false);
              setCurrentPage('dashboard');
            }}
            className="text-[12px] text-ink-muted hover:text-ink font-medium"
          >
            Lihat semua notifikasi di Dashboard
          </button>
        </div>
      </div>
    </>
  );
};
