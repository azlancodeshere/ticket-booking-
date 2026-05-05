import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Ticket, Star, Clock, Globe } from 'lucide-react'
import api from '../../api'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const COLS = 10

export default function SeatSelection() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [shows, setShows] = useState([])
    const [selectedShow, setSelectedShow] = useState(null)
    const [bookedSeats, setBookedSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [booking, setBooking] = useState(false)
    const [loadingMovie, setLoadingMovie] = useState(true)
    const [loadingShows, setLoadingShows] = useState(true)
    const [loadingSeats, setLoadingSeats] = useState(false)
    const [error, setError] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

    useEffect(() => {
        api.get(`/api/movies/${id}/`)
            .then(res => setMovie(res.data))
            .catch(() => setError('Movie not found'))
            .finally(() => setLoadingMovie(false))
    }, [id])

    useEffect(() => {
        setLoadingShows(true)
        setSelectedShow(null)
        api.get(`/api/movies/${id}/shows/?date=${selectedDate}`)
            .then(res => {
                setShows(res.data)
                if (res.data.length > 0) setSelectedShow(res.data[0])
            })
            .catch(() => setError('Could not load shows'))
            .finally(() => setLoadingShows(false))
    }, [id, selectedDate])

    useEffect(() => {
        if (!selectedShow) return
        setLoadingSeats(true)
        setSelectedSeats([])
        api.get(`/api/shows/${selectedShow.id}/booked-seats/`)
            .then(res => setBookedSeats(res.data.booked_seats))
            .catch(() => setBookedSeats([]))
            .finally(() => setLoadingSeats(false))
    }, [selectedShow])

    const isBooked = (seatId) => bookedSeats.includes(seatId)
    const isSelected = (seatId) => selectedSeats.includes(seatId)

    const toggleSeat = (seatId) => {
        if (isBooked(seatId)) return
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(s => s !== seatId)
                : prev.length >= 8 ? prev : [...prev, seatId]
        )
    }

    const totalPrice = selectedSeats.length * (selectedShow?.price || 0)

    const handleBooking = async () => {
        if (selectedSeats.length === 0 || !selectedShow) return
        setBooking(true)
        setError(null)
        try {
            const res = await api.post('/api/bookings/', {
                show: selectedShow.id,
                seats: selectedSeats,
            })
            navigate('/booking/confirmed', {
                state: { bookingData: res.data, movieTitle: movie.title }
            })
        } catch (err) {
            const msg =
                err.response?.data?.non_field_errors?.[0] ||
                err.response?.data?.detail ||
                'Booking failed. Please try again.'
            setError(msg)
        } finally {
            setBooking(false)
        }
    }

    if (loadingMovie) return (
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
                    onClick={() => navigate(`/movies/${id}`)}
                    className="flex items-center gap-2 text-[#555] hover:text-white text-sm transition"
                >
                    <ArrowLeft size={16} />
                    Back to Movie
                </button>
            </div>

          
            <div className="bg-[#0a0a14] border-b border-[#1a1a2a] px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    {movie.poster && (
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-12 h-16 object-cover rounded-lg border border-[#1a1a2a]"
                        />
                    )}
                    <div className="flex-1">
                        <h1 className="text-white font-semibold text-lg">{movie.title}</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-[#888] text-xs">{movie.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#555]">
                                <Clock size={11} />
                                <span className="text-xs">{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#555]">
                                <Globe size={11} />
                                <span className="text-xs">{movie.language}</span>
                            </div>
                        </div>
                    </div>
                    <span className="bg-[#e8593c]/20 border border-[#e8593c]/30 text-[#e8593c] text-xs px-3 py-1 rounded-full capitalize">
                        {movie.genre?.replace('_', '-')}
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}

               
                <div className="mb-8">
                    <h2 className="text-white font-semibold mb-1 flex items-center gap-2">
                        <span className="w-5 h-5 bg-[#e8593c] rounded-full text-white text-xs flex items-center justify-center">1</span>
                        Select Show Time
                    </h2>
                    <p className="text-[#444] text-xs mb-3 ml-7">
                        {selectedDate === new Date().toISOString().split('T')[0]
                            ? `Today, ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`
                            : new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>

                   
                    <div className="flex gap-2 ml-7 mb-4 flex-wrap items-center">
                        {[0, 1, 2].map(offset => {
                            const d = new Date()
                            d.setDate(d.getDate() + offset)
                            const val = d.toISOString().split('T')[0]
                            const label = offset === 0 ? 'Today' : offset === 1
                                ? 'Tomorrow'
                                : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                            return (
                                <button
                                    key={val}
                                    onClick={() => setSelectedDate(val)}
                                    className={`px-4 py-2 rounded-xl text-xs border transition ${selectedDate === val
                                        ? 'bg-[#e8593c] border-[#e8593c] text-white'
                                        : 'bg-[#0c0c18] border-[#1a1a2a] text-[#666] hover:border-[#e8593c]/50 hover:text-white'
                                        }`}
                                >
                                    {label}
                                </button>
                            )
                        })}
                        <input
                            type="date"
                            value={selectedDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setSelectedDate(e.target.value)}
                            className="px-4 py-2 rounded-xl text-xs border border-[#1a1a2a] bg-[#0c0c18] text-[#666] hover:border-[#e8593c]/50 transition cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>

                    {loadingShows ? (
                        <div className="ml-7 flex gap-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-24 h-16 bg-[#0c0c18] border border-[#1a1a2a] rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : shows.length === 0 ? (
                        <div className="ml-7 bg-[#0c0c18] border border-[#1a1a2a] rounded-xl p-4">
                            <p className="text-[#444] text-sm">No shows available for this date.</p>
                            <p className="text-[#333] text-xs mt-1">Please add shows from the admin panel.</p>
                        </div>
                    ) : (
                        <div className="flex gap-3 flex-wrap ml-7">
                            {shows.map(show => (
                                <button
                                    key={show.id}
                                    onClick={() => setSelectedShow(show)}
                                    className={`px-5 py-3 rounded-xl border text-sm transition flex flex-col items-center gap-0.5 ${selectedShow?.id === show.id
                                        ? 'bg-[#e8593c] border-[#e8593c] text-white'
                                        : 'bg-[#0c0c18] border-[#1a1a2a] text-[#666] hover:border-[#e8593c]/50 hover:text-white'
                                        }`}
                                >
                                    <span className="font-semibold">{show.time}</span>
                                    <span className="text-[10px] opacity-70 capitalize">{show.label}</span>
                                    <span className="text-[10px] opacity-60">₹{show.price}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                
                {selectedShow && (
                    <div className="mb-8">
                        <h2 className="text-white font-semibold mb-1 flex items-center gap-2">
                            <span className="w-5 h-5 bg-[#e8593c] rounded-full text-white text-xs flex items-center justify-center">2</span>
                            Select Seats
                        </h2>
                        <p className="text-[#444] text-xs mb-6 ml-7">
                            Max 8 seats · ₹{selectedShow.price} per seat ·{' '}
                            <span className="text-green-400">{selectedShow.available_seats} seats available</span>
                        </p>

                        <div className="w-full max-w-lg mx-auto h-2 bg-gradient-to-r from-transparent via-[#e8593c]/40 to-transparent rounded-full mb-1" />
                        <p className="text-center text-[#333] text-xs tracking-widest uppercase mb-6">SCREEN</p>

                        {loadingSeats ? (
                            <div className="flex justify-center py-12">
                                <div className="w-8 h-8 border-2 border-[#e8593c]/30 border-t-[#e8593c] rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <div className="min-w-[360px] max-w-lg mx-auto">
                                    <div className="flex items-center mb-2 pl-6">
                                        {Array.from({ length: COLS }, (_, i) => (
                                            <div key={i} className="flex-1 text-center text-[#333] text-[10px]">{i + 1}</div>
                                        ))}
                                    </div>
                                    {ROWS.map(row => (
                                        <div key={row} className="flex items-center gap-1 mb-2">
                                            <span className="text-[#333] text-xs w-5 text-center flex-shrink-0">{row}</span>
                                            <div className="flex flex-1 gap-1">
                                                {Array.from({ length: COLS }, (_, col) => {
                                                    const seatId = `${row}${col + 1}`
                                                    const booked = isBooked(seatId)
                                                    const selected = isSelected(seatId)
                                                    return (
                                                        <button
                                                            key={col}
                                                            onClick={() => toggleSeat(seatId)}
                                                            disabled={booked}
                                                            title={booked ? `${seatId} - Booked` : selected ? `${seatId} - Selected` : `${seatId} - Available`}
                                                            className={`flex-1 aspect-square rounded-md transition-all duration-150 ${
                                                                booked
                                                                    ? 'bg-[#e8593c]/30 border border-[#e8593c]/40 cursor-not-allowed'
                                                                    : selected
                                                                    ? 'bg-[#e8593c] border border-[#e8593c] scale-105'
                                                                    : 'bg-[#0c0c18] border border-[#1a1a2a] hover:border-[#e8593c]/50 cursor-pointer'
                                                            }`}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-center gap-6 mt-6">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#0c0c18] border border-[#1a1a2a]" />
                                <span className="text-[#444] text-xs">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#e8593c]" />
                                <span className="text-[#444] text-xs">Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#e8593c]/30 border border-[#e8593c]/40" />
                                <span className="text-[#444] text-xs">Booked</span>
                            </div>
                        </div>
                    </div>
                )}

               
                {selectedShow && (
                    <div className="bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-6">
                        <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-[#e8593c] rounded-full" />
                            Booking Summary
                        </h2>
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between">
                                <span className="text-[#444] text-sm">Movie</span>
                                <span className="text-white text-sm truncate max-w-[200px]">{movie.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#444] text-sm">Show Time</span>
                                <span className="text-white text-sm">{selectedShow.time} · {selectedShow.label}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#444] text-sm">Date</span>
                                <span className="text-white text-sm">
                                    {new Date(selectedShow.date).toLocaleDateString('en-US', {
                                        weekday: 'short', month: 'short', day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-[#444] text-sm">Selected Seats</span>
                                <div className="text-right max-w-[220px]">
                                    {selectedSeats.length === 0 ? (
                                        <span className="text-[#333] text-sm">None selected</span>
                                    ) : (
                                        <div className="flex flex-wrap gap-1 justify-end">
                                            {selectedSeats.map(seat => (
                                                <span key={seat} className="bg-[#e8593c]/20 border border-[#e8593c]/30 text-[#e8593c] text-xs px-2 py-0.5 rounded-full">
                                                    {seat}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#444] text-sm">Price per Seat</span>
                                <span className="text-white text-sm">₹{selectedShow.price}</span>
                            </div>
                        </div>
                        <div className="border-t border-[#1a1a2a] pt-4 flex items-center justify-between">
                            <div>
                                <p className="text-[#444] text-xs uppercase tracking-wider">Total Amount</p>
                                <p className="text-white text-2xl font-bold mt-0.5">
                                    ₹{totalPrice}
                                    {selectedSeats.length > 0 && (
                                        <span className="text-[#444] text-sm font-normal ml-2">
                                            ({selectedSeats.length} seats)
                                        </span>
                                    )}
                                </p>
                            </div>
                            <button
                                onClick={handleBooking}
                                disabled={selectedSeats.length === 0 || booking}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-medium transition ${
                                    selectedSeats.length === 0
                                        ? 'bg-[#1a1a2a] text-[#333] cursor-not-allowed'
                                        : booking
                                        ? 'bg-[#e8593c]/70 text-white cursor-wait'
                                        : 'bg-[#e8593c] hover:bg-[#d44d32] text-white hover:-translate-y-0.5 transform'
                                }`}
                            >
                                {booking ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Booking...
                                    </>
                                ) : (
                                    <>
                                        <Ticket size={16} />
                                        Confirm Booking
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}