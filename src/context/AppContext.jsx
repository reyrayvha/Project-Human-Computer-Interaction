import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialStudentData,
  initialCourses,
  academicTrendData,
  jarkomMeetings as initialMeetings,
  initialUktBills,
  mockPaymentHistory,
  initialNotifications,
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & Navigation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [pageHistory, setPageHistory] = useState(['login']);

  // Server condition simulation: 'normal' | 'ramai' | 'gangguan' | 'pemeliharaan'
  const [serverCondition, setServerCondition] = useState('normal');

  // Progressive Loading Ladder simulation: 'loaded' | 'shimmer_1_3s' | 'progress_5s' | 'cooldown_cache_10s' | 'error_503'
  const [loadingState, setLoadingState] = useState('loaded');

  // Stale data cache banner simulation
  const [isStaleCache, setIsStaleCache] = useState(false);

  // Student academic data
  const [student, setStudent] = useState(initialStudentData);
  const [courses, setCourses] = useState(initialCourses);
  const [meetings, setMeetings] = useState(initialMeetings);

  // Absensi states
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [hasMarkedToday, setHasMarkedToday] = useState(false);
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [qrCameraPermission, setQrCameraPermission] = useState('granted'); // 'prompt' | 'granted' | 'denied'
  const [qrStep, setQrStep] = useState('viewfinder'); // 'viewfinder' | 'manual' | 'success' | 'failure' | 'offline_pending'
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Koreksi Presensi modal
  const [koreksiModalOpen, setKoreksiModalOpen] = useState(false);
  const [selectedMeetingForCorrection, setSelectedMeetingForCorrection] = useState(null);

  // KRS states
  const [krsViewMode, setKrsViewMode] = useState('table'); // 'table' | 'weekly'
  const [krsConcurrencyState, setKrsConcurrencyState] = useState('ready'); // 'ready' | 'saving' | 'timeout' | 'success'
  const [krsSelectedCourses, setKrsSelectedCourses] = useState(courses.map(c => c.id));

  // Keuangan states
  const [uktState, setUktState] = useState('tanpa_tagihan'); // 'tanpa_tagihan' (Lunas) | 'ada_tagihan' (Aktif Rp 3.000.000)
  const [uktActiveTab, setUktActiveTab] = useState('tagihan'); // 'tagihan' | 'riwayat'
  const [selectedBillIds, setSelectedBillIds] = useState(['ukt-sem-5']);

  // Modals & Overlays
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportContextData, setReportContextData] = useState({ title: 'SKS semester ini', value: '23' });
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [systemStatusPopoverOpen, setSystemStatusPopoverOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feedback notifications / Toasts
  const [toast, setToast] = useState(null); // { id, message, type: 'success'|'info'|'warning'|'danger' }
  const [notifications, setNotifications] = useState(initialNotifications);

  // Reports logged
  const [reportedTickets, setReportedTickets] = useState([]);

  // Navigate helper with history tracking
  const navigate = (page) => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    setPageHistory((prev) => [...prev, page]);
    // Close overlays
    setMobileMenuOpen(false);
    setCommandPaletteOpen(false);
    setNotificationPanelOpen(false);
    setAvatarMenuOpen(false);
    setSystemStatusPopoverOpen(false);
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const nextHistory = [...pageHistory];
      nextHistory.pop(); // remove current
      const prevPage = nextHistory[nextHistory.length - 1];
      setPageHistory(nextHistory);
      setCurrentPage(prevPage);
    } else {
      setCurrentPage('dashboard');
    }
  };

  // Login handler — centralizes the auth transition
  const handleLogin = (toastMessage = 'Berhasil masuk ke portal SALAM. Selamat datang!') => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
    setPageHistory(['dashboard']);
    showToast(toastMessage, 'success');
  };

  // Logout handler — clears session and returns to login
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    setPageHistory(['login']);
    // Close all overlays
    setMobileMenuOpen(false);
    setCommandPaletteOpen(false);
    setNotificationPanelOpen(false);
    setAvatarMenuOpen(false);
    setSystemStatusPopoverOpen(false);
    setLogoutDialogOpen(false);
    setQrScannerOpen(false);
    setKoreksiModalOpen(false);
    showToast('Kamu telah berhasil keluar dari akun SALAM.', 'info');
  };

  // Trigger Toast notification
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };

  // Simulate Mark Attendance
  const markAttendanceSuccess = (courseName = 'Interaksi Manusia dan Komputer') => {
    setHasMarkedToday(true);
    setCourses((prev) =>
      prev.map((c) =>
        c.name === courseName
          ? {
              ...c,
              attended: c.attended + 1,
              totalSessions: c.totalSessions + 1,
              hasMarkedToday: true,
              percentage: Math.round(((c.attended + 1) / (c.totalSessions + 1)) * 100),
            }
          : c
      )
    );
    showToast(`Hadir tercatat 09.41 WIB untuk mata kuliah ${courseName}`, 'success');
  };

  // Submit Report Wrong Data
  const submitReport = ({ dataType, currentValue, proposedValue, note }) => {
    const ticketId = `LD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport = {
      id: ticketId,
      dataType,
      currentValue,
      proposedValue,
      note,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'Dalam Verifikasi BAAK',
    };
    setReportedTickets((prev) => [newReport, ...prev]);
    setReportDialogOpen(false);
    showToast(`Laporan terkirim. Nomor tiket: ${ticketId}. Diteruskan ke Biro Akademik.`, 'success');
  };

  // Submit Koreksi Presensi
  const submitKoreksi = ({ meetingNumber, note }) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.meeting === meetingNumber
          ? { ...m, status: 'Menunggu Verifikasi', canCorrect: false }
          : m
      )
    );
    setKoreksiModalOpen(false);
    showToast(`Pengajuan koreksi Pertemuan ${meetingNumber} berhasil dikirim ke dosen pengampu.`, 'success');
  };

  // Reset Demo to fresh baseline
  const resetDemo = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    setPageHistory(['login']);
    setServerCondition('normal');
    setLoadingState('loaded');
    setIsStaleCache(false);
    setStudent(initialStudentData);
    setCourses(initialCourses);
    setMeetings(initialMeetings);
    setIsSessionActive(true);
    setHasMarkedToday(false);
    setUktState('tanpa_tagihan');
    setKrsConcurrencyState('ready');
    setNotifications(initialNotifications);
    setReportedTickets([]);
    setToast(null);
    // Close all overlays
    setMobileMenuOpen(false);
    setCommandPaletteOpen(false);
    setNotificationPanelOpen(false);
    setAvatarMenuOpen(false);
    setSystemStatusPopoverOpen(false);
    setLogoutDialogOpen(false);
    setQrScannerOpen(false);
    setKoreksiModalOpen(false);
    showToast('Demo di-reset. Silakan login kembali.', 'info');
  };

  // Global Keyboard shortcuts (e.g. Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setLogoutDialogOpen(false);
        setReportDialogOpen(false);
        setQrScannerOpen(false);
        setKoreksiModalOpen(false);
        setNotificationPanelOpen(false);
        setAvatarMenuOpen(false);
        setSystemStatusPopoverOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentPage,
        setCurrentPage: navigate,
        goBack,
        pageHistory,
        serverCondition,
        setServerCondition,
        loadingState,
        setLoadingState,
        isStaleCache,
        setIsStaleCache,
        student,
        setStudent,
        courses,
        setCourses,
        meetings,
        setMeetings,
        isSessionActive,
        setIsSessionActive,
        hasMarkedToday,
        setHasMarkedToday,
        qrScannerOpen,
        setQrScannerOpen,
        qrCameraPermission,
        setQrCameraPermission,
        qrStep,
        setQrStep,
        isOfflineMode,
        setIsOfflineMode,
        koreksiModalOpen,
        setKoreksiModalOpen,
        selectedMeetingForCorrection,
        setSelectedMeetingForCorrection,
        krsViewMode,
        setKrsViewMode,
        krsConcurrencyState,
        setKrsConcurrencyState,
        krsSelectedCourses,
        setKrsSelectedCourses,
        uktState,
        setUktState,
        uktActiveTab,
        setUktActiveTab,
        selectedBillIds,
        setSelectedBillIds,
        commandPaletteOpen,
        setCommandPaletteOpen,
        logoutDialogOpen,
        setLogoutDialogOpen,
        reportDialogOpen,
        setReportDialogOpen,
        reportContextData,
        setReportContextData,
        notificationPanelOpen,
        setNotificationPanelOpen,
        avatarMenuOpen,
        setAvatarMenuOpen,
        systemStatusPopoverOpen,
        setSystemStatusPopoverOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        toast,
        showToast,
        notifications,
        setNotifications,
        reportedTickets,
        markAttendanceSuccess,
        submitReport,
        submitKoreksi,
        resetDemo,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
