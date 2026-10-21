import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DemoControlBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    serverCondition,
    setServerCondition,
    loadingState,
    setLoadingState,
    isStaleCache,
    setIsStaleCache,
    isSessionActive,
    setIsSessionActive,
    uktState,
    setUktState,
    krsConcurrencyState,
    setKrsConcurrencyState,
    isOfflineMode,
    setIsOfflineMode,
    currentPage,
    setCurrentPage,
    resetDemo,
  } = useApp();

  return (
    <div className="fixed bottom-16 md:bottom-4 right-4 z-40 select-none">
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-ink text-white text-[12px] font-semibold shadow-xl hover:bg-ink/90 border border-white/20 transition-all hover:scale-105"
      >
        <span className="material-symbols-outlined text-[18px] text-leaf">tune</span>
        <span>Panel Penguji HCI Demo</span>
        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
          {isOpen ? 'Tutup' : 'Buka'}
        </span>
      </button>

      {/* Floating Drawer / Card */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-[360px] max-h-[520px] overflow-y-auto bg-card border border-border rounded-xl shadow-2xl p-4 flex flex-col gap-3.5 text-[12px] animate-scale-up">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">science</span>
              <span className="font-bold text-ink">Simulasi State Usability Testing</span>
            </div>
            <button
              type="button"
              onClick={resetDemo}
              className="text-danger hover:underline text-[11px] font-semibold"
            >
              Reset Demo
            </button>
          </div>

          {/* 1. Progressive Loading Ladder */}
          <div>
            <label className="block font-semibold text-ink mb-1">
              Progressive Loading Ladder (Server Response):
            </label>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setLoadingState('loaded')}
                className={`p-1.5 rounded border text-left truncate ${
                  loadingState === 'loaded' ? 'bg-primary text-white font-bold' : 'bg-bg text-ink hover:bg-card'
                }`}
              >
                1. Normal Loaded (&lt;1s)
              </button>
              <button
                type="button"
                onClick={() => setLoadingState('shimmer_1_3s')}
                className={`p-1.5 rounded border text-left truncate ${
                  loadingState === 'shimmer_1_3s' ? 'bg-primary text-white font-bold' : 'bg-bg text-ink hover:bg-card'
                }`}
              >
                2. Skeleton Shimmer (1-3s)
              </button>
              <button
                type="button"
                onClick={() => setLoadingState('progress_5s')}
                className={`p-1.5 rounded border text-left truncate ${
                  loadingState === 'progress_5s' ? 'bg-primary text-white font-bold' : 'bg-bg text-ink hover:bg-card'
                }`}
              >
                3. Progress Bar Banner (5s)
              </button>
              <button
                type="button"
                onClick={() => setLoadingState('cooldown_cache_10s')}
                className={`p-1.5 rounded border text-left truncate ${
                  loadingState === 'cooldown_cache_10s' ? 'bg-primary text-white font-bold' : 'bg-bg text-ink hover:bg-card'
                }`}
              >
                4. Cooldown 10s & Cache
              </button>
              <button
                type="button"
                onClick={() => setLoadingState('error_503')}
                className={`col-span-2 p-1.5 rounded border text-center ${
                  loadingState === 'error_503' ? 'bg-danger text-white font-bold' : 'bg-danger-tint text-danger'
                }`}
              >
                5. Error 503 (Server Gagal Dimuat)
              </button>
            </div>
          </div>

          {/* 2. Stale Cache Toggle */}
          <div className="flex items-center justify-between p-2 bg-bg rounded-lg border border-border">
            <span className="font-semibold text-ink">Banner Cache 07.42 WIB:</span>
            <button
              type="button"
              onClick={() => setIsStaleCache(!isStaleCache)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                isStaleCache ? 'bg-warning text-white' : 'bg-card border text-ink-muted'
              }`}
            >
              {isStaleCache ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>

          {/* 3. Absensi Session State */}
          <div className="flex items-center justify-between p-2 bg-bg rounded-lg border border-border">
            <span className="font-semibold text-ink">Sesi Kuliah IMK Hari Ini:</span>
            <button
              type="button"
              onClick={() => setIsSessionActive(!isSessionActive)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                isSessionActive ? 'bg-success text-white' : 'bg-card border text-ink-muted'
              }`}
            >
              {isSessionActive ? 'Sesi Dibuka' : 'Tidak Ada Sesi'}
            </button>
          </div>

          {/* 4. Tagihan UKT Mode */}
          <div className="flex items-center justify-between p-2 bg-bg rounded-lg border border-border">
            <span className="font-semibold text-ink">Status Tagihan UKT:</span>
            <button
              type="button"
              onClick={() => setUktState(uktState === 'tanpa_tagihan' ? 'ada_tagihan' : 'tanpa_tagihan')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                uktState === 'ada_tagihan' ? 'bg-warning text-white' : 'bg-success text-white'
              }`}
            >
              {uktState === 'ada_tagihan' ? 'Ada Tagihan (Rp 3jt)' : 'Lunas (Nol)'}
            </button>
          </div>

          {/* 5. KRS Concurrency Ladder */}
          <div>
            <label className="block font-semibold text-ink mb-1">
              KRS Concurrency Ladder (Simpan Beban Puncak):
            </label>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              {['ready', 'saving', 'timeout', 'success'].map((state) => (
                <button
                  key={state}
                  type="button"
                  onClick={() => {
                    setKrsConcurrencyState(state);
                    setCurrentPage('krs');
                  }}
                  className={`p-1.5 rounded border capitalize ${
                    krsConcurrencyState === state ? 'bg-primary text-white font-bold' : 'bg-bg text-ink'
                  }`}
                >
                  {state === 'ready'
                    ? 'A: Siap Simpan'
                    : state === 'saving'
                    ? 'B: Menyimpan...'
                    : state === 'timeout'
                    ? 'C: Timeout Cache'
                    : 'D: Berhasil'}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Offline Mode Simulation */}
          <div className="flex items-center justify-between p-2 bg-bg rounded-lg border border-border">
            <span className="font-semibold text-ink">Simulasi Koneksi Offline:</span>
            <button
              type="button"
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                isOfflineMode ? 'bg-danger text-white' : 'bg-card border text-ink-muted'
              }`}
            >
              {isOfflineMode ? 'Offline' : 'Online'}
            </button>
          </div>

          {/* 7. Direct Navigation to Specialized Standalone Pages */}
          <div>
            <label className="block font-semibold text-ink mb-1">
              Layar Khusus / Standalone Error & Antrean:
            </label>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setCurrentPage('waiting-room')}
                className="p-1.5 rounded bg-bg hover:bg-primary-tint border text-left truncate"
              >
                Ruang Antrean (Queue)
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('absensi-jarkom')}
                className="p-1.5 rounded bg-bg hover:bg-primary-tint border text-left truncate"
              >
                Riwayat Jarkom (16 Sesi)
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('server-down')}
                className="p-1.5 rounded bg-bg hover:bg-danger-tint border text-left truncate"
              >
                Layar Server Down
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('maintenance')}
                className="p-1.5 rounded bg-bg hover:bg-info-tint border text-left truncate"
              >
                Layar Pemeliharaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
