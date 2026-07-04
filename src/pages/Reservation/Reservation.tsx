import { useState, type FormEvent } from 'react'
import Loader from '../../components/Loader/Loader'
import { useCart } from '../../context/CartContext'
import { getErrorMessage, reservationApi } from '../../services/api'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import './Reservation.css'

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

  const [form, setForm] = useState<ReservationFormState>({
    name: '',
    phone: '',
    date: '',
    time: '',
    people: '2',
    specialRequest: '',
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)

    try {
      if (
        !form.name.trim() ||
        !form.phone.trim() ||
        !form.date ||
        !form.time ||
        !form.people
      ) {
        throw new Error('Please fill in all required fields')
      }

      const normalizedPhone = form.phone.startsWith('+')
        ? form.phone
        : `+${form.phone.replace(/\D/g, '')}`

      const phoneNumber = parsePhoneNumberFromString(normalizedPhone)

      if (!phoneNumber || !phoneNumber.isValid()) {
        throw new Error('Please enter a valid phone number')
      }

      const response = await reservationApi.create({
        name: form.name.trim(),
        phone: normalizedPhone,
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

      // Display appropriate toast and message based on SMS status
      if (response.data?.smsSent) {
        showToast('✅ Reservation Confirmed! SMS sent successfully to your mobile number.')
        setMessage('✅ Reservation Confirmed! SMS has been sent to ' + form.phone)
      } else {
        // Reservation saved but SMS failed
        showToast('✅ Reservation Confirmed! However, SMS could not be sent.')
        const smsErrorDetail = response.data?.smsError
          ? ` (SMS Error: ${response.data.smsError})`
          : ' (SMS delivery failed)'
        setMessage('✅ Reservation Confirmed!' + smsErrorDetail)
      }

      setForm({ name: '', phone: '', date: '', time: '', people: '2', specialRequest: '' })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        <div className="reservation-header">
          <p className="reservation-eyebrow">BOOK YOUR TABLE</p>
          <h1 className="reservation-title">Reservation</h1>
        </div>

        <p className="reservation-description">
          Reserve a table for a special night out, a celebration, or a casual dinner with friends.
        </p>

        {isLoading && (
          <div className="reservation-loader">
            <Loader />
          </div>
        )}

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="reservation-row">
            <input
              className="reservation-input"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              className="reservation-input"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="reservation-row">
            <input
              className="reservation-input"
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              required
            />

            <input
              className="reservation-input"
              type="time"
              value={form.time}
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
              required
            />
          </div>

          <div className="reservation-row">
            <select
              className="reservation-input reservation-select"
              value={form.people}
              onChange={(e) =>
                setForm({ ...form, people: e.target.value })
              }
            >
              <option value="2">2 Guests</option>
              <option value="4">4 Guests</option>
              <option value="6">6 Guests</option>
              <option value="8">8 Guests</option>
            </select>
          </div>

          <div className="reservation-row-full">
            <textarea
              className="reservation-textarea"
              rows={4}
              placeholder="Special Request"
              value={form.specialRequest}
              onChange={(e) =>
                setForm({
                  ...form,
                  specialRequest: e.target.value,
                })
              }
            />
          </div>

          <div className="reservation-row-full">
            <button
              className="reservation-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Confirm Reservation'}
            </button>
          </div>
        </form>

        {message && (
          <p className="reservation-feedback reservation-feedback--success">
            {message}
          </p>
        )}

        {error && (
          <p className="reservation-feedback reservation-feedback--error">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default Reservation