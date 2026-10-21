# Product Requirements Document (PRD) & Design Brief: SALAM Redesign

**Project Name:** SALAM Redesign (Sistem Administrasi Layanan Akademik)  
**Institution:** UIN Sunan Gunung Djati Bandung  
**Document Version:** 1.0  
**Status:** Approved / In Production Baseline  
**Target Platform:** Web Desktop (1440px) & Mobile Web/PWA (390 x 844 px)

---

## 1. Executive Summary & Problem Statement

### 1.1 Product Overview
**SALAM** (Sistem Administrasi Layanan Akademik) adalah portal web terintegrasi bagi seluruh mahasiswa program sarjana dan pascasarjana di lingkungan **UIN Sunan Gunung Djati Bandung**. Portal ini melayani seluruh siklus administrasi perkuliahan: pengecekan jadwal kuliah harian, presensi kehadiran berbasis QR code dinamis, pengisian dan pencetakan Rencana Studi (KRS/IRS), evaluasi hasil studi (KHS/Transkrip), informasi tagihan dan riwayat pembayaran Uang Kuliah Tunggal (UKT), verifikasi bimbingan tugas akhir, hingga pendaftaran wisuda.

### 1.2 The Problem
Berdasarkan evaluasi terhadap portal eksisting dan survei kegunaan independen (*36 responden mahasiswa aktif, SUS score 72.2, UEQ Novelty score 0.40*), sistem SALAM sebelumnya memiliki beberapa kendala kritis:
1. **Inakurasi & Ambiguitas Data Presensi**: Mahasiswa mengeluhkan kehadiran yang tidak tercatat akurat, minimnya panduan saat QR scanner gagal/mati, dan ketiadaan riwayat status per pertemuan.
2. **Data-Dishonesty & Nilai Kosong**: Dashboard sering menampilkan angka palsu/menyesatkan seperti *0 SKS* (padahal telah mengambil 23 SKS) atau *IP Semester 0.00* (padahal semester berjalan belum selesai evaluasi UAS).
3. **Ketiadaan Global Search & Kesulitan Navigasi**: Navigasi 11 item menu tanpa struktur hierarki kelompok memaksa mahasiswa menebak letak fitur.
4. **Resiko Keamanan & *Accidental Logout***: Tombol Logout bercampur di dalam daftar menu utama, memicu ketidaksengajaan keluar sistem tanpa konfirmasi.
5. **Kerapuhan Saat Beban Server Puncak (*Heavy Traffic / Concurrency Peak*)**: Pada periode pengisian KRS dan pembayaran UKT, server lambat atau mengembalikan galat 503 tanpa indikator antrean maupun *loading state* informatif.
6. **Kesenjangan Pengalaman Mobile**: Skor kepuasan di smartphone jauh lebih rendah dibanding desktop (SUS 67.0 vs 76.0) akibat tampilan tabel horizontal yang memotong layar.

### 1.3 Vision & Primary Job of the Redesign
Membangun portal akademik yang **tenang (*calm*), dapat dipercaya (*trustworthy*), dan jujur terhadap status data (*data-honest*)**. Mahasiswa harus mampu mengetahui **dalam waktu kurang dari 5 detik**:
- Apa agenda perkuliahan hari ini,
- Apakah tingkat kehadiran berada dalam ambang batas aman (≥85%),
- Apakah terdapat tagihan atau tenggat waktu administratif yang memerlukan tindakan segera.

---

## 2. Target Audience & User Personas

### 2.1 Demografi Pengguna
- **Primer**: Mahasiswa aktif S1 (usia 18–23 tahun) lintas fakultas (Teknik, Tarbiyah, Ushuluddin, Syariah, dll.).
- **Perangkat**: ~50% mengakses via Laptop/Desktop dan ~50% mengakses via Smartphone (Android & iOS).
- **Frekuensi**: 50% pengguna harian (presensi & cek jadwal) dan 50% pengguna musiman (KRS, KHS, & pembayaran UKT).

### 2.2 User Persona Archetype
- **Nama**: Aisyah Nurfadilah (NIM 1247050001)
- **Program Studi**: S1 Teknik Informatika, Fakultas Sains dan Teknologi (Semester 5).
- **Karakteristik**: Mengandalkan ponsel pintar untuk presensi cepat di depan kelas dosen, membutuhkan kepastian bahwa SKS dan KRS-nya telah disetujui dosen wali tanpa eror angka 0, dan menginginkan antrean transparan saat server sedang padat.

