import SectionHeader from '../../components/Common/SectionHeader'

const Contact = () => (
  <div className="space-y-12">
    <SectionHeader title="Contact" subtitle="Reach out" />
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20">
        <h2 className="text-2xl font-semibold text-white">Get in touch</h2>
        <p className="mt-4 text-slate-300">Whether you want to book a private dinner or ask about our menu, we’re happy to help.</p>
        <div className="mt-8 space-y-5 text-slate-300">
          <p><strong>Email:</strong> contact@smarttable.com</p>
          <p><strong>Phone:</strong> +1 (555) 012-3456</p>
          <p><strong>Address:</strong> 123 Culinary Avenue, Downtown</p>
        </div>
      </div>
      <form className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20 space-y-6">
        <div>
          <label className="text-sm text-slate-300">Name</label>
          <input className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400" placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400" placeholder="Your email" />
        </div>
        <div>
          <label className="text-sm text-slate-300">Message</label>
          <textarea className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400" rows={5} placeholder="How can we help?" />
        </div>
        <button type="submit" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
          Send message
        </button>
      </form>
    </div>
  </div>
)

export default Contact
