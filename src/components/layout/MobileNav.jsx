import React from 'react';
import { useApp } from '../../context/AppContext';

export const MobileNav = () => {
  const { currentPage, setCurrentPage, setMobileMenuOpen } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: 'dashboard', page: 'dashboard' },
    { id: 'absensi', label: 'Absensi', icon: 'qr_code_scanner', page: 'absensi' },
    { id: 'krs', label: 'Akademik', icon: 'school', page: 'krs' },
    { id: 'keuangan', label: 'Keuangan', icon: 'account_balance_wallet', page: 'keuangan' },
    { id: 'menu', label: 'Menu', icon: 'grid_view', isMenu: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-40 flex items-center justify-around px-2 shadow-lg">
      {navItems.map((item) => {
        const isActive =
          !item.isMenu &&
          (currentPage === item.page ||
            (item.page === 'absensi' && currentPage === 'absensi-jarkom'));

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.isMenu) {
                setMobileMenuOpen(true);
              } else {
                setCurrentPage(item.page);
              }
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 min-h-[48px] transition-colors ${
              isActive ? 'text-primary font-semibold' : 'text-ink-muted hover:text-ink'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                isActive ? 'scale-105' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[11px] leading-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
