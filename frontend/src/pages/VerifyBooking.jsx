import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import api from '../../api'

export default function VerifyBooking() {
  const [bookingId, setBookingId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const verify = async () => {
    if (!bookingId) return
    setLoading(true)
    setResult(null)
    try {
      const res = await api.get(`/api/bookings/${bookingId}/verify/`)
      setResult(res.data)
    } catch {
      setResult({ valid: false, message: 'Booking not found' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070710] flex items-center justify-center px-4">
      <div className="bg-[#0c0c18] border border-[#1a1a2a] rounded-3xl p-8 max-w-sm w-full text-center">
        <h2 className="text-white text-xl font-bold mb-2">Verify Booking</h2>
        <p className="text-[#555] text-sm mb-6">Enter booking ID to check status</p>

        <div className="flex gap-2 mb-6">
          <input
            type="number"
            placeholder="Booking ID"
            value={bookingId}
            onChange={e => setBookingId(e.target.value)}
            className="flex-1 bg-[#070710] border border-[#1a1a2a] text-white text-sm px-4 py-3 rounded-xl outline-none focus:border-[#e8593c]/50"
          />
          <button
            onClick={verify}
            disabled={loading}
            className="bg-[#e8593c] hover:bg-[#d44d32] text-white px-6 py-3 rounded-xl text-sm transition"
          >
            {loading ? '...' : 'Check'}
          </button>
        </div>

        {result && (
          result.valid ? (
            <div className="text-left">
              <div className={`flex items-center gap-2 mb-4 p-3 rounded-xl ${
                result.status === 'confirmed'
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                {result.status === 'confirmed'
                  ? <CheckCircle size={20} className="text-green-400" />
                  : <XCircle size={20} className="text-red-400" />
                }
                <span className={`font-semibold text-sm ${
                  result.status === 'confirmed' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {result.status === 'confirmed' ? 'Valid Booking' : 'Cancelled'}
                </span>
              </div>

              <div className="bg-[#070710] border border-[#1a1a2a] rounded-2xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#444] text-xs uppercase tracking-wider">Booking ID</span>
                  <span className="text-white text-sm">#{result.booking_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#444] text-xs uppercase tracking-wider">User</span>
                  <span className="text-white text-sm">{result.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#444] text-xs uppercase tracking-wider">Movie</span>
                  <span className="text-white text-sm">{result.movie}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#444] text-xs uppercase tracking-wider">Show</span>
                  <span className="text-white text-sm">{result.show_time} · {result.show_date}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[#444] text-xs uppercase tracking-wider">Seats</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {result.seats.map(s => (
                      <span key={s} className="bg-[#e8593c]/20 border border-[#e8593c]/30 text-[#e8593c] text-xs px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between border-t border-[#1a1a2a] pt-3">
                  <span className="text-[#444] text-xs uppercase tracking-wider">Total</span>
                  <span className="text-[#e8593c] text-sm font-bold">₹{result.total_price}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <XCircle size={20} className="text-red-400" />
              <span className="text-red-400 text-sm">{result.message}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}