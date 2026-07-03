import SectionHeader from '../../components/Common/SectionHeader'

const Reservation = () => (
  <div className="space-y-12">
    <SectionHeader title="Reservation" subtitle="Book your table" />
    <div className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20">
      <p className="text-slate-300">Reserve a table for a special night out, a celebration, or a casual dinner with friends.</p>
      <form className="mt-8 grid gap-6 md:grid-cols-2">
        <input className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400" placeholder="Name" />
        <input className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400" placeholder="Phone" />
        <input className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400" placeholder="Date" type="date" />
        <input className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400" placeholder="Time" type="time" />
        <button className="col-span-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
          Confirm reservation
        </button>
      </form>
    </div>
  </div>
)

export default Reservation