---

## 3. Brand Identity & Design System Principles

### 3.1 Integritas Brand Logo Resmi
Logo resmi SALAM UIN SGD Bandung adalah aset institusional paten:
- **Lambang**: Perisai dengan toga abu-abu gelap (*slate*), buku terbuka hijau muda, dan dua helai daun melengkung hijau medium.
- **Wordmark**: Tulisan kapital "S A L A M" berspasi lebar warna slate (`#263235`) dengan subjudul *"Sistem Administrasi Layanan Akademik"* (`#588A2A`).
- **Aturan Mutlak**: Dilarang digambar ulang (*no synthetic approximations*), dilarang diberi gradien atau bayangan berlebih, dan selalu mempertahankan rasio aspek asli pada latar belakang terang.

### 3.2 Palet Warna Fungsional & Aksesibilitas
| Token | Nilai Hex | Peran / Penggunaan | Rasio Kontras WCAG |
|---|---|---|---|
| `primary` | `#3F7A1F` | Tombol utama, link aktif, focus ring, aksen navigasi | 5.2:1 (Lolos AA) |
| `primary-hover` | `#2F6016` | Status hover interaksi utama | > 6:1 |
| `primary-tint` | `#E6F0DC` | Latar belakang baris aktif, chip terpilih, kartu sorotan | Latar netral |
| `leaf` | `#8CC43F` | Garis indikator aktif (3px) pada sidebar & dekorasi merek | Brand asset only |
| `ink` / `logo-slate` | `#263235` | Teks utama, heading, ikon utama | > 10:1 pada putih |
| `ink-muted` | `#55626A` | Teks sekunder, label tabel, metadata | 4.8:1 |
| `bg` | `#F3F5F2` | Latar belakang kanvas aplikasi (*cool pale green-grey*) | Latar netral |
| `card` | `#FFFFFF` | Latar kartu, sidebar, app bar (border 1px `#DCE2DA`) | Base card |
| `success` | `#1F7A4D` | Status hadir, aman (≥85%), lunas, disetujui | Dilengkapi ikon & teks |
| `warning` | `#A85F00` | Perhatian (75–84%), masa tenggang, server ramai | Dilengkapi ikon & teks |
| `danger` | `#B3261E` | Kehadiran kritis (<75%), tunggakan, tombol destruktif | Dilengkapi ikon & teks |
| `info` | `#1F5F8B` | Pengumuman sistem, periode KRS belum buka | Dilengkapi ikon & teks |

*Aturan Warna*: Tidak ada gradien warna-warni (*no purple/cyan gradients*), tidak ada elemen neon. Setiap status wajib menyertakan ikon grafis dan teks tertulis untuk menjamin aksesibilitas tuna warna.

### 3.3 Tipografi & Spacing
- **Font Utama**: *Atkinson Hyperlegible Next* (Fallback: *Public Sans, sans-serif*). Dipilih khusus untuk keterbacaan angka tabular pada tabel padat dan layar smartphone.
- **Skala Tipe**: Display (28/36 semibold), H1 (24/32 semibold), H2 (18/26 semibold), Body (15/24 regular), Table (14/20 regular), Stat (32/40 semibold).
- **Spasial & Bentuk**: Grid 8px, padding kartu 20px, gutter halaman 24px (desktop) / 16px (mobile). Radius: kontrol 6px, kartu 10px, dialog 14px, chip 999px.

---

## 4. Fitur Utama & Functional Requirements

### 4.1 Dashboard Terintegrasi ("Today Rail")
- **Row Sambutan**: Tanpa banner gradien norak; salam ramah *"Selamat pagi, Aisyah"* dengan metadata prodi dan semester.
- **Stat Tiles (Data Honesty)**: Menampilkan IPK (3,51), SKS Lulus (84), SKS Semester Ini (23 dari 24 jatah), dan Status Tagihan UKT.
- **Data State Component**: Jika nilai belum tersedia (misal IP semester berjalan), dilarang menampilkan angka "0.00". Tampilkan label *"Belum tersedia, nilai keluar setelah UAS"* lengkap dengan tombol laporkan data keliru.
- **Today Rail (Jadwal Hari Ini)**: Garis waktu vertikal kelas hari berjalan dengan status sesi langsung (*Belum dimulai, Absen dibuka, Sudah hadir, Terlewat*). Sesi aktif menyematkan tombol langsung *"Scan QR kehadiran"*.
- **Kehadiran Berisiko**: Menyaring dan menampilkan daftar mata kuliah dengan persentase di bawah 85% dengan urutan prioritas paling kritis.
- **Grafik Tren Akademik**: Menampilkan garis IP per semester dan IPK kumulatif. Semester berjalan ditandai slot putus-putus *"Berjalan"* dan tidak pernah diplot ke angka 0.

