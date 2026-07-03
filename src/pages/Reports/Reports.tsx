import SectionHeader from '../../components/Common/SectionHeader'

const Reports = () => (
  <div className="space-y-10">
    <SectionHeader title="Reports" subtitle="Insights and trends" />
    <div className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20">
      <p className="text-slate-300">Analyze guest traffic, revenue trends, and menu performance to make better business decisions.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-slate-900/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Weekly growth</p>
          <p className="mt-3 text-2xl font-semibold text-white">+12%</p>
        </div>
        <div className="rounded-[28px] bg-slate-900/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Top menu item</p>
          <p className="mt-3 text-2xl font-semibold text-white">Truffle Pasta</p>
        </div>
      </div>
    </div>
  </div>
)

export default Reports
