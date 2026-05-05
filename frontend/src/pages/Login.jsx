import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Eye, EyeOff, Film, User, Lock, Flame, Rocket, Star, Ticket } from 'lucide-react'
import api from "../../api"

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { setIsAuthenticated, get_username } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/api/login/', form)
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      localStorage.setItem('username', res.data.username)
      setIsAuthenticated(true)
      get_username()
      navigate('/')
    } catch (err) {
      setError('Invalid username or password!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070710] flex items-center justify-center px-4 pt-8 pb-6 relative overflow-hidden">

      
      <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-[#e8593c] opacity-20 blur-[80px] -top-20 -left-20 animate-pulse" />
      <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full bg-[#7F77DD] opacity-20 blur-[80px] -bottom-16 -right-16 animate-pulse" />
      <div className="absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full bg-[#e8593c] opacity-10 blur-[60px] bottom-10 left-1/3 animate-pulse" />

     
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#0f0f1a] border-b border-[#1a1a2a] flex items-center gap-2 px-4 overflow-hidden z-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-3.5 rounded-sm bg-[#070710] border border-[#1f1f2e] flex-shrink-0" />
        ))}
        <span className="text-[#2a2a3a] text-[10px] tracking-widest whitespace-nowrap">
          CINEBOOK • NOW SHOWING • BOOK YOUR SEATS •
        </span>
      </div>

    
      <div className="absolute top-20 left-60 bg-[#12121f]/80 border border-[#2a2a3a] rounded-full px-3 py-1.5 text-xs text-[#555] backdrop-blur-sm animate-bounce hidden md:flex items-center gap-2">
        <Flame size={13} className="text-[#e8593c]" />
        Inferno Rising
      </div>
      <div className="absolute top-32 right-40 bg-[#12121f]/80 border border-[#2a2a3a] rounded-full px-3 py-1.5 text-xs text-[#555] backdrop-blur-sm animate-bounce hidden md:flex items-center gap-2" style={{ animationDelay: '0.5s' }}>
        <Rocket size={13} className="text-[#7F77DD]" />
        Lost Signal
      </div>
      <div className="absolute bottom-28 left-60 bg-[#12121f]/80 border border-[#2a2a3a] rounded-full px-3 py-1.5 text-xs text-[#555] backdrop-blur-sm animate-bounce hidden md:flex items-center gap-2" style={{ animationDelay: '1s' }}>
        <Star size={13} className="text-[#e8593c]" />
        4.8 Rating
      </div>
      <div className="absolute bottom-36 right-40 bg-[#12121f]/80 border border-[#2a2a3a] rounded-full px-3 py-1.5 text-xs text-[#555] backdrop-blur-sm animate-bounce hidden md:flex items-center gap-2" style={{ animationDelay: '1.5s' }}>
        <Ticket size={13} className="text-[#e8593c]" />
        Book Now
      </div>

      
      <div className="w-full max-w-sm relative z-10 mt-10 px-2 sm:px-0">

       
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Film className="text-[#e8593c]" size={24} />
            <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Cine<span className="text-[#e8593c]">Book</span>
            </h1>
          </div>
          <p className="text-[#555] text-xs mt-1">Your cinematic experience starts here</p>
        </div>

       
        <div className="bg-[#0c0c18]/85 border border-[#1f1f30] rounded-2xl p-5 sm:p-7 backdrop-blur-xl">
          <h2 className="text-white text-lg font-medium mb-5 flex items-center gap-2">
            <span className="w-0.5 h-5 bg-[#e8593c] rounded-full inline-block" />
            Welcome back
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            
            <div>
              <label className="text-[#666] text-[10px] uppercase tracking-wider mb-1.5 block">
                Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  className="w-full bg-[#080814] border border-[#1f1f30] text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#e8593c] transition placeholder-[#333]"
                />
              </div>
            </div>

           
            <div>
              <label className="text-[#666] text-[10px] uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#080814] border border-[#1f1f30] text-white rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:border-[#e8593c] transition placeholder-[#333]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#e8593c] transition"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e8593c] hover:bg-[#d44d32] text-white font-medium py-3 rounded-xl text-sm transition disabled:opacity-50 hover:-translate-y-0.5 transform flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login to CineBook'
              )}
            </button>
          </form>

          <p className="text-[#444] text-xs text-center mt-5">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#e8593c] hover:underline">
              Sign up free
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}