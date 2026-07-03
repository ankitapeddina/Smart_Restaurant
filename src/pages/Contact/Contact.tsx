import SectionHeader from '../../components/Common/SectionHeader'

const Contact = () => (
  <div className="space-y-12">
    <SectionHeader title="Contact" subtitle="Reach out" />
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
        <h2 className="text-2xl font-semibold text-[#541A1A]">Get in touch</h2>
        <p className="mt-4 text-[#6E564D]">Whether you want to book a private dinner or ask about our menu, we’re happy to help.</p>
        <div className="mt-8 space-y-5 text-[#6E564D]">
          <p><strong>Email:</strong> contact@smarttable.com</p>
          <p><strong>Phone:</strong> +1 (555) 012-3456</p>
          <p><strong>Address:</strong> 123 Culinary Avenue, Downtown</p>
        </div>
      </div>
      <form className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)] space-y-6">
        <div>
          <label className="text-sm text-[#6E564D]">Name</label>
          <input className="mt-2 w-full rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm text-[#6E564D]">Email</label>
          <input className="mt-2 w-full rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Your email" />
        </div>
        <div>
          <label className="text-sm text-[#6E564D]">Message</label>
          <textarea className="mt-2 w-full rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" rows={5} placeholder="How can we help?" />
        </div>
        <button type="submit" className="rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A]">
          Send message
        </button>
      </form>
    </div>
  </div>
)

export default Contact
