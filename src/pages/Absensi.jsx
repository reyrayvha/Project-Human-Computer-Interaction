import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Absensi = () => {
  const {
    courses,
    isSessionActive,
    hasMarkedToday,
    setQrScannerOpen,
    setQrStep,
    setKoreksiModalOpen,
    setSelectedMeetingForCorrection,
    setCurrentPage,
    showToast,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all');
  const [remindMe, setRemindMe] = useState(false);

  const activeCourse = courses.find((c) => c.isActiveToday) || courses[4];

  // Filtering
  const filteredCourses = courses.filter((c) => {
    if (activeFilter === 'aman') return c.status === 'aman';
    if (activeFilter === 'perhatian') return c.status === 'perhatian';
    if (activeFilter === 'berisiko') return c.status === 'berisiko';
    return true;
  });

  const counts = {
    all: courses.length,
    aman: courses.filter((c) => c.status === 'aman').length,
    perhatian: courses.filter((c) => c.status === 'perhatian').length,
    berisiko: courses.filter((c) => c.status === 'berisiko').length,
  };

  const openManualCode = () => {
    setQrStep('manual');
    setQrScannerOpen(true);
  };

  const openCorrection = (course) => {
    setSelectedMeetingForCorrection({
      meeting: 3,
      date: '26 September 2026',
      courseName: course.name,
    });
    setKoreksiModalOpen(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
      {/* 1. Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-ink tracking-tight">
            Absensi Kuliah
          </h1>
          <p className="text-[13px] text-ink-muted mt-0.5">
            Pindai QR dosen untuk presensi atau pantau rekapitulasi kehadiran semester aktif
          </p>
        </div>
        <div className="flex items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-ink-muted text-[12px] font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-leaf"></span>
            <span>Semester 20261 (Ganjil)</span>
          </div>
        </div>
      </div>

      {/* 2. Top Card: Sesi Absen (Active vs Inactive) */}
      {isSessionActive ? (
        <div className="w-full bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden card-interactive">
          {/* Decorative faint tone line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-leaf"></div>

          {/* Top Meta Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-tint text-success text-[12px] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                <span>Sesi Berlangsung</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning-tint text-warning text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Ditutup 14 menit lagi</span>
              </span>
            </div>

            <div>
              {hasMarkedToday ? (
                <span className="inline-flex items-center px-3 py-1 rounded-md bg-success-tint text-success text-[12px] font-semibold">
                  <span>Sudah absen (09.41 WIB)</span>
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-md bg-warning-tint text-warning text-[12px] font-semibold">
                  <span>Belum absen</span>
                </span>
              )}
            </div>
          </div>

          {/* Main Course Info */}
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold text-ink leading-tight">
              {activeCourse.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-[13px] text-ink-muted">
              <span>Kelas {activeCourse.class}</span>
              <span className="text-border">•</span>
              <span>Ruang {activeCourse.room}</span>
              <span className="text-border">•</span>
              <span>Dosen: {activeCourse.lecturer}</span>
              <span className="text-border">•</span>
              <span className="text-ink font-semibold">Hari ini, Rabu 09.30 – 12.00 WIB</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setQrStep('viewfinder');
                setQrScannerOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2.5 h-[52px] px-8 bg-primary hover:bg-primary-hover text-white text-[15px] font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
              <span>Scan QR kehadiran</span>
            </button>

            <button
              type="button"
              onClick={openManualCode}
              className="inline-flex items-center justify-center gap-2 h-[52px] px-6 bg-card hover:bg-bg border border-primary text-primary text-[14px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">keyboard</span>
              <span>Masukkan kode manual</span>
            </button>
          </div>

          {/* 3-Step Instruction Guide */}
          <div className="w-full bg-bg border border-border rounded-lg p-3 flex flex-wrap items-center gap-4 sm:gap-6 text-ink mt-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary-tint text-primary text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <span className="text-[12px] font-medium text-ink">Buka kamera</span>
            </div>
            <span className="material-symbols-outlined text-ink-muted text-[14px] hidden sm:inline-block">arrow_forward</span>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary-tint text-primary text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <span className="text-[12px] font-medium text-ink">Arahkan ke QR dosen</span>
            </div>
            <span className="material-symbols-outlined text-ink-muted text-[14px] hidden sm:inline-block">arrow_forward</span>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary-tint text-primary text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <span className="text-[12px] font-medium text-ink">Tunggu tanda hijau terverifikasi</span>
            </div>
          </div>
        </div>
      ) : (
        /* No Active Session State (Calm, informative) */
        <div className="w-full bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg border border-border text-ink-muted text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[16px]">event_busy</span>
              <span>Tidak Ada Sesi Absen Aktif</span>
            </div>
            <span className="text-[12px] text-ink-muted">Hari ini tidak ada kelas berlangsung saat ini</span>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-ink">Kuliah Berikutnya</h2>
            <p className="text-[14px] text-ink-muted mt-1">
              Kamis, 07.00 WIB: <strong className="text-ink">Jaringan Komputer</strong> di Ruang R.4.10 (Budi Santoso, S.T., M.Cs.)
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-border">
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-ink">
              <input
                type="checkbox"
                checked={remindMe}
                onChange={(e) => {
                  setRemindMe(e.target.checked);
                  showToast(
                    e.target.checked
                      ? 'Pengingat diaktifkan 10 menit sebelum sesi dibuka'
                      : 'Pengingat dinonaktifkan',
                    'info'
                  );
                }}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span>Ingatkan saya 10 menit sebelum sesi dibuka</span>
            </label>

            <button
              disabled
              className="inline-flex items-center gap-2 h-10 px-5 bg-border text-ink-muted text-[13px] font-semibold rounded-lg cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              <span>Scan QR (Nonaktif)</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Section: Riwayat Kehadiran per Mata Kuliah */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-bold text-ink">
              Riwayat kehadiran per mata kuliah
            </h2>
            <p className="text-[12px] text-ink-muted mt-0.5">
              Batas minimal kehadiran untuk mengikuti Ujian Akhir Semester (UAS) adalah 85%
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 bg-card border border-border p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded text-[12px] font-semibold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'text-ink-muted hover:text-ink hover:bg-bg'
              }`}
            >
              Semua ({counts.all})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('aman')}
              className={`px-3 py-1 rounded text-[12px] font-semibold transition-colors ${
                activeFilter === 'aman'
                  ? 'bg-primary text-white'
                  : 'text-ink-muted hover:text-ink hover:bg-bg'
              }`}
            >
              Aman ({counts.aman})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('perhatian')}
              className={`px-3 py-1 rounded text-[12px] font-semibold transition-colors ${
                activeFilter === 'perhatian'
                  ? 'bg-primary text-white'
                  : 'text-ink-muted hover:text-ink hover:bg-bg'
              }`}
            >
              Perhatian ({counts.perhatian})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('berisiko')}
              className={`px-3 py-1 rounded text-[12px] font-semibold transition-colors ${
                activeFilter === 'berisiko'
                  ? 'bg-primary text-white'
                  : 'text-ink-muted hover:text-ink hover:bg-bg'
              }`}
            >
              Berisiko ({counts.berisiko})
            </button>
          </div>
        </div>

        {/* Courses Table / Stacked Cards */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden card-interactive">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-bg border-b border-border text-[12px] font-bold text-ink-muted uppercase tracking-wider">
            <div className="col-span-4">Mata Kuliah & Dosen</div>
            <div className="col-span-1 text-center">SKS</div>
            <div className="col-span-2">Jadwal & Ruang</div>
            <div className="col-span-3">Persentase Kehadiran</div>
            <div className="col-span-2 text-right">Aksi Tindakan</div>
          </div>

          {/* Table Rows / Mobile Stacked Cards */}
          <div className="divide-y divide-border/60">
            {filteredCourses.map((c) => {
              const isDanger = c.percentage < 75;
              const isWarning = c.percentage >= 75 && c.percentage < 85;

              return (
                <div
                  key={c.id}
                  className="p-5 lg:px-6 lg:py-4 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-3 lg:gap-4 hover:bg-primary-tint/10 transition-colors"
                >
                  {/* Col 1: Course Info */}
                  <div className="lg:col-span-4 min-w-0">
                    <p className="text-[15px] font-bold text-ink leading-tight">{c.name}</p>
                    <p className="text-[12px] text-ink-muted mt-0.5 truncate">
                      Kelas {c.class} • {c.lecturer}
                    </p>
                    <p className="text-[11px] text-ink-muted/80 font-mono mt-0.5">Kode: {c.code}</p>
                  </div>

                  {/* Col 2: SKS */}
                  <div className="lg:col-span-1 flex items-center lg:justify-center">
                    <span className="text-[13px] font-semibold text-ink px-2 py-0.5 rounded bg-bg border border-border">
                      {c.sks} SKS
                    </span>
                  </div>

                  {/* Col 3: Jadwal */}
                  <div className="lg:col-span-2 text-[12px] text-ink">
                    <p className="font-semibold">{c.day}, {c.timeStart} - {c.timeEnd}</p>
                    <p className="text-ink-muted">Ruang {c.room}</p>
                  </div>

                  {/* Col 4: Progress Bar & Status */}
                  <div className="lg:col-span-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-ink-muted font-medium">
                        Hadir {c.attended} dari {c.totalSessions} pertemuan
                      </span>
                      <span
                        className={`text-[12px] font-bold font-mono ${
                          isDanger ? 'text-danger' : isWarning ? 'text-warning' : 'text-success'
                        }`}
                      >
                        {c.percentage}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-bg border border-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isDanger ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${c.percentage}%` }}
                      ></div>
                    </div>

                    {/* Clean color indicator without bulky emote pills or verbose explanations */}
                    {isDanger ? (
                      <span className="text-[11px] font-semibold text-danger">
                        Berisiko
                      </span>
                    ) : isWarning ? (
                      <span className="text-[11px] font-semibold text-warning">
                        Perlu perhatian
                      </span>
                    ) : null}
                  </div>

                  {/* Col 5: Actions */}
                  <div className="lg:col-span-2 flex items-center justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-border/60">
                    <div className="w-full max-w-[190px]">
                      {c.percentage === 100 ? (
                        /* Kehadiran Penuh: Card/Button Lihat Riwayat dibuat seukuran & selebar 2 pilihan agar pas dan tidak membuang space kosong */
                        <button
                          type="button"
                          onClick={() => setCurrentPage('absensi-jarkom')}
                          className="w-full h-[40px] px-3 rounded-lg border border-border bg-card hover:bg-bg text-ink text-[12px] font-semibold transition-colors cursor-pointer flex items-center justify-center text-center shadow-xs"
                        >
                          Lihat Riwayat
                        </button>
                      ) : (
                        /* Ada Alpa (< 100%): 2 Pilihan (Lihat Riwayat & Ajukan Koreksi) */
                        <div className="w-full grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => setCurrentPage('absensi-jarkom')}
                            className="h-[40px] px-1 rounded-lg border border-border bg-card hover:bg-bg text-ink text-[12px] font-semibold transition-colors cursor-pointer flex flex-col items-center justify-center text-center leading-tight shadow-xs"
                          >
                            <span>Lihat</span>
                            <span>Riwayat</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => openCorrection(c)}
                            className="h-[40px] px-1 rounded-lg text-primary hover:bg-primary-tint text-[12px] font-semibold transition-colors cursor-pointer flex flex-col items-center justify-center text-center leading-tight"
                            title="Ajukan perbaikan data alpa ke dosen"
                          >
                            <span>Ajukan</span>
                            <span>Koreksi</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

