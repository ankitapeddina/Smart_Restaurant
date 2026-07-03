import type { MenuItem } from '../../types'

const MenuCard = ({ name, description, price, tag }: MenuItem) => (
  <article className="group rounded-[22px] border border-[#F1E2D1] bg-white p-6 transition duration-300 hover:border-[#810B38] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(84,26,26,0.08)]">
    <div className="flex items-center justify-between gap-4">
      <span className="rounded-full bg-[#F1E2D1] px-3 py-1 text-[12px] uppercase tracking-[2px] font-[600] text-[#810B38] font-sans">{tag}</span>
      <span className="text-[22px] font-[700] text-[#810B38] font-sans">{price}</span>
    </div>
    <h3 className="mt-4 text-[28px] font-[600] text-[#541A1A] font-display">{name}</h3>
    <p className="mt-3 text-[16px] text-[#6E564D] font-sans">{description}</p>
    <button className="mt-6 inline-flex rounded-full bg-[#810B38] px-5 py-2 text-[16px] font-[600] tracking-[0.3px] text-white transition duration-300 hover:bg-[#541A1A] font-sans">
      Add to order
    </button>
  </article>
)

export default MenuCard
