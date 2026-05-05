import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket, Calendar, Clock } from 'lucide-react'
import api from '../../api'

export default function MyTickets() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/bookings/my/')
      .then(res => setBookings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#070710] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#e8593c]/30 border-t-[#e8593c] rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#070710] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
          <Ticket size={22} className="text-[#e8593c]" />
          My Tickets
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-8 text-center">
            <p className="text-[#444] text-sm">No bookings yet.</p>
            <button
              onClick={() => navigate('/movies')}
              className="mt-4 bg-[#e8593c] hover:bg-[#d44d32] text-white px-6 py-2 rounded-xl text-sm transition"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  {booking.movie_poster && (
                    <img
                      src={booking.movie_poster}
                      alt={booking.movie_title}
                      className="w-14 h-20 object-cover rounded-lg border border-[#1a1a2a] flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h2 className="text-white font-semibold text-sm">{booking.movie_title}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/10 border-green-500/30 text-green-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-[#555] text-xs">
                        <Clock size={11} />
                        {booking.show_time} · {booking.show_label}
                      </div>
                      <div className="flex items-center gap-1 text-[#555] text-xs">
                        <Calendar size={11} />
                        {new Date(booking.show_date + 'T00:00:00').toLocaleDateString('en-US', {
                          weekday: 'short', month: 'short', day: 'numeric'
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {booking.seats.map(seat => (
                        <span key={seat} className="bg-[#e8593c]/20 border border-[#e8593c]/30 text-[#e8593c] text-xs px-2 py-0.5 rounded-full">
                          {seat}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1a1a2a]">
                      <span className="text-[#444] text-xs">Booking #{booking.id}</span>
                      <span className="text-[#e8593c] text-sm font-bold">₹{booking.total_price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}