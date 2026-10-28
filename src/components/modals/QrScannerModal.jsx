import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const QrScannerModal = () => {
  const {
    qrScannerOpen,
    setQrScannerOpen,
    qrCameraPermission,
    setQrCameraPermission,
    qrStep,
    setQrStep,
    markAttendanceSuccess,
    isOfflineMode,
    showToast,
  } = useApp();

  const [manualCode, setManualCode] = useState('');
  const [manualError, setManualError] = useState('');

  if (!qrScannerOpen) return null;

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim().length !== 6) {
      setManualError('Kode presensi harus 6 digit huruf/angka');
      return;
    }
    if (isOfflineMode) {
      setQrStep('offline_pending');
      showToast('Absensi manual tersimpan secara offline di perangkat', 'warning');
      return;
    }
    markAttendanceSuccess('Interaksi Manusia dan Komputer');
    setQrStep('success');
  };

  const handleScanSimulate = () => {
    if (isOfflineMode) {
      setQrStep('offline_pending');
      showToast('Presensi QR tersimpan offline, menunggu koneksi server', 'warning');
      return;
    }
    markAttendanceSuccess('Interaksi Manusia dan Komputer');
    setQrStep('success');
  };

  const closeModal = () => {
    setQrScannerOpen(false);
    setQrStep('viewfinder');
    setManualCode('');
    setManualError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-ink/75 backdrop-blur-sm animate-fade-in"
      onClick={closeModal}
    >
      <div
        className="bg-card w-full h-full md:h-auto md:max-w-[480px] md:rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-card shrink-0">
          <div>
            <h3 className="text-[16px] font-semibold text-ink leading-tight">
              Scan Presensi QR Kuliah
            </h3>
            <p className="text-[12px] text-ink-muted">Interaksi Manusia dan Komputer (R.4.01)</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1 rounded-full text-ink-muted hover:bg-bg hover:text-ink"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Dynamic Content Views */}
        <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto bg-card">
          {/* Permission Explanation Step */}
          {qrCameraPermission === 'prompt' && (
            <div className="flex flex-col items-center justify-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-tint text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">videocam</span>
              </div>
              <div>
                <h4 className="text-[18px] font-semibold text-ink">Izin Akses Kamera</h4>
                <p className="text-[13px] text-ink-muted mt-1 max-w-xs leading-relaxed">
                  SALAM membutuhkan izin kamera perangkat kamu khusus untuk memindai QR Code presensi yang ditampilkan dosen.
                </p>
              </div>
              <div className="flex flex-col w-full gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setQrCameraPermission('granted')}
                  className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-[14px] hover:bg-primary-hover"
                >
                  Izinkan Kamera
                </button>
                <button
                  type="button"
                  onClick={() => setQrStep('manual')}
                  className="w-full py-2.5 rounded-lg border border-border text-ink font-medium text-[14px] hover:bg-bg"
                >
                  Gunakan Kode Manual Saja
                </button>
              </div>
            </div>
          )}

          {/* Camera Permission Denied Step */}
          {qrCameraPermission === 'denied' && (
            <div className="flex flex-col items-center justify-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-danger-tint text-danger flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">videocam_off</span>
              </div>
              <div>
                <h4 className="text-[18px] font-semibold text-ink">Kamera Tidak Bisa Diakses</h4>
                <p className="text-[13px] text-ink-muted mt-1 max-w-xs leading-relaxed">
                  Izin kamera diblokir oleh browser. Aktifkan perizinan di pengaturan situs, atau masukkan kode 6-digit dari dosen.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQrStep('manual')}
                className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-[14px]"
              >
                Masukkan Kode Manual
              </button>
            </div>
          )}

          {/* Viewfinder Step (Camera View) */}
          {qrCameraPermission === 'granted' && qrStep === 'viewfinder' && (
            <div className="flex flex-col items-center justify-between h-full gap-5">
              {/* Camera Simulation Box */}
              <div className="relative w-full aspect-square max-w-[340px] bg-ink rounded-xl overflow-hidden flex items-center justify-center border-2 border-border shadow-inner">
                {/* Simulated Camera Video Pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black opacity-90"></div>

                {/* Animated Scanner Laser */}
                <div className="absolute left-6 right-6 h-0.5 bg-leaf shadow-[0_0_12px_#8CC43F] animate-bounce"></div>

                {/* Corner Guides */}
                <div className="relative w-56 h-56 border-2 border-dashed border-white/40 rounded-lg flex flex-col justify-between p-2">
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-t-2 border-l-2 border-leaf"></span>
                    <span className="w-4 h-4 border-t-2 border-r-2 border-leaf"></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-b-2 border-l-2 border-leaf"></span>
                    <span className="w-4 h-4 border-b-2 border-r-2 border-leaf"></span>
                  </div>
                </div>

                <div className="absolute bottom-3 px-3 py-1 bg-black/60 rounded-full text-white text-[11px] font-medium backdrop-blur-sm">
                  Arahkan kamera ke QR dosen
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleScanSimulate}
                  className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                  <span>Simulasikan Scan QR Berhasil</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQrStep('manual')}
                  className="w-full py-2.5 rounded-lg border border-primary text-primary hover:bg-primary-tint font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">keyboard</span>
                  <span>Masukkan Kode Manual (Fallback)</span>
                </button>
              </div>
            </div>
          )}

          {/* Manual Code Fallback Step */}
          {qrStep === 'manual' && (
            <form onSubmit={handleManualSubmit} className="flex flex-col justify-between h-full gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary font-semibold text-[15px]">
                  <span className="material-symbols-outlined text-[22px]">pin</span>
                  <span>Input Kode Presensi Manual</span>
                </div>
                <p className="text-[13px] text-ink-muted leading-relaxed">
                  Jika QR Code pada layar proyektor tidak terbaca kamera, minta 6 karakter kode alfanumerik yang ditampilkan dosen pengampu.
                </p>

                <div className="mt-2">
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">
                    Kode Presensi (6 Karakter)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={manualCode}
                    onChange={(e) => {
                      setManualCode(e.target.value.toUpperCase());
                      setManualError('');
                    }}
                    placeholder="Contoh: IMK882"
                    className="w-full h-12 px-4 text-center text-[22px] tracking-widest font-mono font-bold bg-card border-2 border-border rounded-lg text-ink focus:border-primary focus:outline-none uppercase"
                  />
                  {manualError && (
                    <p className="text-danger text-[12px] mt-1.5 font-medium">{manualError}</p>
                  )}
                  <p className="text-[11px] text-ink-muted mt-1.5">
                    Kode bersifat peka waktu dan dibuat unik per sesi kuliah.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] flex items-center justify-center gap-2"
                >
                  <span>Kirim Kode Presensi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQrStep('viewfinder')}
                  className="w-full py-2.5 rounded-lg border border-border text-ink hover:bg-bg font-medium text-[13px]"
                >
                  Kembali ke Kamera Scanner
                </button>
              </div>
            </form>
          )}

          {/* Success Step */}
          {qrStep === 'success' && (
            <div className="flex flex-col items-center justify-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-success-tint text-success flex items-center justify-center animate-scale-up">
                <span className="material-symbols-outlined text-[40px]">check_circle</span>
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-success-tint text-success font-semibold text-[12px] mb-2">
                  Presensi Terverifikasi
                </span>
                <h4 className="text-[20px] font-bold text-ink">Hadir Tercatat!</h4>
                <p className="text-[14px] font-medium text-primary mt-1">
                  Interaksi Manusia dan Komputer (Kelas B)
                </p>
                <p className="text-[12px] text-ink-muted mt-1">
                  Waktu: Rabu, 18 Oktober 2026 • 09.41 WIB
                </p>
              </div>

              <div className="w-full p-3.5 bg-bg border border-border rounded-xl text-left text-[12px] flex flex-col gap-1 mt-2">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Status Kehadiran:</span>
                  <span className="font-semibold text-success">Hadir (100% Aman)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Dosen Pengampu:</span>
                  <span className="text-ink font-medium">Dr. Cepy Slamet S.T., M.Kom.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-full mt-2 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-[14px]"
              >
                Selesai & Tutup
              </button>
            </div>
          )}

          {/* Offline Pending Step */}
          {qrStep === 'offline_pending' && (
            <div className="flex flex-col items-center justify-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-warning-tint text-warning flex items-center justify-center animate-scale-up">
                <span className="material-symbols-outlined text-[40px]">cloud_off</span>
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-warning-tint text-warning font-semibold text-[12px] mb-2">
                  Tersimpan di Perangkat
                </span>
                <h4 className="text-[18px] font-bold text-ink">Menunggu Sambungan Server</h4>
                <p className="text-[13px] text-ink-muted mt-1 max-w-xs leading-relaxed">
                  Perangkat kamu saat ini sedang offline. Data presensi telah disimpan secara aman di cache browser dan akan otomatis disinkronkan saat terhubung ke internet.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-full mt-2 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-[14px]"
              >
                Mengerti
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
