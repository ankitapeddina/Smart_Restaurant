import { useAuth } from '../../context/AuthContext'
import SectionHeader from '../../components/Common/SectionHeader'

const Profile = () => {
  const { user, logout } = useAuth()

  return (
    <div className="space-y-10 rounded-[32px] border border-[#DCC3AA] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
      <SectionHeader title="Profile" subtitle="Your account details" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-[#F1E2D1] bg-[#FFF8F3] p-8">
          <h2 className="mb-4 text-2xl font-semibold text-[#541A1A]">Welcome back</h2>
          <p className="text-[#6E564D]">Manage your profile, reservations, and order history from one polished dashboard.</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-8">
          <div className="space-y-4 text-[#6E564D]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#810B38]">Name</p>
              <p className="mt-2 text-xl font-semibold text-[#541A1A]">{user?.fullname || 'Guest'}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#810B38]">Email</p>
              <p className="mt-2 text-xl font-semibold text-[#541A1A]">{user?.email || 'n/a'}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#810B38]">Phone</p>
              <p className="mt-2 text-xl font-semibold text-[#541A1A]">{user?.phone || 'n/a'}</p>
            </div>
          </div>
          <button type="button" onClick={logout} className="mt-8 inline-flex rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A]">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
