import React from 'react';
import { useApp } from '../context/AppContext';

export const GenericAcademicPage = () => {
  const { currentPage, student, showToast, setReportDialogOpen, setReportContextData } = useApp();

  const handleReport = (title, value) => {
    setReportContextData({ title, value });
    setReportDialogOpen(true);
  };

  // Specific content by currentPage
  const getPageConfig = () => {
    switch (currentPage) {
      case 'khs':
        return {
          title: 'Kartu Hasil Studi (KHS)',
          subtitle: 'Evaluasi hasil studi semester 4 (2025/2026 Genap)',
          badge: 'Semester 20252 • IP Semester 3,74',
          content: (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 card-interactive">
                  <span className="text-[12px] text-ink-muted">Indeks Prestasi Semester (IPS)</span>
                  <p className="text-[26px] font-bold text-primary font-mono mt-1">3,74</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 card-interactive">
                  <span className="text-[12px] text-ink-muted">SKS Ditempuh Semester Ini</span>
                  <p className="text-[26px] font-bold text-ink font-mono mt-1">21 SKS</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 card-interactive">
                  <span className="text-[12px] text-ink-muted">Beban Maksimal Semester 5</span>
                  <p className="text-[26px] font-bold text-success font-mono mt-1">24 SKS</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm card-interactive">
                <table className="w-full text-[13px] text-left">
                  <thead className="bg-bg text-ink-muted font-bold text-[12px] border-b border-border">
                    <tr>
                      <th className="p-3.5">Mata Kuliah</th>
                      <th className="p-3.5 text-center">SKS</th>
                      <th className="p-3.5 text-center">Nilai Angka</th>
                      <th className="p-3.5 text-center">Nilai Huruf</th>
                      <th className="p-3.5 text-center">Bobot</th>
                      <th className="p-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      { name: 'Pemrograman Berorientasi Objek', sks: 3, num: 88, grade: 'A', weight: 4.0 },
                      { name: 'Sistem Operasi', sks: 3, num: 82, grade: 'A-', weight: 3.75 },
                      { name: 'Struktur Data & Algoritma II', sks: 3, num: 85, grade: 'A', weight: 4.0 },
                      { name: 'Arsitektur Komputer', sks: 3, num: 78, grade: 'B+', weight: 3.5 },
                      { name: 'Metode Numerik', sks: 3, num: 80, grade: 'A-', weight: 3.75 },
                      { name: 'Bahasa Inggris Akademik', sks: 2, num: 84, grade: 'A', weight: 4.0 },
                      { name: 'Kajian Keislaman & Moderasi Beragama', sks: 2, num: 90, grade: 'A', weight: 4.0 },
                      { name: 'Kewarganegaraan', sks: 2, num: 82, grade: 'A-', weight: 3.75 },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-primary-tint/15">
                        <td className="p-3.5 font-medium text-ink">{row.name}</td>
                        <td className="p-3.5 text-center font-mono">{row.sks}</td>
                        <td className="p-3.5 text-center font-mono">{row.num}</td>
                        <td className="p-3.5 text-center font-bold font-mono text-primary">{row.grade}</td>
                        <td className="p-3.5 text-center font-mono">{row.weight.toFixed(2)}</td>
                        <td className="p-3.5 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-success-tint text-success text-[11px] font-bold">
                            Lulus
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ),
        };

      case 'transkrip':
        return {
          title: 'Transkrip Nilai Akademik Kumulatif',
          subtitle: 'Rekapitulasi seluruh mata kuliah yang telah diselesaikan hingga semester 4',
          badge: `Total 84 SKS • IPK ${student.ipkFormatted}`,
          content: (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-info-tint border border-info rounded-xl text-[13px] flex items-center justify-between">
                <span>Transkrip akademik sementara untuk keperluan beasiswa dan magang MBKM</span>
                <button
                  type="button"
                  onClick={() => showToast('Transkrip resmi sementara berhasil diunduh', 'success')}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-[12px] font-bold"
                >
                  Cetak Transkrip Sementara
                </button>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3 card-interactive">
                <div className="flex justify-between border-b border-border pb-2 text-[13px]">
                  <span className="text-ink-muted">Total SKS Wajib Kelulusan:</span>
                  <span className="font-bold text-ink">144 SKS</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2 text-[13px]">
                  <span className="text-ink-muted">SKS Lulus Diakui:</span>
                  <span className="font-bold text-success">84 SKS (58.3%)</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2 text-[13px]">
                  <span className="text-ink-muted">Sisa SKS Menuju Skripsi:</span>
                  <span className="font-bold text-primary">60 SKS</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-ink-muted">Indeks Prestasi Kumulatif (IPK):</span>
                  <span className="font-bold text-[18px] text-primary font-mono">{student.ipkFormatted}</span>
                </div>
              </div>
            </div>
          ),
        };

      case 'bimbingan':
        return {
          title: 'Bimbingan Skripsi / Tesis / Disertasi',
          subtitle: 'Portal konsultasi tugas akhir dan pengesahan logbook pembimbingan',
          badge: 'Fakultas Sains dan Teknologi',
          content: (
            <div className="flex flex-col gap-4">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-3 card-interactive">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-tint text-primary text-[12px] font-bold">
                    Tahap: Pengajuan Judul & Proposal
                  </span>
                  <span className="text-[12px] text-ink-muted">Dosen PA: {student.dosenPA}</span>
                </div>
                <h3 className="text-[16px] font-bold text-ink">
                  Rancang Bangun Sistem Informasi Pemantauan Akademik Berbasis Human-Centered Design
                </h3>
                <p className="text-[13px] text-ink-muted">
                  Status: Siap Seminar Proposal (Sempro). Persyaratan 80 SKS terpenuhi (84 SKS).
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 shadow-sm card-interactive">
                <h4 className="font-bold text-[14px] text-ink mb-3">Histori Logbook Konsultasi</h4>
                <div className="space-y-2 text-[13px]">
                  <div className="p-3 bg-bg rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-ink">Konsultasi Bab 1 & Latar Belakang Masalah</p>
                      <span className="text-[11px] text-ink-muted">10 Oktober 2026 • Catatan: Tambahkan data UEQ responden</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-success-tint text-success text-[11px] font-bold">ACC Bab 1</span>
                  </div>
                </div>
              </div>
            </div>
          ),
        };

      case 'cetak-ktm':
        return {
          title: 'Cetak KTM (Kartu Tanda Mahasiswa Digital)',
          subtitle: 'Identitas resmi mahasiswa aktif UIN Sunan Gunung Djati Bandung',
          badge: 'Digital Identity Card',
          content: (
            <div className="flex flex-col items-center gap-6 py-4">
              {/* Digital KTM Card Visual */}
              <div className="w-full max-w-[420px] bg-gradient-to-br from-[#263235] via-[#2F6016] to-[#3F7A1F] text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/salam-logo-icon-transparent.png"
                      alt="SALAM"
                      className="h-8 w-auto brightness-0 invert"
                    />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider leading-none">UIN Sunan Gunung Djati</p>
                      <p className="text-[9px] text-white/80">KARTU TANDA MAHASISWA</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-mono">AKTIF 2026/2027</span>
                </div>

                <div className="flex items-center gap-4 my-4">
                  <div className="w-16 h-20 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center font-bold text-[20px]">
                    AN
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold leading-tight">{student.name}</h3>
                    <p className="text-[13px] font-mono text-leaf mt-0.5">NIM {student.nim}</p>
                    <p className="text-[11px] text-white/80 mt-1">{student.prodi}</p>
                    <p className="text-[10px] text-white/60">{student.fakultas}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[10px] text-white/70 font-mono">
                  <span>BARCODE: 80011247050001</span>
                  <span>KAMPUS 1 BANDUNG</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('KTM Digital berhasil diunduh dalam format PDF resmi', 'success')}
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-[14px] flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Unduh File Kartu Mahasiswa (KTM)</span>
              </button>
            </div>
          ),
        };

      case 'akun':
        return {
          title: 'Pengaturan Profil & Keamanan Akun',
          subtitle: 'Pengelolaan data diri, kata sandi, dan riwayat perangkat masuk',
          badge: 'NIM 1247050001',
          content: (
            <div className="flex flex-col gap-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-[16px] font-bold text-ink">Informasi Akun Mahasiswa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <label className="block text-ink-muted text-[12px] mb-1">Nama Lengkap</label>
                    <div className="p-2.5 bg-bg rounded-lg font-bold text-ink">{student.name}</div>
                  </div>
                  <div>
                    <label className="block text-ink-muted text-[12px] mb-1">Nomor Induk Mahasiswa</label>
                    <div className="p-2.5 bg-bg rounded-lg font-mono text-ink">{student.nim}</div>
                  </div>
                  <div>
                    <label className="block text-ink-muted text-[12px] mb-1">Email Institusi Resmi</label>
                    <div className="p-2.5 bg-bg rounded-lg text-ink">{student.email}</div>
                  </div>
                  <div>
                    <label className="block text-ink-muted text-[12px] mb-1">Dosen Pembimbing Akademik</label>
                    <div className="p-2.5 bg-bg rounded-lg text-ink">{student.dosenPA}</div>
                  </div>
                </div>
              </div>

              {/* Sesi Perangkat & Keamanan */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-3">
                <h3 className="text-[16px] font-bold text-ink">Riwayat Sesi Masuk (Keamanan)</h3>
                <div className="space-y-2 text-[13px]">
                  <div className="p-3 bg-bg border border-border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-ink">Chrome di Windows 11 (Perangkat Ini)</p>
                      <p className="text-[11px] text-ink-muted">IP 180.252.164.21 • Bandung • Aktif sekarang</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-success-tint text-success text-[11px] font-bold">
                      Sesi Aktif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ),
        };

      default:
        return {
          title: 'Layanan Akademik Mahasiswa',
          subtitle: 'Sistem Administrasi Layanan Akademik UIN Sunan Gunung Djati Bandung',
          badge: 'Aktif',
          content: (
            <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[40px] text-primary mb-2">school</span>
              <h3 className="text-[18px] font-bold text-ink">Layanan Akademik Terintegrasi</h3>
              <p className="text-[13px] text-ink-muted max-w-md mt-1">
                Layanan ini telah terhubung ke pangkalan data BAAK UIN Sunan Gunung Djati Bandung.
              </p>
            </div>
          ),
        };
    }
  };

  const config = getPageConfig();

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-ink tracking-tight">
            {config.title}
          </h1>
          <p className="text-[13px] text-ink-muted mt-0.5">{config.subtitle}</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-ink-muted text-[12px] font-semibold w-fit">
          <span className="w-2 h-2 rounded-full bg-leaf"></span>
          <span>{config.badge}</span>
        </div>
      </div>

      {/* Content */}
      {config.content}
    </div>
  );
};

