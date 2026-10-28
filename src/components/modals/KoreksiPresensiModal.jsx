import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const KoreksiPresensiModal = () => {
  const {
    koreksiModalOpen,
    setKoreksiModalOpen,
    selectedMeetingForCorrection,
    submitKoreksi,
  } = useApp();

  const [reason, setReason] = useState('Hadir tetapi QR scanner tidak berhasil memindai');
  const [note, setNote] = useState('');

  if (!koreksiModalOpen || !selectedMeetingForCorrection) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitKoreksi({
      meetingNumber: selectedMeetingForCorrection.meeting,
      note: `${reason}. Catatan: ${note}`,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-in"
      onClick={() => setKoreksiModalOpen(false)}
    >
      <div
        className="bg-card w-full max-w-[460px] rounded-xl shadow-2xl border border-border p-6 flex flex-col gap-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">edit_note</span>
            <h3 className="text-[17px] font-semibold text-ink">Ajukan Koreksi Presensi</h3>
          </div>
          <button
            type="button"
            onClick={() => setKoreksiModalOpen(false)}
            className="p-1 rounded-full text-ink-muted hover:bg-bg hover:text-ink"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-3 bg-bg border border-border rounded-lg text-[13px] flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-ink-muted">Mata Kuliah:</span>
            <span className="font-semibold text-ink">Jaringan Komputer (Kelas B)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Pertemuan:</span>
            <span className="font-semibold text-ink">
              Pertemuan {selectedMeetingForCorrection.meeting} ({selectedMeetingForCorrection.date})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Status Saat Ini:</span>
            <span className="font-semibold text-danger">Tercatat Alpa / Tidak Hadir</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1">
              Alasan Pengajuan Koreksi
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary"
            >
              <option value="Hadir tetapi QR scanner tidak berhasil memindai">
                Hadir di kelas tetapi QR scanner gagal memindai
              </option>
              <option value="Jaringan internet kampus terputus saat memindai">
                Jaringan internet kampus terputus saat memindai
              </option>
              <option value="Surat Izin / Dispensasi kegiatan universitas">
                Surat Izin / Dispensasi kegiatan universitas
              </option>
              <option value="Sakit disertai surat keterangan dokter">
                Sakit disertai surat keterangan dokter
              </option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1">
              Catatan untuk Dosen Pengampu (Cecep Nurul Alam M.T.)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Jelaskan detail kehadiran kamu di kelas saat sesi tersebut..."
              className="w-full p-3 bg-card border border-border rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => setKoreksiModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-border text-ink hover:bg-bg text-[13px] font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold"
            >
              Kirim Pengajuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
