import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminLogin: React.FC = () => {
const navigate = useNavigate();

const [username, setUsername] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [error, setError] = useState<string>("");
const [loading, setLoading] = useState<boolean>(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
setError("");
setLoading(true);


try {
  const res = await fetch("http://localhost:5000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!data.success) {
    setError(data.message || "Login failed");
    setLoading(false);
    return;
  }

  navigate("/admin/dashboard");
} catch (err) {
  setError("Server not reachable");
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-slate-950 text-white">
{/* Left branding section (desktop only) */} <div className="relative hidden lg:flex items-center justify-center overflow-hidden"> <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-indigo-600/30" />

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-md text-center p-6"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-6xl mb-4"
      >
        🚀
      </motion.div>

      <h1 className="text-4xl font-bold mb-3 tracking-tight">
        Welcome to <span className="text-cyan-400">ServerWale</span>
      </h1>
      <p className="text-slate-300 text-sm">
        Secure company access to manage your infrastructure.
      </p>
    </motion.div>
  </div>

  {/* Login Form section */}
  <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8"
    >
      {/* Mobile branding */}
      <div className="lg:hidden text-center mb-6">
        <div className="text-4xl mb-2">🚀</div>
        <h1 className="text-xl font-semibold">
          Welcome to <span className="text-cyan-400">ServerWale</span>
        </h1>
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">Company Login</h2>
        <p className="text-slate-400 text-sm mt-1">Sign in to continue</p>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2 text-center">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1 text-slate-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-lg disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ServerWale
      </div>
    </motion.div>
  </div>

  <Outlet />
</div>


);
};

export default AdminLogin;
