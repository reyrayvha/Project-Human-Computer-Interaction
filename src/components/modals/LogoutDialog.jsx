import React from 'react';
import { useApp } from '../../context/AppContext';

export const LogoutDialog = () => {
  const { logoutDialogOpen, setLogoutDialogOpen, handleLogout } = useApp();

  if (!logoutDialogOpen) return null;

  const onConfirmLogout = () => {
    handleLogout();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-in"
      onClick={() => setLogoutDialogOpen(false)}
    >
      <div
        className="bg-card w-full max-w-[420px] rounded-xl shadow-2xl border border-border p-6 flex flex-col gap-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-danger-tint text-danger flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">logout</span>
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-ink leading-tight">Keluar dari SALAM?</h3>
            <p className="text-[12px] text-ink-muted">Konfirmasi penghentian sesi akun</p>
          </div>
        </div>

        <p className="text-[14px] text-ink leading-relaxed">
          Kamu perlu masuk lagi untuk membuka layanan akademik. Pastikan seluruh pemilihan mata kuliah atau isian formulir telah tersimpan.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setLogoutDialogOpen(false)}
            className="px-4 py-2 rounded-lg border border-border text-ink hover:bg-bg transition-colors font-medium text-[14px]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirmLogout}
            className="px-4 py-2 rounded-lg bg-danger hover:bg-danger/90 text-white transition-colors font-semibold text-[14px]"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};
