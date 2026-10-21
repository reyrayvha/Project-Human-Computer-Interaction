# SALAM UIN Sunan Gunung Djati Bandung — Academic Portal Redesign (HCI Project)

Interactive Frontend Demo & Usability Prototype untuk Mata Kuliah **Human-Computer Interaction (HCI)**.  
Dikembangkan berdasarkan temuan evaluasi empiris (*36 responden mahasiswa aktif, SUS score 72.2, UEQ Novelty 0.40*) dan spesifikasi desain presisi dari **Stitch AI** (`PRD & DESIGN.md`).

---

## 1. Cara Menjalankan Project Secara Lokal

Pastikan Node.js (v18+) telah terpasang pada komputer Anda.

```bash
# 1. Buka terminal pada folder project ini
cd "c:\Projects\Learning\SALAM Project HCI"

# 2. Jalankan development server
npm run dev
```

Buka peramban (browser) dan akses alamat lokal:  
👉 **`http://localhost:5173/`**

Untuk menjalankan versi production build:
```bash
npm run build
npm run preview
```

---

## 2. Struktur Navigasi & Halaman yang Diimplementasikan

Aplikasi ini menyatukan **50+ variasi layar dan state** dari mockup Stitch AI menjadi satu Single Page Application (SPA) yang responsif dan interaktif:

### A. Autentikasi & Pemulihan Akun
- **Login Mahasiswa Desktop & Mobile**: Form login resmi dengan logo asli SALAM UIN SGD, validasi input, toggle visibilitas kata sandi, indikator Caps Lock, bantuan dokumen, dan Single Sign-On (SSO).
- **Simulasi Password Salah**: Masukkan password `"salah"` untuk melihat umpan balik validasi inline.
- **Alur Lupa Password 3 Langkah (Section 7.15)**:
  1. *Langkah 1*: Input NIM & Email resmi UIN SGD.
  2. *Langkah 2*: Verifikasi email terdaftar (`ai*******@uinsgd.ac.id`) dengan countdown timer 30 detik.
  3. *Langkah 3*: Pembuatan kata sandi baru dengan checklist keamanan, dilanjutkan notifikasi sukses.

### B. Dashboard Mahasiswa ("Today Rail" Ecosystem)
- **Header Sambutan Tenang**: Salam personal *"Selamat pagi, Aisyah"* dengan metadata Program Studi S1 Teknik Informatika dan Semester 5 tanpa banner gradien norak.
- **Stat Tiles (Data Honesty)**: Menampilkan IPK Kumulatif (3,51), SKS Lulus (84), SKS Semester Ini (23 dari jatah 24 SKS), dan Status Tagihan UKT. Setiap kartu memiliki aksi *"Laporkan data keliru"*.
- **Today Rail (Jadwal Hari Ini, Rabu)**: Garis waktu vertikal kelas interaktif. Sesi aktif *Interaksi Manusia dan Komputer* memiliki badge status langsung (*Absen dibuka* / *Sudah hadir*) dan tombol pemindai QR.
- **Kehadiran Berisiko**: Menyaring mata kuliah dengan persentase di bawah ambang batas aman 85%, diurutkan dari yang paling kritis (*Jaringan Komputer 50%, Manajemen Basis Data 56%, dsb.*).
- **Grafik Tren IP & IPK**: Grafik SVG interaktif dengan label langsung pada semester terakhir. Semester 5 berjalan ditandai kolom putus-putus *"Berjalan / Belum ada nilai"* dan **tidak pernah diplot ke angka 0.00**. Dilengkapi toggle *"Lihat sebagai tabel"* untuk standar aksesibilitas WCAG.
- **Ringkasan Akademik & Data State**: Komponen state khusus untuk nilai semester berjalan yang belum keluar tanpa menampilkan angka palsu.

### C. Absensi Kuliah & QR Scanner Terpadu
- **Sesi Absen Aktif**: Menampilkan hitung mundur batas waktu (*"Ditutup 14 menit lagi"*), tombol pemicu kamera scanner, dan panduan 3 langkah.
- **Sesi Absen Kosong**: Tampilan tenang saat tidak ada kelas aktif, dilengkapi pengingat 10 menit sebelum kelas.
- **Modal Viewfinder Scanner QR**: Menyimulasikan pemindaian kamera, izin browser, laser scanner, dan hasil presensi sukses seketika.
- **Dual Fallback Mechanisms**:
  - *Input Kode Manual*: Alternatif 6 karakter kode alfanumerik jika kamera terkendala.
  - *Offline Resilience*: Simulasi penyimpanan presensi lokal saat jaringan terputus.
- **Riwayat Kehadiran Silabus (16 Pertemuan)**: Khusus mata kuliah *Jaringan Komputer*, mahasiswa dapat melihat log tiap pertemuan dan menekan tombol *"Ajukan Koreksi"* untuk pertemuan yang tercatat alpa.

