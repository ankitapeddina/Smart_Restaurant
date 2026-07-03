import SectionHeader from '../../components/Common/SectionHeader'

const Gallery = () => (
  <div className="space-y-12">
    <SectionHeader title="Gallery" subtitle="Restaurant ambiance" />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="aspect-[4/3] rounded-[28px] bg-[linear-gradient(180deg,_#FFF8F3,_#F1E2D1)] shadow-lg shadow-[rgba(84,26,26,0.08)]" />
      <div className="aspect-[4/3] rounded-[28px] bg-[linear-gradient(180deg,_#F1E2D1,_#DCC3AA)] shadow-lg shadow-[rgba(84,26,26,0.08)]" />
      <div className="aspect-[4/3] rounded-[28px] bg-[linear-gradient(180deg,_#F1E2D1,_#FFFFFF)] shadow-lg shadow-[rgba(84,26,26,0.08)]" />
      <div className="aspect-[4/3] rounded-[28px] bg-[linear-gradient(180deg,_#DCC3AA,_#F1E2D1)] shadow-lg shadow-[rgba(84,26,26,0.08)]" />
      <div className="aspect-[4/3] rounded-[28px] bg-[linear-gradient(180deg,_#FFF8F3,_#DCC3AA)] shadow-lg shadow-[rgba(84,26,26,0.08)]" />
      <div className="aspect-[4/3] rounded-[28px] bg-[linear-gradient(180deg,_#FFFFFF,_#F1E2D1)] shadow-lg shadow-[rgba(84,26,26,0.08)]" />
    </div>
  </div>
)

export default Gallery
