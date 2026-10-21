import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ServerDown = () => {
  const { setCurrentPage, showToast } = useApp();
  const [cooldown, setCooldown] = useState(0);

  const handleRetry = () => {
    setCooldown(10);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    showToast('Mencoba menyambungkan kembali ke server SALAM...', 'info');
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between p-6 animate-fade-in">
      <header className="flex items-center justify-between max-w-2xl mx-auto w-full pt-4">
        <img
          src="/assets/salam-logo-full.svg"
          alt="SALAM UIN SGD"
          className="h-9 w-auto object-contain cursor-pointer"
          onClick={() => setCurrentPage('dashboard')}
        />
        <span className="px-2.5 py-1 rounded-full bg-danger-tint text-danger font-semibold text-[12px] border border-danger/30">
          Layanan Terputus
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center my-8">
        <div className="w-full max-w-[520px] bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col text-center items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-danger-tint text-danger flex items-center justify-center">
            <span className="material-symbols-outlined text-[44px]">wifi_off</span>
          </div>

          <div>
            <h1 className="text-[24px] sm:text-[28px] font-bold text-ink">SALAM Sedang Tidak Bisa Dibuka</h1>
            <p className="text-[14px] text-ink-muted mt-2 leading-relaxed max-w-md">
              Kami belum bisa menghubungkan peramban kamu ke portal akademik saat ini. Tim infrastruktur universitas sedang memulihkan koneksi jaringan.
            </p>
          </div>

          <div className="w-full p-4 bg-bg border border-border rounded-xl text-left text-[12px] space-y-1.5 text-ink">
            <p className="font-semibold text-ink">Apa yang dapat kamu lakukan:</p>
            <p>1. Periksa kembali sambungan WiFi atau paket data internet perangkat kamu.</p>
            <p>2. Tunggu beberapa menit sebelum mencoba memuat ulang halaman.</p>
            <p>3. Jika sedang masa pengisian KRS, jadwal akses akan diperpanjang secara proporsional.</p>
          </div>

          <div className="w-full flex flex-col gap-2.5 pt-2">
            <button
              type="button"
              disabled={cooldown > 0}
              onClick={handleRetry}
              className={`w-full py-3 rounded-lg text-white font-bold text-[14px] transition-colors ${
                cooldown > 0
                  ? 'bg-border text-ink-muted cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-hover shadow-sm cursor-pointer'
              }`}
            >
              {cooldown > 0 ? `Tunggu pendinginan (${cooldown}s)` : 'Coba Sambungkan Lagi'}
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('dashboard')}
              className="w-full py-2.5 rounded-lg border border-border text-ink hover:bg-bg font-semibold text-[13px]"
            >
              Kembali ke Beranda Demo
            </button>
          </div>

          <p className="text-[11px] text-ink-muted font-mono">
            Kode Galat: ERR_CONNECTION_REFUSED • Host: salam.uinsgd.ac.id
          </p>
        </div>
      </main>

      <footer className="text-center text-[12px] text-ink-muted">
        Pusat Teknologi Informasi dan Pangkalan Data (PTIPD) UIN Sunan Gunung Djati Bandung
      </footer>
    </div>
  );
};

