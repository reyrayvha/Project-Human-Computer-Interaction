import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const RiwayatAbsensiDetail = () => {
  const { setCurrentPage, showToast } = useApp();

  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'hadir' | 'tidak_hadir'
  const [selectedMeeting, setSelectedMeeting] = useState('3');
  const [alasanKoreksi, setAlasanKoreksi] = useState('Hadir di kelas (QR gagal scan)');
  const [catatan, setCatatan] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  // Detailed 6 past meetings for Jaringan Komputer as shown in mockup
  const meetingsData = [
    {
      session: 1,
      date: 'Kamis, 07 Sep 2026',
      time: '07.00 – 09.30 WIB',
      topic: 'Pengantar Jaringan Komputer & Topologi Jaringan',
      room: 'Tatap Muka • Ruang R.4.10',
      status: 'Hadir',
      verified: true,
    },
    {
      session: 2,
      date: 'Kamis, 14 Sep 2026',
      time: '07.00 – 09.30 WIB',
      topic: 'Model Referensi OSI Layer & TCP/IP Protocol Suite',
      room: 'Tatap Muka • Ruang R.4.10',
      status: 'Hadir',
      verified: true,
    },
    {
      session: 3,
      date: 'Kamis, 21 Sep 2026',
      time: '07.00 – 09.30 WIB',
      topic: 'Physical Layer & Media Transmisi (Kabel & Nirkabel)',
      room: 'Tatap Muka • Ruang R.4.10',
      status: 'Tidak hadir',
      verified: false,
    },
    {
      session: 4,
      date: 'Kamis, 28 Sep 2026',
      time: '07.00 – 09.30 WIB',
      topic: 'Data Link Layer, MAC Addressing & Framing',
      room: 'Tatap Muka • Ruang R.4.10',
      status: 'Hadir',
      verified: true,
    },
    {
      session: 5,
      date: 'Kamis, 05 Okt 2026',
      time: '07.00 – 09.30 WIB',
      topic: 'Network Layer, IP Addressing (IPv4 Subnetting CIDR)',
      room: 'Tatap Muka • Ruang R.4.10',
      status: 'Tidak hadir',
      verified: false,
    },
    {
      session: 6,
      date: 'Kamis, 12 Okt 2026',
      time: '07.00 – 09.30 WIB',
      topic: 'Routing Konsep, Static Routing & Router Configuration',
      room: 'Tatap Muka • Ruang R.4.10',
      status: 'Tidak hadir',
      verified: false,
    },
  ];

  const filteredMeetings = meetingsData.filter((m) => {
    if (filterStatus === 'hadir') return m.status === 'Hadir';
    if (filterStatus === 'tidak_hadir') return m.status === 'Tidak hadir';
    return true;
  });

  const countHadir = meetingsData.filter((m) => m.status === 'Hadir').length;
  const countTidakHadir = meetingsData.filter((m) => m.status === 'Tidak hadir').length;

  const handleAjukanClick = (sessionNum) => {
    setSelectedMeeting(String(sessionNum));
    const formElement = document.getElementById('koreksi-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmitKoreksi = (e) => {
    e.preventDefault();
    const newSubmission = {
      id: Date.now(),
      session: selectedMeeting,
      reason: alasanKoreksi,
      notes: catatan,
      fileName: uploadedFile ? uploadedFile.name : null,
      submittedAt: 'Baru saja',
      status: 'Menunggu Verifikasi',
    };
    setSubmissions([newSubmission, ...submissions]);
    setCatatan('');
    setUploadedFile(null);
    showToast(`Pengajuan koreksi Pertemuan ${selectedMeeting} berhasil dikirim ke Dosen Pengampu`, 'success');
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
      {/* 1. Top Bar: Back Button & Semester Pill */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentPage('absensi')}
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Kembali ke Absensi</span>
        </button>

        <div className="px-3 py-1 rounded-full border border-border bg-card text-[12px] text-ink font-medium flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-leaf"></span>
          <span>Semester 20261 (Ganjil)</span>
        </div>
      </div>

      {/* 2. Course Attendance Header Card */}
      <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm flex flex-col gap-5 card-interactive animate-card-enter card-stagger-1">
        {/* Top Split: Left info, Right percentage box */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Course Information */}
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-tint text-primary text-[11px] font-bold">
                MATA KULIAH WAJIB
              </span>
              <span className="text-[12px] text-ink-muted font-mono">
                Kode MK: IF21203
              </span>
            </div>

            <h1 className="text-[22px] sm:text-[24px] font-bold text-ink tracking-tight">
              Jaringan Komputer
            </h1>

            <p className="text-[13px] text-ink-muted mt-1 leading-normal">
              Kelas B • Ruang R.4.10 • Kamis, 07.00 – 09.30 WIB • Dosen Pengampu:{' '}
              <strong className="text-ink font-semibold">Cecep Nurul Alam M.T.</strong>
            </p>

            {/* Attendance Counters Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-4 border-t border-border">
              {/* Hadir */}
              <div>
                <span className="text-[11px] font-medium text-ink-muted block">Hadir</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-success text-[18px]">
                    check_circle
                  </span>
                  <span className="text-[14px] font-bold text-ink font-mono">
                    3 pertemuan
                  </span>
                </div>
              </div>

              {/* Tidak Hadir */}
              <div>
                <span className="text-[11px] font-medium text-ink-muted block">Tidak Hadir</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-danger text-[18px]">
                    cancel
                  </span>
                  <span className="text-[14px] font-bold text-ink font-mono">
                    3 pertemuan
                  </span>
                </div>
              </div>

              {/* Belum Terlaksana */}
              <div>
                <span className="text-[11px] font-medium text-ink-muted block">Belum Terlaksana</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-ink-muted text-[18px]">
                    schedule
                  </span>
                  <span className="text-[14px] font-bold text-ink font-mono">
                    10 pertemuan
                  </span>
                </div>
              </div>

              {/* Total Sesi Berjalan */}
              <div>
                <span className="text-[11px] font-medium text-ink-muted block">Total Sesi Berjalan</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-ink text-[18px]">
                    calendar_month
                  </span>
                  <span className="text-[14px] font-bold text-ink font-mono">
                    6 / 16 sesi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Percentage Box */}
          <div className="w-full lg:w-[310px] bg-bg/70 border border-border rounded-xl p-4 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-ink-muted tracking-wider uppercase">
                PERSENTASE KEHADIRAN
              </span>
              <span className="text-[12px] font-bold text-danger">
                • Berisiko
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 my-2">
              <span className="text-[32px] font-bold text-danger font-mono tracking-tight leading-none">
                50.0%
              </span>
              <span className="text-[13px] text-ink-muted font-medium">/ min. 85%</span>
            </div>

            <div className="w-full bg-border/80 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-danger h-full rounded-full" style={{ width: '50%' }}></div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-ink-muted">Realisasi 3 dari 6 pertemuan</span>
              <span className="text-danger font-bold">Kurang 35% ke batas UAS</span>
            </div>
          </div>
        </div>

        {/* Clean Notification Strip */}
        <div className="px-4 py-3 rounded-xl bg-danger-tint/20 border border-danger/30 flex items-center justify-between text-[12px] text-ink">
          <div>
            <span className="font-bold text-danger">Batas kehadiran minimal 85% untuk UAS.</span>
            <span className="text-ink-muted ml-1.5">Tercatat 3 kali tidak hadir pada semester berjalan.</span>
          </div>
          <button
            type="button"
            onClick={() => handleAjukanClick(3)}
            className="text-primary font-semibold text-[12px] hover:underline cursor-pointer shrink-0 ml-3"
          >
            Ajukan Koreksi
          </button>
        </div>
      </div>

      {/* 3. Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Daftar Pertemuan Kuliah (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden card-interactive animate-card-enter card-stagger-2">
            {/* Header with Title & Filter Buttons */}
            <div className="p-4 sm:px-6 sm:py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card">
              <div>
                <h3 className="font-bold text-[16px] text-ink">
                  Daftar Pertemuan
                </h3>
              </div>

              {/* Segmented Filter Pills */}
              <div className="flex items-center gap-1 p-1 bg-bg border border-border rounded-lg text-[12px]">
                <button
                  type="button"
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                    filterStatus === 'all'
                      ? 'bg-card text-ink shadow-xs font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Semua ({meetingsData.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('hadir')}
                  className={`px-3 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                    filterStatus === 'hadir'
                      ? 'bg-card text-success shadow-xs font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Hadir ({countHadir})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('tidak_hadir')}
                  className={`px-3 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                    filterStatus === 'tidak_hadir'
                      ? 'bg-card text-danger shadow-xs font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Tidak hadir ({countTidakHadir})
                </button>
              </div>
            </div>

            {/* Meetings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] text-left border-collapse">
                <thead className="bg-bg/60 text-ink-muted text-[11px] font-bold uppercase tracking-wider border-b border-border">
                  <tr>
                    <th className="py-3 px-4 w-28">SESI</th>
                    <th className="py-3 px-4 w-40">WAKTU &amp; TANGGAL</th>
                    <th className="py-3 px-4">MATERI / POKOK BAHASAN</th>
                    <th className="py-3 px-4 text-center w-28">STATUS</th>
                    <th className="py-3 px-4 text-right w-36">AKSI / VERIFIKASI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredMeetings.map((m) => {
                    const isHadir = m.status === 'Hadir';

                    return (
                      <tr
                        key={m.session}
                        className="hover:bg-primary-tint/10 transition-colors"
                      >
                        {/* Col 1: Sesi */}
                        <td className="py-4 px-4 font-bold text-ink whitespace-nowrap">
                          Pertemuan {m.session}
                        </td>

                        {/* Col 2: Waktu & Tanggal */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <p className="font-semibold text-ink leading-tight text-[13px]">
                            {m.date}
                          </p>
                          <p className="text-[11px] text-ink-muted font-mono mt-0.5">
                            {m.time}
                          </p>
                        </td>

                        {/* Col 3: Materi */}
                        <td className="py-4 px-4">
                          <p className="font-medium text-ink leading-snug">
                            {m.topic}
                          </p>
                          <p className="text-[11px] text-ink-muted mt-1 leading-none">
                            {m.room}
                          </p>
                        </td>

                        {/* Col 4: Status */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          {isHadir ? (
                            <span className="text-[12px] font-semibold text-success">
                              Hadir
                            </span>
                          ) : (
                            <span className="text-[12px] font-semibold text-danger">
                              Tidak hadir
                            </span>
                          )}
                        </td>

                        {/* Col 5: Aksi / Verifikasi */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          {isHadir ? (
                            <span className="text-[12px] font-medium text-ink-muted">
                              Terverifikasi
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleAjukanClick(m.session)}
                              className="text-[12px] font-semibold text-primary hover:underline cursor-pointer"
                            >
                              Ajukan koreksi
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer Tip */}
            <div className="p-3.5 bg-bg/40 border-t border-border flex items-center gap-2.5 text-[12px] text-ink-muted">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                info
              </span>
              <p>
                Data kehadiran sinkron otomatis dengan sistem presensi dosen. Jika terdapat
                ketidaksesuaian absensi fisik di kelas, segera ajukan koreksi maksimal 7 hari
                kalender setelah pertemuan.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Ajukan Koreksi Form & Status Card (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Card 1: Form Ajukan Koreksi Kehadiran */}
          <div
            id="koreksi-form-card"
            className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm flex flex-col gap-4 card-interactive animate-card-enter card-stagger-3 scroll-mt-20"
          >
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">
                assignment_turned_in
              </span>
              <div>
                <h3 className="font-bold text-[15px] text-ink">
                  Ajukan Koreksi Kehadiran
                </h3>
                <p className="text-[12px] text-ink-muted leading-snug mt-0.5">
                  Ajukan klaim kehadiran apabila Anda hadir di kelas namun tercatat tidak hadir.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitKoreksi} className="space-y-3.5">
              {/* Field: Mata Kuliah (Readonly) */}
              <div>
                <label className="block text-[12px] font-semibold text-ink mb-1">
                  Mata Kuliah
                </label>
                <input
                  type="text"
                  readOnly
                  value="Jaringan Komputer (Kelas B)"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-[13px] text-ink font-medium select-none cursor-default"
                />
              </div>

              {/* Field: Pilih Pertemuan */}
              <div>
                <label className="block text-[12px] font-semibold text-ink mb-1">
                  Pilih Pertemuan
                </label>
                <select
                  value={selectedMeeting}
                  onChange={(e) => setSelectedMeeting(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-[13px] text-ink focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="3">Pertemuan 3 (21 Sep 2026 - Tidak hadir)</option>
                  <option value="5">Pertemuan 5 (05 Okt 2026 - Tidak hadir)</option>
                  <option value="6">Pertemuan 6 (12 Okt 2026 - Tidak hadir)</option>
                </select>
              </div>

              {/* Field: Alasan Koreksi */}
              <div>
                <label className="block text-[12px] font-semibold text-ink mb-1">
                  Alasan Koreksi
                </label>
                <select
                  value={alasanKoreksi}
                  onChange={(e) => setAlasanKoreksi(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-[13px] text-ink focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="Hadir di kelas (QR gagal scan)">
                    Hadir di kelas (QR gagal scan)
                  </option>
                  <option value="Sakit dengan Surat Keterangan Dokter">
                    Sakit (Dengan Surat Keterangan Dokter)
                  </option>
                  <option value="Izin Resmi / Tugas Delegasi Kampus">
                    Izin Resmi / Tugas Delegasi Kampus
                  </option>
                  <option value="Kendala Teknis Aplikasi / Server SALAM">
                    Kendala Teknis Aplikasi / Server SALAM
                  </option>
                </select>
              </div>

              {/* Field: Catatan Tambahan (Opsional) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[12px] font-semibold text-ink">
                    Catatan Tambahan
                  </label>
                  <span className="text-[11px] text-ink-muted">Opsional</span>
                </div>
                <textarea
                  rows="3"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Tuliskan keterangan detail atau bukti kehadiran di kelas..."
                  className="w-full bg-card border border-border rounded-lg p-2.5 text-[13px] text-ink focus:outline-none focus:border-primary resize-none placeholder:text-ink-muted/60"
                ></textarea>
              </div>

              {/* Field: Bukti Pendukung (Opsional) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[12px] font-semibold text-ink">
                    Bukti Pendukung
                  </label>
                  <span className="text-[11px] text-ink-muted">Opsional</span>
                </div>

                <label className="border-2 border-dashed border-border rounded-lg p-4 text-center flex flex-col items-center justify-center hover:bg-bg/60 transition-colors cursor-pointer block">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFile(e.target.files[0]);
                        showToast(`File "${e.target.files[0].name}" berhasil dilampirkan`, 'info');
                      }
                    }}
                  />
                  <span className="material-symbols-outlined text-ink-muted text-[24px] mb-1">
                    upload_file
                  </span>
                  <span className="text-[12px] font-bold text-ink">
                    {uploadedFile ? uploadedFile.name : 'Pilih berkas atau seret ke sini'}
                  </span>
                  <span className="text-[11px] text-ink-muted mt-0.5">
                    {uploadedFile
                      ? `${(uploadedFile.size / 1024).toFixed(1)} KB`
                      : 'PDF, JPG, atau PNG (maks. 2MB)'}
                  </span>
                </label>
              </div>

              {/* Dosen Verification Note */}
              <div className="p-3 bg-bg rounded-lg border border-border/80 flex items-center gap-2.5 text-[11px] text-ink-muted">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                  verified_user
                </span>
                <p>
                  Dosen pengampu (<strong className="text-ink">Cecep Nurul Alam M.T.</strong>) akan
                  memeriksa dan memverifikasi pengajuanmu.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Kirim Pengajuan Koreksi</span>
              </button>
            </form>
          </div>

          {/* Card 2: Status Pengajuan Sebelumnya */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3.5 card-interactive animate-card-enter card-stagger-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                STATUS PENGAJUAN SEBELUMNYA
              </span>
              <span className="w-2 h-2 rounded-full bg-border"></span>
            </div>

            {submissions.length === 0 ? (
              /* Empty State */
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center text-ink-muted mb-2.5">
                  <span className="material-symbols-outlined text-[24px]">inbox</span>
                </div>
                <h4 className="text-[13px] font-bold text-ink">
                  Belum Ada Riwayat Pengajuan
                </h4>
                <p className="text-[12px] text-ink-muted max-w-[220px] mt-1 leading-relaxed">
                  Belum ada riwayat pengajuan koreksi untuk mata kuliah ini di semester berjalan.
                </p>
              </div>
            ) : (
              /* Submitted Tickets List */
              <div className="space-y-2.5">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 bg-bg rounded-lg border border-border flex flex-col gap-1.5 animate-card-rise"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[13px] text-ink">
                        Pertemuan {sub.session}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning-tint text-warning font-semibold text-[11px]">
                        <span className="material-symbols-outlined text-[13px]">pending</span>
                        <span>{sub.status}</span>
                      </span>
                    </div>
                    <p className="text-[12px] text-ink-muted">
                      Alasan: <strong className="text-ink">{sub.reason}</strong>
                    </p>
                    {sub.notes && (
                      <p className="text-[11px] text-ink-muted italic">"{sub.notes}"</p>
                    )}
                    <span className="text-[10px] text-ink-muted mt-0.5">
                      Diajukan {sub.submittedAt} • Dosen: Agus Prasetyo, M.T.
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