### 4.2 Sistem Presensi Kuliah & Fallback QR Scanner
- **Active Session Card**: Deteksi otomatis kelas yang sedang membuka presensi, informasi batas waktu countdown (*"Ditutup 14 menit lagi"*), tombol besar *"Scan QR kehadiran"*, dan panduan 3 langkah jelas.
- **Dual Fallback Mechanisms**:
  - *Manual Code Entry*: Tombol alternatif memasukkan 6 karakter kode alfanumerik yang ditampilkan dosen di proyektor jika kamera bermasalah.
  - *Offline Resilience*: Jika mahasiswa memindai saat jaringan terputus, presensi disimpan secara lokal (*Pending*) dan dikirim otomatis ketika koneksi pulih.
  - *Camera Permission Context*: Meminta izin kamera hanya saat tombol pemicu ditekan dengan lembar penjelasan singkat, bukan di halaman login.
- **Riwayat Pertemuan & Ajukan Koreksi**: Mahasiswa dapat meninjau histori tiap pertemuan (Pertemuan 1–16). Pertemuan yang tercatat alpa menyediakan tautan *"Ajukan koreksi presensi"* ke dosen pengampu.

### 4.3 Rencana Studi (KRS) & Manajemen Beban Tinggi
- **Tampilan Fleksibel**: Toggle tampilan *"Tabel"* dan *"Jadwal Mingguan (Grid Senin-Jumat)"*.
- **Ringkasan Beban SKS**: Informasi jatah 24 SKS, terambil 23 SKS, sisa 1 SKS, serta badge resmi *"Disetujui Dosen Wali"*.
- **KRS Concurrency Ladder**: Pada masa KRS dibuka dengan lalu lintas server tinggi:
  - Tombol simpan multi-status (*Simpan KRS -> Menyimpan KRS... -> Timeout tersimpan lokal -> Berhasil disimpan*).
  - Pilihan mata kuliah mahasiswa tersimpan dalam cache peramban sehingga tidak hilang saat terjadi gangguan koneksi.
  - Banner informatif (warna netral/info, bukan merah bahaya) jika periode KRS belum dibuka.

### 4.4 Keuangan & Riwayat Transaksi UKT
- **Kartu Ringkasan Finansial**: Membedakan secara tegas antara *Tagihan Aktif*, *Tunggakan*, dan *Status Kelayakan Ujian*.
- **Tabulir Tagihan vs Riwayat**:
  - Tab *"Tagihan"*: Dilengkapi rincian jenis pembayaran, potongan, batas waktu, dan instruksi bayar multi-bank (VA BSI, Mandiri, BRI).
  - Tab *"Riwayat Pembayaran"*: Log histori pembayaran semester-semester sebelumnya berstatus *"Lunas"* beserta tombol unduh bukti bayar (Kuitansi PDF).
  - Empty State Jujur & Ramai: Menampilkan konfirmasi positif *"Tidak ada tagihan aktif untuk semester ini"*.

### 4.5 Global Search (Command Palette Ctrl+K) & Keamanan Akun
- **Command Palette (Ctrl + K)**: Pencarian instan melingkupi rute navigasi, tautan perkuliahan, jadwal dosen, dan riwayat tagihan dengan keyboard shortcuts (panah, enter, esc).
- **Pemisahan Log Keluar (*Logout Dialog*)**: Tombol Logout diisolasi secara khusus di dasar sidebar dengan teks merah dan memicu modal konfirmasi dua langkah (*"Keluar dari SALAM?"*).
- **Alur Lupa Password 3 Langkah**: Reset mandiri tanpa pertanyaan keamanan rumit: (1) Masukkan NIM & Email terdaftar -> (2) Verifikasi tautan email dengan masa berlaku 30 menit -> (3) Buat kata sandi baru.
- **Fitur Lapor Data Keliru**: Modal dialog 4 kolom di setiap kartu ringkasan untuk melaporkan ketidakcocokan nilai/SKS langsung ke Biro Administrasi Akademik (nomor tiket laporan LD-XXXX).