### D. Rencana Studi (KRS) & Concurrency Ladder
- **Tampilan Fleksibel**: Toggle instan antara tampilan **Tabel** dan **Jadwal Mingguan (Grid Senin-Jumat)**.
- **Ringkasan Beban SKS**: Informasi jatah 24 SKS, terambil 23 SKS, sisa 1 SKS, dan badge resmi *"Disetujui Dosen Wali"*.
- **KRS Concurrency Ladder (Simulasi Beban Puncak Server)**:
  - Frame A: Siap Simpan
  - Frame B: Menyimpan ke Server...
  - Frame C: Timeout / Pilihan Tersimpan di Cache Browser
  - Frame D: Berhasil Disimpan dengan Timestamp
- **Cetak KRS**: Fitur pratinjau dan dialog cetak dokumen resmi A4 berstandar BAAK.

### E. Keuangan & Tagihan UKT
- **Kartu Ringkasan Finansial**: Tagihan Aktif, Tunggakan, dan Status Kelayakan UAS.
- **Tab Tagihan vs Riwayat**:
  - *Tab Tagihan*: Perhitungan dinamis checkbox pilihan pembayaran dan panduan Virtual Account (VA BSI, Mandiri, BRI).
  - *Tab Riwayat Pembayaran*: Arsip kuitansi lunas semester-semester sebelumnya dengan tombol unduh bukti bayar.
  - *Empty State Jujur*: Menampilkan konfirmasi positif *"Tidak ada tagihan aktif untuk semester ini"* saat lunas.

### F. Fitur Global & Mitigasi HCI
- **Global Search Command Palette (`Ctrl + K`)**: Modal pencarian cepat yang mengindeks seluruh halaman dan informasi akademik dengan navigasi keyboard (`↑`, `↓`, `Enter`, `Esc`).
- **Pemisahan Tombol Logout & Modal Konfirmasi**: Tombol keluar diisolasi di dasar sidebar dengan teks merah dan memicu dialog konfirmasi dua langkah untuk mencegah *accidental logout*.
- **Dialog Laporkan Data Keliru (480px)**: Modal 4 kolom yang menghasilkan nomor tiket pelaporan resmi BAAK (`LD-XXXX`) dan memunculkan toast konfirmasi.
- **System Status Popover**: Chip status sistem di top bar (*Normal, Ramai, Gangguan, Pemeliharaan*) dengan rincian per layanan.
- **Ruang Antrean (Waiting Room)**: Halaman antrean resmi saat server mengalami beban puncak dengan estimasi waktu dan pengalihan otomatis saat giliran tiba.
- **Layar Outage & Pemeliharaan Terjadwal**: Tampilan terstandarisasi saat terjadi gangguan server atau jadwal maintenance.

---

## 3. Panel Penguji HCI Demo (Usability Testing Helper)

Di pojok kanan bawah aplikasi terdapat tombol mengambang:  
🛠️ **`Panel Penguji HCI Demo`**

Panel ini dirancang khusus untuk mempermudah dosen penguji, responden, atau evaluator dalam menguji seluruh kondisi sistem secara instan:
1. **Progressive Loading Ladder**: Beralih antara Normal (<1s), Skeleton Shimmer (1-3s), Progress Info Banner (5s), Cooldown Cache (10s), dan Error 503.
2. **Banner Data Cache (07.42 WIB)**: Mengaktifkan label data basi saat server mengalami keterlambatan sinkronisasi.
3. **Toggle Sesi Absen**: Beralih antara sesi dibuka dan tidak ada sesi.
4. **Toggle Status UKT**: Mengubah kondisi antara Lunas (Rp 0) dan Ada Tagihan Aktif (Rp 3.000.000).
5. **KRS Concurrency Ladder**: Menguji 4 alur penanganan beban puncak KRS.
6. **Simulasi Offline**: Menguji perilaku scanner saat koneksi internet terputus.
7. **Pintasan Layar Khusus**: Akses langsung ke Ruang Antrean, Log 16 Pertemuan Jarkom, Layar Server Down, dan Pemeliharaan.
8. **Reset Demo**: Mengembalikan seluruh state dan data dummy ke kondisi awal.

---

## 4. Integritas Brand & Aksesibilitas (WCAG AA)

- **Logo Resmi Institusional**: Menggunakan file aset resmi (`salam-logo-full-transparent.png`, `salam-logo-icon-transparent.png`, `salam-logo-full-white-bg.png`) tanpa modifikasi sintetis atau gradien dekoratif.
- **Palet Warna Fungsional**: Hijau institusional `#3F7A1F` (kontras rasio 5.2:1), Slate `#263235`, Leaf `#8CC43F`, Cool Pale Grey `#F3F5F2`.
- **Tipografi**: Menggunakan font resmi *Atkinson Hyperlegible Next* dengan fallback *Public Sans* untuk keterbacaan angka tabular.
- **Responsif Penuh**: Mendukung Desktop (1440px), Tablet (768px - 1199px), dan Mobile (390px x 844px) dengan Bottom Navigation & Menu Sheet.
