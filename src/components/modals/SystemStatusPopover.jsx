import React from 'react';
import { useApp } from '../../context/AppContext';

export const SystemStatusPopover = () => {
  const {
    systemStatusPopoverOpen,
    setSystemStatusPopoverOpen,
    serverCondition,
    setServerCondition,
    showToast,
  } = useApp();

  if (!systemStatusPopoverOpen) return null;

  const services = [
    {
      name: 'Dashboard & Ringkasan Akademik',
      status: serverCondition === 'gangguan' ? 'Gangguan' : serverCondition === 'ramai' ? 'Lambat' : 'Normal',
      badgeCls:
        serverCondition === 'gangguan'
          ? 'bg-danger-tint text-danger'
          : serverCondition === 'ramai'
          ? 'bg-warning-tint text-warning'
          : 'bg-success-tint text-success',
    },
    {
      name: 'Presensi & QR Scanner Perkuliahan',
      status: serverCondition === 'gangguan' ? 'Gangguan' : 'Normal',
      badgeCls:
        serverCondition === 'gangguan' ? 'bg-danger-tint text-danger' : 'bg-success-tint text-success',
    },
    {
      name: 'Sistem Rencana Studi (KRS)',
      status:
        serverCondition === 'ramai'
          ? 'Beban Tinggi'
          : serverCondition === 'pemeliharaan'
          ? 'Pemeliharaan'
          : 'Normal',
      badgeCls:
        serverCondition === 'ramai'
          ? 'bg-warning-tint text-warning'
          : serverCondition === 'pemeliharaan'
          ? 'bg-info-tint text-info'
          : 'bg-success-tint text-success',
    },
    {
      name: 'Integrasi Tagihan UKT & VA Bank',
      status: 'Normal',
      badgeCls: 'bg-success-tint text-success',
    },
  ];

  const handleSimulateStatus = (status) => {
    setServerCondition(status);
    showToast(`Status sistem diubah menjadi: ${status.toUpperCase()}`, 'info');
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={() => setSystemStatusPopoverOpen(false)}
      />
      <div className="absolute right-12 md:right-36 top-16 mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-4 border-b border-border bg-bg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">dns</span>
            <span className="font-semibold text-ink text-[15px]">Status Infrastruktur SALAM</span>
          </div>
          <span className="text-[11px] text-ink-muted">Pembaruan tiap 60 dtk</span>
        </div>

        {/* Per-service breakdown */}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2.5 divide-y divide-border/60">
            {services.map((svc) => (
              <div key={svc.name} className="pt-2 flex items-center justify-between">
                <span className="text-[13px] text-ink font-medium truncate max-w-[210px]">
                  {svc.name}
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${svc.badgeCls}`}>
                  {svc.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
            <span>Latensi server: <strong className="text-ink">142 ms</strong></span>
            <span>Uptime: <strong className="text-ink">99.8%</strong></span>
          </div>
        </div>

        {/* Demo Switcher for Presenter / Evaluator */}
        <div className="p-3 bg-bg border-t border-border">
          <p className="text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-2">
            Simulasi Kondisi Server (Demo HCI):
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleSimulateStatus('normal')}
              className={`px-2 py-1.5 rounded text-[12px] font-medium border text-center transition-colors ${
                serverCondition === 'normal'
                  ? 'bg-success text-white border-success'
                  : 'bg-card text-ink border-border hover:bg-success-tint'
              }`}
            >
              SALAM Normal
            </button>
            <button
              type="button"
              onClick={() => handleSimulateStatus('ramai')}
              className={`px-2 py-1.5 rounded text-[12px] font-medium border text-center transition-colors ${
                serverCondition === 'ramai'
                  ? 'bg-warning text-white border-warning'
                  : 'bg-card text-ink border-border hover:bg-warning-tint'
              }`}
            >
              Server Ramai
            </button>
            <button
              type="button"
              onClick={() => handleSimulateStatus('gangguan')}
              className={`px-2 py-1.5 rounded text-[12px] font-medium border text-center transition-colors ${
                serverCondition === 'gangguan'
                  ? 'bg-danger text-white border-danger'
                  : 'bg-card text-ink border-border hover:bg-danger-tint'
              }`}
            >
              Ada Gangguan
            </button>
            <button
              type="button"
              onClick={() => handleSimulateStatus('pemeliharaan')}
              className={`px-2 py-1.5 rounded text-[12px] font-medium border text-center transition-colors ${
                serverCondition === 'pemeliharaan'
                  ? 'bg-info text-white border-info'
                  : 'bg-card text-ink border-border hover:bg-info-tint'
              }`}
            >
              Pemeliharaan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
