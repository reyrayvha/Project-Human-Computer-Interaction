import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { academicTrendData } from '../data/mockData';

// Semester course datasets for KHS
const khsSemestersData = {
  '20252': {
    semesterCode: '20252',
    label: 'Semester 4 (2025/2026 Genap)',
    ips: '3,74',
    ipk: '3,51',
    sksDitempuh: 21,
    sksLulusTotal: 84,
    bebanMaks: '24 SKS',
    evaluasi: 'Sangat Memuaskan (Memenuhi Syarat Cum Laude)',
    courses: [
      { code: 'IF401', name: 'Pemrograman Berorientasi Objek', sks: 3, num: 88, grade: 'A', weight: 4.0 },
      { code: 'IF402', name: 'Sistem Operasi', sks: 3, num: 82, grade: 'A-', weight: 3.75 },
      { code: 'IF403', name: 'Struktur Data & Algoritma II', sks: 3, num: 85, grade: 'A', weight: 4.0 },
      { code: 'IF404', name: 'Arsitektur Komputer', sks: 3, num: 78, grade: 'B+', weight: 3.5 },
      { code: 'IF405', name: 'Metode Numerik', sks: 3, num: 80, grade: 'A-', weight: 3.75 },
      { code: 'UIN401', name: 'Bahasa Inggris Akademik', sks: 2, num: 84, grade: 'A', weight: 4.0 },
      { code: 'UIN402', name: 'Kajian Keislaman & Moderasi Beragama', sks: 2, num: 90, grade: 'A', weight: 4.0 },
      { code: 'UIN403', name: 'Kewarganegaraan', sks: 2, num: 82, grade: 'A-', weight: 3.75 },
    ],
  },
  '20251': {
    semesterCode: '20251',
    label: 'Semester 3 (2025/2026 Ganjil)',
    ips: '3,85',
    ipk: '3,44',
    sksDitempuh: 21,
    sksLulusTotal: 63,
    bebanMaks: '24 SKS',
    evaluasi: 'Pujian (Cum Laude)',
    courses: [
      { code: 'IF301', name: 'Algoritma & Pemrograman Lanjut', sks: 3, num: 92, grade: 'A', weight: 4.0 },
      { code: 'IF302', name: 'Sistem Basis Data', sks: 3, num: 89, grade: 'A', weight: 4.0 },
      { code: 'IF303', name: 'Matematika Diskrit', sks: 3, num: 87, grade: 'A', weight: 4.0 },
      { code: 'IF304', name: 'Organisasi Sistem Komputer', sks: 3, num: 81, grade: 'A-', weight: 3.75 },
      { code: 'IF305', name: 'Statistika & Teori Probabilitas', sks: 3, num: 86, grade: 'A', weight: 4.0 },
      { code: 'UIN301', name: 'Bahasa Arab Akademik', sks: 2, num: 88, grade: 'A', weight: 4.0 },
      { code: 'UIN302', name: 'Islam & Integrasi Sains Teknologi', sks: 2, num: 91, grade: 'A', weight: 4.0 },
      { code: 'UIN303', name: 'Ulumul Quran & Hadits Tematik', sks: 2, num: 84, grade: 'A-', weight: 3.75 },
    ],
  },
  '20242': {
    semesterCode: '20242',
    label: 'Semester 2 (2024/2025 Genap)',
    ips: '3,15',
    ipk: '3,17',
    sksDitempuh: 21,
    sksLulusTotal: 42,
    bebanMaks: '21 SKS',
    evaluasi: 'Memuaskan',
    courses: [
      { code: 'IF201', name: 'Dasar-Dasar Pemrograman', sks: 3, num: 76, grade: 'B+', weight: 3.5 },
      { code: 'IF202', name: 'Logika Matematika & Himpunan', sks: 3, num: 70, grade: 'B', weight: 3.0 },
      { code: 'IF203', name: 'Fisika Dasar untuk Informatika', sks: 3, num: 72, grade: 'B', weight: 3.0 },
      { code: 'IF204', name: 'Pengantar Teknologi Informasi', sks: 3, num: 82, grade: 'A-', weight: 3.75 },
      { code: 'UIN201', name: 'Studi Agama & Kebudayaan Islam', sks: 2, num: 85, grade: 'A', weight: 4.0 },
      { code: 'UIN202', name: 'Bahasa Indonesia Ilmiah', sks: 2, num: 88, grade: 'A', weight: 4.0 },
      { code: 'UIN203', name: 'Akhlak Tasawuf', sks: 2, num: 77, grade: 'B+', weight: 3.5 },
      { code: 'UIN204', name: 'Fikih Ibadah & Muamalah', sks: 3, num: 73, grade: 'B', weight: 3.0 },
    ],
  },
  '20241': {
    semesterCode: '20241',
    label: 'Semester 1 (2024/2025 Ganjil)',
    ips: '3,20',
    ipk: '3,20',
    sksDitempuh: 21,
    sksLulusTotal: 21,
    bebanMaks: '21 SKS',
    evaluasi: 'Memuaskan',
    courses: [
      { code: 'IF101', name: 'Kalkulus Diferensial & Integral', sks: 3, num: 74, grade: 'B', weight: 3.0 },
      { code: 'IF102', name: 'Konsep Sistem Informasi & Komputasi', sks: 3, num: 78, grade: 'B+', weight: 3.5 },
      { code: 'IF103', name: 'Pengantar Teknik Informatika', sks: 3, num: 83, grade: 'A-', weight: 3.75 },
      { code: 'UIN101', name: 'Pancasila', sks: 2, num: 86, grade: 'A', weight: 4.0 },
      { code: 'UIN102', name: 'Pengantar Studi Islam', sks: 2, num: 85, grade: 'A', weight: 4.0 },
      { code: 'UIN103', name: 'Tauhid & Ilmu Kalam', sks: 2, num: 79, grade: 'B+', weight: 3.5 },
      { code: 'UIN104', name: 'Sejarah Peradaban Islam', sks: 2, num: 72, grade: 'B', weight: 3.0 },
      { code: 'UIN105', name: 'Bahasa Inggris Dasar', sks: 2, num: 78, grade: 'B+', weight: 3.5 },
      { code: 'UIN106', name: 'Baca Tulis Al-Quran & Tahsin', sks: 2, num: 88, grade: 'A', weight: 4.0 },
    ],
  },
};

