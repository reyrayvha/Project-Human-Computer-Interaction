import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const WaitingRoom = () => {
  const { setCurrentPage, showToast } = useApp();
  const [frame, setFrame] = useState('queue'); // 'queue' | 'ready'
  const [position, setPosition] = useState(42);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (frame === 'queue') {
      timer = setInterval(() => {
        setPosition((prev) => (prev > 1 ? prev - 5 : 1));
      }, 2000);
    } else if (frame === 'ready' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (frame === 'ready' && countdown === 0) {
      setCurrentPage('dashboard');
      showToast('Kamu telah dialihkan masuk ke portal SALAM', 'success');
    }
    return () => clearInterval(timer);
  }, [frame, countdown, setCurrentPage, showToast]);

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between p-6 animate-fade-in">
      <header className="flex items-center justify-between max-w-2xl mx-auto w-full pt-4">
        <img
          src="/assets/salam-logo-full.svg"
          alt="SALAM UIN SGD"
          className="h-9 w-auto object-contain cursor-pointer"
          onClick={() => setCurrentPage('dashboard')}
        />
        <span className="px-2.5 py-1 rounded-full bg-warning-tint text-warning font-semibold text-[12px] border border-warning/30">
          Ruang Antrean Akses
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center my-8">
        <div className="w-full max-w-[540px] bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col text-center items-center gap-6">
          {frame === 'queue' ? (
            <>
              {/* Spinner */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-primary-tint border-t-primary rounded-full animate-spin"></div>
                <span className="material-symbols-outlined text-primary text-[32px] absolute">hourglass_top</span>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-warning-tint text-warning font-bold text-[12px]">
                  Beban Akses Sangat Tinggi
                </span>
                <h1 className="text-[26px] font-bold text-ink mt-2">Kamu Dalam Antrean</h1>
                <p className="text-[14px] text-ink-muted mt-1 leading-relaxed max-w-md">
                  Server SALAM sedang mengatur alur masuk untuk menjaga keutuhan data akademik KRS. Halaman akan masuk otomatis saat giliranmu tiba.
                </p>
              </div>

              {/* Status Box */}
              <div className="w-full grid grid-cols-2 gap-3 p-4 bg-bg border border-border rounded-xl">
                <div>
                  <span className="text-[12px] text-ink-muted block">Posisi Antrean Kamu</span>
                  <span className="text-[28px] font-bold text-primary font-mono">#{position}</span>
                </div>
                <div>
                  <span className="text-[12px] text-ink-muted block">Perkiraan Waktu Masuk</span>
                  <span className="text-[28px] font-bold text-ink font-mono">~1 Menit</span>
                </div>
              </div>

              {/* Tips */}
              <div className="text-left w-full p-4 bg-primary-tint/30 border border-primary/20 rounded-xl text-[12px] space-y-1 text-ink">
                <p className="font-bold flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>Petunjuk Penting:</span>
                </p>
                <p>• Jangan me-refresh atau memuat ulang browser, karena nomor antrean kamu akan kembali ke awal.</p>
                <p>• Pilihan mata kuliah yang telah kamu tandai tetap tersimpan aman di cache.</p>
              </div>

              {/* Action */}
              <div className="w-full flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFrame('ready')}
                  className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-[13px] transition-colors"
                >
                  Simulasikan Giliran Tiba (Frame B)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('dashboard')}
                  className="w-full py-2 text-ink-muted hover:text-ink text-[13px] font-medium"
                >
                  Keluar dari Ruang Antrean
                </button>
              </div>
            </>
          ) : (
            /* Frame B: Sekarang Giliranmu */
            <>
              <div className="w-20 h-20 rounded-full bg-success-tint text-success flex items-center justify-center animate-scale-up">
                <span className="material-symbols-outlined text-[48px]">check_circle</span>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-success-tint text-success font-bold text-[12px]">
                  Pintu Akses Terbuka
                </span>
                <h1 className="text-[26px] font-bold text-ink mt-2">Sekarang Giliranmu!</h1>
                <p className="text-[14px] text-ink-muted mt-1 leading-relaxed max-w-md">
                  Server telah siap menerima permintaan kamu. Mengalihkan ke halaman portal SALAM dalam:
                </p>
              </div>

              <div className="w-24 h-24 rounded-full border-4 border-success flex items-center justify-center">
                <span className="font-mono text-[36px] font-bold text-success">{countdown}s</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentPage('dashboard');
                  showToast('Selamat datang kembali di portal SALAM', 'success');
                }}
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-[14px] shadow-sm"
              >
                Masuk Sekarang Juga
              </button>
            </>
          )}
        </div>
      </main>

      <footer className="text-center text-[12px] text-ink-muted">
        PTIPD UIN Sunan Gunung Djati Bandung • High Concurrency Queue Protection
      </footer>
    </div>
  );
};

