import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { academicTrendData } from '../data/mockData';

// Semester metadata for chart and telemetry
const semesterTelemetries = {
  '20241': {
    label: 'Sem 1 (2024/2025 Ganjil)',
    ip: '3,20',
    ipk: '3,20',
    sks: 21,
    status: 'Lulus Penuh',
    evaluasi: 'Memuaskan',
  },
  '20242': {
    label: 'Sem 2 (2024/2025 Genap)',
    ip: '3,15',
    ipk: '3,17',
    sks: 21,
    status: 'Lulus Penuh',
    evaluasi: 'Memuaskan',
  },
  '20251': {
    label: 'Sem 3 (2025/2026 Ganjil)',
    ip: '3,85',
    ipk: '3,44',
    sks: 21,
    status: 'Lulus Penuh (Cum Laude)',
    evaluasi: 'Dengan Pujian (Cum Laude)',
  },
  '20252': {
    label: 'Sem 4 (2025/2026 Genap)',
    ip: '3,74',
    ipk: '3,51',
    sks: 21,
    status: 'Lulus Penuh (Cum Laude)',
    evaluasi: 'Sangat Memuaskan (Cum Laude)',
  },
  '20261': {
    label: 'Sem 5 (2026/2027 Ganjil)',
    ip: '—',
    ipk: '—',
    sks: 23,
    status: 'Sedang Berjalan',
    evaluasi: 'Dalam Perkuliahan (23 SKS)',
  },
};

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
    setCurrentPage,
    showToast,
  } = useApp();

  const [cooldown, setCooldown] = useState(10);
  const [selectedSemester, setSelectedSemester] = useState('20252');
  const [chartFilter, setChartFilter] = useState('all'); // 'all' | 'ip' | 'ipk' | 'table'
  const [hoveredSem, setHoveredSem] = useState(null);

  // Active course for today
  const activeCourse = courses.find((c) => c.isActiveToday) || courses[4];

  // Courses needing attention (attendance below 85%)
  const warningCourses = courses.filter((c) => c.percentage < 85);

  // Active semester detail for telemetry
  const activeSemKey = hoveredSem || selectedSemester;
  const currentSem = semesterTelemetries[activeSemKey] || semesterTelemetries['20252'];

  // Cooldown timer for frame C simulation
  useEffect(() => {
    let timer;
    if (loadingState === 'cooldown_cache_10s' && cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loadingState, cooldown]);

  // Coordinates mapping for Full-Width SVG Chart (viewBox 0 0 900 185)
  // X: Sem 1 (110), Sem 2 (275), Sem 3 (440), Sem 4 (605), Sem 5 (770)
  // Y scale: 2.5 = 145px, 4.0 = 30px (range 115px per 1.5 GPA)
  const getY = (val) => (val ? 145 - ((val - 2.5) / 1.5) * 115 : null);

  const chartPoints = [
    { sem: '20241', name: 'Sem 1', x: 110, ip: 3.20, ipk: 3.20, ipY: getY(3.20), ipkY: getY(3.20), completed: true },
    { sem: '20242', name: 'Sem 2', x: 275, ip: 3.15, ipk: 3.17, ipY: getY(3.15), ipkY: getY(3.17), completed: true },
    { sem: '20251', name: 'Sem 3', x: 440, ip: 3.85, ipk: 3.44, ipY: getY(3.85), ipkY: getY(3.44), completed: true },
    { sem: '20252', name: 'Sem 4', x: 605, ip: 3.74, ipk: 3.51, ipY: getY(3.74), ipkY: getY(3.51), completed: true },
    { sem: '20261', name: 'Sem 5', x: 770, ip: null, ipk: null, ipY: null, ipkY: null, completed: false },
  ];

  // Active hover point and metadata for dynamic mouse animation
  const hoveredPt = chartPoints.find((p) => p.sem === hoveredSem);
  const hoveredSemData = semesterTelemetries[hoveredSem] || currentSem;

  // 1. Error 503 View (Frame D Simulation)
  if (loadingState === 'error_503') {
    return (
      <div className="max-w-[1120px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
        <div className="bg-card border border-border rounded-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-danger-tint text-danger flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[32px]">cloud_off</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-danger-tint text-danger font-semibold text-[11px] mb-2">
            Galat Layanan 503
          </span>
          <h2 className="text-[20px] font-bold text-ink">Dashboard Belum Bisa Dimuat</h2>
          <p className="text-[13px] text-ink-muted max-w-md mt-1.5 leading-relaxed">
            Server akademik SALAM sedang menangani lonjakan beban tinggi. Sistem belum dapat memuat ringkasan data saat ini.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={() => {
                setLoadingState('loaded');
                showToast('Halaman dashboard berhasil dimuat kembali', 'success');
              }}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-[13px] flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Coba Muat Ulang</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsStaleCache(true);
                setLoadingState('loaded');
                showToast('Menampilkan data terakhir dari cache lokal', 'info');
              }}
              className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-bg text-ink font-medium text-[13px] cursor-pointer"
            >
              Lihat Data Terakhir (Cache)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Skeleton Shimmer View (Frame A: 1-3s Simulation)
  if (loadingState === 'shimmer_1_3s') {
    return (
      <div className="max-w-[1120px] mx-auto p-4 md:p-6 flex flex-col gap-5 animate-fade-in">
        <div className="flex flex-col gap-1.5">
          <div className="w-56 h-7 rounded skeleton-shimmer"></div>
          <div className="w-80 h-4 rounded skeleton-shimmer"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 h-28 flex flex-col justify-between">
              <div className="w-24 h-4 rounded skeleton-shimmer"></div>
              <div className="w-32 h-7 rounded skeleton-shimmer"></div>
              <div className="w-40 h-3 rounded skeleton-shimmer"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-card border border-border rounded-xl p-5 h-80 flex flex-col gap-3">
            <div className="w-40 h-5 rounded skeleton-shimmer"></div>
            <div className="w-full h-24 rounded skeleton-shimmer"></div>
            <div className="w-full h-20 rounded skeleton-shimmer"></div>
          </div>
          <div className="lg:col-span-5 bg-card border border-border rounded-xl p-5 h-80 flex flex-col gap-3">
            <div className="w-36 h-5 rounded skeleton-shimmer"></div>
            <div className="w-full h-24 rounded skeleton-shimmer"></div>
            <div className="w-full h-20 rounded skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1120px] mx-auto p-4 md:p-6 flex flex-col gap-5 animate-fade-in">
      {/* Simulation Banner: Progress Info 5s */}
      {loadingState === 'progress_5s' && (
        <div className="w-full bg-info-tint border border-info/40 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 border-2 border-info border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[13px] text-ink font-medium">
              Memuat data akademik... Server sedang melayani banyak mahasiswa.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLoadingState('loaded')}
            className="text-[12px] font-bold text-info hover:underline shrink-0 cursor-pointer"
          >
            Lewati
          </button>
        </div>
      )}

      {/* Simulation Banner: Cooldown 10s */}
      {loadingState === 'cooldown_cache_10s' && (
        <div className="w-full bg-warning-tint border border-warning/40 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-warning text-[20px]">hourglass_top</span>
            <p className="text-[13px] text-ink">
              Server sedang ramai. Tunggu jeda pendinginan untuk mencoba kembali.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={cooldown > 0}
              onClick={() => {
                setLoadingState('loaded');
                showToast('Dashboard berhasil disegarkan', 'success');
              }}
              className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-colors ${
                cooldown > 0
                  ? 'bg-border text-ink-muted cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-hover cursor-pointer'
              }`}
            >
              {cooldown > 0 ? `Coba lagi (${cooldown}s)` : 'Coba Lagi'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsStaleCache(true);
                setLoadingState('loaded');
              }}
              className="px-3 py-1 rounded-md border border-warning/40 bg-card text-ink text-[12px] font-medium hover:bg-bg cursor-pointer"
            >
              Cache
            </button>
          </div>
        </div>
      )}

      {/* Stale Cache Warning Banner */}
      {isStaleCache && (
        <div className="w-full bg-warning-tint border border-warning/40 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-warning text-[20px]">history</span>
            <p className="text-[13px] text-ink">
              Menampilkan data terakhir 07.42 WIB. Koneksi data ke server sedang dipulihkan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsStaleCache(false);
              showToast('Data diperbarui dengan server terkini', 'success');
            }}
            className="px-3 py-1 rounded-md bg-card border border-warning/40 text-ink hover:bg-warning-tint text-[12px] font-semibold shrink-0 cursor-pointer"
          >
            Segarkan
          </button>
        </div>
      )}

      {/* 1. COMPACT GREETING HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1">
        <div>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-ink tracking-tight">
            Selamat pagi, {student.name.split(' ')[0]}
          </h1>
          <p className="text-[13px] text-ink-muted mt-0.5">
            {student.prodi} • Semester {student.semester}
          </p>
        </div>
        <div className="text-left sm:text-right text-[12px] text-ink-muted font-medium">
          Rabu, 18 Oktober 2026
        </div>
      </div>

      {/* 2. CONDITIONAL UKT ACTION NOTIFICATION BANNER (Only when bill exists) */}
      {uktState === 'ada_tagihan' && (
        <div className="w-full bg-warning-tint/80 border border-warning/40 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-warning text-[20px] shrink-0">receipt_long</span>
            <p className="text-[13px] text-ink leading-snug">
              Tagihan UKT Semester 5 sebesar <strong className="font-semibold text-ink">Rp 3.000.000</strong> jatuh tempo pada 31 Agustus 2026.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage('keuangan')}
            className="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[12px] font-semibold transition-colors cursor-pointer"
          >
            Bayar Sekarang
          </button>
        </div>
      )}

      {/* 3. CONDITIONAL ACTIVE ATTENDANCE SESSION (Only when session is live) */}
      {isSessionActive && (
        <div className="w-full bg-primary-tint/40 border border-primary/25 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Sesi Presensi Aktif
                </span>
                <span className="text-[12px] text-ink-muted">• Tutup 09.45 WIB</span>
              </div>
              <p className="text-[14px] text-ink font-semibold mt-0.5">
                {activeCourse.name} — Ruang {activeCourse.room}
              </p>
            </div>
          </div>

          <div>
            {!hasMarkedToday ? (
              <button
                type="button"
                onClick={() => setQrScannerOpen(true)}
                className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                <span>Scan QR kehadiran</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-success-tint text-success text-[12px] font-semibold border border-success/30">
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>Sudah hadir (09.41 WIB)</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* 4. EXACTLY 4 PRIMARY STAT CARDS (Uniform height & structured alignment) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: IPK Kumulatif */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-4.5 flex flex-col justify-between min-h-[142px] shadow-xs card-interactive">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-ink-muted">IPK Kumulatif</span>
              <span className="text-[11px] font-bold text-success bg-success-tint px-2 py-0.5 rounded-full">
                +0,07
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-[26px] font-bold text-ink font-mono tracking-tight">{student.ipkFormatted}</span>
              <span className="text-[12px] text-ink-muted font-medium">/ 4,00</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-0.5 truncate">Predikat: Dengan Pujian</p>
          </div>
          <div className="pt-2.5 border-t border-border/70 mt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('khs')}
              className="text-[12px] text-primary hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Histori KHS</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 2: SKS Lulus */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-4.5 flex flex-col justify-between min-h-[142px] shadow-xs card-interactive">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-ink-muted">SKS Lulus Diakui</span>
              <span className="text-[11px] font-bold text-primary bg-primary-tint px-2 py-0.5 rounded-full">
                58,3% Selesai
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-[26px] font-bold text-ink font-mono tracking-tight">{student.sksLulus}</span>
              <span className="text-[12px] text-ink-muted font-medium">/ 144 SKS</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-0.5 truncate">Total 84 SKS disetujui</p>
          </div>
          <div className="pt-2.5 border-t border-border/70 mt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('transkrip')}
              className="text-[12px] text-primary hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Transkrip Nilai</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 3: Kehadiran Semester Ini */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-4.5 flex flex-col justify-between min-h-[142px] shadow-xs card-interactive">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-ink-muted">Rata-rata Kehadiran</span>
              <span className="text-[11px] font-bold text-primary bg-primary-tint px-2 py-0.5 rounded-full">
                Batas 85%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-[26px] font-bold text-ink font-mono tracking-tight">91%</span>
              <span className="text-[12px] text-ink-muted font-medium">/ Min. 85%</span>
            </div>
            <p className="text-[11px] text-warning font-semibold mt-0.5 truncate">1 matakuliah butuh perhatian</p>
          </div>
          <div className="pt-2.5 border-t border-border/70 mt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('absensi')}
              className="text-[12px] text-primary hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Riwayat Presensi</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 4: SKS Semester 5 Aktif */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-4.5 flex flex-col justify-between min-h-[142px] shadow-xs card-interactive">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-ink-muted">SKS Semester 5</span>
              <span className="text-[11px] font-bold text-success bg-success-tint px-2 py-0.5 rounded-full">
                KRS Disetujui
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-[26px] font-bold text-ink font-mono tracking-tight">{student.sksSemesterIni}</span>
              <span className="text-[12px] text-ink-muted font-medium">/ 24 SKS</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-0.5 truncate">8 matakuliah aktif terdaftar</p>
          </div>
          <div className="pt-2.5 border-t border-border/70 mt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('krs')}
              className="text-[12px] text-primary hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Rencana Studi</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. OPERATIONAL DUAL-COLUMN ROW (Balanced, Equal-Height Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column (7 cols): JADWAL KULIAH TERDEKAT */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col justify-between h-full card-interactive">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border mb-3.5">
                <h2 className="text-[16px] font-bold text-ink">Jadwal Kuliah Terdekat</h2>
                <span className="text-[11px] font-mono text-ink-muted">2026/2027 Ganjil</span>
              </div>

              {/* List of 4 nearest classes (Balanced height, zero empty voids) */}
              <div className="space-y-2.5">
                {/* Class 1: Today (Wednesday) */}
                <div className="p-3 rounded-lg border border-primary/30 bg-primary-tint/15 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
                        Hari Ini
                      </span>
                      <span className="text-[12px] font-semibold text-primary">09.30 – 12.00 WIB</span>
                      <span className="text-ink-muted">(Ruang {activeCourse.room})</span>
                    </div>
                    <p className="text-[13px] font-bold text-ink truncate mt-0.5">{activeCourse.name}</p>
                    <p className="text-[11px] text-ink-muted truncate">Kelas {activeCourse.class} • {activeCourse.lecturer}</p>
                  </div>
                  {hasMarkedToday ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-success-tint text-success text-[11px] font-semibold shrink-0 border border-success/30">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      <span>Hadir</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setQrScannerOpen(true)}
                      className="px-2.5 py-1 rounded bg-primary text-white text-[11px] font-bold shrink-0 hover:bg-primary-hover transition-colors cursor-pointer"
                    >
                      Sesi Aktif
                    </button>
                  )}
                </div>

                {/* Class 2: Tomorrow morning (Thursday) */}
                <div className="p-3 rounded-lg border border-border bg-bg/50 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-ink-muted font-mono">
                      <span className="font-semibold text-ink">Besok (Kamis)</span>
                      <span>• 07.00 – 09.30 WIB</span>
                      <span>(Ruang R.4.10)</span>
                    </div>
                    <p className="text-[13px] font-bold text-ink truncate mt-0.5">Jaringan Komputer</p>
                    <p className="text-[11px] text-ink-muted truncate">Cecep Nurul Alam M.T. • 3 SKS</p>
                  </div>
                  <span className="text-[11px] text-ink-muted font-medium px-2 py-0.5 rounded bg-card border border-border shrink-0">
                    Belum dimulai
                  </span>
                </div>

                {/* Class 3: Tomorrow afternoon (Thursday) */}
                <div className="p-3 rounded-lg border border-border bg-bg/50 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-ink-muted font-mono">
                      <span className="font-semibold text-ink">Besok (Kamis)</span>
                      <span>• 12.40 – 15.10 WIB</span>
                      <span>(Ruang R.4.12)</span>
                    </div>
                    <p className="text-[13px] font-bold text-ink truncate mt-0.5">Pengembangan Aplikasi Mobile</p>
                    <p className="text-[11px] text-ink-muted truncate">H. Aldy Rialdy Atmadja M.T • 3 SKS</p>
                  </div>
                  <span className="text-[11px] text-ink-muted font-medium px-2 py-0.5 rounded bg-card border border-border shrink-0">
                    Belum dimulai
                  </span>
                </div>

                {/* Class 4: Friday morning (Friday) */}
                <div className="p-3 rounded-lg border border-border bg-bg/50 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-ink-muted font-mono">
                      <span className="font-semibold text-ink">Jumat</span>
                      <span>• 08.00 – 10.30 WIB</span>
                      <span>(Ruang R.3.05)</span>
                    </div>
                    <p className="text-[13px] font-bold text-ink truncate mt-0.5">Pemrograman Berorientasi Objek</p>
                    <p className="text-[11px] text-ink-muted truncate">Dian Dharmayanti M.T. • 3 SKS</p>
                  </div>
                  <span className="text-[11px] text-ink-muted font-medium px-2 py-0.5 rounded bg-card border border-border shrink-0">
                    Belum dimulai
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border mt-3 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setCurrentPage('krs')}
                className="text-[12px] font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat jadwal lengkap (KRS)</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): RINGKASAN KEHADIRAN & ADMINISTRASI AKADEMIK */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Panel 1: Ringkasan Kehadiran Kuliah */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col justify-between card-interactive flex-1">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-border mb-3">
                <h3 className="text-[15px] font-bold text-ink">Status Kehadiran Kuliah</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary-tint text-primary">
                  Semester 5
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Attendance Stats & Progress */}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[20px] font-bold text-ink font-mono">91%</span>
                    <span className="text-[11px] text-ink-muted font-medium">rata-rata kehadiran</span>
                  </div>
                  <div className="text-[11px] font-medium text-ink-muted">
                    <span className="text-success font-semibold">7 Aman</span> • <span className="text-danger font-semibold">1 Perhatian</span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-bg rounded-full h-2 overflow-hidden border border-border/80 relative">
                  <div className="bg-primary h-full rounded-full" style={{ width: '91%' }}></div>
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-ink/40"
                    style={{ left: '85%' }}
                    title="Batas Minimum Kehadiran (85%)"
                  ></div>
                </div>

                {/* Highlight Course Needing Attention */}
                {warningCourses.length > 0 && (
                  <div className="p-2.5 rounded-lg border border-danger/30 bg-danger-tint/25 space-y-0.5 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-danger flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">warning</span>
                        Perhatian Presensi
                      </span>
                      <span className="text-[11px] font-mono font-bold text-danger">50% (3/6 Sesi)</span>
                    </div>
                    <p className="text-[12px] text-ink font-semibold">
                      Jaringan Komputer (Kelas B)
                    </p>
                    <p className="text-[10.5px] text-ink-muted leading-tight">
                      3 pertemuan terlewat. Kehadiran di sisa sesi diperlukan untuk syarat UAS.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2.5 border-t border-border mt-3 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setCurrentPage('absensi')}
                className="text-[12px] font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat riwayat presensi</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Panel 2: Administrasi Akademik */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col justify-between card-interactive flex-1">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-border mb-2.5">
                <h3 className="text-[15px] font-bold text-ink">Administrasi Akademik</h3>
                <span className="text-[11px] text-ink-muted font-mono">2026/2027 Ganjil</span>
              </div>

              <div className="space-y-1.5 text-[12px]">
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-ink-muted">Dosen Wali (PA):</span>
                  <span className="font-semibold text-ink text-right">{student.dosenPA}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-ink-muted">Status IRS/KRS:</span>
                  <span className="font-semibold text-success bg-success-tint px-2 py-0.5 rounded text-[11px]">
                    Disetujui (23 SKS)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-ink-muted">Status Keuangan UKT:</span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                    uktState === 'ada_tagihan' ? 'bg-warning-tint text-warning' : 'bg-success-tint text-success'
                  }`}>
                    {uktState === 'ada_tagihan' ? 'Ada tagihan aktif' : 'Lunas (Bebas Biaya)'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ink-muted">Status Bimbingan TA:</span>
                  <span className="font-semibold text-primary bg-primary-tint px-2 py-0.5 rounded text-[11px]">
                    Pra-Proposal Skripsi
                  </span>
                </div>
              </div>
            </div>

            {/* Symmetrical Dual Action Buttons with meaningful icons */}
            <div className="pt-2.5 border-t border-border mt-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage('bimbingan')}
                className="h-8.5 px-3 rounded-lg border border-border bg-card hover:bg-bg text-ink text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-primary">forum</span>
                <span>Bimbingan</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('cetak-ktm')}
                className="h-8.5 px-3 rounded-lg border border-border bg-card hover:bg-bg text-ink text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-ink-muted">badge</span>
                <span>Cetak KTM</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. FULL-WIDTH ACADEMIC PERFORMANCE (TREN IP/IPK) DENGAN ANIMASI MOUSE HOVER CANGGIH */}
      <div className="w-full">
        <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between card-interactive relative">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border gap-2 mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[16px] font-bold text-ink">Tren Indeks Prestasi Akademik</h2>
                <span className="text-[11px] text-ink-muted hidden sm:inline">• Arahkan mouse ke semester untuk melihat rincian</span>
              </div>

              {/* View toggles */}
              <div className="inline-flex rounded-lg border border-border bg-bg p-0.5 text-[11px] font-semibold self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setChartFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartFilter === 'all' ? 'bg-card text-ink font-bold shadow-xs' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setChartFilter('ip')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartFilter === 'ip' ? 'bg-primary text-white font-bold shadow-xs' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  IP Sem
                </button>
                <button
                  type="button"
                  onClick={() => setChartFilter('ipk')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartFilter === 'ipk' ? 'bg-leaf text-white font-bold shadow-xs' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  IPK
                </button>
                <button
                  type="button"
                  onClick={() => setChartFilter('table')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartFilter === 'table' ? 'bg-card text-primary font-bold shadow-xs' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Tabel
                </button>
              </div>
            </div>

            {chartFilter === 'table' ? (
              /* Accessible Table Mode */
              <div className="overflow-x-auto py-1">
                <table className="w-full text-[12px] text-left">
                  <thead className="bg-bg text-ink-muted font-bold border-b border-border text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Semester</th>
                      <th className="py-2.5 px-4 text-center">SKS Diambil</th>
                      <th className="py-2.5 px-4 text-center">IP Semester (IPS)</th>
                      <th className="py-2.5 px-4 text-center">IPK Kumulatif</th>
                      <th className="py-2.5 px-4 text-center">Status Kelulusan</th>
                      <th className="py-2.5 px-4">Predikat / Evaluasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {academicTrendData.map((d) => (
                      <tr key={d.semester} className="hover:bg-primary-tint/15 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-ink">{d.label.split('(')[0]}</td>
                        <td className="py-2.5 px-4 text-center font-mono">{d.sks} SKS</td>
                        <td className="py-2.5 px-4 text-center font-mono font-bold text-primary">
                          {d.ip ? d.ip.toFixed(2) : '—'}
                        </td>
                        <td className="py-2.5 px-4 text-center font-mono font-bold text-ink">
                          {d.ipk ? d.ipk.toFixed(2) : '—'}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              d.status === 'Berjalan'
                                ? 'bg-warning-tint text-warning'
                                : 'bg-success-tint text-success'
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-ink-muted text-[11px]">
                          {semesterTelemetries[d.semester]?.evaluasi || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Interactive Visual SVG Chart with Mouse Hover Animations */
              <div className="pt-2 relative">
                {/* Floating Animated Tooltip on Mouse Hover */}
                {hoveredSem && hoveredPt && (
                  <div
                    className="absolute z-20 pointer-events-none transition-all duration-150 ease-out transform -translate-x-1/2"
                    style={{
                      left: `${(hoveredPt.x / 900) * 100}%`,
                      top: `${Math.max(12, Math.min(hoveredPt.ipY || 68, hoveredPt.ipkY || 68) - 72)}px`,
                    }}
                  >
                    <div className="bg-ink/95 text-white rounded-lg px-3 py-2 shadow-xl border border-white/15 text-[11px] backdrop-blur-md flex flex-col gap-0.5 min-w-[170px] animate-fade-in">
                      <div className="font-bold text-white border-b border-white/20 pb-0.5 flex items-center justify-between">
                        <span>{hoveredSemData.label.split('(')[0]}</span>
                        <span className="text-[10px] text-white/70 font-mono">{hoveredSemData.sks} SKS</span>
                      </div>
                      {hoveredPt.completed ? (
                        <div className="flex items-center justify-between pt-0.5 font-mono text-[11px]">
                          <span className="text-leaf font-bold">IPS: {hoveredSemData.ip}</span>
                          <span className="text-white font-bold">IPK: {hoveredSemData.ipk}</span>
                        </div>
                      ) : (
                        <span className="text-warning text-[10px] font-semibold pt-0.5">Sedang Ditempuh</span>
                      )}
                      <span className="text-[10px] text-white/75 truncate mt-0.5">
                        {hoveredSemData.evaluasi}
                      </span>
                    </div>
                  </div>
                )}

                <svg viewBox="0 0 900 185" className="w-full h-44 sm:h-48 select-none overflow-visible">
                  {/* Horizontal gridlines */}
                  {[2.5, 3.0, 3.5, 4.0].map((val) => {
                    const y = getY(val);
                    return (
                      <g key={val}>
                        <line x1="50" y1={y} x2="850" y2={y} stroke="#DCE2DA" strokeDasharray="3 3" strokeWidth="1" />
                        <text x="42" y={y + 3.5} fill="#55626A" fontSize="10" textAnchor="end" fontFamily="monospace">
                          {val.toFixed(1)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertical Guideline on Hover */}
                  {hoveredSem && hoveredPt && (
                    <line
                      x1={hoveredPt.x}
                      y1="20"
                      x2={hoveredPt.x}
                      y2="155"
                      stroke="#3F7A1F"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.5"
                      className="transition-all duration-200"
                    />
                  )}

                  {/* Polyline IP Semester */}
                  {(chartFilter === 'all' || chartFilter === 'ip') && (
                    <polyline
                      fill="none"
                      stroke="#3F7A1F"
                      strokeWidth={hoveredSem ? '3' : '2.5'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-200"
                      points={chartPoints.filter((p) => p.ipY !== null).map((p) => `${p.x},${p.ipY}`).join(' ')}
                    />
                  )}

                  {/* Polyline IPK Kumulatif */}
                  {(chartFilter === 'all' || chartFilter === 'ipk') && (
                    <polyline
                      fill="none"
                      stroke="#8CC43F"
                      strokeWidth={hoveredSem ? '3' : '2.5'}
                      strokeDasharray="4 3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-200"
                      points={chartPoints.filter((p) => p.ipkY !== null).map((p) => `${p.x},${p.ipkY}`).join(' ')}
                    />
                  )}

                  {/* Interactive Nodes and Hit-Areas */}
                  {chartPoints.map((pt) => {
                    const isSelected = selectedSemester === pt.sem;
                    const isHovered = hoveredSem === pt.sem;

                    return (
                      <g
                        key={pt.sem}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredSem(pt.sem)}
                        onMouseLeave={() => setHoveredSem(null)}
                        onClick={() => pt.completed && setSelectedSemester(pt.sem)}
                      >
                        {/* Invisible Broad Hit-Area for Easy Hovering */}
                        <rect
                          x={pt.x - 75}
                          y="10"
                          width="150"
                          height="160"
                          fill="transparent"
                        />

                        {/* X Axis Label */}
                        <text
                          x={pt.x}
                          y="172"
                          fill={isHovered || isSelected ? '#3F7A1F' : '#55626A'}
                          fontSize={isHovered ? '12' : '11'}
                          fontWeight={isHovered || isSelected ? 'bold' : 'normal'}
                          textAnchor="middle"
                          className="transition-all duration-150"
                        >
                          {pt.name}
                        </text>

                        {/* Semester 5 (in progress) */}
                        {!pt.completed && (
                          <g>
                            <circle
                              cx={pt.x}
                              cy="68"
                              r={isHovered ? 7 : 5}
                              fill="#F3F5F2"
                              stroke="#55626A"
                              strokeDasharray="2 2"
                              strokeWidth="1.5"
                              className="transition-all duration-200"
                            />
                            <text x={pt.x} y="56" fill="#55626A" fontSize="9.5" textAnchor="middle">
                              Berjalan
                            </text>
                          </g>
                        )}

                        {/* IP Node with Animated Glow Ring on Hover */}
                        {pt.ipY !== null && (chartFilter === 'all' || chartFilter === 'ip') && (
                          <g>
                            {isHovered && (
                              <circle
                                cx={pt.x}
                                cy={pt.ipY}
                                r="14"
                                fill="#3F7A1F"
                                fillOpacity="0.2"
                                className="animate-ping pointer-events-none"
                              />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.ipY}
                              r={isHovered ? 7.5 : isSelected ? 6 : 4.5}
                              fill="#3F7A1F"
                              stroke="#FFFFFF"
                              strokeWidth={isHovered ? '2.5' : '2'}
                              className="transition-all duration-200 ease-out"
                            />
                            <text
                              x={pt.x}
                              y={pt.ipY - (isHovered ? 11 : 9)}
                              fill="#3F7A1F"
                              fontSize={isHovered ? '11' : '10'}
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="monospace"
                              className="transition-all duration-150"
                            >
                              {pt.ip.toFixed(2)}
                            </text>
                          </g>
                        )}

                        {/* IPK Node with Animated Glow Ring on Hover */}
                        {pt.ipkY !== null && (chartFilter === 'all' || chartFilter === 'ipk') && (
                          <g>
                            {isHovered && chartFilter !== 'ip' && (
                              <circle
                                cx={pt.x}
                                cy={pt.ipkY}
                                r="12"
                                fill="#8CC43F"
                                fillOpacity="0.2"
                                className="animate-ping pointer-events-none"
                              />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.ipkY}
                              r={isHovered ? 7 : isSelected ? 5.5 : 4}
                              fill="#8CC43F"
                              stroke="#FFFFFF"
                              strokeWidth={isHovered ? '2.5' : '2'}
                              className="transition-all duration-200 ease-out"
                            />
                            {chartFilter === 'ipk' && (
                              <text
                                x={pt.x}
                                y={pt.ipkY - (isHovered ? 11 : 9)}
                                fill="#6E9A2E"
                                fontSize={isHovered ? '11' : '10'}
                                fontWeight="bold"
                                textAnchor="middle"
                                fontFamily="monospace"
                                className="transition-all duration-150"
                              >
                                {pt.ipk.toFixed(2)}
                              </text>
                            )}
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* Selected / Hovered Semester Real-Time Telemetry Strip */}
            <div className="p-3 rounded-lg bg-bg border border-border mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] transition-colors duration-150">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-bold text-ink">{currentSem.label}:</span>
                <span className="text-ink-muted flex items-center gap-1.5 font-mono">
                  <span>IPS <strong className="text-primary">{currentSem.ip}</strong></span>
                  <span>•</span>
                  <span>IPK <strong className="text-ink">{currentSem.ipk}</strong></span>
                  <span>•</span>
                  <span>{currentSem.sks} SKS</span>
                </span>
              </div>
              <span className="text-[11px] font-semibold text-primary bg-primary-tint px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                {currentSem.evaluasi}
              </span>
            </div>
          </div>

          {/* Unified Card Footer: Legend on Left, Action Link on Right */}
          <div className="pt-3 border-t border-border mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center gap-4 text-ink-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                <span className="font-semibold text-ink">IP Semester (IPS)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-leaf rounded inline-block"></span>
                <span className="font-semibold text-ink">IPK Kumulatif</span>
              </span>
              <span className="text-[10px] text-ink-muted hidden md:inline ml-2">
                • Arahkan kursor ke titik semester untuk tooltip nilai
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage('khs')}
              className="text-[12px] font-semibold text-primary hover:underline inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>Lihat histori KHS lengkap</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