// Focused KHS Module (Direct Semester Results & Course Grades)
const KhsAcademicModule = ({ student, showToast, handleReport, setCurrentPage }) => {
  const [selectedSem, setSelectedSem] = useState('20252');

  const currentSemData = khsSemestersData[selectedSem] || khsSemestersData['20252'];

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Selected Semester Header & Telemetry Cards */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="select-semester" className="text-[13px] font-semibold text-ink shrink-0">
              Pilih Semester:
            </label>
            <select
              id="select-semester"
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="h-9 px-3 rounded-lg border border-border bg-card text-ink text-[13px] font-semibold focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="20252">Semester 4 (2025/2026 Genap)</option>
              <option value="20251">Semester 3 (2025/2026 Ganjil)</option>
              <option value="20242">Semester 2 (2024/2025 Genap)</option>
              <option value="20241">Semester 1 (2024/2025 Ganjil)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast(`KHS ${currentSemData.label} berhasil diunduh dalam format PDF`, 'success')}
              className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Cetak KHS (PDF)</span>
            </button>
            <button
              type="button"
              onClick={() => handleReport(`Nilai KHS ${currentSemData.label}`, `IPS: ${currentSemData.ips}`)}
              className="h-9 px-3 rounded-lg border border-border bg-card hover:bg-bg text-ink-muted text-[12px] font-medium transition-colors cursor-pointer"
            >
              Lapor Ketidaksesuaian
            </button>
          </div>
        </div>

        {/* Metric Cards for Selected Semester */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
            <span className="text-[12px] text-ink-muted">Indeks Prestasi Semester (IPS)</span>
            <p className="text-[26px] font-bold text-primary font-mono mt-1">{currentSemData.ips}</p>
            <span className="text-[11px] text-ink-muted">Dari skala 4,00</span>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
            <span className="text-[12px] text-ink-muted">IPK Kumulatif Akhir</span>
            <p className="text-[26px] font-bold text-ink font-mono mt-1">{currentSemData.ipk}</p>
            <span className="text-[11px] text-success font-semibold flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span>Cum Laude (&ge; 3.50)</span>
            </span>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
            <span className="text-[12px] text-ink-muted">SKS Ditempuh / Lulus</span>
            <p className="text-[26px] font-bold text-ink font-mono mt-1">{currentSemData.sksDitempuh} SKS</p>
            <span className="text-[11px] text-ink-muted">Akumulasi: {currentSemData.sksLulusTotal} SKS</span>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
            <span className="text-[12px] text-ink-muted">Beban Maksimal Semester Berikutnya</span>
            <p className="text-[26px] font-bold text-success font-mono mt-1">{currentSemData.bebanMaks}</p>
            <span className="text-[11px] text-ink-muted">Hak SKS berdasar IPS &gt; 3.00</span>
          </div>
        </div>
      </div>

      {/* 3. Detailed Course Table for Selected Semester */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-border bg-bg/50 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-ink">
            Rincian Mata Kuliah — {currentSemData.label}
          </h3>
          <span className="text-[12px] text-ink-muted font-medium">
            Total {currentSemData.courses.length} Mata Kuliah ({currentSemData.sksDitempuh} SKS)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] text-left">
            <thead className="bg-bg text-ink-muted font-bold text-[11px] uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Nama Mata Kuliah</th>
                <th className="py-3 px-4 text-center">SKS</th>
                <th className="py-3 px-4 text-center">Nilai Angka</th>
                <th className="py-3 px-4 text-center">Nilai Huruf</th>
                <th className="py-3 px-4 text-center">Bobot Mutu</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {currentSemData.courses.map((row, idx) => (
                <tr key={idx} className="hover:bg-primary-tint/10 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-ink-muted">{row.code}</td>
                  <td className="py-3 px-4 font-semibold text-ink">{row.name}</td>
                  <td className="py-3 px-4 text-center font-mono">{row.sks}</td>
                  <td className="py-3 px-4 text-center font-mono">{row.num}</td>
                  <td className="py-3 px-4 text-center font-bold font-mono text-primary">{row.grade}</td>
                  <td className="py-3 px-4 text-center font-mono">{(row.weight * row.sks).toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-success-tint text-success text-[11px] font-bold">
                      Lulus
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-bg/80 border-t border-border font-semibold text-ink text-[12px]">
              <tr>
                <td colSpan="2" className="py-3 px-4 text-right">Total Beban & Mutu Semester:</td>
                <td className="py-3 px-4 text-center font-mono font-bold">{currentSemData.sksDitempuh} SKS</td>
                <td colSpan="2"></td>
                <td className="py-3 px-4 text-center font-mono font-bold text-primary">
                  {currentSemData.courses.reduce((acc, c) => acc + c.weight * c.sks, 0).toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center text-success font-bold">IPS {currentSemData.ips}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export const GenericAcademicPage = () => {
  const { currentPage, student, showToast, setReportDialogOpen, setReportContextData, setCurrentPage } = useApp();

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
          subtitle: null,
          badge: `Semester 4 • IPK ${student.ipkFormatted}`,
          content: (
            <KhsAcademicModule
              student={student}
              showToast={showToast}
              handleReport={handleReport}
              setCurrentPage={setCurrentPage}
            />
          ),
        };

      case 'transkrip':
        return {
          title: 'Transkrip Nilai Kumulatif',
          subtitle: null,
          badge: `Total 84 SKS • IPK ${student.ipkFormatted}`,
          content: (
            <div className="flex flex-col gap-5">
              <div className="p-4 bg-info-tint border border-info rounded-xl text-[13px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-info text-[20px]">verified</span>
                  <span>Transkrip akademik sementara terverifikasi digital</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast('Transkrip resmi sementara berhasil diunduh dalam format PDF', 'success')}
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-[12px] font-bold cursor-pointer shadow-xs"
                  >
                    Cetak Transkrip (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('khs')}
                    className="px-3.5 py-2 rounded-lg border border-border bg-card hover:bg-bg text-ink text-[12px] font-semibold cursor-pointer"
                  >
                    Lihat KHS
                  </button>
                </div>
              </div>

              {/* Cumulative Progress Summary */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-3">
                <h3 className="text-[15px] font-bold text-ink pb-2 border-b border-border">
                  Ringkasan Kelayakan Kelulusan Sarjana (S1)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className="p-3 bg-bg rounded-lg border border-border">
                    <span className="text-ink-muted text-[11px] block">Total SKS Wajib Kelulusan:</span>
                    <span className="font-bold text-[18px] text-ink font-mono mt-0.5 block">144 SKS</span>
                    <span className="text-[11px] text-ink-muted">Kurikulum Prodi Teknik Informatika</span>
                  </div>

                  <div className="p-3 bg-bg rounded-lg border border-border">
                    <span className="text-ink-muted text-[11px] block">SKS Lulus Diakui (Sem 1 - 4):</span>
                    <span className="font-bold text-[18px] text-success font-mono mt-0.5 block">84 SKS (58,3%)</span>
                    <div className="w-full bg-border h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div className="bg-primary h-full rounded-full" style={{ width: '58.3%' }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-bg rounded-lg border border-border">
                    <span className="text-ink-muted text-[11px] block">Predikat Akademik Sementara:</span>
                    <span className="font-bold text-[18px] text-primary mt-0.5 block">Dengan Pujian (Cum Laude)</span>
                    <span className="text-[11px] text-ink-muted">IPK {student.ipkFormatted} (Ambang batas &ge; 3.50)</span>
                  </div>
                </div>

                {/* SKS per Group */}
                <div className="pt-3 border-t border-border/80">
                  <p className="text-[13px] font-bold text-ink mb-2">Sebaran Kelompok Mata Kuliah Selesai:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[12px]">
                    <div className="p-2.5 rounded-lg border border-border bg-card flex justify-between items-center">
                      <span className="text-ink-muted">Wajib Universitas (MKWU):</span>
                      <span className="font-bold text-success">14 / 14 SKS (100%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-card flex justify-between items-center">
                      <span className="text-ink-muted">Wajib Fakultas (MKWF):</span>
                      <span className="font-bold text-success">18 / 18 SKS (100%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-card flex justify-between items-center">
                      <span className="text-ink-muted">Keahlian Prodi (MKKP):</span>
                      <span className="font-bold text-primary">46 / 80 SKS (57%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-card flex justify-between items-center">
                      <span className="text-ink-muted">Pilihan & MBKM:</span>
                      <span className="font-bold text-ink">6 / 32 SKS (18%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        };

      case 'bimbingan':
        return {
          title: 'Bimbingan Skripsi',
          subtitle: null,
          badge: 'Teknik Informatika',
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
          title: 'Cetak KTM Digital',
          subtitle: null,
          badge: 'NIM 1247050001',
          content: (
            <div className="flex flex-col items-center gap-6 py-4">
              {/* Digital KTM Card Visual */}
              <div className="w-full max-w-[420px] bg-gradient-to-br from-ink via-primary-hover to-primary text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden">
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
                <span>Unduh KTM (PDF)</span>
              </button>
            </div>
          ),
        };

      case 'kelulusan':
        return {
          title: 'Kelulusan & Yudisium',
          subtitle: null,
          badge: 'Target: Semester 8',
          content: (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 card-interactive">
                  <span className="text-[12px] text-ink-muted">SKS Lulus Diakui</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <p className="text-[26px] font-bold text-ink font-mono">{student.sksLulus}</p>
                    <span className="text-[12px] text-ink-muted">/ 144 SKS</span>
                  </div>
                  <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '58.3%' }}></div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 card-interactive">
                  <span className="text-[12px] text-ink-muted">IPK Terkini</span>
                  <p className="text-[26px] font-bold text-primary font-mono mt-1">{student.ipkFormatted}</p>
                  <span className="text-[11px] text-success font-semibold flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>Memenuhi syarat cumlaude (&ge; 3.50)</span>
                  </span>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 card-interactive">
                  <span className="text-[12px] text-ink-muted">Poin SKK Ekstrakurikuler</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <p className="text-[26px] font-bold text-ink font-mono">72</p>
                    <span className="text-[12px] text-ink-muted">/ 60 Poin</span>
                  </div>
                  <span className="text-[11px] text-success font-semibold flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    <span>Lulus verifikasi kemahasiswaan</span>
                  </span>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 card-interactive">
                  <span className="text-[12px] text-ink-muted">Kemampuan Bahasa (TOEFL)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <p className="text-[26px] font-bold text-ink font-mono">485</p>
                    <span className="text-[12px] text-ink-muted">/ Min. 450</span>
                  </div>
                  <span className="text-[11px] text-success font-semibold flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    <span>Sertifikat aktif terdata di Pusat Bahasa</span>
                  </span>
                </div>
              </div>

              {/* Checklist Tahap Verifikasi */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-[16px] font-bold text-ink">Checklist Tahapan Menuju Kelulusan & Yudisium</h3>
                  <button
                    type="button"
                    onClick={() => handleReport('Kelulusan & Yudisium', 'SKS 84/144')}
                    className="text-[12px] text-primary hover:underline font-semibold"
                  >
                    Laporkan data keliru
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      step: '1',
                      title: 'Penyelesaian Beban Mata Kuliah Teori & Praktikum',
                      desc: 'Menyelesaikan 144 SKS wajib sesuai kurikulum prodi Teknik Informatika.',
                      status: 'Sedang Berjalan (84 SKS selesai)',
                      type: 'warning',
                    },
                    {
                      step: '2',
                      title: 'Kuliah Kerja Nyata (KKN) & PPL / Kerja Praktik',
                      desc: 'Memenuhi syarat pendaftaran KKN (minimal 80 SKS telah terpenuhi).',
                      status: 'Siap Mendaftar',
                      type: 'info',
                    },
                    {
                      step: '3',
                      title: 'Ujian Komprehensif / Seminar Proposal (Sempro)',
                      desc: 'Bimbingan tugas akhir dengan dosen pembimbing akademik.',
                      status: 'Pra-Proposal (Semester 5)',
                      type: 'neutral',
                    },
                    {
                      step: '4',
                      title: 'Sidang Munaqasyah Skripsi & Ujian Akhir Sarjana',
                      desc: 'Ujian naskah skripsi di hadapan dewan penguji fakultas.',
                      status: 'Belum Terbuka',
                      type: 'neutral',
                    },
                    {
                      step: '5',
                      title: 'Surat Keterangan Bebas Pustaka & Bebas Tanggungan UKT',
                      desc: 'Verifikasi bebas pinjaman perpustakaan dan lunas seluruh kewajiban UKT.',
                      status: 'Belum Terbuka',
                      type: 'neutral',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-bg border border-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-card border border-border text-ink font-bold text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                          {item.step}
                        </span>
                        <div>
                          <p className="font-semibold text-ink text-[14px]">{item.title}</p>
                          <p className="text-[12px] text-ink-muted mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 self-start sm:self-auto ${item.type === 'warning'
                          ? 'bg-warning-tint text-warning'
                          : item.type === 'info'
                            ? 'bg-info-tint text-info'
                            : 'bg-card border border-border text-ink-muted'
                          }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        };

      case 'pendaftaran':
      case 'ujian-kkn':
      case 'ppl':
        return {
          title: 'Pendaftaran Layanan',
          subtitle: null,
          badge: 'Semester Ganjil 2026/2027',
          content: (
            <div className="flex flex-col gap-5">
              {/* Active Program Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* KKN */}
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 card-interactive">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-tint text-primary text-[11px] font-bold">
                        REGISTRASI DIBUKA
                      </span>
                      <span className="text-[12px] text-ink-muted font-mono">Batas: 15 Nov 2026</span>
                    </div>
                    <h3 className="text-[18px] font-bold text-ink">Kuliah Kerja Nyata (KKN) Tematik</h3>
                    <p className="text-[13px] text-ink-muted leading-relaxed">
                      Pengabdian masyarakat berbasis pemberdayaan desa berkelanjutan di wilayah Jawa Barat.
                    </p>
                    <div className="pt-2 text-[12px] space-y-1 text-ink-muted">
                      <p className="text-ink font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-success text-[16px]">check_circle</span>
                        <span>Syarat SKS: Lulus 80 SKS (Kamu: 84 SKS)</span>
                      </p>
                      <p className="text-ink font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-success text-[16px]">check_circle</span>
                        <span>Status Finansial: UKT Lunas</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Pendaftaran KKN berhasil dikirim ke LP2M', 'success')}
                    className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-[13px] transition-colors shadow-sm"
                  >
                    Daftar KKN Periode Ini
                  </button>
                </div>

                {/* PPL / PKL */}
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 card-interactive">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-info-tint text-info text-[11px] font-bold">
                        JADWAL BERIKUTNYA
                      </span>
                      <span className="text-[12px] text-ink-muted font-mono">Mulai: Feb 2027</span>
                    </div>
                    <h3 className="text-[18px] font-bold text-ink">Praktik Kerja Lapangan (PKL) Mandiri</h3>
                    <p className="text-[13px] text-ink-muted leading-relaxed">
                      Penempatan magang industri bidang teknologi informasi di instansi mitra terakreditasi.
                    </p>
                    <div className="pt-2 text-[12px] space-y-1 text-ink-muted">
                      <p className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-ink-muted text-[16px]">schedule</span>
                        <span>Syarat SKS: Minimal 100 SKS (Ditempuh Semester 6)</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-success text-[16px]">check_circle</span>
                        <span>Proposal Instansi: Format Panduan 2026</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Buku panduan PKL 2026/2027 berhasil diunduh', 'info')}
                    className="w-full py-2.5 rounded-lg border border-border text-ink hover:bg-bg font-semibold text-[13px] transition-colors"
                  >
                    Unduh Panduan PKL (PDF)
                  </button>
                </div>
              </div>

              {/* Riwayat Pendaftaran */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-[14px] text-ink mb-3">Riwayat Pengajuan Pendaftaran</h4>
                <div className="space-y-2 text-[13px]">
                  <div className="p-3 bg-bg border border-border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-ink">Verifikasi Berkas MBKM Kampus Merdeka Batch 7</p>
                      <p className="text-[11px] text-ink-muted">Diajukan: 12 September 2026 • Surat Rekomendasi Dekan</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-success-tint text-success text-[11px] font-bold">
                      Disetujui Prodi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ),
        };

      case 'wisuda':
      case 'daftar-wisuda':
        return {
          title: 'Pendaftaran Wisuda',
          subtitle: null,
          badge: 'Periode Ke-98',
          content: (
            <div className="flex flex-col gap-5">
              <div className="p-4 bg-info-tint border border-info rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-info text-[24px]">workspace_premium</span>
                  <div>
                    <p className="text-[14px] font-bold text-ink">Informasi Wisuda Periode Ke-98</p>
                    <p className="text-[12px] text-ink-muted">
                      Pendaftaran dibuka bagi mahasiswa yang telah dinyatakan lulus dalam Sidang Munaqasyah dan memiliki SK Yudisium resmi.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-card border border-info/40 text-info text-[11px] font-bold shrink-0">
                  Kuota: 1.250
                </span>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-[16px] font-bold text-ink">Status Bebas Tanggungan Universitas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[13px]">
                  <div className="p-3 bg-bg border border-border rounded-lg">
                    <span className="text-ink-muted text-[11px] block">1. Bebas Keuangan</span>
                    <p className="font-bold text-success mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>Lunas (0 Tunggakan)</span>
                    </p>
                  </div>

                  <div className="p-3 bg-bg border border-border rounded-lg">
                    <span className="text-ink-muted text-[11px] block">2. Bebas Perpustakaan</span>
                    <p className="font-bold text-success mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>Bebas Pinjaman Buku</span>
                    </p>
                  </div>

                  <div className="p-3 bg-bg border border-border rounded-lg">
                    <span className="text-ink-muted text-[11px] block">3. Naskah Skripsi BAAK</span>
                    <p className="font-bold text-warning mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      <span>Menunggu Munaqasyah</span>
                    </p>
                  </div>

                  <div className="p-3 bg-bg border border-border rounded-lg">
                    <span className="text-ink-muted text-[11px] block">4. Pasfoto Ijazah</span>
                    <p className="font-bold text-ink-muted mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">pending</span>
                      <span>Belum Diunggah</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 shadow-sm text-center py-8">
                <span className="material-symbols-outlined text-[36px] text-ink-muted mb-2">lock</span>
                <h4 className="text-[16px] font-bold text-ink">Formulir Pendaftaran Wisuda Belum Aktif</h4>
                <p className="text-[13px] text-ink-muted max-w-md mx-auto mt-1">
                  Pendaftaran wisuda akan terbuka secara otomatis setelah nilai skripsi kamu terbit dan kamu dinyatakan lulus yudisium oleh BAAK.
                </p>
              </div>
            </div>
          ),
        };

      case 'akun':
      case 'profil':
      case 'sesi':
        return {
          title: 'Profil & Keamanan',
          subtitle: null,
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
          title: 'Layanan Akademik',
          subtitle: null,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-ink tracking-tight">
            {config.title}
          </h1>
          {config.subtitle && (
            <p className="text-[13px] text-ink-muted mt-0.5">{config.subtitle}</p>
          )}
        </div>
        {config.badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-ink-muted text-[12px] font-semibold w-fit shrink-0">
            <span className="w-2 h-2 rounded-full bg-leaf"></span>
            <span>{config.badge}</span>
          </div>
        )}
      </div>

      {/* Content */}
      {config.content}
    </div>
  );
};

