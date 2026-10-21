import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const CommandPalette = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, setCurrentPage } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    // Halaman
    { id: 'page-dashboard', category: 'Halaman', title: 'Dashboard Beranda', subtitle: 'Halaman ringkasan akademik dan jadwal', icon: 'dashboard', page: 'dashboard' },
    { id: 'page-absensi', category: 'Halaman', title: 'Absensi Kuliah', subtitle: 'Pindai QR presensi atau pantau rekap kehadiran', icon: 'qr_code_scanner', page: 'absensi' },
    { id: 'page-krs', category: 'Halaman', title: 'Rencana Studi (KRS)', subtitle: 'KRS semester aktif dan jadwal mingguan', icon: 'school', page: 'krs' },
    { id: 'page-keuangan', category: 'Halaman', title: 'Keuangan & Tagihan UKT', subtitle: 'Rincian pembayaran, VA perbankan, dan kuitansi', icon: 'account_balance_wallet', page: 'keuangan' },
    { id: 'page-khs', category: 'Halaman', title: 'Kartu Hasil Studi (KHS)', subtitle: 'Evaluasi nilai per semester', icon: 'bar_chart', page: 'khs' },
    { id: 'page-transkrip', category: 'Halaman', title: 'Transkrip Nilai Akademik', subtitle: 'Daftar seluruh nilai kumulatif kelulusan', icon: 'description', page: 'transkrip' },
    { id: 'page-bimbingan', category: 'Halaman', title: 'Bimbingan Skripsi / Tesis', subtitle: 'Logbook konsultasi dosen pembimbing', icon: 'auto_stories', page: 'bimbingan' },
    { id: 'page-ktm', category: 'Halaman', title: 'Cetak Kartu Tanda Mahasiswa (KTM)', subtitle: 'Cetak kartu mahasiswa digital resmi', icon: 'badge', page: 'cetak-ktm' },
    { id: 'page-akun', category: 'Halaman', title: 'Pengaturan Akun & Keamanan', subtitle: 'Ganti password dan riwayat sesi login', icon: 'manage_accounts', page: 'akun' },

    // Informasi Cepat
    { id: 'info-jadwal-hari-ini', category: 'Informasi', title: 'Jadwal Hari Ini: Interaksi Manusia dan Komputer', subtitle: 'Rabu 09.30 - 12.00 di Ruang R.4.01', icon: 'calendar_today', page: 'absensi' },
    { id: 'info-status-krs', category: 'Informasi', title: 'Status KRS: 23 dari 24 SKS Disetujui Dosen Wali', subtitle: 'Dr. Hendra Gunawan, M.T.', icon: 'verified', page: 'krs' },
    { id: 'info-ipk', category: 'Informasi', title: 'IPK Kumulatif: 3,51 (84 SKS Lulus)', subtitle: 'Akumulasi hingga Semester 4', icon: 'trending_up', page: 'dashboard' },
    { id: 'info-ukt', category: 'Informasi', title: 'Status Tagihan UKT: Tidak Ada Tagihan Aktif', subtitle: 'Semester 5 telah berstatus lunas', icon: 'check_circle', page: 'keuangan' },
  ];

  const filtered = commands.filter((cmd) => {
    const text = `${cmd.title} ${cmd.subtitle} ${cmd.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        executeCommand(filtered[selectedIndex]);
      }
    }
  };

  const executeCommand = (cmd) => {
    setCommandPaletteOpen(false);
    setCurrentPage(cmd.page);
  };

  if (!commandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-ink/50 backdrop-blur-sm animate-fade-in"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="bg-card w-full max-w-[640px] rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[500px]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-card">
          <span className="material-symbols-outlined text-[22px] text-ink-muted">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Cari layanan, jadwal, atau informasi akademik..."
            className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-muted focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-ink-muted hover:text-ink rounded-full"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          ) : (
            <kbd className="px-2 py-0.5 bg-bg border border-border rounded text-[11px] font-mono text-ink-muted">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-12 px-6 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-[40px] text-ink-muted/50 mb-2">
                search_off
              </span>
              <p className="font-semibold text-ink text-[15px]">Tidak ada hasil untuk "{query}"</p>
              <p className="text-ink-muted text-[13px] mt-1 max-w-sm">
                Periksa ejaan kata kunci atau cari layanan utama seperti Absensi, KRS, Nilai, atau Tagihan.
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => executeCommand(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-primary-tint text-primary' : 'hover:bg-bg text-ink'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-primary text-white' : 'bg-bg text-ink-muted'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-semibold truncate leading-snug">{item.title}</p>
                      <span className="text-[11px] px-1.5 py-0.2 rounded bg-border/60 text-ink-muted">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[12px] text-ink-muted truncate">{item.subtitle}</p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-ink-muted">
                    subdirectory_arrow_left
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-bg border-t border-border flex items-center justify-between text-[12px] text-ink-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-[10px]">↓</kbd>
              <span>pilih</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-[10px]">↵</kbd>
              <span>buka</span>
            </span>
          </div>
          <span>Pencarian Cepat SALAM</span>
        </div>
      </div>
    </div>
  );
};
