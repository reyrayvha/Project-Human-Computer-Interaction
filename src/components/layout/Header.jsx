import React from 'react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const {
    currentPage,
    setCurrentPage,
    serverCondition,
    student,
    setCommandPaletteOpen,
    notificationPanelOpen,
    setNotificationPanelOpen,
    avatarMenuOpen,
    setAvatarMenuOpen,
    systemStatusPopoverOpen,
    setSystemStatusPopoverOpen,
    notifications,
    setMobileMenuOpen,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getBreadcrumbTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Portal Layanan Akademik';
      case 'absensi':
        return 'Absensi Kuliah';
      case 'absensi-jarkom':
        return 'Absensi Kuliah > Jaringan Komputer';
      case 'krs':
        return 'Perkuliahan > Rencana Studi';
      case 'keuangan':
        return 'Keuangan > Tagihan Ukt';
      case 'kelulusan':
        return 'Perkuliahan > Kelulusan';
      case 'khs':
        return 'Hasil Studi > Kartu Hasil Studi (KHS)';
      case 'transkrip':
        return 'Hasil Studi > Transkrip Nilai';
      case 'bimbingan':
        return 'Bimbingan Skripsi / Tesis / Disertasi';
      case 'pendaftaran':
        return 'Layanan > Pendaftaran';
      case 'wisuda':
        return 'Layanan > Wisuda';
      case 'cetak-ktm':
        return 'Layanan > Cetak KTM Digital';
      case 'akun':
        return 'Akun > Pengaturan Profil & Keamanan';
      default:
        return 'Portal Layanan Akademik';
    }
  };

  const getStatusBadge = () => {
    switch (serverCondition) {
      case 'ramai':
        return {
          icon: 'schedule',
          text: 'SALAM sedang ramai',
          cls: 'bg-warning-tint text-warning border-warning/30',
        };
      case 'gangguan':
        return {
          icon: 'warning',
          text: 'Ada gangguan',
          cls: 'bg-danger-tint text-danger border-danger/30',
        };
      case 'pemeliharaan':
        return {
          icon: 'build',
          text: 'Pemeliharaan',
          cls: 'bg-info-tint text-info border-info/30',
        };
      default:
        return {
          icon: 'check_circle',
          text: 'SALAM normal',
          cls: 'bg-success-tint text-success border-success/30',
        };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <header className="fixed top-0 left-0 md:left-[264px] right-0 h-16 bg-card border-b border-border z-30 flex items-center justify-between px-4 md:px-6">
      {/* Left: Mobile Menu Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 text-ink-muted hover:text-ink hover:bg-bg rounded-lg"
          aria-label="Buka menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Mobile Brand Logo Icon */}
        <img
          alt="SALAM logo"
          className="md:hidden h-7 w-auto object-contain"
          src="/assets/salam-logo-icon-transparent.png"
          onClick={() => setCurrentPage('dashboard')}
        />

        {/* Desktop Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-[13px]">
          <button
            type="button"
            onClick={() => setCurrentPage('dashboard')}
            className="text-ink-muted hover:text-primary transition-colors cursor-pointer"
          >
            Beranda
          </button>
          {getBreadcrumbTitle().split(' > ').map((part, idx, arr) => (
            <React.Fragment key={idx}>
              <span className="text-ink-muted/70 text-[11px] font-bold">&gt;</span>
              <span className={idx === arr.length - 1 ? 'text-ink font-semibold' : 'text-ink-muted'}>
                {part}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Center: Global Search (Ctrl + K) */}
      <div className="flex-1 max-w-xs md:max-w-md mx-2 md:mx-6">
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full h-10 px-3 bg-bg hover:bg-card border border-border rounded-lg text-ink-muted text-[13px] flex items-center justify-between transition-colors shadow-sm cursor-pointer group"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="material-symbols-outlined text-[18px] text-ink-muted group-hover:text-primary">
              search
            </span>
            <span className="truncate">Cari layanan atau informasi...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 bg-card border border-border rounded text-[11px] font-mono text-ink-muted">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Status Chip, Semester, Notifications, Avatar */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* System Status Chip (Interactive Popover Trigger) */}
        <button
          type="button"
          onClick={() => {
            setSystemStatusPopoverOpen(!systemStatusPopoverOpen);
            setNotificationPanelOpen(false);
            setAvatarMenuOpen(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[12px] font-semibold transition-colors cursor-pointer ${statusInfo.cls}`}
          title="Klik untuk melihat status infrastruktur sistem"
        >
          <span className="material-symbols-outlined text-[16px]">{statusInfo.icon}</span>
          <span className="hidden lg:inline">{statusInfo.text}</span>
        </button>

        {/* Active Semester Badge */}
        <div className="hidden xl:flex items-center px-3 py-1 rounded-lg border border-border bg-bg text-[12px] font-medium text-ink-muted">
          Semester aktif 2026/2027 Ganjil
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationPanelOpen(!notificationPanelOpen);
              setAvatarMenuOpen(false);
              setSystemStatusPopoverOpen(false);
            }}
            aria-label="Notifikasi"
            className="relative p-2 text-ink-muted hover:text-ink rounded-lg hover:bg-bg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-danger text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Avatar Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setAvatarMenuOpen(!avatarMenuOpen);
              setNotificationPanelOpen(false);
              setSystemStatusPopoverOpen(false);
            }}
            className="w-8 h-8 rounded-full bg-primary text-white text-[13px] font-bold flex items-center justify-center hover:opacity-90 transition-opacity ring-2 ring-primary/20"
            aria-label="Menu akun"
          >
            {student.avatarInitials}
          </button>
        </div>
      </div>
    </header>
  );
};
