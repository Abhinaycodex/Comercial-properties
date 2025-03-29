import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import BuyPage from './components/pages/Buy.jsx';
import SellPage from './components/pages/Sell.jsx';
import RentPage from './components/pages/Rent.jsx';
import Register from './components/Register/Register.jsx';
import Layout from './Layout.jsx';
import App from './App.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Layout />} />
      <Route path="buy" element={<BuyPage />} />
      <Route path="buy/:property_id" element={<BuyPage />} />
      <Route path="sell" element={<SellPage />} />
      <Route path="rent" element={<RentPage/>} />
      <Route path="register" element={<Register/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
