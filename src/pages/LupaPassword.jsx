import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const LupaPassword = () => {
  const { setCurrentPage, showToast } = useApp();
  const [step, setStep] = useState(1); // 1 | 2 | 3 | 4 (Success)
  const [nim, setNim] = useState('1247050001');
  const [email, setEmail] = useState('aisyah.nurfadilah@uinsgd.ac.id');
  const [countdown, setCountdown] = useState(30);

  // Step 3 fields
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState('');

  // Countdown timer for Step 2 resend
  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleStep1 = (e) => {
    e.preventDefault();
    setStep(2);
    setCountdown(30);
    showToast('Tautan pemulihan kata sandi telah dikirim ke email terdaftar kamu', 'info');
  };

  const handleStep3 = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPassError('Password minimal 8 karakter');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError('Konfirmasi password tidak cocok');
      return;
    }
    setStep(4);
    showToast('Password baru berhasil disimpan. Silakan masuk kembali.', 'success');
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between p-4 sm:p-6 lg:p-12 animate-fade-in">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[480px] bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-5">
          {/* Brand header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <img
              src="/assets/salam-logo-full.svg"
              alt="SALAM logo"
              className="h-8 w-auto object-contain cursor-pointer"
              onClick={() => setCurrentPage('login')}
            />
            <span className="text-[12px] font-bold text-primary">Pemulihan Akun</span>
          </div>

          {/* Stepper indicator */}
          <div className="flex items-center justify-between px-2 text-[12px] text-ink-muted">
            <span className={step >= 1 ? 'font-bold text-primary' : ''}>1. Kirim Tautan</span>
            <span className="text-border">&gt;</span>
            <span className={step >= 2 ? 'font-bold text-primary' : ''}>2. Cek Email</span>
            <span className="text-border">&gt;</span>
            <span className={step >= 3 ? 'font-bold text-primary' : ''}>3. Password Baru</span>
          </div>

          {/* STEP 1: Form Kirim Tautan */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="flex flex-col gap-4">
              <div>
                <h2 className="text-[20px] font-bold text-ink">Lupa Password SALAM?</h2>
                <p className="text-[13px] text-ink-muted mt-1 leading-relaxed">
                  Masukkan NIM dan alamat email kampus kamu yang terdaftar untuk menerima tautan reset kata sandi tanpa pertanyaan keamanan rumit.
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1">Nomor Induk Mahasiswa (NIM)</label>
                <input
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 bg-card border border-border rounded-lg text-[14px] text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1">Email Terdaftar (@uinsgd.ac.id)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 bg-card border border-border rounded-lg text-[14px] text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-bold text-[14px] rounded-lg transition-colors cursor-pointer"
                >
                  Kirim Tautan Pemulihan
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('login')}
                  className="w-full py-2 text-ink-muted hover:text-ink text-[13px] font-semibold"
                >
                  Kembali ke Halaman Masuk
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Cek Email */}
          {step === 2 && (
            <div className="flex flex-col gap-4 text-center items-center py-2">
              <div className="w-16 h-16 rounded-full bg-primary-tint text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">mark_email_read</span>
              </div>

              <div>
                <h2 className="text-[20px] font-bold text-ink">Cek Email Kamu</h2>
                <p className="text-[13px] text-ink-muted mt-1.5 leading-relaxed max-w-sm">
                  Kami telah mengirimkan tautan reset kata sandi ke alamat email:
                </p>
                <span className="inline-block mt-1 font-mono font-bold text-ink bg-bg px-3 py-1 rounded-md text-[13px]">
                  ai*******@uinsgd.ac.id
                </span>
                <p className="text-[11px] text-ink-muted mt-2">
                  Tautan berlaku selama 30 menit. Periksa folder Spam jika belum tiba.
                </p>
              </div>

              <div className="w-full flex flex-col gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-bold text-[14px] rounded-lg transition-colors shadow-sm"
                >
                  Simulasikan Klik Tautan Email (Langkah 3)
                </button>

                <button
                  type="button"
                  disabled={countdown > 0}
                  onClick={() => {
                    setCountdown(30);
                    showToast('Tautan pemulihan dikirim ulang', 'info');
                  }}
                  className={`w-full py-2.5 text-[13px] font-semibold rounded-lg border border-border ${
                    countdown > 0 ? 'text-ink-muted bg-bg cursor-not-allowed' : 'text-primary hover:bg-bg'
                  }`}
                >
                  {countdown > 0 ? `Kirim ulang dalam ${countdown} detik` : 'Kirim Ulang Tautan'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Buat Password Baru */}
          {step === 3 && (
            <form onSubmit={handleStep3} className="flex flex-col gap-4">
              <div>
                <h2 className="text-[20px] font-bold text-ink">Buat Password Baru</h2>
                <p className="text-[13px] text-ink-muted mt-1 leading-relaxed">
                  Tentukan kata sandi baru untuk akun NIM 1247050001
                </p>
              </div>

              {passError && (
                <div className="p-3 bg-danger-tint border border-danger/30 rounded-lg text-danger text-[12px] font-semibold">
                  {passError}
                </div>
              )}

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1">Password Baru</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPassError('');
                  }}
                  required
                  placeholder="Minimal 8 karakter"
                  className="w-full h-11 px-3.5 bg-card border border-border rounded-lg text-[14px] text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1">Konfirmasi Password Baru</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPassError('');
                  }}
                  required
                  placeholder="Ulangi kata sandi baru"
                  className="w-full h-11 px-3.5 bg-card border border-border rounded-lg text-[14px] text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-[12px] text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPass}
                  onChange={(e) => setShowPass(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>Tampilkan karakter password</span>
              </label>

              <div className="p-3 bg-bg rounded-lg text-[11px] text-ink-muted space-y-1">
                <p className="font-semibold text-ink">Syarat kata sandi yang aman:</p>
                <p>• Minimal 8 karakter kombinasi huruf dan angka</p>
                <p>• Tidak menggunakan tanggal lahir atau NIM berulang</p>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-bold text-[14px] rounded-lg transition-colors cursor-pointer mt-2"
              >
                Simpan Password Baru
              </button>
            </form>
          )}

          {/* STEP 4: Success State */}
          {step === 4 && (
            <div className="flex flex-col gap-4 text-center items-center py-4">
              <div className="w-16 h-16 rounded-full bg-success-tint text-success flex items-center justify-center">
                <span className="material-symbols-outlined text-[40px]">check_circle</span>
              </div>
              <div>
                <h2 className="text-[20px] font-bold text-ink">Password Berhasil Diperbarui!</h2>
                <p className="text-[13px] text-ink-muted mt-1 leading-relaxed max-w-sm">
                  Kata sandi baru telah disimpan di sistem autentikasi UIN SGD. Kamu sekarang dapat masuk ke akun SALAM.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage('login')}
                className="w-full mt-2 h-11 bg-primary hover:bg-primary-hover text-white font-bold text-[14px] rounded-lg transition-colors"
              >
                Masuk ke SALAM Sekarang
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

