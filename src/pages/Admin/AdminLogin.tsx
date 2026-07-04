import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await adminApi.login({ email, password });
      const admin = response.data.admin || { role: 'admin' };
      window.localStorage.setItem('smart_restaurant_admin_token', response.data.token);
      window.localStorage.setItem('smart_restaurant_admin_role', admin.role || 'admin');
      window.localStorage.setItem('smart_restaurant_admin_user', JSON.stringify(admin));
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] p-6 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl lg:flex-row">
        <div className="flex-1 p-8 lg:p-12">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Smart Restaurant</p>
            <h1 className="mt-3 text-4xl font-semibold">Admin Portal</h1>
            <p className="mt-3 text-sm text-slate-300">Secure, modern access for restaurant operations and reporting.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none ring-0" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none ring-0" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error ? <p className="text-sm text-rose-400">{error}</p> : null}
            <button disabled={loading} className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
            <Link to="/admin/register" className="text-cyan-400 hover:underline">Create account</Link>
            <Link to="/admin/forgot-password" className="hover:underline">Forgot password?</Link>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 p-8 lg:p-12">
          <h2 className="text-2xl font-semibold">Operations at a glance</h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>• Manage reservations and approvals</li>
            <li>• Track daily orders and payments</li>
            <li>• Review customers and sales insights</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
