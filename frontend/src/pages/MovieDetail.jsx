import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Star, Clock, Globe, Calendar, ArrowLeft, Film, Ticket } from 'lucide-react'
import api from '../../api'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [allMovies, setAllMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
   
    Promise.all([
      api.get(`/api/movies/${id}/`),
      api.get('/api/movies/')
    ])
      .then(([movieRes, allRes]) => {
        setMovie(movieRes.data)
        setAllMovies(allRes.data)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [id]) 

  
  const related = allMovies.filter(m => m.genre === movie?.genre && m.id !== movie?.id)

  if (loading) return (
    <div className="min-h-screen bg-[#070710] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#e8593c]/30 border-t-[#e8593c] rounded-full animate-spin" />
    </div>
  )

  if (!movie) return (
    <div className="min-h-screen bg-[#070710] flex items-center justify-center">
      <p className="text-[#444]">Movie not found</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#070710]">

   
      <div className="bg-[#0a0a14] border-b border-[#1a1a2a] px-6 py-3">
        <button
          onClick={() => navigate('/movies')}
          className="flex items-center gap-2 text-[#555] hover:text-white text-sm transition"
        >
          <ArrowLeft size={16} />
          Back to Movies
        </button>
      </div>

     
      <div className="relative bg-[#0a0a14] border-b border-[#1a1a2a] overflow-hidden">
        {movie.poster && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url(${movie.poster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
              transform: 'scale(1.1)'
            }}
          />
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

          
          <div className="flex-shrink-0">
            <div className="w-48 h-72 rounded-2xl overflow-hidden bg-[#12121f] border border-[#1a1a2a] mx-auto md:mx-0">
              {movie.poster ? (
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Film size={40} className="text-[#222]" />
                </div>
              )}
            </div>
          </div>

         
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-3">
              <span className="bg-[#e8593c]/20 border border-[#e8593c]/30 text-[#e8593c] text-xs px-3 py-1 rounded-full capitalize">
                {movie.genre.replace('_', '-')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm font-medium">{movie.rating}</span>
                <span className="text-[#444] text-xs">/10</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#555]">
                <Clock size={14} />
                <span className="text-sm">{Math.floor(movie.duration / 60)}h {movie.duration % 60}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#555]">
                <Globe size={14} />
                <span className="text-sm">{movie.language}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#555]">
                <Calendar size={14} />
                <span className="text-sm">
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <p className="text-[#666] text-sm leading-relaxed mb-6 max-w-xl line-clamp-3">
              {movie.description}
            </p>

            <button
              onClick={() => navigate(`/movies/${id}/seats`)}
              className="flex items-center gap-2 bg-[#e8593c] hover:bg-[#d44d32] text-white font-medium px-8 py-3 rounded-xl text-sm transition hover:-translate-y-0.5 transform w-fit"
            >
              <Ticket size={16} />
              Book Tickets
            </button>
          </div>
        </div>
      </div>

     
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        
          <div className="md:col-span-2 bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#e8593c] rounded-full" />
              About the Movie
            </h2>
            <p className="text-[#555] text-sm leading-relaxed">{movie.description}</p>
          </div>

          
          <div className="bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#e8593c] rounded-full" />
              Movie Info
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Genre', value: movie.genre.replace('_', '-') },
              { label: 'Duration', value: `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m` },
                { label: 'Language', value: movie.language },
                { label: 'Rating', value: `${movie.rating} / 10` },
                { label: 'Release', value: new Date(movie.release_date).toLocaleDateString() },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-[#1a1a2a] last:border-0">
                  <span className="text-[#444] text-xs uppercase tracking-wider">{item.label}</span>
                  <span className="text-white text-sm capitalize">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div className="bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h3 className="text-white font-medium mb-1">Ready to watch {movie.title}?</h3>
            <p className="text-[#444] text-sm">Select your seats and book your tickets now.</p>
          </div>
          <button
            onClick={() => navigate(`/movies/${id}/seats`)}
            className="flex-shrink-0 flex items-center gap-2 bg-[#e8593c] hover:bg-[#d44d32] text-white font-medium px-8 py-3 rounded-xl text-sm transition hover:-translate-y-0.5 transform"
          >
            <Ticket size={16} />
            Book Tickets
          </button>
        </div>

        
        {related.length > 0 && (
          <div>
            <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#e8593c] rounded-full" />
              More {movie.genre.replace('_', '-')} Movies
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {related.map(m => (
                <Link
                  to={`/movies/${m.id}`}
                  key={m.id}
                  className="group bg-[#0c0c18] border border-[#1a1a2a] rounded-xl overflow-hidden hover:border-[#e8593c]/50 transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="relative aspect-[2/3] bg-[#12121f] overflow-hidden">
                    {m.poster ? (
                      <img
                        src={m.poster}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Film size={28} className="text-[#222]" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star size={9} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-[10px]">{m.rating}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-white text-sm font-medium truncate mb-2">{m.title}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-[#444]">
                        <Clock size={11} />
                        <span className="text-[11px]">{m.duration}m</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#444]">
                        <Globe size={11} />
                        <span className="text-[11px]">{m.language}</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#e8593c]/10 hover:bg-[#e8593c] border border-[#e8593c]/30 hover:border-[#e8593c] text-[#e8593c] hover:text-white text-xs py-2 rounded-lg transition">
                      Book Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}