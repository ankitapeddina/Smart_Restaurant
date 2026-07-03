interface DashboardCardProps {
  title: string
  value: string
  description: string
}

const cards: DashboardCardProps[] = [
  { title: 'Orders', value: '124', description: 'Live orders in the last 24 hours' },
  { title: 'Revenue', value: '$10.8k', description: 'Total revenue this week' },
  { title: 'Reservations', value: '22', description: 'Upcoming table bookings' },
  { title: 'Rating', value: '4.9/5', description: 'Average guest satisfaction' },
]

const DashboardCards = () => (
  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
    {cards.map((card) => (
      <div key={card.title} className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 transition duration-300 hover:border-[#810B38] hover:shadow-[0_10px_30px_rgba(84,26,26,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">{card.title}</p>
        <p className="mt-4 text-3xl font-semibold text-[#541A1A]">{card.value}</p>
        <p className="mt-2 text-sm leading-6 text-[#6E564D]">{card.description}</p>
      </div>
    ))}
  </div>
)

export default DashboardCards
