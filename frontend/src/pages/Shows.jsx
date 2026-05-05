import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Star, Globe, Ticket } from 'lucide-react'
import api from '../../api'

export default function Shows() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/shows/today/')
      .then(res => setShows(res.data))
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
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold mb-1">Today's Shows</h1>
          <p className="text-[#444] text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {shows.length === 0 ? (
          <div className="bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-8 text-center">
            <p className="text-[#444] text-sm">No shows scheduled for today.</p>
            <button
              onClick={() => navigate('/movies')}
              className="mt-4 bg-[#e8593c] hover:bg-[#d44d32] text-white px-6 py-2 rounded-xl text-sm transition"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {shows.map(show => (
              <div key={show.id} className="bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-5 flex items-center gap-4">
                {show.movie_poster ? (
                  <img
                    src={show.movie_poster}
                    alt={show.movie_title}
                    className="w-14 h-20 object-cover rounded-lg border border-[#1a1a2a] flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-20 bg-[#1a1a2a] rounded-lg flex-shrink-0" />
                )}

                <div className="flex-1">
                  <h2 className="text-white font-semibold text-sm mb-2">{show.movie_title}</h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1 text-[#555] text-xs">
                      <Clock size={11} />
                      {show.time}
                    </div>
                    <span className="bg-[#e8593c]/20 border border-[#e8593c]/30 text-[#e8593c] text-xs px-2 py-0.5 rounded-full capitalize">
                      {show.label}
                    </span>
                    <span className="text-[#e8593c] text-xs font-medium">₹{show.price}</span>
                    <span className="text-green-400 text-xs">{show.available_seats} seats left</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/movies/${show.movie}/seats`)}
                  className="flex items-center gap-2 bg-[#e8593c] hover:bg-[#d44d32] text-white px-4 py-2 rounded-xl text-xs transition flex-shrink-0"
                >
                  <Ticket size={12} />
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}