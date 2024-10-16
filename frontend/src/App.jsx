import './App.css'
import NavBar from './components/NavBar/NavBar'
import Tabs from './components/Tabs/Tabs'
import HomeSection from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Aboutus from './components/Aboutus/Aboutus'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuyPage from './components/pages/Buy'; // Create these components for each page
import SellPage from './components/pages/Sell';
import RentPage from './components/pages/Rent';

function App() {

  //useffect -> axios post req 
  // api/properties/location 

  return (
    <>
      <Router>
      <NavBar />
      <Routes>
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/rent" element={<RentPage />} />
      </Routes>
    </Router>
      <br />
      <HomeSection />
      <br />
      <Tabs />
      <Aboutus />
      <Footer />
    </>
  )
}

export default App
