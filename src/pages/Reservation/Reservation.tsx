import { useState } from 'react'
import SectionHeader from '../../components/Common/SectionHeader'
import { useCart } from '../../context/CartContext'

const Reservation = () => {
  const { setReservation } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setReservation({
      isReserved: true,
      customerName: form.name || 'Guest',
      tableNumber: '12',
      date: form.date,
      time: form.time,
    })
    setMessage(`Reservation confirmed for ${form.name || 'Guest'} at table 12.`)
  }

  return (
    <div className="space-y-12 rounded-[32px] bg-[#FFF8F3] p-10">
      <SectionHeader title="Reservation" subtitle="Book your table" />
      <div className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
        <p className="text-[#6E564D]">Reserve a table for a special night out, a celebration, or a casual dinner with friends.</p>
        <form className="mt-8 grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Phone" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
          <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Date" type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} />
          <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Time" type="time" value={form.time} onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))} />
          <button className="col-span-full rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A]">
            Confirm reservation
          </button>
        </form>
        {message ? <p className="mt-4 text-sm font-semibold text-[#810B38]">{message}</p> : null}
      </div>
    </div>
  )
}

export default Reservation
