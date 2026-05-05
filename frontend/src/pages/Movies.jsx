import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, Globe, Search, SlidersHorizontal, Film } from 'lucide-react'
import api from '../../api'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  const genres = ['all', 'action', 'comedy', 'drama', 'horror', 'sci_fi', 'romance', 'thriller']

  useEffect(() => {
    api.get('/api/movies/')
      .then(res => setMovies(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = movies.filter(movie => {
    const matchSearch = movie.title.toLowerCase().includes(search.toLowerCase())
    const matchGenre = selectedGenre === 'all' || movie.genre === selectedGenre
    return matchSearch && matchGenre
  })

  return (
    <div className="min-h-screen bg-[#070710]">

     
      <div className="relative bg-[#0a0a14] border-b border-[#1a1a2a] px-6 py-10 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#e8593c] opacity-[0.07] blur-[80px] -top-20 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Film size={16} className="text-[#e8593c]" />
            <span className="text-[#e8593c] text-xs font-medium tracking-widest uppercase">All Movies</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-6">Now Showing</h1>
         
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0c0c18] border border-[#1f1f30] text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#e8593c] transition placeholder-[#333]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <SlidersHorizontal size={14} className="text-[#555] flex-shrink-0" />
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition capitalize ${
                selectedGenre === genre
                  ? 'bg-[#e8593c] text-white border border-[#e8593c]'
                  : 'bg-[#0c0c18] border border-[#1f1f30] text-[#555] hover:text-white hover:border-[#e8593c]'
              }`}
            >
              {genre === 'all' ? 'All' : genre.replace('_', '-')}
            </button>
          ))}
        </div>

       
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#e8593c]/30 border-t-[#e8593c] rounded-full animate-spin" />
          </div>
        )}

       
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <Film size={40} className="text-[#222] mx-auto mb-3" />
            <p className="text-[#444] text-sm">No movies found</p>
          </div>
        )}

      
        {!loading && filtered.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-medium">
                {selectedGenre === 'all' ? 'All Movies' : selectedGenre.replace('_', '-')}
                <span className="text-[#333] text-sm font-normal ml-2">({filtered.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map(movie => (
                <Link
                  to={`/movies/${movie.id}`}
                  key={movie.id}
                  className="group bg-[#0c0c18] border border-[#1a1a2a] rounded-xl overflow-hidden hover:border-[#e8593c]/50 transition-all duration-200 hover:-translate-y-1"
                >
                 
                  <div className="relative aspect-[2/3] bg-[#12121f] overflow-hidden">
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Film size={30} className="text-[#222]" />
                      </div>
                    )}
                   
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star size={9} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-[10px]">{movie.rating}</span>
                    </div>
                   
                    <div className="absolute top-2 left-2 bg-[#e8593c]/80 px-2 py-0.5 rounded-full">
                      <span className="text-white text-[10px] capitalize">{movie.genre.replace('_', '-')}</span>
                    </div>
                  </div>

                  
                  <div className="p-3">
                    <h3 className="text-white text-sm font-medium truncate mb-2">{movie.title}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-[#444]">
                        <Clock size={11} />
                        <span className="text-[11px]">{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#444]">
                        <Globe size={11} />
                        <span className="text-[11px]">{movie.language}</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#e8593c]/10 hover:bg-[#e8593c] border border-[#e8593c]/30 hover:border-[#e8593c] text-[#e8593c] hover:text-white text-xs py-2 rounded-lg transition">
                      Book Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}