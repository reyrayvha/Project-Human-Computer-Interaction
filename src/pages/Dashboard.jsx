import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { academicTrendData } from '../data/mockData';

export const Dashboard = () => {
  const {
    student,
    courses,
    isSessionActive,
    hasMarkedToday,
    setQrScannerOpen,
    isStaleCache,
    setIsStaleCache,
    loadingState,
    setLoadingState,
    uktState,
    setReportDialogOpen,
    setReportContextData,
    setCurrentPage,
    showToast,
  } = useApp();

  const [showTableModal, setShowTableModal] = useState(false);
  const [cooldown, setCooldown] = useState(10);
  const [selectedSemester, setSelectedSemester] = useState('20252');
  const [chartFilter, setChartFilter] = useState('all'); // 'all' | 'ip' | 'ipk'
  const [hoveredSem, setHoveredSem] = useState(null);

  const semesterDetails = {
    '20241': {
      code: '20241',
      semNum: '1',
      title: 'Semester 1 (2024/2025 Ganjil)',
      ip: '3,20',
      ipk: '3,20',
      sks: 21,
      status: 'Lulus Penuh',
      statusType: 'success',
      note: 'Adaptasi awal perkuliahan program studi S1 Teknik Informatika.',
      diff: null,
      maxSks: '24 SKS',
      cx: 85,
      ipY: 57,
      ipkY: 57,
    },
    '20242': {
      code: '20242',
      semNum: '2',
      title: 'Semester 2 (2024/2025 Genap)',
      ip: '3,15',
      ipk: '3,17',
      sks: 21,
      status: 'Lulus Penuh',
      statusType: 'success',
      note: 'Menuntaskan mata kuliah dasar keilmuan dan algoritma pemrograman.',
      diff: '-0,05',
      maxSks: '24 SKS',
      cx: 175,
      ipY: 59,
      ipkY: 58.2,
    },
    '20251': {
      code: '20251',
      semNum: '3',
      title: 'Semester 3 (2025/2026 Ganjil)',
      ip: '3,85',
      ipk: '3,44',
      sks: 21,
      status: 'Lulus Penuh (Cumlaude)',
      statusType: 'success',
      note: 'Peningkatan prestasi yang sangat tinggi pada mata kuliah komputasi & basis data.',
      diff: '+0,70',
      maxSks: '24 SKS',
      cx: 265,
      ipY: 31,
      ipkY: 47.4,
    },
    '20252': {
      code: '20252',
      semNum: '4',
      title: 'Semester 4 (2025/2026 Genap)',
      ip: '3,74',
      ipk: '3,51',
      sks: 21,
      status: 'Lulus Penuh',
      statusType: 'success',
      note: 'Mempertahankan IP konsisten dan berhak mengambil batas maksimal 24 SKS di semester 5.',
      diff: '-0,11',
      maxSks: '24 SKS',
      cx: 355,
      ipY: 35.4,
      ipkY: 44.6,
    },
    '20261': {
      code: '20261',
      semNum: '5',
      title: 'Semester 5 (2026/2027 Ganjil) — Aktif',
      ip: '—',
      ipk: '—',
      sks: 23,
      status: 'Sedang Berjalan',
      statusType: 'warning',
      note: 'Semester aktif berjalan dengan 23 SKS (8 mata kuliah). Nilai akhir belum terbit.',
      diff: null,
      maxSks: '24 SKS',
      cx: 447,
      ipY: null,
      ipkY: null,
    },
  };

  const activeSemKey = hoveredSem || selectedSemester;
  const currentSem = semesterDetails[activeSemKey] || semesterDetails['20252'];

  // Active course
  const activeCourse = courses.find((c) => c.isActiveToday) || courses[4];

  // All 8 courses sorted by lowest attendance percentage first so courses needing attention are prioritized
  const sortedCourses = [...courses].sort((a, b) => a.percentage - b.percentage);

  // Cooldown timer for frame C
  useEffect(() => {
    let timer;
    if (loadingState === 'cooldown_cache_10s' && cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loadingState, cooldown]);

  // Handle report data trigger
  const handleReport = (title, value) => {
    setReportContextData({ title, value });
    setReportDialogOpen(true);
  };

  // 1. Error 503 View (Frame D)
  if (loadingState === 'error_503') {
    return (
      <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
        <div className="bg-card border border-border rounded-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-danger-tint text-danger flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[36px]">cloud_off</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-danger-tint text-danger font-semibold text-[12px] mb-2">
            Galat Layanan 503
          </span>
          <h2 className="text-[22px] font-bold text-ink">Dashboard Belum Bisa Dimuat</h2>
          <p className="text-[14px] text-ink-muted max-w-md mt-2 leading-relaxed">
            Server akademik SALAM sedang menangani lonjakan beban yang sangat tinggi. Sistem tidak dapat mengambil ringkasan data kamu saat ini.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setLoadingState('loaded');
                showToast('Halaman dashboard berhasil dimuat kembali', 'success');
              }}
              className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span>Coba Muat Ulang</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsStaleCache(true);
                setLoadingState('loaded');
                showToast('Menampilkan data terakhir dari cache lokal', 'info');
              }}
              className="px-5 py-2.5 rounded-lg border border-border bg-card hover:bg-bg text-ink font-medium text-[14px]"
            >
              Lihat Data Terakhir (Cache)
            </button>
          </div>

          <p className="text-[11px] text-ink-muted mt-6 font-mono">
            Kode Diagnostik: ERR_HTTP_503_SERVICE_OVERLOADED (Edge Node SGD-BDG-02)
          </p>
        </div>
      </div>
    );
  }

  // 2. Skeleton Shimmer View (Frame A: 1-3s)
  if (loadingState === 'shimmer_1_3s') {
    return (
      <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
        {/* Skeleton Greeting */}
        <div className="flex flex-col gap-2">
          <div className="w-64 h-8 rounded-md skeleton-shimmer"></div>
          <div className="w-96 h-4 rounded-md skeleton-shimmer"></div>
        </div>

        {/* Skeleton Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 h-36 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-20 h-4 rounded skeleton-shimmer"></div>
                <div className="w-28 h-8 rounded skeleton-shimmer"></div>
              </div>
              <div className="w-32 h-3 rounded skeleton-shimmer"></div>
            </div>
          ))}
        </div>

        {/* Skeleton Middle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-card border border-border rounded-xl p-5 h-96 flex flex-col gap-4">
            <div className="w-48 h-6 rounded skeleton-shimmer"></div>
            <div className="w-full h-24 rounded-lg skeleton-shimmer"></div>
            <div className="w-full h-16 rounded-lg skeleton-shimmer"></div>
            <div className="w-full h-16 rounded-lg skeleton-shimmer"></div>
          </div>
          <div className="lg:col-span-5 bg-card border border-border rounded-xl p-5 h-96 flex flex-col gap-4">
            <div className="w-40 h-6 rounded skeleton-shimmer"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1">
                  <div className="w-full h-4 rounded skeleton-shimmer"></div>
                  <div className="w-full h-2 rounded skeleton-shimmer"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
      {/* Frame B Indicator (Progress Info Banner 5s) */}
      {loadingState === 'progress_5s' && (
        <div className="w-full bg-info-tint border border-info rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-info border-t-transparent rounded-full animate-spin"></div>
            <div>
              <p className="text-[14px] font-semibold text-ink">
                Masih memuat data akademik...
              </p>
              <p className="text-[12px] text-ink-muted">
                Server sedang melayani banyak mahasiswa, mohon tunggu sebentar tanpa merefresh halaman.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLoadingState('loaded')}
            className="text-[12px] font-bold text-info hover:underline shrink-0"
          >
            Lewati Simulasi
          </button>
        </div>
      )}

      {/* Frame C Indicator (Cooldown 10s & Cache Fallback) */}
      {loadingState === 'cooldown_cache_10s' && (
        <div className="w-full bg-warning-tint border border-warning rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-warning text-[24px]">hourglass_top</span>
            <div>
              <p className="text-[14px] font-semibold text-ink">
                Memuat lebih lama dari biasanya (Server Ramai)
              </p>
              <p className="text-[12px] text-ink-muted">
                Untuk mencegah kelebihan beban server, tombol muat ulang memiliki jeda waktu pendinginan.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={cooldown > 0}
              onClick={() => {
                setLoadingState('loaded');
                showToast('Dashboard berhasil disegarkan', 'success');
              }}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
                cooldown > 0
                  ? 'bg-border text-ink-muted cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-hover cursor-pointer'
              }`}
            >
              {cooldown > 0 ? `Coba lagi (${cooldown}s)` : 'Coba Lagi Sekarang'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsStaleCache(true);
                setLoadingState('loaded');
              }}
              className="px-3 py-1.5 rounded-lg border border-warning/40 bg-card text-ink text-[12px] font-medium hover:bg-bg"
            >
              Gunakan Cache
            </button>
          </div>
        </div>
      )}

      {/* Stale Cache Warning Banner */}
      {isStaleCache && (
        <div className="w-full bg-warning-tint border border-warning rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-warning text-[22px]">history</span>
            <p className="text-[13px] text-ink">
              <span className="font-semibold">Menampilkan data terakhir 07.42 WIB.</span> Data mungkin belum yang terbaru karena lalu lintas server sedang padat.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsStaleCache(false);
              showToast('Data diperbarui dengan status server terkini', 'success');
            }}
            className="px-3 py-1.5 rounded-lg bg-card border border-warning/40 text-ink hover:bg-warning-tint text-[12px] font-semibold shrink-0"
          >
            Muat Ulang
          </button>
        </div>
      )}

      {/* 1. GREETING ROW (Quiet, calm, no tacky banner) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pt-1">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-ink tracking-tight">
            Selamat pagi, {student.name.split(' ')[0]}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-1 text-[13px] text-ink-muted">
            <div>
              <span>Program studi: </span>
              <span className="font-semibold text-ink">{student.prodi}, {student.fakultas}</span>
            </div>
            <div>
              <span>Semester aktif: </span>
              <span className="font-semibold text-ink">Semester {student.semester}</span>
            </div>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[13px] text-ink-muted">Rabu, 18 Oktober 2026</span>
        </div>
      </div>

      {/* 2. ACTIVE SESSION NOTIFICATION BANNER */}
      {isSessionActive && (
        <div className="w-full bg-info-tint border border-info rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-3">
            <span className="material-symbols-outlined text-info text-[24px] shrink-0">info</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded bg-info text-white text-[11px] font-bold uppercase tracking-wide">
                  Sesi Presensi Aktif
                </span>
                <span className="text-[12px] text-info font-semibold">Tutup 09.45 WIB</span>
              </div>
              <p className="text-[14px] text-ink font-medium leading-snug">
                Absen <strong className="text-info">{activeCourse.name}</strong> (Kelas {activeCourse.class}) sedang dibuka di Ruang {activeCourse.room}.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setQrScannerOpen(true)}
            className="shrink-0 h-10 px-5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>Scan QR kehadiran</span>
          </button>
        </div>
      )}

      {/* 3. STAT TILES ROW (Data Honesty: No zeroes for missing data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tile 1: IPK Kumulatif (Interactive with scroll-to-chart) */}
        <div
          onClick={() => {
            const el = document.getElementById('academic-trend-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between h-[156px] shadow-sm card-interactive animate-card-enter card-stagger-1 cursor-pointer group relative overflow-hidden"
          title="Klik untuk melihat interaksi grafik tren akademik"
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-ink-muted">IPK Kumulatif</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-success-tint text-success">
                <span className="material-symbols-outlined text-[13px]">trending_up</span>
                <span>+0,07</span>
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <p className="text-[32px] font-bold text-ink tracking-tight font-mono">{student.ipkFormatted}</p>
              <span className="text-[13px] text-ink-muted font-medium">/ 4,00</span>
            </div>
            <p className="text-[12px] text-ink-muted">Akumulasi sampai semester 4</p>
          </div>
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleReport('IPK Kumulatif', student.ipkFormatted);
              }}
              className="text-[12px] text-primary hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Laporkan data keliru</span>
            </button>
            <span className="text-[11px] text-primary font-semibold inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              <span>Buka grafik</span>
              <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
            </span>
          </div>
        </div>

        {/* Tile 2: SKS Lulus */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between h-[156px] shadow-sm card-interactive animate-card-enter card-stagger-2">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-ink-muted">SKS Lulus</p>
              <span className="text-[11px] font-bold text-primary bg-primary-tint px-2 py-0.5 rounded-full">
                58,3% Selesai
              </span>
            </div>
            <p className="text-[32px] font-bold text-ink tracking-tight font-mono mt-1">{student.sksLulus}</p>
            <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-primary h-full rounded-full" style={{ width: '58.3%' }}></div>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">Total target 144 SKS wajib</p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleReport('SKS Lulus', `${student.sksLulus} SKS`)}
              className="text-[12px] text-primary hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Laporkan data keliru</span>
            </button>
          </div>
        </div>

        {/* Tile 3: SKS Semester Ini */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between h-[156px] shadow-sm card-interactive animate-card-enter card-stagger-3">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-ink-muted">SKS Semester Ini</p>
              <span className="text-[11px] font-bold text-primary bg-primary-tint px-2 py-0.5 rounded-full">
                Maksimal 24
              </span>
            </div>
            <p className="text-[32px] font-bold text-ink tracking-tight font-mono mt-1">{student.sksSemesterIni}</p>
            <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-leaf h-full rounded-full" style={{ width: '95.8%' }}></div>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">dari kuota {student.sksJatah} SKS (sisa 1 SKS)</p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleReport('SKS Semester Ini', `${student.sksSemesterIni} SKS`)}
              className="text-[12px] text-primary hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Laporkan data keliru</span>
            </button>
          </div>
        </div>

        {/* Tile 4: Tagihan UKT */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between h-[156px] shadow-sm card-interactive animate-card-enter card-stagger-4">
          <div>
            <p className="text-[13px] font-medium text-ink-muted mb-1">Tagihan UKT</p>
            {uktState === 'tanpa_tagihan' ? (
              <>
                <p className="text-[18px] font-bold text-success leading-tight mt-1">Tidak ada tagihan aktif</p>
                <p className="text-[12px] text-ink-muted mt-2">Semester aktif telah lunas</p>
              </>
            ) : (
              <>
                <p className="text-[22px] font-bold text-ink leading-tight mt-1 font-mono">Rp 3.000.000</p>
                <p className="text-[12px] text-warning font-semibold mt-1">Jatuh tempo: 31 Agustus 2026</p>
              </>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => setCurrentPage('keuangan')}
              className="text-[12px] text-primary hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>{uktState === 'tanpa_tagihan' ? 'Lihat riwayat bayar' : 'Bayar tagihan sekarang'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MAIN DASHBOARD TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Jadwal Hari Ini + Grafik IP/IPK (mengisi jarak kosong) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Left: TODAY RAIL (Vertical Timeline with live attendance states) */}
        <div className="w-full bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm card-interactive animate-card-enter card-stagger-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                <h2 className="text-[17px] font-bold text-ink">Jadwal hari ini, Rabu</h2>
              </div>
              <span className="text-[12px] text-ink-muted font-medium">1 mata kuliah aktif</span>
            </div>

            {/* Today rail vertical timeline */}
            <div className="flex flex-col gap-4">
              {/* Active / Current Class */}
              <div className="bg-card border-2 border-primary-tint rounded-xl p-4 flex flex-col gap-3 shadow-sm item-interactive">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[13px] font-semibold text-primary font-mono">
                    {activeCourse.time}
                  </span>
                  {hasMarkedToday ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-success-tint text-success text-[12px] font-semibold">
                      <span>Sudah hadir (09.41 WIB)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-warning-tint text-warning text-[12px] font-semibold">
                      <span>Absen dibuka</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-[16px] font-bold text-ink">{activeCourse.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-[13px] text-ink-muted">
                    <span>Ruang: <strong className="text-ink">{activeCourse.room}</strong></span>
                    <span>Dosen: <strong className="text-ink">{activeCourse.lecturer}</strong></span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[12px] text-ink-muted">
                    {hasMarkedToday ? 'Presensi berhasil diverifikasi' : 'Tutup absensi dalam 14 menit'}
                  </span>
                  {!hasMarkedToday ? (
                    <button
                      type="button"
                      onClick={() => setQrScannerOpen(true)}
                      className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                      <span>Scan QR kehadiran</span>
                    </button>
                  ) : (
                    <span className="text-[12px] font-semibold text-success">
                      Terdata di BAAK
                    </span>
                  )}
                </div>
              </div>

              {/* Tomorrow's Preview Group */}
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[12px] text-ink-muted font-bold uppercase tracking-wider">
                    Besok, Kamis (2 Mata Kuliah)
                  </span>
                  <span className="h-px bg-border flex-1"></span>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-bg border border-border rounded-lg flex items-center justify-between gap-3 item-interactive">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[12px] font-mono text-ink-muted">
                        <span>07.00 – 09.30 WIB</span>
                        <span>(Ruang R.4.10)</span>
                      </div>
                      <p className="text-[14px] font-semibold text-ink truncate mt-0.5">Jaringan Komputer</p>
                      <p className="text-[12px] text-ink-muted truncate">Budi Santoso, S.T., M.Cs.</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded bg-card border border-border text-ink-muted text-[11px] font-medium">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      <span>Belum dimulai</span>
                    </span>
                  </div>

                  <div className="p-3 bg-bg border border-border rounded-lg flex items-center justify-between gap-3 item-interactive">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[12px] font-mono text-ink-muted">
                        <span>12.40 – 15.10 WIB</span>
                        <span>(Ruang R.4.12)</span>
                      </div>
                      <p className="text-[14px] font-semibold text-ink truncate mt-0.5">
                        Pengembangan Aplikasi Mobile
                      </p>
                      <p className="text-[12px] text-ink-muted truncate">Dewi Anggraeni, M.T.</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded bg-card border border-border text-ink-muted text-[11px] font-medium">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      <span>Belum dimulai</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentPage('krs')}
              className="text-[13px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Lihat jadwal mingguan lengkap (KRS)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

          {/* Left: Grafik IP dan IPK per semester (Fully Interactive) */}
        <div id="academic-trend-section" className="w-full bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm card-interactive animate-card-enter card-stagger-6 scroll-mt-24">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border mb-3">
              <div>
                <h2 className="text-[17px] font-bold text-ink flex items-center gap-2">
                  <span>Grafik IP dan IPK per semester</span>
                  <span className="text-[11px] font-semibold text-primary bg-primary-tint px-2 py-0.5 rounded-full">
                    Interaktif
                  </span>
                </h2>
                <p className="text-[12px] text-ink-muted mt-0.5">
                  Arahkan kursor atau klik titik semester untuk melihat rincian capaian
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setShowTableModal(!showTableModal)}
                  className="text-[12px] text-primary hover:underline font-semibold"
                >
                  {showTableModal ? 'Tampilkan grafik visual' : 'Lihat sebagai tabel'}
                </button>
              </div>
            </div>

            {/* Filter Pills for Chart Series */}
            {!showTableModal && (
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 p-1 bg-bg border border-border rounded-lg text-[12px]">
                  <button
                    type="button"
                    onClick={() => setChartFilter('all')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                      chartFilter === 'all'
                        ? 'bg-card text-primary shadow-xs font-bold'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    Semua Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartFilter('ip')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      chartFilter === 'ip'
                        ? 'bg-card text-primary shadow-xs font-bold'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                    <span>Hanya IP Semester</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartFilter('ipk')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      chartFilter === 'ipk'
                        ? 'bg-card text-info shadow-xs font-bold'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 bg-info inline-block rounded-xs"></span>
                    <span>Hanya IPK Kumulatif</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-[12px] text-ink-muted">
                  {(chartFilter === 'all' || chartFilter === 'ip') && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-[3px] bg-primary inline-block rounded-full"></span>
                      <span>IP Semester</span>
                    </div>
                  )}
                  {(chartFilter === 'all' || chartFilter === 'ipk') && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-[2px] border-b-2 border-dashed border-info inline-block"></span>
                      <span>IPK Kumulatif</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Accessibility Toggle: Table View vs SVG Chart */}
            {showTableModal ? (
              <div className="w-full overflow-x-auto py-2">
                <table className="w-full text-[13px] text-left border border-border rounded-lg overflow-hidden">
                  <thead className="bg-bg text-ink-muted font-semibold border-b border-border">
                    <tr>
                      <th className="p-2.5">Semester</th>
                      <th className="p-2.5">Label</th>
                      <th className="p-2.5 text-right">SKS</th>
                      <th className="p-2.5 text-right">IP Sem</th>
                      <th className="p-2.5 text-right">IPK</th>
                      <th className="p-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {academicTrendData.map((d) => (
                      <tr key={d.semester} className="hover:bg-primary-tint/20">
                        <td className="p-2.5 font-mono font-semibold">{d.semester}</td>
                        <td className="p-2.5">{d.label}</td>
                        <td className="p-2.5 text-right font-mono">{d.sks}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-primary">
                          {d.ip ? d.ip.toFixed(2).replace('.', ',') : '—'}
                        </td>
                        <td className="p-2.5 text-right font-mono font-bold text-info">
                          {d.ipk ? d.ipk.toFixed(2).replace('.', ',') : '—'}
                        </td>
                        <td className="p-2.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              d.status === 'Berjalan'
                                ? 'bg-warning-tint text-warning'
                                : 'bg-success-tint text-success'
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="relative w-full pt-1 pb-2">
                <svg
                  aria-label="Grafik IP dan IPK per semester"
                  className="w-full h-auto overflow-visible select-none"
                  viewBox="0 0 540 220"
                >
                  {/* Y-axis gridlines (0 to 4.0) */}
                  <line stroke="#DCE2DA" strokeDasharray="2 2" strokeWidth="1" x1="45" x2="510" y1="25" y2="25"></line>
                  <text fill="#55626A" fontSize="11" fontWeight="500" textAnchor="end" x="35" y="29">4,0</text>

                  <line stroke="#DCE2DA" strokeDasharray="2 2" strokeWidth="1" x1="45" x2="510" y1="65" y2="65"></line>
                  <text fill="#55626A" fontSize="11" fontWeight="500" textAnchor="end" x="35" y="69">3,0</text>

                  <line stroke="#DCE2DA" strokeDasharray="2 2" strokeWidth="1" x1="45" x2="510" y1="105" y2="105"></line>
                  <text fill="#55626A" fontSize="11" fontWeight="500" textAnchor="end" x="35" y="109">2,0</text>

                  <line stroke="#DCE2DA" strokeDasharray="2 2" strokeWidth="1" x1="45" x2="510" y1="145" y2="145"></line>
                  <text fill="#55626A" fontSize="11" fontWeight="500" textAnchor="end" x="35" y="149">1,0</text>

                  <line stroke="#DCE2DA" strokeWidth="1" x1="45" x2="510" y1="185" y2="185"></line>
                  <text fill="#55626A" fontSize="11" fontWeight="500" textAnchor="end" x="35" y="189">0</text>

                  {/* 20261 Slot Column Area (Semester berjalan, not plotted to zero!) */}
                  <rect
                    fill={activeSemKey === '20261' ? '#E6F0DC' : '#F3F5F2'}
                    height="160"
                    rx="6"
                    stroke={activeSemKey === '20261' ? '#3F7A1F' : '#DCE2DA'}
                    strokeDasharray="3 3"
                    width="95"
                    x="400"
                    y="25"
                    className="transition-colors duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredSem('20261')}
                    onMouseLeave={() => setHoveredSem(null)}
                    onClick={() => setSelectedSemester('20261')}
                  ></rect>
                  <text fill="#55626A" fontSize="11" fontWeight="600" textAnchor="middle" x="447" y="100">Berjalan</text>
                  <text fill="#55626A" fontSize="10" textAnchor="middle" x="447" y="118">Belum ada nilai</text>

                  {/* Active Semester Vertical Guideline */}
                  {currentSem.cx && (
                    <line
                      x1={currentSem.cx}
                      x2={currentSem.cx}
                      y1="25"
                      y2="185"
                      stroke="#3F7A1F"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.75"
                    />
                  )}

                  {/* Line: IP Semester (#3F7A1F solid, 3px) */}
                  {(chartFilter === 'all' || chartFilter === 'ip') && (
                    <path
                      d="M 85 57 L 175 59 L 265 31 L 355 35.4"
                      fill="none"
                      stroke="#3F7A1F"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    ></path>
                  )}

                  {/* Line: IPK (#1F5F8B dashed 4 4, 2.5px) */}
                  {(chartFilter === 'all' || chartFilter === 'ipk') && (
                    <path
                      d="M 85 57 L 175 58.2 L 265 47.4 L 355 44.6"
                      fill="none"
                      stroke="#1F5F8B"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    ></path>
                  )}

                  {/* Points: IP Semester (circles) */}
                  {(chartFilter === 'all' || chartFilter === 'ip') && (
                    <>
                      {/* Sem 1 */}
                      <circle
                        cx="85"
                        cy="57"
                        fill={activeSemKey === '20241' ? '#3F7A1F' : '#FFFFFF'}
                        r={activeSemKey === '20241' ? '6.5' : '4.5'}
                        stroke="#3F7A1F"
                        strokeWidth={activeSemKey === '20241' ? '3' : '2.5'}
                        className="transition-all duration-200"
                      />
                      {activeSemKey === '20241' && <circle cx="85" cy="57" r="10" fill="#3F7A1F" fillOpacity="0.18" />}

                      {/* Sem 2 */}
                      <circle
                        cx="175"
                        cy="59"
                        fill={activeSemKey === '20242' ? '#3F7A1F' : '#FFFFFF'}
                        r={activeSemKey === '20242' ? '6.5' : '4.5'}
                        stroke="#3F7A1F"
                        strokeWidth={activeSemKey === '20242' ? '3' : '2.5'}
                        className="transition-all duration-200"
                      />
                      {activeSemKey === '20242' && <circle cx="175" cy="59" r="10" fill="#3F7A1F" fillOpacity="0.18" />}

                      {/* Sem 3 */}
                      <circle
                        cx="265"
                        cy="31"
                        fill={activeSemKey === '20251' ? '#3F7A1F' : '#FFFFFF'}
                        r={activeSemKey === '20251' ? '6.5' : '4.5'}
                        stroke="#3F7A1F"
                        strokeWidth={activeSemKey === '20251' ? '3' : '2.5'}
                        className="transition-all duration-200"
                      />
                      {activeSemKey === '20251' && <circle cx="265" cy="31" r="10" fill="#3F7A1F" fillOpacity="0.18" />}

                      {/* Sem 4 */}
                      <circle
                        cx="355"
                        cy="35.4"
                        fill="#3F7A1F"
                        r={activeSemKey === '20252' ? '7' : '5'}
                        stroke="#FFFFFF"
                        strokeWidth={activeSemKey === '20252' ? '3' : '2'}
                        className="transition-all duration-200"
                      />
                      {activeSemKey === '20252' && <circle cx="355" cy="35.4" r="11" fill="#3F7A1F" fillOpacity="0.2" />}
                    </>
                  )}

                  {/* Points: IPK (squares) */}
                  {(chartFilter === 'all' || chartFilter === 'ipk') && (
                    <>
                      <rect
                        fill="#1F5F8B"
                        height={activeSemKey === '20241' ? '9' : '6'}
                        width={activeSemKey === '20241' ? '9' : '6'}
                        x={activeSemKey === '20241' ? '80.5' : '82'}
                        y={activeSemKey === '20241' ? '52.5' : '54'}
                        rx="1"
                        stroke="#FFFFFF"
                        strokeWidth={activeSemKey === '20241' ? '1.5' : '0'}
                        className="transition-all duration-200"
                      />
                      <rect
                        fill="#1F5F8B"
                        height={activeSemKey === '20242' ? '9' : '6'}
                        width={activeSemKey === '20242' ? '9' : '6'}
                        x={activeSemKey === '20242' ? '170.5' : '172'}
                        y={activeSemKey === '20242' ? '53.7' : '55.2'}
                        rx="1"
                        stroke="#FFFFFF"
                        strokeWidth={activeSemKey === '20242' ? '1.5' : '0'}
                        className="transition-all duration-200"
                      />
                      <rect
                        fill="#1F5F8B"
                        height={activeSemKey === '20251' ? '9' : '6'}
                        width={activeSemKey === '20251' ? '9' : '6'}
                        x={activeSemKey === '20251' ? '260.5' : '262'}
                        y={activeSemKey === '20251' ? '42.9' : '44.4'}
                        rx="1"
                        stroke="#FFFFFF"
                        strokeWidth={activeSemKey === '20251' ? '1.5' : '0'}
                        className="transition-all duration-200"
                      />
                      <rect
                        fill="#1F5F8B"
                        height={activeSemKey === '20252' ? '9' : '6'}
                        width={activeSemKey === '20252' ? '9' : '6'}
                        x={activeSemKey === '20252' ? '350.5' : '352'}
                        y={activeSemKey === '20252' ? '40.1' : '41.6'}
                        rx="1"
                        stroke="#FFFFFF"
                        strokeWidth={activeSemKey === '20252' ? '1.5' : '0'}
                        className="transition-all duration-200"
                      />
                    </>
                  )}

                  {/* Interactive Invisible Hover Columns for Easy Interaction */}
                  {['20241', '20242', '20251', '20252'].map((code) => {
                    const d = semesterDetails[code];
                    return (
                      <rect
                        key={code}
                        x={d.cx - 40}
                        y="20"
                        width="80"
                        height="170"
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredSem(code)}
                        onMouseLeave={() => setHoveredSem(null)}
                        onClick={() => setSelectedSemester(code)}
                      />
                    );
                  })}

                  {/* Floating Tooltip Card Badge directly above the active semester point */}
                  {currentSem && (
                    <g
                      className="pointer-events-none select-none"
                      style={{
                        transform: `translate(${currentSem.cx}px, ${currentSem.ipY ? Math.max(currentSem.ipY - 45, 12) : 55}px)`,
                        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <rect
                        x="-58"
                        y="-26"
                        width="116"
                        height="30"
                        rx="6"
                        fill="#263235"
                        stroke="#3F7A1F"
                        strokeWidth="1.2"
                      />
                      <polygon
                        points="-5,4 5,4 0,9"
                        fill="#263235"
                      />
                      {currentSem.code === '20261' ? (
                        <text fill="#FFFFFF" fontSize="9.5" fontWeight="600" textAnchor="middle" x="0" y="-7">
                          Sem 5: Sedang Berjalan
                        </text>
                      ) : (
                        <text fill="#FFFFFF" fontSize="9.5" fontWeight="600" textAnchor="middle" x="0" y="-7">
                          Sem {currentSem.semNum}: IPS {currentSem.ip} • IPK {currentSem.ipk}
                        </text>
                      )}
                    </g>
                  )}

                  {/* End Labels on 20252 */}
                  <text fill="#3F7A1F" fontSize="11" fontWeight="700" x="368" y="32">IP 3,74</text>
                  <text fill="#1F5F8B" fontSize="11" fontWeight="700" x="368" y="49">IPK 3,51</text>

                  {/* X-axis Labels with Active Highlight */}
                  <text
                    fill={activeSemKey === '20241' ? '#3F7A1F' : '#55626A'}
                    fontSize="12"
                    fontWeight={activeSemKey === '20241' ? '700' : '500'}
                    textAnchor="middle"
                    x="85"
                    y="202"
                    className="cursor-pointer"
                    onClick={() => setSelectedSemester('20241')}
                  >
                    20241
                  </text>
                  <text
                    fill={activeSemKey === '20242' ? '#3F7A1F' : '#55626A'}
                    fontSize="12"
                    fontWeight={activeSemKey === '20242' ? '700' : '500'}
                    textAnchor="middle"
                    x="175"
                    y="202"
                    className="cursor-pointer"
                    onClick={() => setSelectedSemester('20242')}
                  >
                    20242
                  </text>
                  <text
                    fill={activeSemKey === '20251' ? '#3F7A1F' : '#55626A'}
                    fontSize="12"
                    fontWeight={activeSemKey === '20251' ? '700' : '500'}
                    textAnchor="middle"
                    x="265"
                    y="202"
                    className="cursor-pointer"
                    onClick={() => setSelectedSemester('20251')}
                  >
                    20251
                  </text>
                  <text
                    fill={activeSemKey === '20252' ? '#3F7A1F' : '#263235'}
                    fontSize="12"
                    fontWeight={activeSemKey === '20252' ? '700' : '600'}
                    textAnchor="middle"
                    x="355"
                    y="202"
                    className="cursor-pointer"
                    onClick={() => setSelectedSemester('20252')}
                  >
                    20252
                  </text>
                  <text
                    fill={activeSemKey === '20261' ? '#3F7A1F' : '#55626A'}
                    fontSize="12"
                    fontWeight={activeSemKey === '20261' ? '700' : '500'}
                    textAnchor="middle"
                    x="447"
                    y="202"
                    className="cursor-pointer"
                    onClick={() => setSelectedSemester('20261')}
                  >
                    20261
                  </text>
                </svg>

                {/* Interactive Semester Breakdown Telemetry Card */}
                <div
                  key={activeSemKey}
                  className="mt-4 p-4 rounded-xl border border-primary/30 bg-primary-tint/20 flex flex-col gap-3 animate-card-rise"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                      <h4 className="text-[14px] font-bold text-ink">
                        {currentSem.title}
                      </h4>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold self-start sm:self-auto ${
                        currentSem.statusType === 'success'
                          ? 'bg-success-tint text-success'
                          : 'bg-warning-tint text-warning'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {currentSem.statusType === 'success' ? 'check_circle' : 'schedule'}
                      </span>
                      <span>{currentSem.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-card p-2.5 rounded-lg border border-border">
                      <span className="text-[11px] font-medium text-ink-muted block">IP Semester (IPS)</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-[18px] font-bold text-primary font-mono">{currentSem.ip}</span>
                        {currentSem.diff && (
                          <span className={`text-[11px] font-bold ${currentSem.diff.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                            {currentSem.diff}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-card p-2.5 rounded-lg border border-border">
                      <span className="text-[11px] font-medium text-ink-muted block">IPK Akumulasi</span>
                      <p className="text-[18px] font-bold text-info font-mono mt-0.5">{currentSem.ipk}</p>
                    </div>

                    <div className="bg-card p-2.5 rounded-lg border border-border">
                      <span className="text-[11px] font-medium text-ink-muted block">SKS Diambil</span>
                      <p className="text-[18px] font-bold text-ink font-mono mt-0.5">{currentSem.sks} SKS</p>
                    </div>

                    <div className="bg-card p-2.5 rounded-lg border border-border">
                      <span className="text-[11px] font-medium text-ink-muted block">Alokasi Beban</span>
                      <p className="text-[14px] font-bold text-ink mt-1">{currentSem.maxSks}</p>
                    </div>
                  </div>

                  <p className="text-[12px] text-ink-muted leading-relaxed">
                    {currentSem.note}
                  </p>

                  {/* Interactive Quick Selector Buttons */}
                  <div className="pt-2 border-t border-border/60 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-ink-muted mr-1">Pilih semester:</span>
                    {Object.keys(semesterDetails).map((code) => {
                      const sem = semesterDetails[code];
                      const isSelected = selectedSemester === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => setSelectedSemester(code)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-white shadow-xs font-bold'
                              : 'bg-card border border-border text-ink hover:border-primary/40 hover:bg-bg'
                          }`}
                        >
                          Sem {sem.semNum} ({code})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-border mt-3 flex items-center justify-between text-ink-muted text-[12px]">
            <span>Standar kelulusan minimum IPK: 2,00</span>
            <span className="font-semibold text-ink">Batas masa studi: Maks. 14 semester</span>
          </div>
        </div>
        </div>

        {/* Right Column (5 cols): Kehadiran Kuliah + Ringkasan Akademik */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Right: KEHADIRAN KULIAH (Menampilkan seluruh 8 mata kuliah, memanjang kebawah) */}
        <div className="w-full bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm card-interactive animate-card-enter card-stagger-5">
          <div>
            <div className="pb-3 border-b border-border mb-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-bold text-ink">Kehadiran kuliah</h2>
                <span className="text-[12px] font-semibold text-primary font-mono bg-primary-tint px-2 py-0.5 rounded-full">
                  8 Mata Kuliah
                </span>
              </div>
              <p className="text-[12px] text-ink-muted mt-1">
                Rekapitulasi persentase kehadiran semester aktif (batas minimal UAS 85%)
              </p>
            </div>

            <div className="space-y-3">
              {sortedCourses.map((c) => {
                const isCritical = c.percentage < 75;
                const isWarning = c.percentage >= 75 && c.percentage < 85;
                const unexcused = c.totalSessions - c.attended;

                return (
                  <div
                    key={c.id}
                    className="space-y-1.5 p-2 rounded-lg hover:bg-bg/70 transition-colors item-interactive border border-transparent"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-semibold text-ink truncate">{c.name}</span>
                      <span
                        className={`text-[13px] font-mono font-bold shrink-0 ${
                          isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-success'
                        }`}
                      >
                        {c.percentage}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-bg border border-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCritical ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${c.percentage}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-ink-muted">
                      <span>
                        Hadir {c.attended} dari {c.totalSessions} pertemuan
                      </span>
                      {unexcused > 0 ? (
                        <span className={`font-semibold ${isCritical ? 'text-danger' : 'text-warning'}`}>
                          {unexcused} alpa
                        </span>
                      ) : (
                        <span className="text-success font-semibold">Lengkap</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-border mt-4">
            <button
              type="button"
              onClick={() => setCurrentPage('absensi')}
              className="text-[13px] font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat rincian riwayat presensi</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right: Ringkasan Akademik (Dikecilkan kebawah agar pas dan rapi tanpa space kosong) */}
        <div className="w-full bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col shadow-sm card-interactive animate-card-enter card-stagger-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <h2 className="text-[17px] font-bold text-ink">Ringkasan akademik</h2>
              <button
                type="button"
                onClick={() => handleReport('Ringkasan Akademik', student.nim)}
                className="text-[12px] text-primary hover:underline font-semibold cursor-pointer"
              >
                Laporkan data keliru
              </button>
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="flex items-center justify-between py-1.5 border-b border-border">
                <span className="text-ink-muted">NIM</span>
                <span className="font-mono font-bold text-ink">{student.nim}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border">
                <span className="text-ink-muted">Program studi</span>
                <span className="font-semibold text-ink text-right">{student.prodi}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border">
                <span className="text-ink-muted">Fakultas / Angkatan</span>
                <span className="font-medium text-ink text-right">{student.fakultas} ({student.angkatan})</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border">
                <span className="text-ink-muted">Dosen PA</span>
                <span className="font-medium text-ink text-right">{student.dosenPA}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border">
                <span className="text-ink-muted">IP semester sebelumnya (20252)</span>
                <span className="font-mono font-bold text-ink text-[14px]">
                  {student.ipSemesterSebelumnyaFormatted}
                </span>
              </div>

              {/* Data State Component: Honest about missing current semester grade */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-ink-muted font-medium text-[12px]">IP semester berjalan (20261)</span>
                  <button
                    type="button"
                    onClick={() => showToast('Pemeriksaan nilai: Semester berjalan belum memasuki masa UAS', 'info')}
                    className="text-primary text-[11px] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">refresh</span>
                    <span>Muat ulang</span>
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-bg border border-border flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-ink-muted text-[18px] shrink-0">
                    schedule
                  </span>
                  <span className="text-[12px] text-ink leading-tight">
                    Belum tersedia, nilai keluar setelah evaluasi UAS
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted mt-1 text-right">Terakhir diperbarui 07.42 WIB</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border mt-3">
            <button
              type="button"
              onClick={() => setCurrentPage('krs')}
              className="text-[13px] font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat kartu rencana studi (KRS)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

