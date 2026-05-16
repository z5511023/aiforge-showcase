import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import AddPrototype from './pages/AddPrototype'
import WebsiteCarDetail from './pages/detail/WebsiteCarDetail'
import WebsiteKnowledgeDetail from './pages/detail/WebsiteKnowledgeDetail'
import AppSportsDetail from './pages/detail/AppSportsDetail'
import AppDietDetail from './pages/detail/AppDietDetail'
import AdminEcommerceDetail from './pages/detail/AdminEcommerceDetail'
import AdminEngineeringDetail from './pages/detail/AdminEngineeringDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddPrototype />} />
      <Route path="/prototype/website-car-kimi" element={<WebsiteCarDetail />} />
      <Route path="/prototype/website-knowledge-mimo" element={<WebsiteKnowledgeDetail />} />
      <Route path="/prototype/app-sports-kimi" element={<AppSportsDetail />} />
      <Route path="/prototype/app-diet-chatgpt" element={<AppDietDetail />} />
      <Route path="/prototype/admin-ecommerce-kimi" element={<AdminEcommerceDetail />} />
      <Route path="/prototype/admin-engineering-gemini" element={<AdminEngineeringDetail />} />
    </Routes>
  )
}
