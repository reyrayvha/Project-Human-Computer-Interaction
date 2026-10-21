import React from 'react';
import { useApp } from '../context/AppContext';

export const Maintenance = () => {
  const { setCurrentPage, showToast } = useApp();

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between p-6 animate-fade-in">
      <header className="flex items-center justify-between max-w-2xl mx-auto w-full pt-4">
        <img
          src="/assets/salam-logo-full.svg"
          alt="SALAM UIN SGD"
          className="h-9 w-auto object-contain cursor-pointer"
          onClick={() => setCurrentPage('dashboard')}
        />
        <span className="px-2.5 py-1 rounded-full bg-info-tint text-info font-semibold text-[12px] border border-info/30">
          Pemeliharaan Terjadwal
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center my-8">
        <div className="w-full max-w-[520px] bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col text-center items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-info-tint text-info flex items-center justify-center">
            <span className="material-symbols-outlined text-[44px]">build</span>
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-info-tint text-info font-bold text-[12px]">
              Jadwal Pemeliharaan Rutin
            </span>
            <h1 className="text-[24px] sm:text-[28px] font-bold text-ink mt-2">
              SALAM Sedang Dalam Pemeliharaan
            </h1>
            <p className="text-[14px] text-ink-muted mt-2 leading-relaxed max-w-md">
              Sistem administrasi akademik sedang menjalankan sinkronisasi basis data nilai semester dan peningkatan kapasitas server.
            </p>
          </div>

          <div className="w-full p-4 bg-bg border border-border rounded-xl text-left text-[12px] space-y-2">
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-ink-muted">Waktu Mulai:</span>
              <span className="font-semibold text-ink">Rabu, 18 Oktober 2026, 23.00 WIB</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-ink-muted">Estimasi Selesai:</span>
              <span className="font-semibold text-success">Kamis, 19 Oktober 2026, 03.00 WIB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Layanan Terdampak:</span>
              <span className="font-semibold text-ink">KRS, KHS, Pembayaran UKT</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => showToast('Pemeriksaan pemeliharaan: Server masih dalam proses update data', 'info')}
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-[14px] shadow-sm transition-colors cursor-pointer"
            >
              Muat Ulang Halaman
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('dashboard')}
              className="w-full py-2.5 rounded-lg border border-border text-ink hover:bg-bg font-semibold text-[13px]"
            >
              Kembali ke Beranda Demo
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center text-[12px] text-ink-muted">
        PTIPD UIN Sunan Gunung Djati Bandung • Terjadwal Resmi Bagian Akademik
      </footer>
    </div>
  );
};

