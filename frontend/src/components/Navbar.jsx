import { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Film, Menu, X, Ticket, LogOut, User } from 'lucide-react'

export default function Navbar() {
    const { isAuthenticated, username, logout } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        setMenuOpen(false)
        navigate('/login')
    }

    const closeMenu = () => setMenuOpen(false)
    const isActive = (path) => location.pathname === path

    return (
        <>
            <nav className="bg-[#0a0a14] border-b border-[#1a1a2a] px-6 py-3 flex items-center justify-between sticky top-0 z-50">

                <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <Film size={22} className="text-[#e8593c]" />
                    <span className="text-white text-xl font-semibold tracking-tight">
                        Cine<span className="text-[#e8593c]">Book</span>
                    </span>
                </Link>

              
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/"
                        className={`text-sm transition ${isActive('/') ? 'text-white' : 'text-[#888] hover:text-white'}`}>
                        Movies
                    </Link>
                    <Link to="/shows"
                        className={`text-sm transition ${isActive('/shows') ? 'text-white' : 'text-[#888] hover:text-white'}`}>
                        Shows
                    </Link>
                    <Link to="/my-tickets"
                        className={`text-sm transition ${isActive('/my-tickets') ? 'text-white' : 'text-[#888] hover:text-white'}`}>
                        My Tickets
                    </Link>
                  
                    <Link to="/verify"
                        className={`text-sm transition ${isActive('/verify') ? 'text-white' : 'text-[#888] hover:text-white'}`}>
                        Verify
                    </Link>
                </div>

            
                <div className="hidden md:flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 bg-[#12121f] border border-[#2a2a3a] px-3 py-1.5 rounded-full">
                                <User size={13} className="text-[#e8593c]" />
                                <span className="text-white text-xs">{username}</span>
                            </div>
                            <Link to="/my-tickets"
                                className="flex items-center gap-1.5 text-[#888] hover:text-white text-sm transition">
                                <Ticket size={15} />
                                My Tickets
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 bg-[#1a0a0a] border border-[#3a1a1a] text-[#e8593c] px-3 py-1.5 rounded-lg text-sm hover:bg-[#2a0a0a] transition"
                            >
                                <LogOut size={14} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"
                                className="text-[#888] hover:text-white text-sm transition px-3 py-1.5 border border-[#2a2a3a] rounded-lg">
                                Login
                            </Link>
                            <Link to="/signup"
                                className="bg-[#e8593c] hover:bg-[#d44d32] text-white text-sm px-4 py-1.5 rounded-lg transition">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>

              
                <button
                    className="md:hidden text-white p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

         
            {menuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={closeMenu}
                    />
                    <div className="fixed top-[53px] left-0 right-0 bg-[#0a0a14] border-b border-[#1a1a2a] px-6 py-5 flex flex-col gap-4 md:hidden z-50">
                        <div className="flex flex-col gap-1">
                            <Link to="/" onClick={closeMenu}
                                className={`px-3 py-2 rounded-lg text-sm transition ${isActive('/') ? 'bg-[#12121f] text-white' : 'text-[#888] hover:text-white hover:bg-[#12121f]'}`}>
                                🎬 Movies
                            </Link>
                            <Link to="/shows" onClick={closeMenu}
                                className={`px-3 py-2 rounded-lg text-sm transition ${isActive('/shows') ? 'bg-[#12121f] text-white' : 'text-[#888] hover:text-white hover:bg-[#12121f]'}`}>
                                📺 Shows
                            </Link>
                            <Link to="/my-tickets" onClick={closeMenu}
                                className={`px-3 py-2 rounded-lg text-sm transition ${isActive('/my-tickets') ? 'bg-[#12121f] text-white' : 'text-[#888] hover:text-white hover:bg-[#12121f]'}`}>
                                🎟️ My Tickets
                            </Link>
                            {/* ✅ FIXED */}
                            <Link to="/verify" onClick={closeMenu}
                                className={`px-3 py-2 rounded-lg text-sm transition ${isActive('/verify') ? 'bg-[#12121f] text-white' : 'text-[#888] hover:text-white hover:bg-[#12121f]'}`}>
                                ✅ Verify
                            </Link>
                        </div>

                        <div className="border-t border-[#1a1a2a] pt-4">
                            {isAuthenticated ? (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 bg-[#12121f] border border-[#2a2a3a] px-3 py-2 rounded-lg">
                                        <User size={14} className="text-[#e8593c]" />
                                        <span className="text-white text-sm">{username}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 bg-[#1a0a0a] border border-[#3a1a1a] text-[#e8593c] px-3 py-2 rounded-lg text-sm hover:bg-[#2a0a0a] transition w-full"
                                    >
                                        <LogOut size={14} />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link to="/login" onClick={closeMenu}
                                        className="text-center text-[#888] text-sm border border-[#2a2a3a] px-4 py-2 rounded-lg hover:text-white hover:border-[#444] transition">
                                        Login
                                    </Link>
                                    <Link to="/signup" onClick={closeMenu}
                                        className="text-center bg-[#e8593c] hover:bg-[#d44d32] text-white text-sm px-4 py-2 rounded-lg transition">
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}