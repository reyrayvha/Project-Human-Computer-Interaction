import React from 'react';
import { useApp } from '../../context/AppContext';

export const AvatarMenuDropdown = () => {
  const {
    avatarMenuOpen,
    setAvatarMenuOpen,
    student,
    setCurrentPage,
    setLogoutDialogOpen,
    setReportDialogOpen,
    setReportContextData,
  } = useApp();

  if (!avatarMenuOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={() => setAvatarMenuOpen(false)}
      />
      <div className="absolute right-4 top-16 mt-2 w-72 sm:w-80 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-up">
        {/* User Profile Header */}
        <div className="p-4 border-b border-border bg-bg">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary-tint text-primary font-bold text-[16px] flex items-center justify-center shrink-0">
              {student.avatarInitials}
            </div>
            <div className="min-w-0">
              <h4 className="text-[14px] font-semibold text-ink leading-tight truncate">
                {student.name}
              </h4>
              <p className="text-[12px] text-ink-muted">NIM {student.nim}</p>
              <p className="text-[11px] text-ink-muted truncate">{student.prodi}</p>
            </div>
          </div>
        </div>

        {/* Security & Activity Cues */}
        <div className="px-4 py-2.5 bg-card border-b border-border">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="material-symbols-outlined text-[15px] text-primary">security</span>
            <span className="font-semibold text-ink">Informasi Keamanan Akun</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1 leading-snug">
            Terakhir masuk: <span className="text-ink font-medium">{student.lastLogin}</span>
          </p>
        </div>

        {/* Quick Menu Items */}
        <div className="p-2 flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => {
              setAvatarMenuOpen(false);
              setCurrentPage('akun');
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-ink hover:bg-bg transition-colors text-left text-[13px]"
          >
            <span className="material-symbols-outlined text-[18px] text-ink-muted">manage_accounts</span>
            <span>Profil & Pengaturan Akun</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAvatarMenuOpen(false);
              setCurrentPage('akun');
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-ink hover:bg-bg transition-colors text-left text-[13px]"
          >
            <span className="material-symbols-outlined text-[18px] text-ink-muted">devices</span>
            <span>Riwayat Sesi Perangkat</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAvatarMenuOpen(false);
              setReportContextData({ title: 'Akun Mahasiswa', value: student.name });
              setReportDialogOpen(true);
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-ink hover:bg-bg transition-colors text-left text-[13px]"
          >
            <span className="material-symbols-outlined text-[18px] text-warning">flag</span>
            <span>Laporkan Data Keliru</span>
          </button>
        </div>

        {/* Logout Row */}
        <div className="p-2 border-t border-border bg-bg">
          <button
            type="button"
            onClick={() => {
              setAvatarMenuOpen(false);
              setLogoutDialogOpen(true);
            }}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-danger hover:bg-danger-tint transition-colors text-left font-semibold text-[13px]"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Keluar dari SALAM</span>
          </button>
        </div>
      </div>
    </>
  );
};
