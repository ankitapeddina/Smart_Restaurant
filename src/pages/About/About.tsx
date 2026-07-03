import SectionHeader from '../../components/Common/SectionHeader'

const About = () => (
  <div className="space-y-12">
    <section className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
      <SectionHeader title="About SmartTable" subtitle="Our story" />
      <p className="max-w-3xl text-[#6E564D] leading-8">
        SmartTable was built for guests who value modern elegance and memorable menus. We combine refined plating, thoughtful service, and a warm atmosphere to create a restaurant experience that feels personalized and premium.
      </p>
    </section>

    <section className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-8 shadow-xl shadow-[rgba(84,26,26,0.08)]">
        <h3 className="text-xl font-semibold text-[#541A1A]">Our Vision</h3>
        <p className="mt-4 text-[#6E564D]">To craft a dining destination where every visit feels seamless, sophisticated, and memorable.</p>
      </div>
      <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-8 shadow-xl shadow-[rgba(84,26,26,0.08)]">
        <h3 className="text-xl font-semibold text-[#541A1A]">Our Menu</h3>
        <p className="mt-4 text-[#6E564D]">Seasonal dishes, creative combinations, and high-quality ingredients designed for contemporary tastes.</p>
      </div>
      <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-8 shadow-xl shadow-[rgba(84,26,26,0.08)]">
        <h3 className="text-xl font-semibold text-[#541A1A]">Our Space</h3>
        <p className="mt-4 text-[#6E564D]">An inviting dining room with modern lighting, glass touches, and a relaxed yet elegant energy.</p>
      </div>
    </section>
  </div>
)

export default About
