import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Reservations', path: '/admin/reservations' },
  { label: 'Orders', path: '/admin/orders' },
  { label: 'Customers', path: '/admin/customers' },
  { label: 'Reports', path: '/admin/reports' },
  { label: 'Profile', path: '/admin/profile' },
];

const AdminLayout = () => (
  <div className="flex min-h-screen bg-slate-950 text-slate-100">
    <aside className="w-72 border-r border-white/10 bg-slate-900/90 p-6">
      <h2 className="text-2xl font-semibold">Smart Admin</h2>
      <p className="mt-2 text-sm text-slate-400">Operations Center</p>
      <nav className="mt-8 space-y-2">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm transition ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-white/10'}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
