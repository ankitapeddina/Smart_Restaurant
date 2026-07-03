import DashboardCards from '../../components/DashboardCards/DashboardCards'
import SectionHeader from '../../components/Common/SectionHeader'

const Dashboard = () => (
  <div className="space-y-12">
    <div className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20">
      <SectionHeader title="Dashboard" subtitle="Performance overview" />
      <p className="max-w-3xl text-slate-300">Track orders, revenue, reservations, and customer satisfaction from a polished management view.</p>
    </div>
    <DashboardCards />
  </div>
)

export default Dashboard
