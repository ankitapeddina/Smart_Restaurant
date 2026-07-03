import SectionHeader from '../../components/Common/SectionHeader'

const Settings = () => (
  <div className="space-y-10">
    <SectionHeader title="Settings" subtitle="Manage preferences" />
    <div className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
      <p className="text-[#6E564D]">Personalize notifications, reservations, and account preferences to suit your workflow.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Account</p>
          <p className="mt-3 text-[#6E564D]">Update profile and notification settings for your restaurant account.</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Preferences</p>
          <p className="mt-3 text-[#6E564D]">Choose light or dark mode, language settings, and bookmarking preferences.</p>
        </div>
      </div>
    </div>
  </div>
)

export default Settings
