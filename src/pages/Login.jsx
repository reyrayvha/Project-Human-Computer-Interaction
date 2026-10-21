import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Login = () => {
  const { handleLogin, setCurrentPage, showToast } = useApp();
  const [username, setUsername] = useState('1247050001');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [capsLock, setCapsLock] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Masukkan NIM atau Username kamu');
      return;
    }
    if (!password.trim()) {
      setError('Masukkan password akun kamu');
      return;
    }
    // Simulation: if password is "salah", show wrong password state matching mockup
    if (password === 'salah') {
      setError('Password salah. Periksa kembali atau gunakan Masuk dengan SSO.');
      return;
    }

    handleLogin('Berhasil masuk ke portal SALAM. Selamat datang!');
  };

  const handleKeyUp = (e) => {
    if (e.getModifierState) {
      setCapsLock(e.getModifierState('CapsLock'));
    }
  };

  const hasError = error.length > 0;

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between selection:bg-primary-tint selection:text-primary animate-fade-in">
      {/* Mobile Top Bar with Institutional Context (matches mobile mockup) */}
      <header className="py-3 px-4 flex items-center justify-between border-b border-border/60 bg-bg lg:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="text-xs font-semibold text-ink">UIN Sunan Gunung Djati</span>
        </div>
        <span className="text-[11px] font-medium text-ink-muted">Portal Resmi</span>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Official Logo and Institution Tagline */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-8">
            <div className="mb-6">
              <img
                src="/assets/salam-logo-full.svg"
                alt="SALAM UIN Sunan Gunung Djati Bandung"
                className="w-[280px] sm:w-[360px] max-w-full h-auto object-contain block"
              />
            </div>
            <p className="text-[16px] sm:text-[17px] leading-relaxed text-ink font-medium max-w-md">
              Layanan akademik UIN Sunan Gunung Djati Bandung dalam satu tempat.
            </p>
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border/80 w-full max-w-md hidden sm:block">
              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-xs text-ink-muted">
                <span className="material-symbols-outlined text-[18px] text-logo-green shrink-0">verified_user</span>
                <span>Koneksi aman terenkripsi SSL ke server universitas</span>
              </div>
            </div>
          </div>

          {/* Right Column: Login Card & Help Links */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-center">
            <div className="w-full max-w-[400px]">
              
              {/* White Card */}
              <div className="bg-card rounded-[10px] border border-border p-5 sm:p-7 shadow-none">
                <h1 className="text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] font-semibold text-ink mb-5 sm:mb-6">
                  Masuk ke SALAM
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Username Field */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-ink mb-1.5">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError('');
                      }}
                      placeholder="Masukkan NIM atau NIP"
                      className="w-full h-11 px-3.5 rounded-[6px] border border-border bg-card text-ink text-[15px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-ink-muted/60"
                    />
                    <p className="mt-1.5 text-xs text-ink-muted">
                      NIM untuk mahasiswa
                    </p>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className={`block text-sm font-medium mb-1.5 ${hasError ? 'text-danger' : 'text-ink'}`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError('');
                        }}
                        onKeyUp={handleKeyUp}
                        placeholder="Masukkan password"
                        className={`w-full h-11 pl-3.5 pr-11 rounded-[6px] border text-[15px] focus:outline-none focus:ring-2 transition-all placeholder:text-ink-muted/60 ${
                          hasError
                            ? 'border-danger bg-danger-tint/20 text-ink focus:border-danger focus:ring-danger/20'
                            : 'border-border bg-card text-ink focus:border-primary focus:ring-primary/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                        className={`absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors cursor-pointer ${
                          hasError ? 'text-danger hover:opacity-80' : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>

                    {/* Inline Error Message matching mockup */}
                    {hasError && (
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-danger leading-relaxed">
                        <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">warning</span>
                        <span>{error}</span>
                      </div>
                    )}

                    {/* CapsLock Warning */}
                    {capsLock && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-warning font-medium">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        <span>Caps Lock aktif</span>
                      </div>
                    )}

                    {/* Forgot Password Link */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-ink-muted"></span>
                      <button
                        type="button"
                        onClick={() => setCurrentPage('lupa-password')}
                        className="text-xs font-medium text-primary hover:text-primary-hover hover:underline ml-auto cursor-pointer"
                      >
                        Lupa password?
                      </button>
                    </div>
                  </div>

                  {/* Buttons Stack */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-semibold text-[15px] rounded-[6px] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      Masuk
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLogin('Berhasil masuk via Single Sign-On (SSO) UIN SGD')}
                      className="w-full h-11 bg-transparent hover:bg-primary-tint/50 text-primary font-semibold text-[15px] rounded-[6px] border border-primary flex items-center justify-center transition-colors cursor-pointer"
                    >
                      Masuk dengan SSO
                    </button>
                  </div>

                  {/* Security Line */}
                  <div className="pt-3 border-t border-border mt-4">
                    <p className="text-xs text-ink-muted leading-relaxed text-center">
                      Gunakan alamat resmi SALAM dan jangan bagikan password ke siapa pun.
                    </p>
                  </div>
                </form>
              </div>

              {/* Bantuan dan Dokumen Section */}
              <div className="mt-6 pt-2">
                <h2 className="text-xs font-semibold text-ink-muted tracking-wide mb-2.5">
                  Bantuan dan dokumen
                </h2>
                <ul className="space-y-1.5 text-xs text-ink">
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Tautan portal SIP untuk Dosen Pengampu', 'info');
                      }}
                      className="text-ink hover:text-primary hover:underline transition-colors block py-0.5"
                    >
                      Dosen masuk dengan akun SIP
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Pedoman MBKM 2026 UIN SGD Bandung', 'info');
                      }}
                      className="text-ink hover:text-primary hover:underline transition-colors block py-0.5"
                    >
                      Pedoman MBKM
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Pedoman Akademik Mahasiswa UIN Sunan Gunung Djati', 'info');
                      }}
                      className="text-ink hover:text-primary hover:underline transition-colors block py-0.5"
                    >
                      Pedoman Akademik
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Panduan Pengisian Kartu Rencana Studi (KRS)', 'info');
                      }}
                      className="text-ink hover:text-primary hover:underline transition-colors block py-0.5"
                    >
                      Panduan KRS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Panduan Penulisan Karya Tulis Ilmiah (KTI)', 'info');
                      }}
                      className="text-ink hover:text-primary hover:underline transition-colors block py-0.5"
                    >
                      Karya Tulis Ilmiah
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-ink-muted py-6">
        &copy; 2026 PTIPD UIN Sunan Gunung Djati Bandung. Seluruh hak cipta dilindungi.
      </footer>
    </div>
  );
};
