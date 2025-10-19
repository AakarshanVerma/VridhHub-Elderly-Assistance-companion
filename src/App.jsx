import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Health from './components/health/Health'
import Doctor from './components/health/Doctor'
import Prescription from './components/health/Prescription'
import Navbar from './components/Navbar'
import Finance from './components/finance/Finance'
import BillManager from './components/finance/BillManager'
import BalanceTracker from './components/finance/BalanceTracker'
import Footer from './components/Footer'
import BookCab from './components/transport/BookCab'
import Transport from './components/transport/Transport'
import Carpool from './components/transport/Carpool'
import { useEffect } from 'react'
import Isolation from './components/community/Isolation'
import Community from './components/community/Community'
import Intergenerational from './components/community/Intergenerational'
import Contact from './components/Contact'
import About from './components/About'

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          {/* Health */}
          <Route path="/health" element={<Health />} />
          <Route path="/health/prescription" element={<Prescription />} />
          <Route path="/health/doctor" element={<Doctor />} />
          {/* Finance */}
          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/bill-manager" element={<BillManager />} />
          <Route path="/finance/balance-tracker" element={<BalanceTracker />} />
          {/* Transport */}
          <Route path="/transport" element={<Transport />} />
          <Route path="/transport/book-cab" element={<BookCab />} />
          <Route path="/transport/carpool" element={<Carpool />} />
          {/* Communtiy */}
          <Route path="/isolation" element={<Isolation />} />
          <Route path="/isolation/community" element={<Community />} />
          <Route path="/isolation/intergenerational" element={<Intergenerational />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
