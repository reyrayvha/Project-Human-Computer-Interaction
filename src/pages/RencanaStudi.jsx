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
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else {
        setSortKey(null);
        setSortDir('asc');
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // Filter courses by search
  const filteredCourses = courses.filter((c) =>
    `${c.name} ${c.lecturer} ${c.code} ${c.room} ${c.fullTitle || ''}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayCourses = [...filteredCourses].sort((a, b) => {
    if (!sortKey) return 0;
    let aVal = a[sortKey];
    let bVal = b[sortKey];
    if (sortKey === 'no') {
      aVal = courses.indexOf(a);
      bVal = courses.indexOf(b);
    }
    if (typeof aVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const SortIcon = () => (
    <svg className="w-3.5 h-3.5 text-ink-muted/50 shrink-0 inline-block" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4l-4 5h8l-4-5zm0 16l4-5H8l4 5z" />
    </svg>
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
          <h1 className="text-[22px] sm:text-[24px] font-bold text-ink tracking-tight">
            Rencana Studi (KRS)
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
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
              <p className="text-[14px] font-bold text-ink">Menyimpan Rencana Studi ke Server...</p>
              <p className="text-[12px] text-ink-muted">
                Jangan menutup halaman saat transaksi berlangsung.
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
              <p className="text-[14px] font-bold text-ink">Koneksi Timeout: Pilihan Tersimpan di Cache</p>
              <p className="text-[12px] text-ink-muted">
                Mata kuliah tersimpan di browser dan akan disinkronkan otomatis saat server normal.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSimpanKRS}
            className="px-4 py-2 rounded-lg bg-primary text-white text-[12px] font-bold hover:bg-primary-hover shrink-0 cursor-pointer"
          >
            Kirim Ulang
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
        /* TABLE VIEW MATCHING SALAM PORTAL DESIGN */
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden card-interactive">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead className="bg-bg text-ink text-[12px] font-bold border-b border-border sticky top-0">
                <tr className="border-b border-border/70">
                  <th
                    rowSpan={2}
                    onClick={() => handleSort('no')}
                    className="py-2.5 px-3 text-center w-12 cursor-pointer hover:bg-black/5 transition-colors select-none"
                    title="Urutkan berdasarkan nomor"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>No</span>
                      <SortIcon />
                    </div>
                  </th>
                  <th
                    rowSpan={2}
                    onClick={() => handleSort('name')}
                    className="py-2.5 px-4 text-left cursor-pointer hover:bg-black/5 transition-colors select-none min-w-[320px]"
                    title="Urutkan berdasarkan mata kuliah"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>Matakuliah</span>
                      <SortIcon />
                    </div>
                  </th>
                  <th
                    rowSpan={2}
                    onClick={() => handleSort('class')}
                    className="py-2.5 px-3 text-center w-16 cursor-pointer hover:bg-black/5 transition-colors select-none"
                    title="Urutkan berdasarkan kelas"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Kelas</span>
                      <SortIcon />
                    </div>
                  </th>
                  <th
                    rowSpan={2}
                    onClick={() => handleSort('sks')}
                    className="py-2.5 px-3 text-center w-16 cursor-pointer hover:bg-black/5 transition-colors select-none"
                    title="Urutkan berdasarkan SKS"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>SKS</span>
                      <SortIcon />
                    </div>
                  </th>
                  <th colSpan={4} className="py-2 px-3 text-center font-bold border-b border-border text-ink">
                    Jadwal
                  </th>
                  <th rowSpan={2} className="py-2.5 px-3 text-center w-10 text-ink">
                    #
                  </th>
                </tr>
                <tr className="border-b border-border">
                  <th
                    onClick={() => handleSort('room')}
                    className="py-2 px-3 text-left cursor-pointer hover:bg-black/5 transition-colors select-none min-w-[100px]"
                    title="Urutkan berdasarkan ruang"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>Ruang</span>
                      <SortIcon />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('day')}
                    className="py-2 px-3 text-left cursor-pointer hover:bg-black/5 transition-colors select-none min-w-[90px]"
                    title="Urutkan berdasarkan hari"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>Hari</span>
                      <SortIcon />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('time')}
                    className="py-2 px-3 text-left cursor-pointer hover:bg-black/5 transition-colors select-none min-w-[160px]"
                    title="Urutkan berdasarkan waktu"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>Waktu</span>
                      <SortIcon />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('lecturer')}
                    className="py-2 px-4 text-left cursor-pointer hover:bg-black/5 transition-colors select-none min-w-[260px]"
                    title="Urutkan berdasarkan dosen"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>Dosen</span>
                      <SortIcon />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-[13px]">
                {displayCourses.map((c, index) => (
                  <tr key={c.id} className="hover:bg-primary-tint/10 transition-colors">
                    <td className="py-3 px-3 text-center text-ink font-normal">{index + 1}</td>
                    <td className="py-3 px-4 text-ink font-normal leading-snug">
                      {c.fullTitle || `${c.code} - ${c.name} - ${c.semesterLabel || 'SMT 5'}`}
                    </td>
                    <td className="py-3 px-3 text-center text-ink font-normal">
                      {c.class}
                    </td>
                    <td className="py-3 px-3 text-center text-ink font-normal">
                      {c.sks}
                    </td>
                    <td className="py-3 px-3 text-ink font-normal">
                      {c.room}
                    </td>
                    <td className="py-3 px-3 text-ink font-normal">
                      {c.day}
                    </td>
                    <td className="py-3 px-3 text-ink font-normal whitespace-nowrap text-[12px]">
                      {c.time}
                    </td>
                    <td className="py-3 px-4 text-ink font-normal">
                      - {c.lecturer}
                    </td>
                    <td className="py-3 px-3 text-center text-ink-muted"></td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-border">
                <tr className="bg-bg/40">
                  <td colSpan={3} className="py-3 px-3 text-right">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-md bg-primary-tint text-primary font-bold text-[13px] border border-primary/20">
                      Jumlah SKS Diambil
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[36px] px-2.5 py-1 rounded-md bg-primary text-white font-bold font-mono text-[14px]">
                      {student.sksSemesterIni}
                    </span>
                  </td>
                  <td colSpan={5}></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Keterangan Jatah SKS & Status IRS */}
          <div className="p-4 bg-card border-t border-border flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">Jatah SKS:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-primary-tint text-primary font-bold font-mono text-[13px] border border-primary/20">
                {student.sksJatah} SKS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">Sisa Kuota:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-card border border-border text-ink font-bold font-mono text-[13px]">
                {student.sksSisa} SKS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">Status IRS:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-tint text-success font-bold text-[12px] border border-success/30">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>{student.statusIrs || 'Sudah Disetujui Dosen Wali'}</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* WEEKLY SCHEDULE GRID (Senin to Jumat) */
        <div className="flex flex-col gap-4">
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
                            <p className="text-[11px] text-ink-muted truncate">- {c.lecturer}</p>
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

          {/* SKS & IRS Status Bar in Weekly View */}
          <div className="p-4 bg-card border border-border rounded-xl shadow-sm flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">Jumlah SKS Diambil:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-primary text-white font-bold font-mono text-[13px]">
                {student.sksSemesterIni} SKS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">Jatah SKS:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-primary-tint text-primary font-bold font-mono text-[13px] border border-primary/20">
                {student.sksJatah} SKS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">Sisa Kuota:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-card border border-border text-ink font-bold font-mono text-[13px]">
                {student.sksSisa} SKS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">Status IRS:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-tint text-success font-bold text-[12px] border border-success/30">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>{student.statusIrs || 'Sudah Disetujui Dosen Wali'}</span>
              </span>
            </div>
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

