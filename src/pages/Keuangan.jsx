import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockPaymentHistory } from '../data/mockData';

export const Keuangan = () => {
  const {
    uktState,
    setUktState,
    uktActiveTab,
    setUktActiveTab,
    showToast,
    setReportDialogOpen,
    setReportContextData,
  } = useApp();

  const [selectedBills, setSelectedBills] = useState(['ukt-sem-5']);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showFeeBreakdownModal, setShowFeeBreakdownModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(null);
  const [selectedBank, setSelectedBank] = useState('BSI');

  const toggleBillSelection = (id) => {
    setSelectedBills((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleReport = (title, value) => {
    setReportContextData({ title, value });
    setReportDialogOpen(true);
  };

  const totalSelected = selectedBills.length > 0 ? 3000000 : 0;

  const banks = [
    { id: 'BSI', name: 'BSI', desc: 'Bank Syariah Indonesia', iconColor: 'text-teal-600', vaPrefix: '8001' },
    { id: 'Mandiri', name: 'Mandiri', desc: 'Bank Mandiri', iconColor: 'text-blue-600', vaPrefix: '8872' },
    { id: 'BRI', name: 'BRI', desc: 'Bank Rakyat Indonesia', iconColor: 'text-blue-700', vaPrefix: '1029' },
    { id: 'BTN', name: 'BTN Syariah', desc: 'Tabungan Negara', iconColor: 'text-emerald-700', vaPrefix: '9903' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-ink tracking-tight">
            Tagihan Ukt
          </h1>
          <p className="text-[13px] text-ink-muted mt-0.5">
            Informasi kewajiban pembayaran Uang Kuliah Tunggal (UKT) dan riwayat transaksi mahasiswa
          </p>
        </div>

        {/* Right Header Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Semester Badge Card */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs text-[13px] font-medium text-ink card-interactive">
            <span className="material-symbols-outlined text-[18px] text-primary">school</span>
            <span>Semester 20261 (Ganjil)</span>
          </div>

          {/* Laporkan Data Keliru */}
          <button
            type="button"
            onClick={() => handleReport('Tagihan UKT', 'UKT Semester 5 (20261)')}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">help</span>
            <span>Laporkan data keliru</span>
          </button>

          {/* Discreet State Switcher for HCI Demonstration */}
          <button
            type="button"
            onClick={() => setUktState(uktState === 'tanpa_tagihan' ? 'ada_tagihan' : 'tanpa_tagihan')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-colors ${
              uktState === 'ada_tagihan'
                ? 'bg-warning-tint text-warning border-warning/40'
                : 'bg-success-tint text-success border-success/40'
            }`}
            title="Klik untuk menguji simulasi: Tagihan Aktif vs Lunas"
          >
            {uktState === 'ada_tagihan' ? 'Demo: Ada Tagihan' : 'Demo: Lunas (Nol)'}
          </button>
        </div>
      </div>

      {/* 2. Top Summary 3 Key Figure Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Figure 1: TAGIHAN AKTIF */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm card-interactive animate-card-enter card-stagger-1 flex flex-col justify-between h-[152px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
              TAGIHAN AKTIF
            </span>
            <span className="material-symbols-outlined text-ink-muted text-[20px]">
              receipt_long
            </span>
          </div>
          <div>
            <p className="text-[28px] sm:text-[32px] font-bold text-ink tracking-tight font-mono">
              {uktState === 'ada_tagihan' ? 'Rp 3.000.000' : 'Rp 0'}
            </p>
          </div>
          <p className="text-[12px] text-ink-muted">
            {uktState === 'ada_tagihan' ? '1 tagihan belum dibayar' : 'Semua tagihan semester aktif telah lunas'}
          </p>
        </div>

        {/* Figure 2: TUNGGAKAN */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm card-interactive animate-card-enter card-stagger-2 flex flex-col justify-between h-[152px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
              TUNGGAKAN
            </span>
            <span className="material-symbols-outlined text-ink-muted text-[20px]">
              update
            </span>
          </div>
          <div>
            <p className="text-[28px] sm:text-[32px] font-bold text-ink tracking-tight font-mono">
              Tidak ada
            </p>
          </div>
          <p className="text-[12px] text-success font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">check</span>
            <span>Tidak ada tunggakan semester lampau</span>
          </p>
        </div>

        {/* Figure 3: STATUS PEMBAYARAN */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm card-interactive animate-card-enter card-stagger-3 flex flex-col justify-between h-[152px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
              STATUS PEMBAYARAN
            </span>
            <span className="material-symbols-outlined text-ink-muted text-[20px]">
              schedule
            </span>
          </div>
          <div>
            {uktState === 'ada_tagihan' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-warning-tint text-warning font-bold text-[13px]">
                <span className="material-symbols-outlined text-[15px]">priority_high</span>
                <span>Ada tagihan aktif</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-success-tint text-success font-bold text-[13px]">
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>Lunas & Bebas Tagihan</span>
              </span>
            )}
          </div>
          <p className="text-[12px] text-ink-muted">
            {uktState === 'ada_tagihan'
              ? 'Segera lakukan pembayaran sebelum batas jatuh tempo'
              : 'Status kelayakan akademik telah terverifikasi penuh'}
          </p>
        </div>
      </div>

      {/* 3. Tabs Navigation & Academic Year Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-0">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setUktActiveTab('tagihan')}
            className={`pb-3 text-[14px] transition-all relative flex items-center gap-2 cursor-pointer ${
              uktActiveTab === 'tagihan'
                ? 'text-ink border-b-2 border-primary font-bold'
                : 'text-ink-muted hover:text-ink font-medium'
            }`}
          >
            <span>Tagihan</span>
            <span className="px-2 py-0.5 rounded-full bg-primary-tint text-primary text-[11px] font-bold">
              {uktState === 'ada_tagihan' ? '1' : '0'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setUktActiveTab('riwayat')}
            className={`pb-3 text-[14px] transition-all relative flex items-center gap-2 cursor-pointer ${
              uktActiveTab === 'riwayat'
                ? 'text-ink border-b-2 border-primary font-bold'
                : 'text-ink-muted hover:text-ink font-medium'
            }`}
          >
            <span>Riwayat pembayaran</span>
            <span className="text-ink-muted text-[12px] font-medium">
              {mockPaymentHistory.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 pb-3 text-[13px] text-ink-muted">
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>
            Tahun Akademik: <strong className="text-ink font-bold">2026/2027 Ganjil</strong>
          </span>
        </div>
      </div>

      {/* 4. Tab 1: TAGIHAN */}
      {uktActiveTab === 'tagihan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Daftar Tagihan Semester & Verifikasi Otomatis */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {uktState === 'ada_tagihan' ? (
              /* Active Bill Card */
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden card-interactive animate-card-enter card-stagger-4">
                {/* Header inside card */}
                <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-card">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      payments
                    </span>
                    <h3 className="font-bold text-[15px] text-ink">
                      Daftar Tagihan Semester
                    </h3>
                  </div>
                  <span className="text-[12px] text-ink-muted">
                    {selectedBills.length} dari 1 item dipilih
                  </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px] text-left border-collapse">
                    <thead className="bg-bg/60 text-ink-muted text-[12px] font-bold border-b border-border">
                      <tr>
                        <th className="py-3 px-4 w-12 text-center">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedBills(selectedBills.length > 0 ? [] : ['ukt-sem-5'])
                            }
                            className="w-4 h-4 rounded bg-primary text-white flex items-center justify-center cursor-pointer mx-auto text-[11px]"
                            title="Pilih semua"
                          >
                            {selectedBills.length > 0 ? '✓' : ''}
                          </button>
                        </th>
                        <th className="py-3 px-4">Jenis Tagihan</th>
                        <th className="py-3 px-4 text-right">Tagihan</th>
                        <th className="py-3 px-4 text-right">Potongan</th>
                        <th className="py-3 px-4 text-right">Tunggakan</th>
                        <th className="py-3 px-4">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      <tr
                        className={`transition-colors cursor-pointer ${
                          selectedBills.includes('ukt-sem-5')
                            ? 'bg-primary-tint/10 hover:bg-primary-tint/20'
                            : 'hover:bg-bg'
                        }`}
                        onClick={() => toggleBillSelection('ukt-sem-5')}
                      >
                        <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => toggleBillSelection('ukt-sem-5')}
                            className={`w-4 h-4 rounded flex items-center justify-center cursor-pointer mx-auto text-[11px] ${
                              selectedBills.includes('ukt-sem-5')
                                ? 'bg-primary text-white'
                                : 'border border-border bg-card'
                            }`}
                          >
                            {selectedBills.includes('ukt-sem-5') ? '✓' : ''}
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-ink leading-tight text-[14px]">
                            UKT Semester 5
                          </p>
                          <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                            Sarjana S1 Reguler • SK Rektor No. 421/2026
                          </p>
                          <p className="text-[11px] text-ink-muted font-mono leading-none mt-0.5">
                            Kode Rekening: 411210.01
                          </p>
                        </td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-ink">
                          Rp 3.000.000
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-ink-muted">Rp 0</td>
                        <td className="py-4 px-4 text-right font-mono text-ink-muted">Rp 0</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning-tint text-warning border border-warning/30 text-[11px] font-semibold whitespace-nowrap">
                            <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                            <span>Jatuh tempo 10 September 2026</span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bottom Action Strip */}
                <div className="p-4 sm:p-5 bg-card border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[12px] text-ink-muted block">
                      Total yang akan dibayarkan:
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-[24px] font-bold text-ink font-mono tracking-tight">
                        Rp {selectedBills.length > 0 ? '3.000.000' : '0'}
                      </span>
                      <span className="text-[12px] text-ink-muted">
                        ({selectedBills.length} tagihan dipilih)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowFeeBreakdownModal(true)}
                      className="px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-bg text-ink text-[13px] font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-ink-muted">
                        description
                      </span>
                      <span>Rincian Biaya</span>
                    </button>

                    <button
                      type="button"
                      disabled={selectedBills.length === 0}
                      onClick={() => setShowPaymentModal(true)}
                      className={`px-5 py-2.5 rounded-lg text-white font-bold text-[13px] transition-colors flex items-center gap-2 shadow-sm ${
                        selectedBills.length > 0
                          ? 'bg-[#2F6016] hover:bg-[#254C11] cursor-pointer'
                          : 'bg-border text-ink-muted cursor-not-allowed'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        payments
                      </span>
                      <span>Lanjut ke pembayaran</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Clean Paid State */
              <div className="bg-card border border-border rounded-xl p-10 sm:p-14 text-center flex flex-col items-center justify-center shadow-sm card-interactive">
                <div className="w-16 h-16 rounded-full bg-success-tint text-success flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="text-[20px] font-bold text-ink">
                  Tidak Ada Tagihan Aktif untuk Semester Ini
                </h3>
                <p className="text-[14px] text-ink-muted max-w-md mt-1.5 leading-relaxed">
                  Kewajiban UKT Semester 5 (2026/2027 Ganjil) kamu telah berstatus <strong className="text-success">LUNAS</strong>. Kamu dapat mengikuti perkuliahan dan UAS tanpa kendala administrasi keuangan.
                </p>

                <button
                  type="button"
                  onClick={() => setUktActiveTab('riwayat')}
                  className="mt-6 px-5 py-2.5 rounded-lg bg-primary-tint hover:bg-primary/20 text-primary font-bold text-[13px] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  <span>Lihat Riwayat & Unduh Kuitansi Bukti Bayar</span>
                </button>
              </div>
            )}

            {/* Card: Verifikasi Administrasi Otomatis */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-start gap-3.5 card-interactive animate-card-enter card-stagger-5">
              <div className="w-10 h-10 rounded-lg bg-success-tint text-success flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-ink">
                  Verifikasi Administrasi Otomatis
                </h4>
                <p className="text-[13px] text-ink-muted leading-relaxed mt-1">
                  Setelah pembayaran berhasil diverifikasi sistem mitra perbankan, status akademik Anda akan otomatis aktif untuk pengisian KRS secara seketika tanpa perlu menyerahkan kuitansi fisik.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Cara Membayar & Bantuan */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Card 1: Cara Membayar */}
            <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm flex flex-col gap-4 card-interactive animate-card-enter card-stagger-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  help
                </span>
                <h3 className="font-bold text-[15px] text-ink">
                  Cara Membayar
                </h3>
              </div>

              {/* 3 Steps */}
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success-tint text-success text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink">
                      Pilih tagihan yang ingin dibayar
                    </h4>
                    <p className="text-[12px] text-ink-muted leading-relaxed mt-0.5">
                      Centang kotak pada baris tagihan yang tersedia pada tabel.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success-tint text-success text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink">
                      Lanjut ke pembayaran
                    </h4>
                    <p className="text-[12px] text-ink-muted leading-relaxed mt-0.5">
                      Klik tombol bayar untuk mendapatkan nomor Virtual Account atau kode bayar bank mitra.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success-tint text-success text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink">
                      Unduh bukti pembayaran
                    </h4>
                    <p className="text-[12px] text-ink-muted leading-relaxed mt-0.5">
                      Simpan resi transaksi resmi pada tab Riwayat Pembayaran setelah proses selesai.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Mitra Resmi */}
              <div className="border-t border-border pt-4">
                <h5 className="text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-2.5">
                  BANK MITRA RESMI
                </h5>
                <div className="grid grid-cols-2 gap-2.5">
                  {banks.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => {
                        setSelectedBank(b.id);
                        setShowPaymentModal(true);
                      }}
                      className="bg-bg border border-border/80 rounded-lg p-2.5 flex items-center gap-2.5 item-interactive cursor-pointer"
                    >
                      <span className={`material-symbols-outlined text-[20px] ${b.iconColor}`}>
                        account_balance
                      </span>
                      <div>
                        <p className="font-bold text-[12px] text-ink leading-tight">{b.name}</p>
                        <span className="text-[10px] text-ink-muted block leading-none mt-0.5">
                          {b.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Bantuan & Penyesuaian UKT */}
            <div className="bg-info-tint/30 border border-info/20 rounded-xl p-5 shadow-sm flex flex-col gap-2.5 card-interactive animate-card-enter card-stagger-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-info text-[20px]">
                  support_agent
                </span>
                <h4 className="text-[14px] font-bold text-ink">
                  Bantuan & Penyesuaian UKT
                </h4>
              </div>
              <p className="text-[12px] text-ink-muted leading-relaxed">
                Butuh penyesuaian UKT atau pengajuan cicilan? Hubungi Bagian Keuangan Rektorat lantai 2 atau gunakan layanan helpdesk resmi universitas.
              </p>
              <button
                type="button"
                onClick={() => showToast('Membuka helpdesk layanan keuangan universitas...', 'info')}
                className="text-[12px] font-bold text-info hover:underline inline-flex items-center gap-1 self-start mt-1 cursor-pointer"
              >
                <span>Buka Helpdesk Keuangan</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 2: RIWAYAT PEMBAYARAN */}
      {uktActiveTab === 'riwayat' && (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden card-interactive animate-card-enter">
          <div className="p-4 sm:p-5 border-b border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-[16px] text-ink">
                Riwayat Transaksi & Bukti Pembayaran Resmi
              </h3>
              <p className="text-[12px] text-ink-muted mt-0.5">
                Total {mockPaymentHistory.length} transaksi pembayaran terverifikasi otomatis oleh perbankan mitra
              </p>
            </div>

            <button
              type="button"
              onClick={() => showToast('Seluruh arsip bukti kuitansi (ZIP) berhasil diunduh', 'success')}
              className="px-4 py-2 rounded-lg bg-bg border border-border hover:bg-card text-ink text-[12px] font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">folder_zip</span>
              <span>Unduh Semua Kuitansi</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead className="bg-bg text-ink-muted text-[12px] font-bold uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="py-3 px-4">Semester</th>
                  <th className="py-3 px-4">Tanggal Transaksi</th>
                  <th className="py-3 px-4 text-right">Nominal</th>
                  <th className="py-3 px-4">Kanal / Bank</th>
                  <th className="py-3 px-4">No. Referensi</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Dokumen Kuitansi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {mockPaymentHistory.map((trx) => (
                  <tr key={trx.id} className="hover:bg-primary-tint/15 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink">{trx.semesterLabel}</td>
                    <td className="py-3.5 px-4 text-ink-muted">{trx.tanggal}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-ink">
                      Rp {trx.nominal.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-ink font-medium">{trx.metode}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-ink-muted">
                      {trx.nomorReferensi}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-success-tint text-success font-bold text-[11px]">
                        <span className="material-symbols-outlined text-[13px]">check</span>
                        <span>{trx.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setShowReceiptModal(trx)}
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        <span>Unduh Bukti</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rincian Biaya Modal */}
      {showFeeBreakdownModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowFeeBreakdownModal(false)}
        >
          <div
            className="bg-card w-full max-w-[500px] rounded-xl shadow-2xl border border-border p-6 flex flex-col gap-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">description</span>
                <h3 className="text-[17px] font-bold text-ink">Rincian Komponen Biaya UKT</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFeeBreakdownModal(false)}
                className="p-1 rounded-full text-ink-muted hover:bg-bg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="p-3 bg-bg rounded-lg space-y-1">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Mahasiswa:</span>
                  <span className="font-bold text-ink">Aisyah Nurfadilah (1227050001)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Program Studi:</span>
                  <span className="text-ink">Teknik Informatika (S1 Reguler)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Golongan UKT:</span>
                  <span className="font-bold text-primary">Golongan V (Kelompok Reguler)</span>
                </div>
              </div>

              <div className="space-y-2 divide-y divide-border/60">
                <div className="flex justify-between pt-2">
                  <span className="text-ink">UKT Pokok Perkuliahan & Pengajaran</span>
                  <span className="font-mono font-bold text-ink">Rp 3.000.000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-ink">Praktikum Laboratorium Komputer</span>
                  <span className="text-success font-semibold">Rp 0 (Termasuk)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-ink">Akses Perpustakaan & Jurnal Internasional</span>
                  <span className="text-success font-semibold">Rp 0 (Gratis)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-ink">Asuransi Kesehatan Mahasiswa</span>
                  <span className="text-success font-semibold">Rp 0 (Disubsidi)</span>
                </div>
                <div className="flex justify-between pt-2 font-bold text-[14px]">
                  <span>Total Tagihan Bersih:</span>
                  <span className="text-primary font-mono">Rp 3.000.000</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setShowFeeBreakdownModal(false)}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-[13px] font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Guide & VA Instructions Modal */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="bg-card w-full max-w-[520px] rounded-xl shadow-2xl border border-border p-6 flex flex-col gap-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">account_balance</span>
                <h3 className="text-[18px] font-bold text-ink">Tata Cara Pembayaran UKT</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="p-1 rounded-full text-ink-muted hover:bg-bg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Bank Selector inside modal */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-ink-muted font-medium">Kanal Bank:</span>
              <div className="flex items-center gap-1.5">
                {banks.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBank(b.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors cursor-pointer ${
                      selectedBank === b.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-card text-ink border-border hover:bg-bg'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-primary-tint/40 border border-primary/20 rounded-xl flex flex-col gap-1.5">
              <span className="text-[12px] text-ink-muted">
                Nomor Virtual Account {selectedBank}:
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[22px] font-bold text-primary tracking-wider">
                  {selectedBank === 'BSI' && '8001 1247 0500 01'}
                  {selectedBank === 'Mandiri' && '8872 1247 0500 01'}
                  {selectedBank === 'BRI' && '1029 1247 0500 01'}
                  {selectedBank === 'BTN' && '9903 1247 0500 01'}
                </span>
                <button
                  type="button"
                  onClick={() => showToast(`Nomor Virtual Account ${selectedBank} disalin ke clipboard`, 'success')}
                  className="px-2.5 py-1 rounded bg-card border border-border text-[11px] font-bold text-ink hover:bg-bg cursor-pointer"
                >
                  Salin
                </button>
              </div>
              <div className="flex justify-between items-center text-[11px] text-ink-muted pt-1">
                <span>Atas nama: Aisyah Nurfadilah</span>
                <span className="font-bold text-ink font-mono">Rp 3.000.000</span>
              </div>
            </div>

            <div className="space-y-2 text-[13px] text-ink">
              <p className="font-bold">Panduan Pembayaran Melalui {selectedBank}:</p>
              <div className="space-y-1.5 text-ink-muted text-[12px]">
                <p>1. Buka aplikasi Mobile Banking {selectedBank} atau kunjungi ATM terdekat.</p>
                <p>2. Pilih menu <strong>Pembayaran &gt; Pendidikan / Akademik &gt; UIN SGD Bandung</strong>.</p>
                <p>3. Masukkan nomor Virtual Account di atas dan periksa kesesuaian nama &amp; nominal tagihan.</p>
                <p>4. Konfirmasi transaksi dan simpan bukti pembayaran resmi.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[13px] font-bold cursor-pointer"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Preview Modal */}
      {showReceiptModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowReceiptModal(null)}
        >
          <div
            className="bg-card w-full max-w-[480px] rounded-xl shadow-2xl border border-border p-6 flex flex-col gap-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-success text-[24px]">receipt</span>
                <h3 className="text-[18px] font-bold text-ink">Kuitansi Resmi Pembayaran UKT</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiptModal(null)}
                className="p-1 rounded-full text-ink-muted hover:bg-bg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 bg-bg border border-border rounded-xl text-[13px] space-y-2">
              <div className="flex justify-between">
                <span className="text-ink-muted">Semester:</span>
                <span className="font-bold text-ink">{showReceiptModal.semesterLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Nomor Transaksi:</span>
                <span className="font-mono text-ink">{showReceiptModal.nomorReferensi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Waktu Bayar:</span>
                <span className="text-ink">{showReceiptModal.tanggal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Kanal:</span>
                <span className="text-ink font-medium">{showReceiptModal.metode}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-ink-muted font-bold">Total Lunas:</span>
                <span className="font-mono text-[16px] font-bold text-success">
                  Rp {showReceiptModal.nominal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReceiptModal(null)}
                className="px-4 py-2 rounded-lg border border-border text-ink hover:bg-bg text-[13px] cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('Kuitansi PDF resmi berhasil diunduh ke perangkat', 'success');
                  setShowReceiptModal(null);
                }}
                className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-[13px] flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Unduh File Kuitansi PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
