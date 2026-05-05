import { Film } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaGithub, FaInstagram, FaTwitter  } from 'react-icons/fa'



export default function Footer() {
  return (
    <footer className="bg-[#0a0a14] border-t border-[#1a1a2a] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Film size={20} className="text-[#e8593c]" />
              <span className="text-white text-lg font-semibold">
                Cine<span className="text-[#e8593c]">Book</span>
              </span>
            </div>
            <p className="text-[#555] text-sm leading-relaxed max-w-xs">
              Book your favorite movies instantly. Select seats, get QR tickets — all in seconds.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-[#12121f] border border-[#2a2a3a] rounded-lg flex items-center justify-center text-[#555] hover:text-[#e8593c] hover:border-[#e8593c] transition">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-[#12121f] border border-[#2a2a3a] rounded-lg flex items-center justify-center text-[#555] hover:text-[#e8593c] hover:border-[#e8593c] transition">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-[#12121f] border border-[#2a2a3a] rounded-lg flex items-center justify-center text-[#555] hover:text-[#e8593c] hover:border-[#e8593c] transition">
                <FaGithub size={14} />
              </a>
            </div>
          </div>

         
          <div>
            <h4 className="text-white text-sm font-medium mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-[#555] text-sm hover:text-[#e8593c] transition">Movies</Link>
              <Link to="/shows" className="text-[#555] text-sm hover:text-[#e8593c] transition">Shows</Link>
              <Link to="/my-tickets" className="text-[#555] text-sm hover:text-[#e8593c] transition">My Tickets</Link>
            </div>
          </div>

          
          <div>
            <h4 className="text-white text-sm font-medium mb-3">Support</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[#555] text-sm hover:text-[#e8593c] transition">Help Center</a>
              <a href="#" className="text-[#555] text-sm hover:text-[#e8593c] transition">Privacy Policy</a>
              <a href="#" className="text-[#555] text-sm hover:text-[#e8593c] transition">Terms of Service</a>
              <a href="#" className="text-[#555] text-sm hover:text-[#e8593c] transition">Contact Us</a>
            </div>
          </div>
        </div>

        
        <div className="border-t border-[#1a1a2a] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#333] text-xs">© 2026 CineBook. All rights reserved.</p>
          <p className="text-[#333] text-xs">Made with ❤️ by Azlan</p>
        </div>

      </div>
    </footer>
  )
}