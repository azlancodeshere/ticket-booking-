import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Eye, EyeOff, Film, User, Lock, Mail, Phone, Calendar, Users } from 'lucide-react'
import api from '../../api'

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: ''
  })
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
      await api.post('/api/register/', form)
      

         const autoLogin = await api.post("/api/login/", {
        username: form.username,
        password: form.password,
      });
      const { access, refresh } = autoLogin.data;


      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);


     
      localStorage.setItem("username",  autoLogin.data.username);

      setIsAuthenticated(true);
      
      get_username();
       alert("User registered successfully");

      navigate("/");
      

    } catch (err) {
      setError(err.response?.data?.username?.[0] || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070710] flex items-center justify-center px-4 relative overflow-hidden py-10">

     
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#e8593c] opacity-20 blur-[80px] -top-20 -left-20 animate-pulse" />
      <div className="absolute w-[280px] h-[280px] rounded-full bg-[#7F77DD] opacity-20 blur-[80px] -bottom-16 -right-16 animate-pulse" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-[#e8593c] opacity-10 blur-[60px] bottom-10 left-1/3 animate-pulse" />

     
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

     
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#0f0f1a] border-b border-[#1a1a2a] flex items-center gap-2 px-4 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-3.5 rounded-sm bg-[#070710] border border-[#1f1f2e] flex-shrink-0" />
        ))}
        <span className="text-[#2a2a3a] text-[10px] tracking-widest whitespace-nowrap">
          CINEBOOK • NOW SHOWING • BOOK YOUR SEATS •
        </span>
      </div>

     
      <div className="w-full max-w-sm relative z-10 mt-7">

       
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Film className="text-[#e8593c]" size={28} />
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Cine<span className="text-[#e8593c]">Book</span>
            </h1>
          </div>
          <p className="text-[#555] text-xs mt-1">Create your account & start booking!</p>
        </div>

       
        <div className="bg-[#0c0c18]/85 border border-[#1f1f30] rounded-2xl p-7 backdrop-blur-xl">
          <h2 className="text-white text-lg font-medium mb-5 flex items-center gap-2">
            <span className="w-0.5 h-5 bg-[#e8593c] rounded-full inline-block" />
            Create Account
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            
            <div>
              <label className="text-[#666] text-[10px] uppercase tracking-wider mb-1.5 block">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                  className="w-full bg-[#080814] border border-[#1f1f30] text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#e8593c] transition placeholder-[#333]"
                />
              </div>
            </div>

           
            <div>
              <label className="text-[#666] text-[10px] uppercase tracking-wider mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full bg-[#080814] border border-[#1f1f30] text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#e8593c] transition placeholder-[#333]"
                />
              </div>
            </div>

           
            <div>
              <label className="text-[#666] text-[10px] uppercase tracking-wider mb-1.5 block">Password</label>
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

           
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#666] text-[10px] uppercase tracking-wider mb-1.5 block">Phone</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full bg-[#080814] border border-[#1f1f30] text-white rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-[#e8593c] transition placeholder-[#333]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[#666] text-[10px] uppercase tracking-wider mb-1.5 block">Age</label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full bg-[#080814] border border-[#1f1f30] text-white rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-[#e8593c] transition placeholder-[#333]"
                  />
                </div>
              </div>
            </div>

          
            <div>
              <label className="text-[#666] text-[10px] uppercase tracking-wider mb-1.5 block">Gender</label>
              <div className="relative">
                <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full bg-[#080814] border border-[#1f1f30] text-gray-400 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#e8593c] transition appearance-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
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
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-[#444] text-xs text-center mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#e8593c] hover:underline">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}