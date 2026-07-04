import { useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await adminApi.forgotPassword({ email });
      setMessage(response.data.message);
    } catch {
      setMessage('Unable to process password reset request.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10">
        <h1 className="text-3xl font-semibold">Reset Admin Password</h1>
        <p className="mt-2 text-sm text-slate-400">Enter the admin email to receive reset instructions.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {message ? <p className="text-sm text-cyan-400">{message}</p> : null}
          <button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Send Reset Link</button>
        </form>
        <Link to="/admin/login" className="mt-4 inline-block text-sm text-cyan-400">Back to login</Link>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
