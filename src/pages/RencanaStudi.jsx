import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const RencanaStudi = () => {
  const {
    student,
    courses,
    krsViewMode,
    setKrsViewMode,
    krsConcurrencyState,
    setKrsConcurrencyState,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Filter courses by search
  const filteredCourses = courses.filter((c) =>
    `${c.name} ${c.lecturer} ${c.code} ${c.room}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Days for weekly view
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const handleSimpanKRS = () => {
    setKrsConcurrencyState('saving');
    setTimeout(() => {
      setKrsConcurrencyState('success');
      showToast('KRS Semester 5 berhasil disimpan ke basis data BAAK.', 'success');
    }, 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
      {/* 1. Header with Title & Cetak KRS Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-ink tracking-tight">
            Rencana Studi (KRS)
          </h1>
          <p className="text-[13px] text-ink-muted mt-0.5">
            Daftar kartu rencana studi semester 5 (2026/2027 Ganjil) yang telah divalidasi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="h-10 px-5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[14px] font-semibold transition-colors flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak KRS</span>
          </button>
        </div>
      </div>

      {/* KRS Concurrency Ladder Notification Banners */}
      {krsConcurrencyState === 'saving' && (
        <div className="w-full bg-info-tint border border-info rounded-xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-info border-t-transparent rounded-full animate-spin"></div>
            <div>
              <p className="text-[14px] font-bold text-ink">Sedang Menyimpan Rencana Studi ke Server...</p>
              <p className="text-[12px] text-ink-muted">
                Mohon jangan menutup atau memuat ulang halaman saat transaksi KRS berlangsung.
              </p>
            </div>
          </div>
        </div>
      )}

      {krsConcurrencyState === 'timeout' && (
        <div className="w-full bg-warning-tint border border-warning rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-warning text-[24px]">cloud_sync</span>
            <div>
              <p className="text-[14px] font-bold text-ink">Koneksi Timeout: Pilihan Tersimpan di Cache Browser</p>
              <p className="text-[12px] text-ink-muted">
                Server sedang mengalami antrean tinggi. Mata kuliah pilihan kamu aman tersimpan di perangkat dan akan dikirim otomatis saat lalu lintas lancar.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSimpanKRS}
            className="px-4 py-2 rounded-lg bg-primary text-white text-[12px] font-bold hover:bg-primary-hover shrink-0"
          >
            Kirim Ulang Sekarang
          </button>
        </div>
      )}

      {krsConcurrencyState === 'success' && (
        <div className="w-full bg-success-tint border border-success rounded-xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-success text-[24px]">verified</span>
            <div>
              <p className="text-[14px] font-bold text-ink">KRS Berhasil Disimpan (09.42 WIB)</p>
              <p className="text-[12px] text-ink-muted">
                23 SKS telah disetujui dosen pembimbing akademik Dr. Hendra Gunawan, M.T.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setKrsConcurrencyState('ready')}
            className="text-[12px] text-success hover:underline font-bold"
          >
            Tutup
          </button>
        </div>
      )}

      {/* 2. Header Summary (Compact Two-Column Key-Value Card) */}
      <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm card-interactive">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-ink-muted">Nama Mahasiswa</span>
            <span className="font-bold text-ink">{student.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-ink-muted">NIM</span>
            <span className="font-mono font-bold text-ink">{student.nim}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-ink-muted">Program Studi / Angkatan</span>
            <span className="font-medium text-ink">{student.prodi} ({student.angkatan})</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-ink-muted">Dosen Wali (PA)</span>
            <span className="font-medium text-ink">{student.dosenPA}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-ink-muted">IP Semester Sebelumnya</span>
            <span className="font-mono font-bold text-ink">{student.ipSemesterSebelumnyaFormatted}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/60">
            <span className="text-ink-muted">Semester Mahasiswa</span>
            <span className="font-semibold text-ink">Semester 5 (20261)</span>
          </div>
        </div>
      </div>

      {/* 3. Info Banner (Calm blue/info tint, not danger) */}
      <div className="w-full bg-info-tint border border-info rounded-xl p-4 flex items-start sm:items-center gap-3">
        <span className="material-symbols-outlined text-info text-[22px] shrink-0">info</span>
        <p className="text-[13px] text-ink leading-relaxed">
          <strong className="text-info font-semibold">Periode pengisian KRS telah ditutup.</strong> Kamu masih dapat melihat dan mencetak dokumen KRS semester ini. Periode perbaikan nilai / KRS berikutnya: <strong>16 Februari 2027</strong>.
        </p>
      </div>

      {/* 4. SKS Summary Row (3 Tiles + Progress Bar + Status Badge) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <p className="text-[12px] text-ink-muted font-medium">SKS Diambil</p>
          <p className="text-[28px] font-bold text-primary font-mono mt-1">{student.sksSemesterIni}</p>
          <p className="text-[11px] text-ink-muted">dari 8 mata kuliah</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <p className="text-[12px] text-ink-muted font-medium">Jatah Maksimal SKS</p>
          <p className="text-[28px] font-bold text-ink font-mono mt-1">{student.sksJatah}</p>
          <p className="text-[11px] text-ink-muted">Berdasarkan IP sebelumnya 3,74</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <p className="text-[12px] text-ink-muted font-medium">Sisa Jatah SKS</p>
          <p className="text-[28px] font-bold text-ink font-mono mt-1">{student.sksSisa}</p>
          <p className="text-[11px] text-ink-muted">Tersisa untuk semester depan</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <p className="text-[12px] text-ink-muted font-medium">Status Pengesahan IRS</p>
          <div className="my-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-tint text-success font-bold text-[12px]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Disetujui Dosen Wali</span>
            </span>
          </div>
          <p className="text-[11px] text-ink-muted">Validasi BAAK Kampus 1</p>
        </div>
      </div>

      {/* 5. View Mode Toggle (Tabel vs Jadwal Mingguan) & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Toggle Pills */}
        <div className="flex items-center bg-card border border-border rounded-lg p-1 w-fit shadow-sm">
          <button
            type="button"
            onClick={() => setKrsViewMode('table')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
              krsViewMode === 'table'
                ? 'bg-primary text-white shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">table_chart</span>
            <span>Tampilan Tabel</span>
          </button>
          <button
            type="button"
            onClick={() => setKrsViewMode('weekly')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
              krsViewMode === 'weekly'
                ? 'bg-primary text-white shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">calendar_view_week</span>
            <span>Jadwal Mingguan</span>
          </button>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-ink-muted">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mata kuliah atau dosen..."
            className="w-full h-10 pl-9 pr-3 bg-card border border-border rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* 6. Content Views */}
      {krsViewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden card-interactive">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead className="bg-bg text-ink-muted text-[12px] font-bold uppercase tracking-wider border-b border-border sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-center w-12">No</th>
                  <th className="py-3 px-4">Mata Kuliah & Kode</th>
                  <th className="py-3 px-3 text-center">Kelas</th>
                  <th className="py-3 px-3 text-center">SKS</th>
                  <th className="py-3 px-4">Hari & Jam</th>
                  <th className="py-3 px-4">Ruang</th>
                  <th className="py-3 px-4">Dosen Pengampu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredCourses.map((c, index) => (
                  <tr key={c.id} className="hover:bg-primary-tint/15 transition-colors">
                    <td className="py-3.5 px-4 text-center text-ink-muted font-mono">{index + 1}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-ink leading-tight">{c.name}</p>
                      <span className="font-mono text-[11px] text-ink-muted">{c.code}</span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-bg border border-border font-bold">
                        {c.class}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold font-mono text-primary">
                      {c.sks}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-ink">{c.day}</p>
                      <p className="text-[12px] text-ink-muted font-mono">{c.timeStart} – {c.timeEnd}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-1 rounded bg-bg text-ink font-mono text-[12px]">
                        {c.room}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-ink font-medium">{c.lecturer}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-bg border-t border-border font-semibold text-[13px]">
                <tr>
                  <td colSpan={3} className="py-3 px-4 text-right">Total SKS Diambil:</td>
                  <td className="py-3 px-3 text-center font-mono text-[15px] text-primary font-bold">23</td>
                  <td colSpan={3} className="py-3 px-4 text-ink-muted text-[12px]">
                    Memenuhi batas beban SKS (Maksimal 24 SKS)
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        /* WEEKLY SCHEDULE GRID (Senin to Jumat) */
        <div className="bg-card border border-border rounded-xl shadow-sm p-4 overflow-x-auto card-interactive">
          <div className="min-w-[800px] grid grid-cols-5 gap-3">
            {days.map((day) => {
              const dayCourses = courses.filter((c) => c.day === day);
              return (
                <div key={day} className="flex flex-col gap-2.5">
                  <div className="p-2.5 bg-bg rounded-lg text-center border border-border font-bold text-[14px] text-ink">
                    {day}
                  </div>

                  <div className="flex flex-col gap-2 min-h-[300px]">
                    {dayCourses.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center p-4 border border-dashed border-border rounded-lg text-center text-ink-muted text-[12px]">
                        Tidak ada kelas
                      </div>
                    ) : (
                      dayCourses.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 bg-card border border-border hover:border-primary rounded-lg shadow-sm flex flex-col gap-1.5 item-interactive cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono font-bold text-primary">{c.timeStart} - {c.timeEnd}</span>
                            <span className="px-1.5 py-0.2 rounded bg-bg font-mono">{c.room}</span>
                          </div>
                          <p className="font-bold text-[13px] text-ink leading-tight">{c.name}</p>
                          <p className="text-[11px] text-ink-muted truncate">{c.lecturer}</p>
                          <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[11px]">
                            <span className="font-medium text-ink-muted">Kelas {c.class}</span>
                            <span className="font-bold text-primary">{c.sks} SKS</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Print KRS Modal Simulation */}
      {showPrintModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPrintModal(false)}
        >
          <div
            className="bg-card w-full max-w-[560px] rounded-xl shadow-2xl border border-border p-6 flex flex-col gap-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">print</span>
                <h3 className="text-[18px] font-bold text-ink">Cetak Kartu Rencana Studi (KRS)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="p-1 rounded-full text-ink-muted hover:bg-bg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 bg-bg border border-border rounded-lg text-[13px] space-y-2">
              <p className="font-semibold text-ink">Format Cetak Dokumen Resmi BAAK UIN SGD:</p>
              <ul className="list-disc pl-5 text-ink-muted space-y-1">
                <li>Ukuran Kertas: A4 (Portrait)</li>
                <li>Dilengkapi QR Verifikasi Validasi Dosen Wali</li>
                <li>Tercantum NIM: 1247050001 (Aisyah Nurfadilah)</li>
                <li>Total SKS: 23 SKS (8 Mata Kuliah)</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-lg border border-border text-ink hover:bg-bg text-[14px]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPrintModal(false);
                  window.print();
                }}
                className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-[14px] flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Unduh / Cetak Dokumen PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

