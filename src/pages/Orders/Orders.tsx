import SectionHeader from '../../components/Common/SectionHeader'

const Orders = () => (
  <div className="space-y-10">
    <SectionHeader title="Orders" subtitle="Order management" />
    <div className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20">
      <p className="text-slate-300">View active orders, mark status updates, and monitor kitchen progress in one place.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-slate-900/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Pending</p>
          <p className="mt-3 text-2xl font-semibold text-white">18 orders</p>
        </div>
        <div className="rounded-[28px] bg-slate-900/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Preparing</p>
          <p className="mt-3 text-2xl font-semibold text-white">14 orders</p>
        </div>
      </div>
    </div>
  </div>
)

export default Orders
