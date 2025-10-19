import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

/* Components */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';

/* Health */
import Health from './components/health/Health';
import Doctor from './components/health/Doctor';
import Prescription from './components/health/Prescription';

/* Finance */
import Finance from './components/finance/Finance';
import BillManager from './components/finance/BillManager';
import BalanceTracker from './components/finance/BalanceTracker';

/* Transport */
import Transport from './components/transport/Transport';
import BookCab from './components/transport/BookCab';
import Carpool from './components/transport/Carpool';

/* Community */
import Isolation from './components/community/Isolation';
import Community from './components/community/Community';
import Intergenerational from './components/community/Intergenerational';

function App() {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Health */}
        <Route path="/health" element={<Health />} />
        <Route path="/health/doctor" element={<Doctor />} />
        <Route path="/health/prescription" element={<Prescription />} />

        {/* Finance */}
        <Route path="/finance" element={<Finance />} />
        <Route path="/finance/bill-manager" element={<BillManager />} />
        <Route path="/finance/balance-tracker" element={<BalanceTracker />} />

        {/* Transport */}
        <Route path="/transport" element={<Transport />} />
        <Route path="/transport/book-cab" element={<BookCab />} />
        <Route path="/transport/carpool" element={<Carpool />} />

        {/* Community */}
        <Route path="/isolation" element={<Isolation />} />
        <Route path="/isolation/community" element={<Community />} />
        <Route path="/isolation/intergenerational" element={<Intergenerational />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
