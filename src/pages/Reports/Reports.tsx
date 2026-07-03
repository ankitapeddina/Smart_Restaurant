import SectionHeader from '../../components/Common/SectionHeader'

const Reports = () => (
  <div className="space-y-10">
    <SectionHeader title="Reports" subtitle="Insights and trends" />
    <div className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
      <p className="text-[#6E564D]">Analyze guest traffic, revenue trends, and menu performance to make better business decisions.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Weekly growth</p>
          <p className="mt-3 text-2xl font-semibold text-[#541A1A]">+12%</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Top menu item</p>
          <p className="mt-3 text-2xl font-semibold text-[#541A1A]">Truffle Pasta</p>
        </div>
      </div>
    </div>
  </div>
)

export default Reports
