import type { MenuItem } from '../../types'

const MenuCard = ({ name, description, price, tag }: MenuItem) => (
  <article className="group rounded-[28px] border border-slate-500/10 bg-slate-950/80 p-6 transition hover:border-emerald-400/40 hover:bg-slate-900/90">
    <div className="flex items-center justify-between gap-4">
      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-300">{tag}</span>
      <span className="text-sm font-semibold text-slate-300">{price}</span>
    </div>
    <h3 className="mt-4 text-xl font-semibold text-white">{name}</h3>
    <p className="mt-3 text-slate-300">{description}</p>
    <button className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
      Add to order
    </button>
  </article>
)

export default MenuCard
