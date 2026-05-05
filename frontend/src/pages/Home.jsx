import { Link } from 'react-router-dom'
import { Film, Ticket, Star, Zap, Shield, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070710] overflow-hidden">

      
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[#e8593c] opacity-[0.06] blur-[120px] -top-40 -left-40 pointer-events-none" />
      <div className="fixed w-[400px] h-[400px] rounded-full bg-[#7F77DD] opacity-[0.06] blur-[120px] -bottom-20 -right-20 pointer-events-none" />
      <div className="fixed w-[300px] h-[300px] rounded-full bg-[#e8593c] opacity-[0.04] blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

     
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

     
      <div className="relative z-10 h-6 bg-[#0a0a14] border-b border-[#1a1a2a] flex items-center gap-2 px-6 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-3 h-3.5 rounded-sm bg-[#070710] border border-[#1f1f2e] flex-shrink-0" />
        ))}
      </div>

     
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">

       
        <div className="flex items-center gap-2 bg-[#0c0c18] border border-[#1f1f30] px-4 py-2 rounded-full mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#e8593c] animate-pulse" />
          <span className="text-[#888] text-xs tracking-widest uppercase">Now Showing in Your City</span>
        </div>

       
        <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl">
          Your Cinema,
          <br />
          <span className="text-[#e8593c]">Your Way.</span>
        </h1>

        <p className="text-[#555] text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          Skip the queue. Pick your seat. Get your QR ticket in seconds.
          The easiest way to book movies online.
        </p>

        
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link
            to="/movies"
            className="flex items-center justify-center gap-2 bg-[#e8593c] hover:bg-[#d44d32] text-white font-medium px-8 py-4 rounded-xl text-sm transition hover:-translate-y-0.5 transform"
          >
            <Film size={16} />
            Browse Movies
          </Link>
          <Link
            to="/my-tickets"
            className="flex items-center justify-center gap-2 bg-[#0c0c18] border border-[#1f1f30] hover:border-[#e8593c] text-[#888] hover:text-white font-medium px-8 py-4 rounded-xl text-sm transition hover:-translate-y-0.5 transform"
          >
            <Ticket size={16} />
            My Tickets
          </Link>
        </div>

        
        <div className="flex flex-wrap items-center justify-center gap-8 mb-20">
          {[
            { value: '500+', label: 'Movies' },
            { value: '50+', label: 'Cinemas' },
            { value: '1M+', label: 'Tickets Booked' },
            { value: '4.9', label: 'App Rating' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[#444] text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        
        <div className="w-full max-w-4xl border-t border-[#1a1a2a] mb-20" />

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mb-20">
          {[
            {
              icon: <Zap size={20} className="text-[#e8593c]" />,
              title: 'Instant Booking',
              desc: 'Book your seats in under 30 seconds. No waiting, no hassle.'
            },
            {
              icon: <Star size={20} className="text-[#e8593c]" />,
              title: 'Best Seats',
              desc: 'Choose from premium, regular, or recliner seats with live availability.'
            },
            {
              icon: <Shield size={20} className="text-[#e8593c]" />,
              title: 'QR Tickets',
              desc: 'Get a QR code ticket instantly. Just scan and walk in.'
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-[#0c0c18] border border-[#1a1a2a] hover:border-[#e8593c]/30 rounded-2xl p-6 text-left transition group"
            >
              <div className="w-10 h-10 bg-[#12121f] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1a0a0a] transition">
                {f.icon}
              </div>
              <h3 className="text-white font-medium mb-2">{f.title}</h3>
              <p className="text-[#444] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

       
        <div className="max-w-4xl w-full mb-20">
          <h2 className="text-white text-2xl font-bold text-center mb-10">
            How It <span className="text-[#e8593c]">Works</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Browse', desc: 'Find movies now showing near you' },
              { step: '02', title: 'Select Seats', desc: 'Pick your perfect seats on the map' },
              { step: '03', title: 'Pay', desc: 'Quick & secure checkout' },
              { step: '04', title: 'Enjoy', desc: 'Scan QR at the gate and enjoy!' },
            ].map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="w-12 h-12 bg-[#0c0c18] border border-[#1a1a2a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#e8593c] text-xs font-bold">{s.step}</span>
                </div>
                {i < 3 && (
                  <div className="hidden sm:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-[#1a1a2a]" />
                )}
                <h4 className="text-white text-sm font-medium mb-1">{s.title}</h4>
                <p className="text-[#444] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      
        <div className="w-full max-w-4xl bg-[#0c0c18] border border-[#1a1a2a] rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#e8593c] opacity-[0.05] blur-[80px] -top-20 left-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <Clock size={32} className="text-[#e8593c] mx-auto mb-4" />
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
              Ready to Watch?
            </h2>
            <p className="text-[#555] text-sm mb-6 max-w-sm mx-auto">
              Hundreds of movies are available now. Book your seats before they fill up!
            </p>
            <Link
              to="/movies"
              className="inline-flex items-center gap-2 bg-[#e8593c] hover:bg-[#d44d32] text-white font-medium px-8 py-3 rounded-xl text-sm transition hover:-translate-y-0.5 transform"
            >
              <Film size={16} />
              Browse All Movies
            </Link>
          </div>
        </div>

      </div>

    
      <div className="relative z-10 h-6 bg-[#0a0a14] border-t border-[#1a1a2a] flex items-center gap-2 px-6 overflow-hidden mt-16">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-3 h-3.5 rounded-sm bg-[#070710] border border-[#1f1f2e] flex-shrink-0" />
        ))}
      </div>

    </div>
  )
}