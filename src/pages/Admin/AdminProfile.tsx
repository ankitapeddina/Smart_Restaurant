import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ full_name: '', email: '' });
  const [passwords, setPasswords] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('smart_restaurant_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    adminApi.profile()
      .then((response) => {
        const admin = response.data.admin || {};
        setProfile({ full_name: admin.name || '', email: admin.email || '' });
      })
      .catch(() => navigate('/admin/login'));
  }, [navigate]);

  const handleProfileSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      await adminApi.updateProfile({ full_name: profile.full_name, email: profile.email });
      setMessage('Profile updated successfully');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to update profile');
    }
  };

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      await adminApi.changePassword(passwords);
      setMessage('Password changed successfully');
      setPasswords({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to change password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Admin Profile</p>
        <h1 className="text-3xl font-semibold">Manage your account</h1>
      </div>
      {message ? <p className="mb-4 text-sm text-emerald-400">{message}</p> : null}
      {error ? <p className="mb-4 text-sm text-rose-400">{error}</p> : null}
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleProfileSave} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold">Profile Details</h2>
          <div className="mt-4 space-y-3">
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Full Name" />
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email" />
          </div>
          <button className="mt-4 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Save Profile</button>
        </form>
        <form onSubmit={handlePasswordChange} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <div className="mt-4 space-y-3">
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" type="password" value={passwords.current_password} onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })} placeholder="Current Password" />
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" type="password" value={passwords.new_password} onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })} placeholder="New Password" />
            <input className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" type="password" value={passwords.confirm_password} onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })} placeholder="Confirm New Password" />
          </div>
          <button className="mt-4 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
