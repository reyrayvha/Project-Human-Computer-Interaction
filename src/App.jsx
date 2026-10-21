import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { MobileMenuSheet } from './components/layout/MobileMenuSheet';
import { CommandPalette } from './components/modals/CommandPalette';
import { LogoutDialog } from './components/modals/LogoutDialog';
import { ReportDataDialog } from './components/modals/ReportDataDialog';
import { NotificationDropdown } from './components/modals/NotificationDropdown';
import { AvatarMenuDropdown } from './components/modals/AvatarMenuDropdown';
import { SystemStatusPopover } from './components/modals/SystemStatusPopover';
import { QrScannerModal } from './components/modals/QrScannerModal';
import { KoreksiPresensiModal } from './components/modals/KoreksiPresensiModal';
import { DemoControlBar } from './components/demo/DemoControlBar';

import { Dashboard } from './pages/Dashboard';
import { Absensi } from './pages/Absensi';
import { RiwayatAbsensiDetail } from './pages/RiwayatAbsensiDetail';
import { RencanaStudi } from './pages/RencanaStudi';
import { Keuangan } from './pages/Keuangan';
import { Login } from './pages/Login';
import { LupaPassword } from './pages/LupaPassword';
import { WaitingRoom } from './pages/WaitingRoom';
import { ServerDown } from './pages/ServerDown';
import { Maintenance } from './pages/Maintenance';
import { GenericAcademicPage } from './pages/GenericAcademicPage';

const AppContent = () => {
  const { currentPage, isAuthenticated, setCurrentPage, toast } = useApp();

  // Public pages (accessible without login)
  const publicPages = ['login', 'lupa-password'];
  const isPublicPage = publicPages.includes(currentPage);

  // Redirect effects (deferred via useEffect to avoid render-time state updates)
  useEffect(() => {
    // If not authenticated and not on a public page, redirect to login
    if (!isAuthenticated && !isPublicPage) {
      setCurrentPage('login');
    }
    // If authenticated and still on login page, redirect to dashboard
    if (isAuthenticated && currentPage === 'login') {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated, currentPage, isPublicPage, setCurrentPage]);

  // Global Toast Notification component
  const renderToast = () => {
    if (!toast) return null;
    return (
      <div className="fixed top-5 right-4 sm:right-8 z-50 animate-bounce-short">
        <div
          className={`px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-2.5 text-[13px] font-semibold text-white ${
            toast.type === 'success'
              ? 'bg-success border-success/40'
              : toast.type === 'warning'
              ? 'bg-warning border-warning/40'
              : toast.type === 'danger'
              ? 'bg-danger border-danger/40'
              : 'bg-primary border-primary/40'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {toast.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span>{toast.message}</span>
        </div>
      </div>
    );
  };

  // Show login for unauthenticated users trying to access protected pages
  if (!isAuthenticated && !isPublicPage) {
    return (
      <>
        {renderToast()}
        <Login />
      </>
    );
  }

  // Full-page views without app shell (public)
  if (currentPage === 'login') {
    return (
      <>
        {renderToast()}
        <Login />
      </>
    );
  }

  if (currentPage === 'lupa-password') {
    return (
      <>
        {renderToast()}
        <LupaPassword />
      </>
    );
  }

  // Full-page views without app shell (authenticated)
  if (currentPage === 'waiting-room') {
    return (
      <>
        {renderToast()}
        <WaitingRoom />
      </>
    );
  }

  if (currentPage === 'server-down') {
    return (
      <>
        {renderToast()}
        <ServerDown />
      </>
    );
  }

  if (currentPage === 'maintenance') {
    return (
      <>
        {renderToast()}
        <Maintenance />
      </>
    );
  }

  // Render Page Content based on currentPage
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'absensi':
        return <Absensi />;
      case 'absensi-jarkom':
        return <RiwayatAbsensiDetail />;
      case 'krs':
        return <RencanaStudi />;
      case 'keuangan':
        return <Keuangan />;
      default:
        return <GenericAcademicPage />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col antialiased">
      {/* Fixed Desktop Sidebar */}
      <Sidebar />

      {/* Main App Container */}
      <div className="md:pl-[264px] min-h-screen flex flex-col">
        {/* Fixed Header Bar */}
        <Header />

        {/* Dynamic Page Body */}
        <main className="flex-1 pt-16 pb-20 md:pb-10">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Mobile Menu Drawer Sheet */}
      <MobileMenuSheet />

      {/* Modals & Overlays */}
      <CommandPalette />
      <LogoutDialog />
      <ReportDataDialog />
      <NotificationDropdown />
      <AvatarMenuDropdown />
      <SystemStatusPopover />
      <QrScannerModal />
      <KoreksiPresensiModal />

      {/* Academic Evaluator Demo Controller */}
      <DemoControlBar />

      {/* Global Toast Notification */}
      {renderToast()}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
