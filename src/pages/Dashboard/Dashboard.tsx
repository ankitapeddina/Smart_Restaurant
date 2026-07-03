import DashboardCards from '../../components/DashboardCards/DashboardCards'
import SectionHeader from '../../components/Common/SectionHeader'

const Dashboard = () => (
  <div className="space-y-12">
    <div className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
      <SectionHeader title="Dashboard" subtitle="Performance overview" />
      <p className="max-w-3xl text-[#6E564D]">Track orders, revenue, reservations, and customer satisfaction from a polished management view.</p>
    </div>
    <DashboardCards />
  </div>
)

export default Dashboard
