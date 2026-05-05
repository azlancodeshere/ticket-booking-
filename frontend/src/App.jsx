import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MainLayout from './Layout/MainLayout';
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import SeatSelection from './pages/SeatSelection'
import VerifyBooking from './pages/VerifyBooking'
import MyTickets from './pages/MyTickets.jsx'
import BookingConfirmed from './pages/BookingConfirmed'
import Shows from './pages/Shows'
import ScrollToTop from './pages/ScrollToTop.jsx'




function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <Routes>
      
      <Route path="/" element={<MainLayout />}>
       <Route index element={<Home />} />
       <Route path="movies" element={<Movies />} />
       <Route path="movies/:id" element={<MovieDetail />} />
       <Route path="movies/:id/seats" element={<SeatSelection />} />
       <Route path="verify" element={<VerifyBooking/>}/>
       <Route path="my-tickets" element={<MyTickets />} />
       <Route path="booking/confirmed" element={<BookingConfirmed />} />
       <Route path="shows" element={<Shows />} />
       </Route>


       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup/>}/>
    
      </Routes>
    </BrowserRouter>
  )
}

export default App