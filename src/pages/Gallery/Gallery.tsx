import SectionHeader from '../../components/Common/SectionHeader'

const Gallery = () => (
  <div className="space-y-12">
    <SectionHeader title="Gallery" subtitle="Restaurant ambiance" />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-emerald-400/25 to-slate-900/60" />
      <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-cyan-400/25 to-slate-900/60" />
      <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-violet-400/25 to-slate-900/60" />
      <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-orange-400/25 to-slate-900/60" />
      <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-pink-400/25 to-slate-900/60" />
      <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-slate-400/25 to-slate-900/60" />
    </div>
  </div>
)

export default Gallery
