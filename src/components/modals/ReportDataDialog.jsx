import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const ReportDataDialog = () => {
  const { reportDialogOpen, setReportDialogOpen, reportContextData, submitReport } = useApp();
  const [dataType, setDataType] = useState('SKS semester ini');
  const [currentValue, setCurrentValue] = useState('23 SKS');
  const [proposedValue, setProposedValue] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (reportContextData) {
      setDataType(reportContextData.title || 'SKS semester ini');
      setCurrentValue(reportContextData.value || '23 SKS');
      setProposedValue('');
      setNote('');
      setError('');
    }
  }, [reportContextData]);

  if (!reportDialogOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proposedValue.trim()) {
      setError('Mohon isi perkiraan nilai yang seharusnya');
      return;
    }
    submitReport({
      dataType,
      currentValue,
      proposedValue: proposedValue.trim(),
      note: note.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-in"
      onClick={() => setReportDialogOpen(false)}
    >
      <div
        className="bg-card w-full max-w-[480px] rounded-xl shadow-2xl border border-border p-6 flex flex-col gap-5 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-warning text-[24px]">flag</span>
            <h3 className="text-[18px] font-semibold text-ink">Laporkan data keliru</h3>
          </div>
          <button
            type="button"
            onClick={() => setReportDialogOpen(false)}
            className="p-1 rounded-full text-ink-muted hover:bg-bg hover:text-ink"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-[13px] text-ink-muted leading-relaxed">
          Gunakan formulir ini jika terdapat perbedaan antara data di portal SALAM dengan dokumen perkuliahan resmi kamu. Laporan akan ditinjau langsung oleh Biro Administrasi Akademik (BAAK).
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Field 1: Data yang keliru */}
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1">
              Data yang keliru
            </label>
            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border rounded-lg text-[14px] text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="SKS semester ini">SKS semester ini</option>
              <option value="IPK kumulatif">IPK kumulatif</option>
              <option value="IP semester sebelumnya">IP semester sebelumnya</option>
              <option value="Kehadiran presensi kuliah">Kehadiran presensi kuliah</option>
              <option value="Status tagihan UKT">Status tagihan UKT</option>
              <option value="Data mata kuliah KRS">Data mata kuliah KRS</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Field 2: Nilai yang tampil saat ini (Readonly) */}
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1">
              Nilai yang tampil saat ini
            </label>
            <div className="h-10 px-3 bg-bg border border-border rounded-lg text-[14px] text-ink-muted flex items-center justify-between">
              <span>{currentValue}</span>
              <span className="text-[11px] text-ink-muted/80">Diperbarui hari ini 07.42 WIB</span>
            </div>
          </div>

          {/* Field 3: Menurut kamu seharusnya */}
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1">
              Menurut kamu seharusnya <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={proposedValue}
              onChange={(e) => {
                setProposedValue(e.target.value);
                setError('');
              }}
              placeholder="Contoh: 24 SKS, IP 3.80, atau Hadir 6 kali"
              className="w-full h-10 px-3 bg-card border border-border rounded-lg text-[14px] text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {error && <p className="text-danger text-[12px] mt-1">{error}</p>}
          </div>

          {/* Field 4: Catatan atau bukti */}
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1">
              Catatan penjelasan (opsional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Berikan keterangan singkat atau nomor referensi KRS/KHS..."
              className="w-full p-3 bg-card border border-border rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setReportDialogOpen(false)}
              className="px-4 py-2 rounded-lg border border-border text-ink hover:bg-bg transition-colors font-medium text-[14px]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors font-semibold text-[14px]"
            >
              Kirim laporan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
