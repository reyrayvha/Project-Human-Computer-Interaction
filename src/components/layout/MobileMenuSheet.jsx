import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { navigationMenu } from '../../data/mockData';

export const MobileMenuSheet = () => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    currentPage,
    setCurrentPage,
    setLogoutDialogOpen,
    student,
  } = useApp();

  const [expandedGroups, setExpandedGroups] = useState({
    perkuliahan: true,
    'hasil-studi': false,
    pendaftaran: false,
    wisuda: false,
    keuangan: true,
    akun: false,
  });

  if (!mobileMenuOpen) return null;

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
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-ink/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card w-full max-h-[90vh] mt-auto rounded-t-2xl flex flex-col shadow-2xl overflow-hidden border-t border-border">
        {/* Header Handle & Close */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="SALAM logo"
              className="h-7 w-auto object-contain"
              src="/assets/salam-logo-icon-transparent.png"
            />
            <span className="font-semibold text-[16px] text-ink">Menu Navigasi SALAM</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full text-ink-muted hover:bg-bg hover:text-ink"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* User Compact Banner */}
        <div className="px-5 py-3 bg-bg border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-tint text-primary font-bold text-[14px] flex items-center justify-center">
            {student.avatarInitials}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink leading-tight">{student.name}</p>
            <p className="text-[12px] text-ink-muted">NIM {student.nim} • {student.prodi}</p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-border/60">
          {navigationMenu.map((group) => (
            <div key={group.group} className="py-2">
              <div className="px-2 pb-1 text-[11px] font-bold text-ink-muted uppercase tracking-wider">
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
                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors min-h-[44px] ${
                          hasActiveChild ? 'text-primary font-semibold' : 'text-ink-muted hover:bg-bg hover:text-ink'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                          <span className="text-[14px]">{item.label}</span>
                        </div>
                        <span
                          className={`material-symbols-outlined text-[18px] text-ink-muted transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        >
                          chevron_right
                        </span>
                      </button>

                      {isExpanded && item.children && (
                        <div className="pl-9 pr-2 py-1 flex flex-col gap-1 border-l-2 border-border ml-5 my-1">
                          {item.children.map((child) => {
                            const active = isItemActive(child.path);
                            return (
                              <button
                                key={child.id}
                                type="button"
                                onClick={() => {
                                  setCurrentPage(child.path.replace('/', ''));
                                  setMobileMenuOpen(false);
                                }}
                                className={`text-left px-3 py-2 rounded-md text-[13px] min-h-[40px] flex items-center ${
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

                const active = isItemActive(item.path);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCurrentPage(item.path === '/' ? 'dashboard' : item.path.replace('/', ''));
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors min-h-[44px] ${
                      active
                        ? 'bg-primary-tint text-primary font-semibold border-l-[3px] border-leaf'
                        : 'text-ink-muted hover:bg-bg hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-[14px]">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer: Logout */}
        <div className="p-4 border-t border-border bg-bg">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setLogoutDialogOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-danger-tint text-danger font-semibold text-[14px] hover:bg-danger/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Keluar dari SALAM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
