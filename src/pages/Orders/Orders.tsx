import SectionHeader from '../../components/Common/SectionHeader'

const Orders = () => (
  <div className="space-y-10">
    <SectionHeader title="Orders" subtitle="Order management" />
    <div className="rounded-[32px] border border-[#F1E2D1] bg-white p-8 shadow-xl shadow-[rgba(84,26,26,0.08)]">
      <p className="text-[#6E564D]">View active orders, mark status updates, and monitor kitchen progress in one place.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Pending</p>
          <p className="mt-3 text-2xl font-semibold text-[#541A1A]">18 orders</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Preparing</p>
          <p className="mt-3 text-2xl font-semibold text-[#541A1A]">14 orders</p>
        </div>
      </div>
    </div>
  </div>
)

export default Orders
