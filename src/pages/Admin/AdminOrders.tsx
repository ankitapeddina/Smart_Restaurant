import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const loadOrders = () => {
    adminApi.orders().then((response) => setOrders(response.data.orders || [])).catch(() => navigate('/admin/login'));
  };

  useEffect(() => {
    const token = window.localStorage.getItem('smart_restaurant_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadOrders();
  }, [navigate]);

  const filtered = orders.filter((item) => `${item.customer_name || ''} ${item.order_id || ''}`.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = async (id: number | string, order_status: string) => {
    await adminApi.updateOrder(id, { order_status });
    loadOrders();
  };

  const deleteOrder = async (id: number | string) => {
    await adminApi.deleteOrder(id);
    loadOrders();
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Orders</p>
          <h1 className="text-3xl font-semibold">Order Management</h1>
        </div>
        <input className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2" placeholder="Search orders" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-slate-800/80 text-left">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((item) => (
              <tr key={item.order_id} className="hover:bg-slate-800/50">
                <td className="px-4 py-3">#{item.order_id}</td>
                <td className="px-4 py-3">{item.customer_name}</td>
                <td className="px-4 py-3">{item.order_items ? JSON.stringify(item.order_items) : '—'}</td>
                <td className="px-4 py-3">{item.total_amount}</td>
                <td className="px-4 py-3">{item.order_status}</td>
                <td className="space-x-2 px-4 py-3">
                  <button className="rounded-lg bg-cyan-600 px-2 py-1" onClick={() => updateStatus(item.order_id, 'Preparing')}>Preparing</button>
                  <button className="rounded-lg bg-emerald-600 px-2 py-1" onClick={() => updateStatus(item.order_id, 'Delivered')}>Delivered</button>
                  <button className="rounded-lg bg-rose-600 px-2 py-1" onClick={() => deleteOrder(item.order_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
