import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminReservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const loadReservations = () => {
    adminApi.reservations().then((response) => setReservations(response.data.reservations || [])).catch(() => navigate('/admin/login'));
  };

  useEffect(() => {
    const token = window.localStorage.getItem('smart_restaurant_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadReservations();
  }, [navigate]);

  const filtered = reservations.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const haystack = `${item.customer_name || ''} ${item.phone || ''} ${item.email || ''}`.toLowerCase();
    return matchesStatus && haystack.includes(search.toLowerCase());
  });

  const updateStatus = async (id: number | string, status: string) => {
    await adminApi.updateReservation(id, { status });
    loadReservations();
  };

  const deleteReservation = async (id: number | string) => {
    await adminApi.deleteReservation(id);
    loadReservations();
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Reservations</p>
          <h1 className="text-3xl font-semibold">Reservation Management</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2" placeholder="Search reservation" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-slate-800/80 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Guests</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((item) => (
              <tr key={item.reservation_id} className="hover:bg-slate-800/50">
                <td className="px-4 py-3">#{item.reservation_id}</td>
                <td className="px-4 py-3">{item.customer_name}</td>
                <td className="px-4 py-3">{item.phone}</td>
                <td className="px-4 py-3">{item.reservation_date}</td>
                <td className="px-4 py-3">{item.number_of_guests}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="space-x-2 px-4 py-3">
                  <button className="rounded-lg bg-emerald-600 px-2 py-1" onClick={() => updateStatus(item.reservation_id, 'Approved')}>Approve</button>
                  <button className="rounded-lg bg-amber-600 px-2 py-1" onClick={() => updateStatus(item.reservation_id, 'Rejected')}>Reject</button>
                  <button className="rounded-lg bg-cyan-600 px-2 py-1" onClick={() => updateStatus(item.reservation_id, 'Completed')}>Complete</button>
                  <button className="rounded-lg bg-rose-600 px-2 py-1" onClick={() => deleteReservation(item.reservation_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReservations;
