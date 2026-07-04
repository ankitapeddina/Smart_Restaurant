import { useEffect, useState } from 'react'
import SectionHeader from '../../components/Common/SectionHeader'
import Loader from '../../components/Loader/Loader'
import { getErrorMessage, reservationApi } from '../../services/api'
import type { ReservationItem } from '../../types'

const MyReservations = () => {
  const [reservations, setReservations] = useState<ReservationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await reservationApi.list()
        setReservations(response.data?.reservations || [])
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservations()
  }, [])

  return (
    <div className="space-y-12 rounded-[32px] bg-[#FFF8F3] p-10">
      <SectionHeader title="My Reservations" subtitle="Your booking history" />

      {isLoading ? (
        <div className="rounded-[32px] border border-[#DCC3AA] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
          <Loader />
        </div>
      ) : error ? (
        <div className="rounded-[32px] border border-[#DCC3AA] bg-white p-10 text-center text-[#810B38] shadow-xl shadow-[rgba(84,26,26,0.08)]">
          <p className="text-lg font-semibold">{error}</p>
          <p className="mt-3 text-sm text-[#6E564D]">Please refresh the page or try again later.</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="rounded-[32px] border border-[#DCC3AA] bg-white p-10 text-center text-[#6E564D] shadow-xl shadow-[rgba(84,26,26,0.08)]">
          <p className="text-2xl font-semibold text-[#541A1A]">You have no reservations yet.</p>
          <p className="mt-3 max-w-2xl mx-auto text-sm">Book a table through the reservation page to see your upcoming reservations here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="hidden overflow-hidden rounded-[32px] border border-[#DCC3AA] bg-white shadow-xl shadow-[rgba(84,26,26,0.08)] md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-[#6E564D]">
                <thead className="border-b border-[#F1E2D1] bg-[#FFF8F3] text-[13px] uppercase tracking-[0.28em] text-[#810B38]">
                  <tr>
                    <th className="px-6 py-4">Reservation ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Guests</th>
                    <th className="px-6 py-4">Special Request</th>
                    <th className="px-6 py-4">Booking Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1E2D1] bg-white">
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-[#FFF2E8] transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#541A1A]">#{reservation.id}</td>
                      <td className="px-6 py-4">{reservation.name}</td>
                      <td className="px-6 py-4">{reservation.phone}</td>
                      <td className="px-6 py-4">{new Date(reservation.reservation_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{reservation.reservation_time}</td>
                      <td className="px-6 py-4">{reservation.people_count}</td>
                      <td className="px-6 py-4">{reservation.special_request || '—'}</td>
                      <td className="px-6 py-4">{new Date(reservation.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6 md:hidden">
            {reservations.map((reservation) => (
              <article key={reservation.id} className="rounded-[32px] border border-[#DCC3AA] bg-white p-6 shadow-xl shadow-[rgba(84,26,26,0.08)]">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#F1E2D1] px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#810B38]">Reservation #{reservation.id}</span>
                  <span className="text-sm font-semibold text-[#541A1A]">Booked {new Date(reservation.created_at).toLocaleDateString()}</span>
                </div>
                <div className="grid gap-3 text-sm text-[#6E564D]">
                  <div><span className="font-semibold text-[#541A1A]">Customer:</span> {reservation.name}</div>
                  <div><span className="font-semibold text-[#541A1A]">Phone:</span> {reservation.phone}</div>
                  <div><span className="font-semibold text-[#541A1A]">Date:</span> {new Date(reservation.reservation_date).toLocaleDateString()}</div>
                  <div><span className="font-semibold text-[#541A1A]">Time:</span> {reservation.reservation_time}</div>
                  <div><span className="font-semibold text-[#541A1A]">Guests:</span> {reservation.people_count}</div>
                  <div><span className="font-semibold text-[#541A1A]">Special request:</span> {reservation.special_request || 'None'}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyReservations
