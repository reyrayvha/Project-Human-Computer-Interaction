import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { navigationMenu } from '../../data/mockData';

export const Sidebar = () => {
  const { currentPage, setCurrentPage, setLogoutDialogOpen, student } = useApp();
  const [expandedGroups, setExpandedGroups] = useState({
    perkuliahan: true,
    'hasil-studi': false,
    pendaftaran: false,
    wisuda: false,
    keuangan: true,
    akun: false,
  });

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const isItemActive = (path) => {
    if (path === '/' && currentPage === 'dashboard') return true;
    if (path === '/absensi' && (currentPage === 'absensi' || currentPage === 'absensi-jarkom')) return true;
    if (path === '/krs' && currentPage === 'krs') return true;
    if (path === '/keuangan' && currentPage === 'keuangan') return true;
    if (path.replace('/', '') === currentPage) return true;
    return false;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[264px] bg-card border-r border-border z-40 hidden md:flex flex-col justify-between select-none">
      {/* Brand Logo Header (Fixed at Top, exactly h-16 / 64px, never scrolls, never squeezed by scrollbar) */}
      <div className="h-16 px-4 border-b border-border flex items-center shrink-0 bg-card z-10 w-full">
        <div
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none w-full"
          title="SALAM UIN Sunan Gunung Djati Bandung"
        >
          <img
            alt="SALAM UIN Sunan Gunung Djati"
            className="h-10 w-auto object-contain shrink-0"
            src="/assets/salam-logo-icon-transparent.png"
          />
          <div className="flex flex-col justify-center min-w-0 shrink-0">
            <span className="font-extrabold text-[18px] tracking-[0.16em] text-ink leading-tight font-sans whitespace-nowrap">
              SALAM
            </span>
            <span className="text-[9.5px] font-semibold text-leaf tracking-tight leading-none mt-0.5 whitespace-nowrap">
              Sistem Administrasi Layanan Akademik
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Middle Container: User Profile + Navigation Groups */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col custom-scrollbar">
        {/* User Profile Card */}
        <div className="p-space-card border-b border-border shrink-0">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-tint text-primary font-bold text-[14px] flex items-center justify-center shrink-0">
              {student.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-ink truncate leading-snug">
                {student.name}
              </p>
              <p className="text-[12px] text-ink-muted leading-tight">
                NIM {student.nim}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-leaf inline-block"></span>
                <span className="text-ink-muted text-[11px] font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 px-space-xs py-space-sm flex flex-col gap-1">
          {navigationMenu.map((group) => (
            <div key={group.group} className="flex flex-col">
              <div className="px-space-md pt-space-sm pb-1 text-ink-muted text-[12px] font-semibold uppercase tracking-wider">
                {group.group}
              </div>

              {group.items.map((item) => {
                if (item.isExpandable) {
                  const isExpanded = expandedGroups[item.id];
                  const hasActiveChild = item.children?.some((child) => isItemActive(child.path));

                  return (
                    <div key={item.id} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => toggleGroup(item.id)}
                        className={`relative flex items-center justify-between px-space-md py-2 rounded-lg transition-colors text-left w-full ${
                          hasActiveChild ? 'text-primary font-semibold' : 'text-ink-muted hover:bg-bg hover:text-ink'
                        }`}
                      >
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                          <span className="text-[14px]">{item.label}</span>
                        </div>
                        <span
                          className={`material-symbols-outlined text-[16px] text-ink-muted transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        >
                          chevron_right
                        </span>
                      </button>

                      {isExpanded && item.children && (
                        <div className="pl-9 pr-2 py-1 flex flex-col gap-0.5">
                          {item.children.map((child) => {
                            const active = isItemActive(child.path);
                            return (
                              <button
                                key={child.id}
                                type="button"
                                onClick={() => setCurrentPage(child.path.replace('/', ''))}
                                className={`text-left px-3 py-1.5 rounded-md text-[13px] transition-colors relative ${
                                  active
                                    ? 'bg-primary-tint text-primary font-semibold'
                                    : 'text-ink-muted hover:bg-bg hover:text-ink'
                                }`}
                              >
                                {child.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Normal Flat Item
                const active = isItemActive(item.path);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentPage(item.path === '/' ? 'dashboard' : item.path.replace('/', ''))}
                    className={`relative flex items-center justify-between px-space-md py-2 rounded-lg transition-colors text-left w-full ${
                      active
                        ? 'bg-primary-tint text-primary font-semibold border-l-[3px] border-leaf'
                        : 'text-ink-muted hover:bg-bg hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-[14px]">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer: Isolated Logout Button with Danger Styling (Fixed at Bottom) */}
      <div className="p-space-card border-t border-border shrink-0 bg-card">
        <button
          type="button"
          onClick={() => setLogoutDialogOpen(true)}
          className="flex items-center gap-space-sm w-full px-space-sm py-2 rounded-lg text-danger hover:bg-danger-tint transition-colors font-semibold text-[14px]"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
};
