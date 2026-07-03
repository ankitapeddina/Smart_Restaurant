import SectionHeader from '../../components/Common/SectionHeader'

const Billing = () => (
  <div className="space-y-10">
    <SectionHeader title="Billing" subtitle="Invoices and payments" />
    <div className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20">
      <p className="text-slate-300">Easily review bills, process payments, and keep track of restaurant revenue from a clean dashboard.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-slate-900/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Outstanding</p>
          <p className="mt-3 text-2xl font-semibold text-white">$4,620</p>
        </div>
        <div className="rounded-[28px] bg-slate-900/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Paid this month</p>
          <p className="mt-3 text-2xl font-semibold text-white">$12,300</p>
        </div>
      </div>
    </div>
  </div>
)

export default Billing
