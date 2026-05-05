import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function BookingConfirmed() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { bookingData, movieTitle } = state || {}

  if (!bookingData) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-[#070710] flex items-center justify-center px-4">
      <div className="bg-[#0c0c18] border border-[#1a1a2a] rounded-3xl p-8 max-w-sm w-full text-center">

        <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h2 className="text-white text-xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-[#555] text-sm mb-6">Your tickets are ready. Enjoy the show!</p>

        <div className="bg-[#070710] border border-[#1a1a2a] rounded-2xl p-4 mb-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-[#444] text-xs uppercase tracking-wider">Booking ID</span>
            <span className="text-white text-sm font-medium">#{bookingData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#444] text-xs uppercase tracking-wider">Movie</span>
            <span className="text-white text-sm font-medium">{movieTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#444] text-xs uppercase tracking-wider">Show</span>
            <span className="text-white text-sm">
              {bookingData.show_time} · {new Date(bookingData.show_date + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[#444] text-xs uppercase tracking-wider">Seats</span>
            <div className="flex flex-wrap gap-1 justify-end max-w-[180px]">
              {bookingData.seats.map(seat => (
                <span key={seat} className="bg-[#e8593c]/20 border border-[#e8593c]/30 text-[#e8593c] text-xs px-2 py-0.5 rounded-full">
                  {seat}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between border-t border-[#1a1a2a] pt-3">
            <span className="text-[#444] text-xs uppercase tracking-wider">Total Paid</span>
            <span className="text-[#e8593c] text-sm font-bold">₹{bookingData.total_price}</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-xl p-2">
          <div className="w-full h-full grid grid-cols-7 gap-0.5">
            {Array.from({ length: 49 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-sm ${(i * 37 + bookingData.id) % 2 === 0 ? 'bg-black' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-[#444] text-xs mb-6">Show this QR at the counter</p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/my-tickets')}
            className="flex-1 border border-[#1a1a2a] text-[#666] hover:text-white py-3 rounded-xl text-sm transition"
          >
            My Tickets
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-[#e8593c] hover:bg-[#d44d32] text-white py-3 rounded-xl text-sm transition"
          >
            Home
          </button>
        </div>

      </div>
    </div>
  )
}