import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<any>({});
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);

  useEffect(() => {
    const token = window.localStorage.getItem('smart_restaurant_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    adminApi.dashboard()
      .then((response) => {
        setSummary(response.data.summary || {});
        setRecentCustomers(response.data.recentCustomers || []);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          window.localStorage.removeItem('smart_restaurant_admin_token');
          window.localStorage.removeItem('smart_restaurant_admin_role');
          window.localStorage.removeItem('smart_restaurant_admin_user');
        }
        navigate('/admin/login');
      });
  }, [navigate]);

  const cards = useMemo(() => [
    { label: 'Total Customers', value: summary.customers || 0, color: 'from-cyan-500 to-blue-500' },
    { label: "Today's Reservations", value: summary.reservations || 0, color: 'from-fuchsia-500 to-purple-500' },
    { label: 'Pending Reservations', value: summary.pendingReservations || 0, color: 'from-amber-500 to-orange-500' },
    { label: "Today's Orders", value: summary.orders || 0, color: 'from-emerald-500 to-green-500' },
    { label: 'Revenue', value: `$${Number(summary.revenue || 0).toFixed(2)}`, color: 'from-violet-500 to-indigo-500' },
    { label: 'Pending Orders', value: summary.pendingOrders || 0, color: 'from-rose-500 to-pink-500' },
  ], [summary]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Admin Dashboard</p>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
        </div>
        <button
          className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2"
          onClick={() => {
            window.localStorage.removeItem('smart_restaurant_admin_token');
            window.localStorage.removeItem('smart_restaurant_admin_role');
            window.localStorage.removeItem('smart_restaurant_admin_user');
            navigate('/admin/login');
          }}
        >
          Logout
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-2xl bg-gradient-to-r ${card.color} p-[1px]`}>
            <div className="rounded-[15px] bg-slate-900/90 p-5">
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Registrations</h2>
            <Link to="/admin/customers" className="text-sm text-cyan-400">See all</Link>
          </div>
          <div className="space-y-3">
            {recentCustomers.map((customer) => (
              <div key={customer.customer_id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
                <div>
                  <p className="font-medium">{customer.full_name}</p>
                  <p className="text-sm text-slate-400">{customer.email}</p>
                </div>
                <span className="text-sm text-slate-400">{new Date(customer.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <div className="mt-4 space-y-2">
            <Link className="block rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" to="/admin/reservations">Reservations</Link>
            <Link className="block rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" to="/admin/orders">Orders</Link>
            <Link className="block rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" to="/admin/customers">Customers</Link>
            <Link className="block rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3" to="/admin/reports">Reports</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
