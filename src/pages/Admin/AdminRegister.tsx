import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm_password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.full_name.trim()) {
      setError('Full Name is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Invalid email');
      return;
    }

    if (form.password.length < 8) {
      setError('Password minimum 8 characters');
      return;
    }

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await adminApi.register(form);
      const admin = response.data.admin || { role: 'admin' };
      window.localStorage.setItem('smart_restaurant_admin_token', response.data.token);
      window.localStorage.setItem('smart_restaurant_admin_role', admin.role || 'admin');
      window.localStorage.setItem('smart_restaurant_admin_user', JSON.stringify(admin));
      setSuccess(response.data.message || 'Admin registered successfully');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur">
        <h1 className="text-3xl font-semibold">Create Admin Account</h1>
        <p className="mt-2 text-sm text-slate-400">Only authorized administrators can create a portal account.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" placeholder="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" type="password" placeholder="Confirm Password" value={form.confirm_password} onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} />
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-400">{success}</p> : null}
          <button disabled={loading} className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Creating account...' : 'Register'}</button>
        </form>
        <Link to="/admin/login" className="mt-4 inline-block text-sm text-cyan-400">Back to login</Link>
      </div>
    </div>
  );
};

export default AdminRegister;
