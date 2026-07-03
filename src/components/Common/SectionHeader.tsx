interface SectionHeaderProps {
  title: string
  subtitle?: string
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="mb-8 max-w-3xl">
    <p className="text-sm uppercase tracking-[0.3em] text-[#810B38]">{subtitle || 'Smart Restaurant'}</p>
    <h2 className="mt-2 text-3xl font-semibold text-[#541A1A] sm:text-4xl">{title}</h2>
  </div>
)

export default SectionHeader
