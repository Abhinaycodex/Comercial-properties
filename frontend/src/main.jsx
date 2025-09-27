import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// Import components
import App from './App.jsx'
import Layout from './Layout.jsx'
import BuyPage from './components/pages/Buy.jsx'
import SellPage from './components/pages/Sell.jsx'
import RentPage from './components/pages/Rent.jsx'
import Register from './components/Register/Register.jsx'
import PropertyDetails from './components/Property/propertydetails.jsx'

// Create router with proper nested structure
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Home page route */}
      <Route index element={<Layout />} />
      
      {/* Property routes */}
      <Route path="properties/:id" element={<PropertyDetails />} />
      
      {/* Main navigation routes */}
      <Route path="buy" element={<BuyPage />} />
      <Route path="buy/:property_id" element={<BuyPage />} />
      <Route path="sell" element={<SellPage />} />
      <Route path="rent" element={<RentPage />} />
      
      {/* User routes */}
      <Route path="register" element={<Register />} />
      
      {/* Catch-all route for 404 (optional) */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Route>
  )
)

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)