### 4.6 Server Load & Resilience Architecture (UI Mitigation)
- **Progressive Loading Ladder**:
  - *1–3 detik*: Skeleton shimmer abu-abu netral meniru tata letak akhir.
  - *3–10 detik*: Progress bar tipis dengan banner *"Server sedang ramai, mohon tunggu"*.
  - *>10 detik*: Banner peringatan dengan tombol coba lagi ber-cooldown 10 detik serta opsi *"Lihat data terakhir (Cache)"*.
- **System Status Chip**: Indikator kesehatan server (*SALAM Normal, Ramai, Ada Gangguan, Pemeliharaan*) di top navigation bar dengan popover status per-layanan.
- **Waiting Room / Antrean**: Halaman antrean resmi dengan perkiraan waktu masuk realistis tanpa manipulasi progress palsu.

---

## 5. Information Architecture & Navigation

```
[ SALAM UIN SGD Bandung ]
│
├── 1. UTAMA
│   ├── Dashboard (Beranda Mahasiswa, Today Rail, Stat SKS/IPK)
│   └── Absensi Kuliah (Active Session, Scanner QR, Riwayat Kehadiran)
│
├── 2. AKADEMIK
│   ├── Perkuliahan
│   │   ├── Rencana Studi (KRS, Jadwal Mingguan, Unduh KRS)
│   │   └── Kelulusan
│   ├── Hasil Studi (KHS, Transkrip Nilai Akademik Kumulatif)
│   └── Bimbingan Skripsi / Tesis / Disertasi
│
├── 3. LAYANAN
│   ├── Pendaftaran (Ujian KKN, PPL, MBKM)
│   ├── Wisuda
│   ├── Keuangan
│   │   ├── Tagihan UKT
│   │   └── Riwayat Pembayaran UKT
│   └── Cetak KTM (Kartu Tanda Mahasiswa Digital)
│
├── 4. AKUN
│   ├── Pengaturan Profil & Keamanan
│   └── Riwayat Sesi Perangkat
│
└── 5. KELUAR SISTEM
    └── Logout (Pemisah tegas di footer nav + Modal Konfirmasi)
```

---

## 6. Matrix & Inventaris Layanan yang Telah Dibangun

Seluruh arsitektur layar telah berhasil direalisasikan pada kanvas proyek:
1. **Dashboard Ekosistem**: Desktop 1440px standar, Mobile 390px, Skeleton Shimmer Loading, Stale Data Cache 07.42 WIB, Error 503 Fallback.
2. **Presensi Ekosistem**: Desktop Sesi Aktif, Desktop Sesi Kosong, Riwayat Mata Kuliah Jaringan Komputer, Mobile Scan QR Viewfinder, Kompilasi Status/Fallback.
3. **KRS Ekosistem**: Desktop Tampilan Tabel, Desktop Jadwal Mingguan, dan 4 Alur Pengisian KRS Masa Beban Puncak (Siap Simpan, Proses, Timeout, Sukses).
4. **Keuangan Ekosistem**: Tagihan Kosong (Lunas) dan Tagihan Aktif (Semester 5).
5. **Autentikasi & Utilitas**: Login Desktop & Mobile, Alur Lupa Password 3 Frame, Command Palette (Ctrl+K), Notification Panel Dropdown, Dialog Laporkan Data Keliru, Waiting Room Antrean, dan Status Sistem Terjadwal.

---

## 7. Metrics & Success Criteria
1. **Task Completion Rate**: Waktu pencarian jadwal & presensi hari berjalan < 5 detik.
2. **Error Rate Reduction**: 0% laporan salah klik logout berkat pemisahan visual dan modal konfirmasi.
3. **Aksesibilitas**: Lolos uji kontras WCAG AA (minimal rasio 4.5:1 untuk teks normal).
4. **Perceived Performance**: Peningkatan kepuasan pengguna saat server melambat melalui skeleton loading dan ruang antrean transparan.