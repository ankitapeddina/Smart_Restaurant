interface SectionHeaderProps {
  title: string
  subtitle?: string
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="mb-8 max-w-3xl">
    <p className="text-[13px] uppercase tracking-[4px] text-[#810B38] font-[700] font-sans">{subtitle || 'Smart Restaurant'}</p>
    <h2 className="mt-2 text-[40px] font-[600] text-[#541A1A] leading-[1.05] font-display">{title}</h2>
  </div>
)

export default SectionHeader
