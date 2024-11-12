import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import BuyPage from './components/pages/Buy.jsx';
import SellPage from './components/pages/Sell.jsx';
import RentPage from './components/pages/Rent.jsx';
import Layout from './Layout.jsx';



const router =createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />} />
      <Route path="BUY" element={<BuyPage />} />
      <Route path="BUY/:property_id" element={<BuyPage />} />
      <Route path="SELL" element={<SellPage />} />
      <Route path="RENT" element={<RentPage/>} />
      
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)
