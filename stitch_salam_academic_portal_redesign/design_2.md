---
name: SALAM Redesign
description: Student academic portal (Sistem Administrasi Layanan Akademik), UIN Sunan Gunung Djati Bandung. Calm, trustworthy, data-honest.
version: 1.0
colors:
  primary: "#3F7A1F"
  primary-hover: "#2F6016"
  primary-tint: "#E6F0DC"
  leaf: "#8CC43F"
  logo-green: "#588A2A"
  logo-slate: "#263235"
  ink: "#263235"
  ink-muted: "#55626A"
  bg: "#F3F5F2"
  card: "#FFFFFF"
  border: "#DCE2DA"
  success: "#1F7A4D"
  success-tint: "#E1F2E9"
  warning: "#A85F00"
  warning-tint: "#FDF0DA"
  danger: "#B3261E"
  danger-tint: "#FBE4E2"
  info: "#1F5F8B"
  info-tint: "#E0EEF7"
typography:
  family: "Atkinson Hyperlegible Next (fallback: Public Sans, system-ui)"
  display: "28/36 semibold"
  h1: "24/32 semibold"
  h2: "18/26 semibold"
  body: "15/24 regular"
  table: "14/20 regular"
  caption: "13/18 medium"
  stat: "32/40 semibold, tabular numerals"
rounded:
  control: 6px
  card: 10px
  dialog: 14px
  chip: 999px
spacing:
  unit: 8px
  card-padding: 20px
  page-gutter: 24px
---

# DESIGN.md: SALAM Redesign

## 0. Brief

**Product.** SALAM is the web portal where UIN Sunan Gunung Djati Bandung students check class schedules, attendance (QR), study plan (KRS/IRS), grades, tuition (UKT), print the student card, and register for graduation.

**Audience.** Undergraduate students aged 19 to 22, about half on a laptop and half on a phone, half daily users and half occasional users.

**Primary job of the redesign.** Make the portal trustworthy and fast to scan: the student should know within 5 seconds what happens today, whether their attendance is safe, and whether anything needs action.

**Why redesign (evidence from a 36-respondent usability survey, SUS 72.2, UEQ Novelty 0.40).** The core tasks work (task success above 90%), but respondents reported: inaccurate attendance and confusing QR; dashboard showing wrong numbers (0 SKS, IP 0.00); no way to search; accidental logout; empty, monotone, dated layout; Keuangan shows bills only; slow server at night; account security worry; no deadline reminders; phone experience weaker than laptop (SUS 67.0 vs 76.0).

**Reference screens analysed (original SALAM).** Login, Dashboard Mahasiswa, Absensi Kuliah, Rencana Studi, Tagihan Biaya UKT. Section 7 redesigns each of them and adds search, logout confirmation, scan QR, attendance history, notifications, a server-busy page, and mobile.

**Language.** All UI text in Bahasa Indonesia, sentence case, plain verbs. This file is written in English for the generator.

## 1. Visual theme and atmosphere

Institutional but not stiff. Think "well-run campus administration office", not "startup dashboard". The brand green comes from the SALAM logo (shield with graduation cap, green leaves, dark slate cap and wordmark). The original UI is a dark navy sidebar with saturated cyan, green and orange stat boxes and a green-to-red gradient banner. Replace all of that with a quiet light interface where color carries meaning only.

**Signature element (spend boldness in one place): the "Today rail".** On the dashboard, today's classes appear as a vertical timeline with a live attendance state per class (Belum dimulai, Absen dibuka, Sudah hadir, Terlewat). Everything else stays calm and disciplined.

Mood words: clear, steady, honest about missing data, unhurried.

### 1.1 Logo (must be identical to the original SALAM logo)

The logo is an official asset and must never be redrawn, restyled, or approximated. Three image files are provided with this design (uploaded to the generator as image references): `salam-logo-full-transparent.png` (icon plus wordmark plus subtitle), `salam-logo-icon-transparent.png` (icon only), and `salam-logo-full-white-bg.png` (same on white).

