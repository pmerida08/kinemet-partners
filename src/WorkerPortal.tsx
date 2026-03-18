import { useState, type FormEvent } from "react";
import { Lock, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";
import CRMDashboard from "./CRMDashboard";

const WORKER_PASSWORD = "kinemet2026";

interface WorkerPortalProps {
  onClose: () => void;
}

export default function WorkerPortal({ onClose }: WorkerPortalProps) {
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === WORKER_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Contraseña incorrecta. Inténtalo de nuevo.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPassword("");
    }
  };

  if (authenticated) {
    return <CRMDashboard onLogout={onClose} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors text-sm flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10"
      >
        ← Volver al sitio
      </button>

      {/* Login Card */}
      <div
        className="w-full max-w-sm rounded-3xl p-8 border border-white/10 shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#E63946] flex items-center justify-center shadow-lg shadow-[#E63946]/30 mb-4">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Panel Interno
          </h1>
          <p className="text-white/40 text-sm mt-1.5 text-center">
            Acceso exclusivo para el equipo de Kinemet Partners
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className={shaking ? "animate-[shake_0.4s_ease]" : ""}
        >
          <div className="mb-5">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                autoFocus
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3.5 rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-white/20 text-sm outline-none focus:border-[#E63946]/60 transition-all"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-0.5"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-xs text-red-400 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#E63946] hover:bg-[#c0303c] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#E63946]/20 flex items-center justify-center gap-2"
          >
            <LogIn size={16} />
            Acceder al Panel
          </button>
        </form>

        <p className="mt-6 text-center text-white/20 text-xs">
          Kinemet Partners · Uso interno
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
