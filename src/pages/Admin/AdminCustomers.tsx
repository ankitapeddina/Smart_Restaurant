import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const loadCustomers = () => {
    adminApi.customers().then((response) => setCustomers(response.data.customers || [])).catch(() => navigate('/admin/login'));
  };

  useEffect(() => {
    const token = window.localStorage.getItem('smart_restaurant_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadCustomers();
  }, [navigate]);

  const filtered = customers.filter((item) => `${item.full_name || ''} ${item.email || ''}`.toLowerCase().includes(search.toLowerCase()));

  const deleteCustomer = async (id: number | string) => {
    await adminApi.deleteCustomer(id);
    loadCustomers();
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Customers</p>
          <h1 className="text-3xl font-semibold">Customer Directory</h1>
        </div>
        <input className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2" placeholder="Search customer" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-slate-800/80 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((item) => (
              <tr key={item.customer_id} className="hover:bg-slate-800/50">
                <td className="px-4 py-3">#{item.customer_id}</td>
                <td className="px-4 py-3">{item.full_name}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3">{item.phone}</td>
                <td className="px-4 py-3">{item.total_orders}</td>
                <td className="px-4 py-3">
                  <button className="rounded-lg bg-rose-600 px-2 py-1" onClick={() => deleteCustomer(item.customer_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
