import SectionHeader from '../../components/Common/SectionHeader'

const Settings = () => (
  <div className="space-y-10">
    <SectionHeader title="Settings" subtitle="Manage preferences" />
    <div className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20">
      <p className="text-slate-300">Personalize notifications, reservations, and account preferences to suit your workflow.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-slate-900/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Account</p>
          <p className="mt-3 text-slate-300">Update profile and notification settings for your restaurant account.</p>
        </div>
        <div className="rounded-[28px] bg-slate-900/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Preferences</p>
          <p className="mt-3 text-slate-300">Choose light or dark mode, language settings, and bookmarking preferences.</p>
        </div>
      </div>
    </div>
  </div>
)

export default Settings