What the logo looks like, so the generator can place it correctly:
- Left: a shield-shaped emblem. A dark slate graduation cap (mortarboard) sits on top. Below it, a book formed by light-green (#8CC43F) page lines. Two medium-green (#588A2A) leaves curve around it from the bottom, like cupped hands.
- Right: the wordmark "SALAM" in widely letter-spaced dark slate (#263235) capital letters, set in a light sans-serif.
- Under the wordmark, the subtitle "Sistem Administrasi Layanan Akademik" in medium green (#588A2A) in a serif face.

Usage rules:
- Use the provided image as-is. Do not recolor, outline, add shadows or gradients, stretch, rotate, crop the shield, or recreate it with shapes or icons.
- Keep clear space around the logo equal to the height of the graduation cap.
- Login: full logo, about 360px wide on desktop.
- Sidebar expanded: full logo scaled to about 160px wide at the top. Sidebar collapsed (icon rail), top bar on mobile, favicon, and bottom of the Menu sheet: icon only.
- Place the logo only on light backgrounds (bg, card, primary-tint). Do not place it on dark or green fills.
- The generator's default placeholder logo must not appear anywhere.
- Source resolution is low (full logo is 526 px wide). Do not enlarge beyond 360px on desktop; replace with the official vector or high-resolution file for the final prototype.

## 2. Color palette and roles

| Token | Hex | Role |
|---|---|---|
| primary | #3F7A1F | Buttons, links, active nav text, focus ring. A darker shade of the logo green so white text passes WCAG AA (about 5.2:1). |
| logo-green | #588A2A | Measured from the SALAM logo and the original LOGIN button. Decorative and brand use only (logo, large shapes, chart fills). White text on it is only about 4.1:1, so do not put small text on it. |
| primary-tint | #E6F0DC | Selected nav item, highlighted rows, hover on light controls |
| leaf | #8CC43F | The light green of the logo leaves. Brand mark only and the 3px active-item indicator bar. Never for text. |
| logo-slate / ink | #263235 | Measured from the logo cap and wordmark. Used as the main text color. |
| ink-muted | #55626A | Secondary text, captions, table meta |
| bg | #F3F5F2 | Page background, a cool pale green-grey (not cream, not pure white) |
| card | #FFFFFF | Cards, sidebar, top bar |
| border | #DCE2DA | 1px borders and dividers |
| success / warning / danger / info | #1F7A4D / #A85F00 / #B3261E / #1F5F8B | Status only, each with a tint for chip and banner backgrounds |

Rules:
- Color encodes meaning only. Never rely on color alone: pair every status with an icon and a text label.
- Attendance thresholds (design proposal, verify against the "Pedoman Akademik"): 85% and above "Aman" (success), 75% to 84% "Perlu perhatian" (warning), below 75% "Berisiko" (danger). The original used red for both 50% and 67%, which made severity unreadable; three clear levels fix that.
- Page background stays flat. No gradients anywhere, including the greeting banner.

## 3. Typography

- One family for everything: **Atkinson Hyperlegible Next** (chosen for legibility in dense tables and on small phone screens). If unavailable in the generator, use Public Sans.
- Scale: Display 28/36 semibold (page title on login), H1 24/32 semibold (page titles), H2 18/26 semibold (card titles), Body 15/24, Table 14/20, Caption 13/18 medium, Stat 32/40 semibold.
- Tabular numerals for every number in tables, stats, and charts so columns align.
- Sentence case everywhere. No ALL-CAPS labels, no tracked-out eyebrow text above headings. Student names are shown in Title Case ("Aisyah Nurfadilah"), not in the source ALL-CAPS.
- Line length under 80 characters for any paragraph.
- Do not join metadata with middle dots or bullets ("A • B • C"). Use separate lines or small labeled fields.

## 4. Layout, shape, elevation

- 8px grid. Page gutter 24px (desktop), 16px (mobile). Card padding 20px.
- Desktop: top bar 64px, sidebar 264px fixed on the left (collapsible to 72px icon rail), content max width 1200px.
- Radii by hierarchy, not one radius for everything: controls 6px, cards 10px, dialogs and sheets 14px, chips fully rounded.
- Elevation: flat. Cards use a 1px border (#DCE2DA) and no shadow. Only dropdowns, the command palette, and dialogs get a soft shadow (0 8px 24px rgba(31,42,48,0.12)).
- Equal-height columns. No large empty areas anywhere. If a column is shorter, the next block moves up or the grid is rebalanced.
- Motion: only in response to user actions (menu expands, dialog opens, scan success confirms). Skeleton shimmer for loading. No entrance animations on page load.

## 5. Information architecture: sidebar (all original menu items kept)

All 11 original items are present with their original labels. They are regrouped under sentence-case group labels so the student can find things without opening menus one by one. Icons: Lucide outline style, 20px.

**Utama**
1. Dashboard (layout-dashboard)
2. Absensi Kuliah (qr-code)

**Akademik**
3. Perkuliahan (graduation-cap), expandable group
   - Rencana Studi
   - Kelulusan
4. Hasil Studi (file-bar-chart), expandable group. Contains KHS; other children follow the real SALAM.
5. Bimbingan Skripsi/Tesis/Disertasi (book-marked)

**Layanan**
6. Pendaftaran (clipboard-pen), expandable group (children follow the real SALAM)
7. Wisuda (award), expandable group (children follow the real SALAM)
8. Keuangan (wallet), expandable group
   - Tagihan Ukt (page has two tabs: Tagihan, Riwayat pembayaran)
9. Cetak KTM (id-card)

**Akun**
10. Akun (user-cog), expandable group (children follow the real SALAM)

**Footer of the sidebar, separated by a divider**
11. Logout (log-out icon, danger-colored text). Never mixed into the navigation list. Always opens a confirmation dialog (see 7.6).

Sidebar behavior:
- Light sidebar (card background), 1px right border. Active item: primary-tint background, primary text, 3px leaf indicator on the left edge. Hover: bg color.
- Expandable groups use a chevron that rotates; only one group is open at a time; the group containing the current page opens automatically.
- Items with unknown children are shown collapsed with a chevron. Do not invent sub-items.
- Top of the sidebar: the original SALAM logo image (section 1.1), full version when expanded, icon only when collapsed. Below it a compact profile row: round avatar, name in Title Case, NIM, and a small "Online" status dot.
- Group labels (Utama, Akademik, Layanan, Akun): 13px medium, ink-muted, sentence case, no uppercase.

**Mobile navigation.** Bottom bar with 5 items: Beranda, Absensi, Akademik, Keuangan, Menu. "Menu" opens a full-height sheet that lists all 11 items in the same groups, with Logout at the bottom. No hamburger-only navigation.

**Global search (Ctrl+K).** Search field in the top bar on every page ("Cari layanan atau informasi..."). It indexes all menu items, sub-pages, and key information (jadwal hari ini, status KRS, tagihan). See 7.6.

## 6. Components

**App bar (top).** Left: page title and breadcrumb. Center or right: search trigger with shortcut hint "Ctrl K". Right: system status chip (see 7.13), semester chip "Semester aktif 2026/2027 Ganjil", notification bell with count badge, avatar. Breadcrumb links (Beranda and above) only navigate; they never log out.

**Stat tile.** Number (Stat style), label, and one line of context. White card with border. A tile shows only data that exists. If the value is not available, it uses the Data state component, never "0".

**Data state (replaces every "0" or blank for missing data).** Five variants:
- Loaded: normal.
- Loading: skeleton blocks matching the final layout.
- Syncing or stale: neutral tint chip "Terakhir diperbarui 07.42 WIB" with a "Muat ulang" text button.
- Not yet available: "Belum tersedia" plus a reason ("Nilai semester berjalan keluar setelah UAS") and what to do.
- Error: danger tint, explains what failed and offers "Coba lagi".

**Status chip.** Icon plus text, pill shape. Variants: Hadir, Belum absen, Terlambat, Tidak ada sesi, Aman, Perlu perhatian, Berisiko, Disetujui, Menunggu.

**Attendance progress.** Slim 8px bar with the percentage number always shown at the right, a text status chip (Aman, Perlu perhatian, Berisiko), and the line "Hadir 5 dari 9 pertemuan, tidak hadir 4".

**Buttons.** Primary (solid primary, white text), Secondary (outlined primary), Tertiary (text), Danger (solid danger, only in destructive confirmations). Height 40px desktop, 48px mobile. Labels are specific verbs: "Scan QR kehadiran", "Cetak KRS", "Muat ulang".

**Inputs.** 44px high, 6px radius, visible label above the field (not floating inside the border), password field with show and hide toggle.

**Banner.** Inline, full width of its container, icon plus message plus optional action. Variants info, warning, danger, success. A situation that is not an error (for example, KRS period closed) uses info, not danger.

**Table.** Sticky header, 14px text, 48px rows, zebra off, row hover uses primary-tint, numeric columns right-aligned with tabular numerals. On mobile, rows become stacked cards. No "Show N entries" control when there are fewer than 25 rows.

**Dialog.** 14px radius, title, one sentence of explanation, secondary button left, primary or danger right.

**Skeleton.** Used for dashboard, tables, and charts during loading, so slow responses feel like progress.

## 7. Screen specifications

### 7.1 Login

Original: logo on the left, form on the right with Username, Password, LOGIN, LOGIN SSO, and a list of five info links.

Redesign (desktop 1440, split layout, vertically centered):
- Left half: bg color with the original SALAM logo image exactly as provided (section 1.1, full version, about 360px wide, never redrawn). One sentence below: "Layanan akademik UIN Sunan Gunung Djati Bandung dalam satu tempat."
- Right half: white card, 400px wide. Title "Masuk ke SALAM" (H1). Fields: Username (hint "NIM untuk mahasiswa"), Password with show and hide toggle and a caps-lock hint, and a right-aligned text link "Lupa password?" under it (3-step flow, see 7.15). Primary button "Masuk", secondary button "Masuk dengan SSO". Both buttons full width, stacked.
- Under the card: "Bantuan dan dokumen" as a plain link list (no repeated info icons): "Dosen masuk dengan akun SIP", "Pedoman MBKM", "Pedoman Akademik", "Panduan Karya Tulis Ilmiah", "Renstra UIN SGD Bandung 2024-2029".
- Inline error under the relevant field, for example "Password salah. Periksa kembali atau gunakan Masuk dengan SSO."
- Do not show any permission pop-up (camera, notification, location) during login. Permissions are requested later in context (see 7.3).
- Small security line under the buttons: "Gunakan alamat resmi SALAM dan jangan bagikan password ke siapa pun."

Mobile 390: single column, logo on top, form below, links in a collapsible "Bantuan dan dokumen".

### 7.2 Dashboard (desktop)

Original problems: green-to-red gradient banner, three saturated stat boxes, "SKS Semester Ini = 0" (while the KRS page shows 23 SKS taken), "IP Semester Terakhir 0.00" (while Rencana Studi shows IP semester sebelumnya 3.74), a chart line that drops to 0 at the current semester, a short "Jadwal Hari Ini" column next to a very long attendance column leaving a large empty block.

Redesign wireframe (content area, 12 columns):

```
[ Greeting row: "Selamat pagi, Aisyah"  | Teknik Informatika, Fakultas Sains dan Teknologi | Semester 5 ]
[ Optional banner: "Absen Interaksi Manusia dan Komputer sedang dibuka, tutup 09.45"  [Scan QR kehadiran] ]
[ IPK 3,51 ][ SKS lulus 84 ][ SKS semester ini 23 dari 24 ][ Tagihan: Tidak ada tagihan aktif ]
+----------------------------------+------------------------------+
| TODAY RAIL (jadwal hari ini)     | Kehadiran berisiko           |
| vertical timeline with states    | (courses below 85%, sorted   |
|                                  |  worst first, max 4, link    |
|                                  |  "Lihat semua kehadiran")    |
+----------------------------------+------------------------------+
| Grafik IP dan IPK per semester   | Ringkasan akademik           |
| (wide)                           | (key-value list)             |
+----------------------------------+------------------------------+
```

Rules:
- Greeting row is plain text on bg, no colored banner. Name in Title Case, first name only in the greeting.
- Four stat tiles in one row, all white with border. Only the numbers use semantic color when needed. "SKS semester ini" must show 23 (derived from the KRS), with a "dari jatah 24" context line.
- A stat that cannot be loaded uses the Data state component, for example IP semester berjalan: "Belum tersedia, nilai keluar setelah UAS". Never show 0.00. Every stat tile and the Ringkasan akademik card carries a small text link "Laporkan data keliru" (see 7.14).
- Today rail: each class is a row on a vertical line. Fields: time range, course name, room, lecturer, and a status chip. The active class is highlighted with primary-tint and shows the "Scan QR kehadiran" button inline. If there are no classes: "Tidak ada kuliah hari ini. Kuliah berikutnya: Kamis 07.00, Jaringan Komputer."
- Kehadiran berisiko replaces the long list of eight bars. It shows only courses below 85%, worst first. The full list lives on the Absensi page.
- Chart: IP semester as a solid primary line, IPK as a dashed info line with direct end labels (not only a legend), y axis 0 to 4. The current semester (20261) is shown as an empty dashed slot labeled "Berjalan", not plotted as 0. Tooltips on hover. A "Lihat sebagai tabel" link for accessibility.
- Ringkasan akademik: key-value pairs (NIM, Program Studi, Angkatan, IP semester terakhir 3,74, Dosen pembimbing akademik). The "IP semester terakhir" shows the last finished semester, not the running one.
- Columns end at the same height. No empty block.

### 7.3 Absensi Kuliah

Original: a "Scan QR Absensi" button above a table of 8 courses, every row says "Tidak ada sesi aktif", plus a "Riwayat" button per row. No guidance on when a session opens, nowhere to see why attendance is wrong.

Redesign (one purpose: mark attendance and trust the record):
- Top card, always visible: "Sesi absen" state.
  - If a session is active: course, lecturer, room, status chip "Belum absen", countdown "Ditutup 14 menit lagi", large primary button "Scan QR kehadiran" (56px high on mobile), next to it a secondary button "Masukkan kode manual" (the fallback when the camera does not work), and a 3-step hint: "Buka kamera", "Arahkan ke QR dosen", "Tunggu tanda hijau".
  - If no session is active: card says "Tidak ada sesi absen aktif" and shows the next session ("Berikutnya: Interaksi Manusia dan Komputer, Rabu 09.30") with a toggle "Ingatkan saya 10 menit sebelum". The Scan QR button stays visible but disabled with the reason beside it.
- Camera permission: tapping Scan QR first shows a small explanation sheet ("Kamera dipakai hanya untuk memindai QR absen") with "Izinkan kamera" and "Batal", before the browser prompt.
- Scan result states: success (green full-width confirmation with course name and timestamp "Hadir tercatat 09.41"), failure (danger tint with a reason such as "QR tidak dikenali atau sesi sudah ditutup", and "Coba lagi"), pending (neutral tint "Menunggu server, absen kamu tersimpan dan dikirim ulang otomatis" [needs backend]).
- Below: "Riwayat kehadiran" table or cards for all 8 courses: course, class, attendance bar with percent, "Hadir x dari y", status chip, and two actions: "Lihat riwayat" and "Ajukan koreksi" (for the case "attended but recorded as 0"). The correction action opens a short form with date, course, and optional note [needs backend].
- Semester chip "Semester 20261" at the top right of the card.

### 7.4 Rencana Studi

Original: an 8-row key-value table, a full-width red banner "Bukan Periode KRS", a "Cetak KRS" button, a DataTables control ("Show All entries" and Search), a wide course table with a horizontal scrollbar, and a footer with Jumlah SKS Diambil 23, Jatah SKS 24, Sisa 1, STATUS IRS "Sudah Disetujui Dosen Wali".

Redesign:
- Page title "Rencana Studi", primary button "Cetak KRS" at the top right.
- Header summary: a compact two-column key-value card (Nama, NIM, Angkatan, Program Studi, Dosen pembimbing akademik, IP semester sebelumnya 3,74, Semester mahasiswa 5). Not an 8-row table.
- Banner (info, not danger): "Periode KRS belum dibuka. Kamu masih bisa melihat dan mencetak KRS semester ini." followed by "Periode berikutnya: [tanggal dari sistem]".
- SKS summary row with three tiles: "SKS diambil 23", "Jatah SKS 24", "Sisa jatah 1", with a progress bar "23 dari 24 SKS", and a status chip "Sudah disetujui dosen wali" (success).
- Toggle: "Tabel" and "Jadwal mingguan". Table view: sticky header, columns No, Mata kuliah (code as small secondary text), Kelas, SKS, Ruang, Hari, Waktu, Dosen. Weekly view: Monday to Friday grid with the 8 courses placed by time.
- Search field for the table. No "Show entries" control. No horizontal scrollbar on desktop; on mobile, rows become stacked cards.

### 7.5 Keuangan (Tagihan Ukt)

Original: cyan info box, a table with columns #, Jenis Tagihan, Tagihan, Potongan, Tunggakan, Keterangan, and the empty text "Tidak Ada Tagihan". Only bills are shown, no payment history, no arrears overview.

Redesign:
- Top summary card with three figures: "Tagihan aktif", "Tunggakan", "Status" (chip: Tidak ada tagihan, Ada tagihan, Ada tunggakan).
- Tabs: "Tagihan" and "Riwayat pembayaran".
- Tagihan tab: if there are bills, a table with checkbox per row (the original asks users to tick items to pay), columns Jenis tagihan, Tagihan, Potongan, Tunggakan, Keterangan, and a sticky footer "Total dipilih Rp 3.000.000" with "Lanjut ke pembayaran" and a short "Cara membayar" side panel. If there are none (the state in the original screenshot): positive empty state "Tidak ada tagihan aktif untuk semester ini" and a link "Lihat riwayat pembayaran".
- Riwayat pembayaran tab: table with tanggal, jenis, nominal in Rupiah, metode, status chip, and "Unduh bukti". Empty state explains what will appear here.
- Design both states (with bills, without bills) for the prototype.

### 7.6 Global search and logout confirmation

**Command palette (Ctrl+K and the top bar field).** Centered overlay 640px wide. Input "Cari layanan atau informasi...". Result groups: Halaman (every sidebar item and sub-item: Dashboard, Absensi Kuliah, Rencana Studi, Kelulusan, Tagihan Ukt, Cetak KTM, and so on), Informasi (jadwal hari ini, status KRS, tagihan aktif, IPK), Terakhir dibuka. Show keyboard hints (arrows to move, Enter to open, Esc to close), highlight matched text, and an empty result with suggestions.

**Logout.** Logout sits only at the bottom of the sidebar (and at the bottom of the mobile Menu sheet and the avatar menu). Clicking it opens a dialog: title "Keluar dari SALAM?", text "Kamu perlu masuk lagi untuk membuka layanan.", buttons "Batal" (secondary) and "Keluar" (danger). The "Kembali ke dashboard" link or breadcrumb is a normal navigation and never triggers logout.

**Account safety cues (proposal, needs backend).** In the avatar menu show "Terakhir masuk: Rabu, 21 Okt 2026 07.12, Chrome di Windows" and a link "Ganti password" in Akun. These respond to the respondents' security concern.

### 7.7 Mobile (390 x 844)

- Bottom navigation with 5 items: Beranda, Absensi, Akademik, Keuangan, Menu. Touch targets at least 48px.
- Beranda: greeting, next class card with "Scan QR kehadiran", Kehadiran berisiko as horizontally scrollable chips, two stat tiles per row, then tagihan.
- Absensi: top session card with a full-width Scan QR button, history as stacked cards.
- Rencana Studi and Keuangan tables become stacked cards.
- Also show a skeleton-loading version of the mobile dashboard.
- Menu sheet: all 11 items in their groups, expandable groups, Logout at the bottom with the same confirmation.

### 7.8 Scan QR (camera view)

Full-screen on mobile, 480px dialog on desktop.
- Top: course name and a close button. Center: camera viewfinder with a square frame and corner marks; hint text under it "Arahkan kamera ke QR dari dosen".
- Bottom: a prominent secondary button "Masukkan kode manual" (alphanumeric code shown by the lecturer; the main fallback when scanning fails), then "Batal", plus a tertiary "Tidak bisa scan? Laporkan masalah" that opens the correction form.
- Camera permission denied state: title "Kamera tidak bisa diakses", text "Izin kamera ditolak. Aktifkan lewat pengaturan browser, atau masukkan kode dari dosen.", primary button "Masukkan kode manual", link "Cara mengaktifkan kamera".
- Manual code state: field "Kode absen" (6 characters, letters and digits, auto-uppercase), hint "Kode ada di layar dosen", button "Kirim kode"; error "Kode salah atau sesi sudah ditutup. Periksa kode dan coba lagi."
- Result states replace the viewfinder: success (check icon, "Hadir tercatat", course, time), failure (reason and "Coba lagi"), pending (neutral, "Tersimpan di perangkat, menunggu koneksi").
- Permission explanation sheet appears before the first camera request (see 7.3).

### 7.9 Riwayat kehadiran per mata kuliah

Opened from "Lihat riwayat" in Absensi Kuliah (original: a "Riwayat" button per row).
- Header: course name, class, lecturer, attendance bar with percent and status chip.
- List of meetings (Pertemuan 1 to N): date, topic if available, status chip (Hadir, Tidak hadir, Izin, Sakit, Belum berlangsung). Meetings recorded as absent show a small "Ajukan koreksi" action.
- Summary strip: "Hadir 5, tidak hadir 4, sisa pertemuan N".

### 7.10 Notification panel

Opens from the bell in the top bar as a 360px dropdown (a bottom sheet on mobile). Grouped by "Hari ini" and "Sebelumnya". Item types: absen dibuka (with "Scan QR kehadiran" action), kehadiran turun di bawah 75%, KRS disetujui dosen wali, tagihan baru. Unread items have a primary dot. Empty state: "Belum ada notifikasi." [needs backend for real notifications]

### 7.11 Server busy and error page

Addresses the "server slow or down at night" finding. Full page inside the app shell (sidebar and top bar stay visible).
- Icon, title "SALAM sedang sibuk", one sentence "Banyak mahasiswa mengakses SALAM saat ini. Coba lagi beberapa saat lagi.", primary button "Muat ulang", and a tertiary link "Kembali ke Dashboard".
- Below, a small neutral line "Data terakhir diperbarui 07.42 WIB" when cached data exists.
- Never show raw error codes as the main message; show the code in small caption text at the bottom.

### 7.12 Pages not shown in the reference screenshots

Kelulusan, Hasil Studi (KHS), Bimbingan Skripsi/Tesis/Disertasi, Cetak KTM, Pendaftaran, Wisuda, and Akun were not provided as screenshots, so they have no detailed spec. If generated, they must reuse the same app shell, page title row, cards, tables, banners, status chips, and Data state component from section 6, and must not introduce new colors or layouts.

### 7.13 Server load, slow, and outage states

Why: 8 respondents (24%) reported a slow or failing server, mainly during KRS (priority table, problem 2). Likely causes: peak load and no loading indicator. The research recommendation is a loading state, a clear system status message, and a queue at peak hours.

Honest scope: these designs do **not** remove the server bottleneck. They reduce uncertainty so students do not think the browser crashed and do not reload repeatedly. Items marked [needs backend] need real status, queue, or cache data to work.

Principles: visibility of system status; say what is happening, how long it may take, and what the student can do; never show a blank page; keep the app shell (sidebar and top bar) real whenever it can load; discourage refresh spam with a visible cooldown.

**Progressive loading ladder** (thresholds are a design proposal based on common response-time limits of about 1 s and 10 s; adjust after testing):

| Elapsed | What the UI shows |
|---|---|
| Under 1 s | Nothing extra |
| 1 to 3 s | Skeleton placeholders matching the final layout |
| 3 to 10 s | Skeleton, thin indeterminate progress bar, info banner "Masih memuat. Server sedang ramai, mohon tunggu." |
| 10 to 30 s | Warning banner "Memuat lebih lama dari biasanya", button "Coba lagi" with a 10-second cooldown countdown, button "Lihat data terakhir" [needs backend: cache] |
| Over 30 s or error | Error card: what failed, what to do, "Coba lagi", "Lihat data terakhir" |

**System status chip (top bar, left of the semester chip).** Four states, each with icon and text: Normal ("SALAM normal", check icon, success), Ramai ("SALAM sedang ramai", clock icon, warning), Gangguan ("Ada gangguan", alert-triangle icon, danger), Pemeliharaan ("Pemeliharaan terjadwal", wrench icon, info). Clicking opens a popover with the per-service status (Dashboard, Absensi Kuliah, Rencana Studi, Keuangan; each Normal, Lambat, or Gangguan) and the last check time. [needs backend]

**Stale data.** When cached data is shown, a persistent warning-tint banner says "Menampilkan data terakhir 07.42 WIB. Data mungkin belum yang terbaru." with "Muat ulang", and each value carries a small clock icon. [needs backend]

**Queue (waiting room).** Standalone page with the logo: "Kamu dalam antrean", position, rounded time estimate ("sekitar 2 menit"), automatic entry, tips not to reload, "Keluar dari antrean". When it is the student's turn: "Sekarang giliranmu" with a 5-second auto-enter. No fake exact progress bar. [needs backend]

**Standalone outage page** (when the app shell cannot load): logo, "SALAM sedang tidak bisa dibuka", what the student can do, "Coba lagi" with cooldown, "Cek status layanan", small error code. A maintenance variant shows the schedule and "SALAM akan dibuka kembali setelah pukul 03.00 WIB."

**KRS under heavy traffic.** On Rencana Studi in an open KRS period: a busy banner, save button states (Simpan KRS, Menyimpan KRS..., timeout, success with timestamp), and the student's selection is never lost on error. Optional card "Jadwal akses KRS" with time slots per angkatan to spread the load; this is a policy proposal. The KRS editing UI is not in the reference screenshots, so only the states are specified.

**Offline.** A neutral banner "Kamu sedang offline. Periksa koneksi internetmu." (a different problem from server load). A scan made offline is kept as "Menunggu koneksi" and sent automatically. [needs backend]

Microcopy (sentence case, no blame, no jokes, no raw error code as the main message):

| State | Title | Message | Action |
|---|---|---|---|
| Ramai | Server sedang menangani lalu lintas tinggi | Halaman mungkin lebih lambat. Tunggu sebentar dan hindari memuat ulang berulang kali. | Lihat status layanan |
| Memuat lama | Memuat lebih lama dari biasanya | Server sedang menangani lalu lintas tinggi. | Coba lagi, Lihat data terakhir |
| Gagal dimuat | Halaman belum bisa dimuat | Server belum merespons. Coba lagi beberapa saat lagi. | Coba lagi |
| Antrean | Kamu dalam antrean | Kamu akan masuk otomatis, jangan tutup tab ini. | Keluar dari antrean |
| Down | SALAM sedang tidak bisa dibuka | Kami belum bisa menampilkan SALAM saat ini. Coba lagi beberapa saat lagi. | Coba lagi |
| Pemeliharaan | SALAM sedang dalam pemeliharaan | SALAM akan dibuka kembali setelah pukul 03.00 WIB. | Muat ulang halaman |
| Offline | Kamu sedang offline | Periksa koneksi internetmu. | Coba lagi |

### 7.14 Laporkan data keliru

Every stat tile and the Ringkasan akademik card carries a small text link "Laporkan data keliru" (the research recommends placing it near the SKS information). It opens a dialog (480px) with at most four fields: "Data yang keliru" (select: SKS semester ini, IPK, IP semester, Kehadiran, Lainnya), "Nilai yang tampil" (read-only, prefilled with what the screen shows and its update time), "Menurut kamu seharusnya" (input), "Catatan" (optional). Buttons "Batal" and "Kirim laporan". Success toast: "Laporan terkirim. Nomor laporan LD-0231." with a link "Lihat laporan saya". [needs backend]

### 7.15 Lupa password

The original reset flow is reported as complicated (priority table, problem 5). Simplified to at most 3 steps, no security questions: (1) "Lupa password?" with Username (NIM) and Email terdaftar, button "Kirim tautan"; (2) "Cek email kamu" with the masked address, 30-minute validity, "Kirim ulang dalam 30 detik" with countdown; (3) "Buat password baru" with two fields, show/hide toggles, one line of rules, button "Simpan password baru", then a success state with "Masuk ke SALAM". [needs backend]

## 8. Data to design change log

| Survey finding | Evidence in screenshot | Change | Type |
|---|---|---|---|
| Attendance inaccurate, QR confusing | Absensi: every row "Tidak ada sesi aktif", no timing, Scan QR button without guidance | Session card with state, countdown, next session, 3-step hint, scan result states, "Ajukan koreksi" | UI plus form, correction needs backend |
| Dashboard data wrong (23 SKS shown as 0, IP 0.00) | Dashboard shows SKS 0 and IP 0.00; Rencana Studi shows 23 SKS and IP 3.74 | Data state component; derive SKS from KRS; chart never plots missing data as 0 | UI, source fix needs backend |
| Server slow or down at night | Not visible in static screens | Skeleton loading, stale-data label, pending-scan state | UI mitigation only (perceived performance) |
| No search, hunting through menus | 11 sidebar items, no search | Global search (Ctrl+K), grouped sidebar | UI |
| Accidental logout, confusing back | Logout inside the main list, directly under Hasil Studi | Logout separated at the bottom, confirmation dialog, breadcrumb never logs out | UI |
| Login permission pop-up | Not visible | No permission requests at login; ask in context with a short explanation | UI |
| Empty center, monotone, dated UI | Dashboard: short Jadwal column beside long Progress column; saturated blue, green, orange boxes; gradient banner | Balanced grid, Today rail, Kehadiran berisiko, flat calm palette | UI |
| Inconsistent progress colors | 50% red, 67% red, 75% orange, 88% green | Three-level threshold with text status chips | UI |
| Keuangan only shows bills | Tagihan Biaya UKT with empty table | Summary card, Tagihan and Riwayat tabs, arrears figure | UI, data needs backend |
| Security concern (account broken into) | Login only shows basic form | Show and hide password, safety line, last-login info, password change link | Mixed, last-login needs backend |
| Wants deadline reminders | None | Active-session banner, "Ingatkan saya" toggle, notification bell | UI, push needs backend |
| Weaker mobile experience (SUS 67.0) | Desktop-only table layouts | Mobile-first screens, bottom navigation, stacked cards | UI |
| KRS closed shown as an error | Full-width red banner "Bukan Periode KRS" | Info banner with the next period | UI |
| Server slow or down, worst during KRS (8 respondents, 24%) | Not visible in static screens; no loading indicator reported | System status chip, progressive loading ladder, skeletons, stale-data banner, queue, standalone outage page, KRS save states (7.13) | UI mitigation; status, queue, and cache need backend |
| QR fails, no alternative (10 respondents, 29%) | Absensi page offers only "Scan QR Absensi" | Manual code fallback, camera-permission-denied state, clear error reasons (7.8) | UI plus backend for code validation |
| Wrong data, no way to report (4 respondents, 12%) | Dashboard shows 0 SKS and 0.00 | "Laporkan data keliru" link and dialog, update time on every data block (7.14) | UI, reports need backend |
| Complicated forgot-password flow | Login has no visible reset path | "Lupa password?" link and a 3-step reset flow (7.15) | UI, reset needs backend |

## 9. Mock data (fictional, use exactly)

The original screenshots contain a real student's name, NIM, and photo. Replace them with the following fictional data in every screen.

- Student: Aisyah Nurfadilah, NIM 1247050001, S1 Teknik Informatika, Fakultas Sains dan Teknologi, angkatan 2024, semester 5, IPK 3,51, SKS lulus 84, SKS semester ini 23, jatah SKS 24, IP semester sebelumnya 3,74. Dosen pembimbing akademik: Dr. Hendra Gunawan, M.T. Avatar: neutral initials "AN" on primary-tint.
- Top bar chip: "Semester aktif 2026/2027 Ganjil" (code 20261). Today is Rabu (Wednesday).
- Semesters for the chart: 20241 IP 3,20 and IPK 3,20; 20242 IP 3,15 and IPK 3,17; 20251 IP 3,85 and IPK 3,44; 20252 IP 3,74 and IPK 3,51; 20261 berjalan (no value).
- Courses (all kelas B except where noted), with attendance:

| Mata kuliah | SKS | Hari dan waktu | Ruang | Kehadiran |
|---|---|---|---|---|
| Manajemen Basis Data | 3 | Senin 07.00-09.30 | R.4.09 | 5 dari 9, 56% |
| Manajemen Proyek Perangkat Lunak | 3 | Senin 09.30-12.00 | R.4.01 | 6 dari 8, 75% |
| Intelegensia Buatan | 3 | Selasa 12.40-15.10 | R.4.10 | 8 dari 8, 100% |
| Kewirausahaan dan Etika Bisnis (kelas A) | 2 | Selasa 10.20-12.00 | R.4.11 | 7 dari 8, 88% |
| Interaksi Manusia dan Komputer | 3 | Rabu 09.30-12.00 | R.4.01 | 5 dari 5, 100% |
| Jaringan Komputer | 3 | Kamis 07.00-09.30 | R.4.10 | 3 dari 6, 50% |
| Pengembangan Aplikasi Mobile | 3 | Kamis 12.40-15.10 | R.4.12 | 4 dari 6, 67% |
| Pengembangan Aplikasi Web | 3 | Jumat 09.30-12.00 | R.3.9 | 4 dari 4, 100% |

- Lecturers (fictional): Dr. Rina Kusumawardani, M.Kom.; Agus Prasetyo, M.T.; Dr. Hendra Gunawan, M.T.; Siti Marlina, M.Kom.; Budi Santoso, S.T., M.Cs.; Dewi Anggraeni, M.T.; Rahmat Hidayat, M.Kom.; Nurul Hikmah, M.Si.
- Example UKT bill for the "with bills" state: "UKT Semester 5, Tagihan Rp 3.000.000, Potongan Rp 0, Tunggakan Rp 0". Payment history: two or three past semesters with status "Lunas".
- Keep course codes (for example 20100470501032) only as small secondary text, hidden on mobile cards.

## 10. Do's and don'ts

Do:
- One primary action per screen, visually dominant.
- Show system status honestly: loading, syncing, unavailable, success, failure.
- Keep all 11 sidebar items with their original labels.
- Use specific button labels and the same word for an action everywhere.
- Meet WCAG AA contrast and show a visible keyboard focus ring (2px primary, 2px offset).
- Show numbers with units and context ("23 dari 24 SKS").

Don't:
- No purple or blue gradients, no gradient banners, no glassmorphism, no neon glow.
- No warm cream background with terracotta accent, no near-black background with an acid accent.
- No saturated multicolor stat boxes.
- No emoji as icons; no stock illustrations of people; no decorative blobs.
- No row of identical cards used as filler; do not use one radius and one shadow everywhere.
- No ALL-CAPS eyebrow labels, no middle-dot metadata strings, no arrows appended to button text.
- No "0" for missing data. No red for a situation that is not an error.
- No lorem ipsum, no real student data.
- No numbered markers (01, 02, 03) unless the content is a real sequence (for example the 3 QR steps).

## 11. Responsive behavior

- Breakpoints: mobile under 768px, tablet 768 to 1199px, desktop 1200px and up.
- Desktop: fixed sidebar. Tablet: sidebar collapses to a 72px icon rail with tooltips. Mobile: bottom navigation plus the Menu sheet.
- Tables become stacked cards on mobile; charts keep a minimum height of 220px and can scroll horizontally inside their own container; the page body never scrolls sideways.
- Touch targets at least 48px on mobile, at least 40px on desktop.

## 12. Agent prompt guide

Before the first screen, upload the three logo files (section 1.1) as image references and state: "Use the uploaded SALAM logo image exactly as provided; never redraw it." Repeat this sentence in the login and dashboard requests.

Generate one screen per request, in this order, and apply this file strictly each time:
1. Dashboard desktop (7.2), including the Data state "belum tersedia" tile.
2. Absensi Kuliah desktop (7.3), two variants: session active, no session.
3. Rencana Studi desktop (7.4).
4. Keuangan desktop (7.5), two variants: with bills, without bills.
5. Login desktop (7.1).
6. Command palette overlay and logout dialog (7.6).
7. Scan QR (7.8) and Riwayat kehadiran per mata kuliah (7.9).
8. Notification panel (7.10) and Server busy page (7.11).
9. Mobile: dashboard, dashboard loading skeleton, Absensi, Menu sheet (7.7).
10. Server load and outage states (7.13): Prompts 16 to 22 in PROMPTS.md.
11. Lapor data keliru (7.14) and Lupa password (7.15): Prompts 23 and 24.

Request template: "Create the [screen name] for SALAM Redesign following DESIGN.md section [number]. Use the fictional data from section 9. All UI text in Bahasa Indonesia."

Iteration prompts (one change at a time):
- "Make the Scan QR kehadiran button larger and move the 3-step hint under it."
- "Reduce the visual weight of the stat tiles; keep the border, remove any fill."
- "Replace any gradient or saturated fill with the flat palette from section 2."
- "Check that every sidebar item from section 5 is present and in the right group."
