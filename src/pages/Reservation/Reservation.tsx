import { useState } from 'react'
import SectionHeader from '../../components/Common/SectionHeader'
import Loader from '../../components/Loader/Loader'
import { useCart } from '../../context/CartContext'
import { getErrorMessage, reservationApi } from '../../services/api'
import PhoneInput from 'react-phone-input-2'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import 'react-phone-input-2/lib/style.css'

interface ReservationFormState {
  name: string
  phone: string
  date: string
  time: string
  people: string
  specialRequest: string
}

const Reservation = () => {
  const { setReservation, showToast } = useCart()
  const [form, setForm] = useState<ReservationFormState>({ name: '', phone: '', date: '', time: '', people: '2', specialRequest: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)

    try {
      if (!form.name.trim() || !form.phone.trim() || !form.date || !form.time || !form.people) {
        throw new Error('Please fill in all required fields')
      }

      const phoneNumber = parsePhoneNumberFromString(form.phone)
      if (!phoneNumber || !phoneNumber.isValid()) {
        throw new Error('Please enter a valid phone number')
      }

      const internationalPhone = phoneNumber.number
      const response = await reservationApi.create({
        name: form.name.trim(),
        phone: internationalPhone,
        reservation_date: form.date,
        reservation_time: form.time,
        people_count: Number(form.people),
        special_request: form.specialRequest.trim(),
      })

      setReservation({
        isReserved: true,
        customerName: form.name.trim() || 'Guest',
        tableNumber: '12',
        date: form.date,
        time: form.time,
      })
      showToast('Reservation saved successfully')
      setMessage(response.data?.message || 'Reservation submitted successfully')
      setForm({ name: '', phone: '', date: '', time: '', people: '2', specialRequest: '' })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-12 rounded-[32px] bg-[#FFF8F3] p-10">
      <SectionHeader title="Reservation" subtitle="Book your table" />
      <div className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
        <p className="text-[#6E564D]">Reserve a table for a special night out, a celebration, or a casual dinner with friends.</p>
        <form className="mt-8 grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          <div className="rounded-3xl border border-[#DCC3AA] bg-white px-0 py-0 outline-none focus-within:border-[#810B38] focus-within:ring-4 focus-within:ring-[rgba(129,11,56,0.12)]">
            <PhoneInput
              country="in"
              onlyCountries={['in', 'us', 'gb', 'au', 'ca', 'fr', 'de', 'es', 'it', 'nl', 'jp', 'cn', 'br', 'za']}
              countryCodeEditable={false}
              enableSearch
              searchPlaceholder="Search country"
              value={form.phone}
              onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
              inputProps={{
                name: 'phone',
                required: true,
                className: 'w-full rounded-3xl border-none bg-transparent px-4 py-3 text-[#541A1A] outline-none',
                style: { height: '100%' },
              }}
              inputStyle={{
                width: '100%',
                borderRadius: '24px',
                paddingLeft: '90px',
                backgroundColor: '#ffffff',
                color: '#541A1A',
                fontSize: '0.95rem',
                border: 'none',
                outline: 'none',
              }}
              buttonStyle={{
                border: 'none',
                borderRadius: '24px 0 0 24px',
                backgroundColor: 'transparent',
              }}
              containerStyle={{
                width: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
              }}
              dropdownStyle={{
                borderRadius: '18px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                zIndex: 20,
              }}
            />
          </div>
          <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Date" type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} />
          <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Time" type="time" value={form.time} onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))} />
          <select className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" value={form.people} onChange={(event) => setForm((current) => ({ ...current, people: event.target.value }))}>
            <option value="2">2 guests</option>
            <option value="4">4 guests</option>
            <option value="6">6 guests</option>
            <option value="8">8 guests</option>
          </select>
          <textarea className="col-span-full rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]" placeholder="Special request" value={form.specialRequest} onChange={(event) => setForm((current) => ({ ...current, specialRequest: event.target.value }))} rows={3} />
          <button disabled={isLoading} className="col-span-full rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A] disabled:cursor-not-allowed disabled:opacity-70">
            {isLoading ? 'Submitting...' : 'Confirm reservation'}
          </button>
          {isLoading ? <div className="col-span-full flex justify-center"><Loader /></div> : null}
        </form>
        {message ? <p className="mt-4 text-sm font-semibold text-[#810B38]">{message}</p> : null}
        {error ? <p className="mt-4 text-sm font-semibold text-[#810B38]">{error}</p> : null}
      </div>
    </div>
  )
}

export default Reservation
