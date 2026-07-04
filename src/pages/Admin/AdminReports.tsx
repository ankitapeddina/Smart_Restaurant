import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any>({});

  useEffect(() => {
    const token = window.localStorage.getItem('smart_restaurant_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    adminApi.reports().then((response) => setReports(response.data)).catch(() => navigate('/admin/login'));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Reports</p>
        <h1 className="text-3xl font-semibold">Sales & Reservation Insights</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold">Daily Sales</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {(reports.dailySales || []).map((item: any) => <li key={item.label}>{item.label}: ${Number(item.value).toFixed(2)}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold">Reservation Status</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {(reports.reservationReports || []).map((item: any) => <li key={item.label}>{item.label}: {item.value}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
