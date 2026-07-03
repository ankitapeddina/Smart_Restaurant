import SectionHeader from '../../components/Common/SectionHeader'

const About = () => (
  <div className="space-y-12">
    <section className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20">
      <SectionHeader title="About SmartTable" subtitle="Our story" />
      <p className="max-w-3xl text-slate-300 leading-8">
        SmartTable was built for guests who value modern elegance and memorable menus. We combine refined plating, thoughtful service, and a warm atmosphere to create a restaurant experience that feels personalized and premium.
      </p>
    </section>

    <section className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-[28px] bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
        <h3 className="text-xl font-semibold text-white">Our Vision</h3>
        <p className="mt-4 text-slate-300">To craft a dining destination where every visit feels seamless, sophisticated, and memorable.</p>
      </div>
      <div className="rounded-[28px] bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
        <h3 className="text-xl font-semibold text-white">Our Menu</h3>
        <p className="mt-4 text-slate-300">Seasonal dishes, creative combinations, and high-quality ingredients designed for contemporary tastes.</p>
      </div>
      <div className="rounded-[28px] bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
        <h3 className="text-xl font-semibold text-white">Our Space</h3>
        <p className="mt-4 text-slate-300">An inviting dining room with modern lighting, glass touches, and a relaxed yet elegant energy.</p>
      </div>
    </section>
  </div>
)

export default About
