import SectionHeader from '../../components/Common/SectionHeader'

const Billing = () => (
  <div className="space-y-10">
    <SectionHeader title="Billing" subtitle="Invoices and payments" />
    <div className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
      <p className="text-[#6E564D]">Easily review bills, process payments, and keep track of restaurant revenue from a clean dashboard.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Outstanding</p>
          <p className="mt-3 text-2xl font-semibold text-[#541A1A]">$4,620</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Paid this month</p>
          <p className="mt-3 text-2xl font-semibold text-[#541A1A]">$12,300</p>
        </div>
      </div>
    </div>
  </div>
)

export default Billing
