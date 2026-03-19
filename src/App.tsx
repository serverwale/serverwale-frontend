import React from "react";
import axios from "axios";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { getAdminToken } from "./utils/auth";

// Set JWT token on all axios requests globally
const _initToken = getAdminToken();
if (_initToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${_initToken}`;
}

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import SolutionPage from "./pages/SolutionPage";
import JoinUsPage from "./pages/JoinUsPage";
import ProductDetail from "./pages/ProductDetail";
import BlogDetail from "./pages/BlogDetail";
import Policy from "./pages/Policy";
import ShopPage from "./pages/ShopPage";
import ShopProductDetail from "./pages/ShopProductDetail";
import ShopAdmin from "./pages/admin/ShopAdmin";
import CloudPage from "./pages/CloudPage";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProductDetail from "./pages/admin/AdminProductDetail";
import Lead from "./pages/admin/lead";
import Request from "./pages/admin/Request";
import Support from "./pages/admin/Support";
import Inquiry from "./pages/admin/Inquiry";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AddBlog from "./pages/admin/AddBlog";
import EditBlog from "./pages/admin/EditBlog";
import AILeads from "./pages/admin/AILeads";
import Consultations from "./pages/admin/Consultations";
import AdminJobs from "./pages/admin/AdminJobs";
import AIAgentsDashboard from "./pages/admin/AIAgentsDashboard";
import BlogAgentDashboard from "./pages/admin/BlogAgentDashboard";
import PrivateRoute from "./components/PrivateRoute";

import QuickButtons from "./components/QuickButtons";
import QuickNavSide from "./components/QuickNavSide";
import StickyMobileCTA from "./components/StickyMobileCTA";

/* =========================
   Layout Controller
========================= */

const AppContent: React.FC = () => {
  const location = useLocation();

  // Admin pages detection
  const isAdminRoute = location.pathname.startsWith("/admin")||location.hash.startsWith("#/admin");

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      {!isAdminRoute && <Header />}

      {/* Main */}
      <main className="flex-grow">
        <Routes>
          {/* ---------- Admin Routes (Public: Login Only) ---------- */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ---------- Admin Routes (🔒 Protected: Team Only) ---------- */}
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/products" element={<PrivateRoute><AdminProducts /></PrivateRoute>} />
          <Route path="/admin/categories" element={<PrivateRoute><AdminCategories /></PrivateRoute>} />
          <Route path="/admin/products/:id" element={<PrivateRoute><AdminProductDetail /></PrivateRoute>} />
          <Route path="/admin/leads" element={<PrivateRoute><Lead /></PrivateRoute>} />
          <Route path="/admin/request" element={<PrivateRoute><Request /></PrivateRoute>} />
          <Route path="/admin/support" element={<PrivateRoute><Support /></PrivateRoute>} />
          <Route path="/admin/inquiry" element={<PrivateRoute><Inquiry /></PrivateRoute>} />
          <Route path="/admin/blogs" element={<PrivateRoute><AdminBlogs /></PrivateRoute>} />
          <Route path="/admin/blogs/add" element={<PrivateRoute><AddBlog /></PrivateRoute>} />
          <Route path="/admin/blogs/edit/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
          <Route path="/admin/ai-leads" element={<PrivateRoute><AILeads /></PrivateRoute>} />
          <Route path="/admin/consultations" element={<PrivateRoute><Consultations /></PrivateRoute>} />
          <Route path="/admin/jobs" element={<PrivateRoute><AdminJobs /></PrivateRoute>} />
          <Route path="/admin/ai-agents" element={<PrivateRoute><AIAgentsDashboard /></PrivateRoute>} />
          <Route path="/admin/blog-agent" element={<PrivateRoute><BlogAgentDashboard /></PrivateRoute>} />
          <Route path="/admin/shop" element={<PrivateRoute><ShopAdmin /></PrivateRoute>} />

          
          {/* ---------- Website Routes ---------- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:category" element={<ServicesPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/enterprise-solution" element={<SolutionPage />} />
          <Route path="/joinus" element={<JoinUsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} /> {/* 👈 */}
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/shop/now" element={<ShopPage />} />
          <Route path="/shop/now/:id" element={<ShopProductDetail />} />
          <Route path="/shop/cloud" element={<CloudPage />} />


          {/* ---------- Fallback ---------- */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isAdminRoute && <Footer />}

      {/* Floating buttons */}
      {!isAdminRoute && <QuickButtons />}

      {/* Right-side quick nav tabs */}
      {!isAdminRoute && <QuickNavSide />}

      {/* Mobile sticky CTA bar — home page only */}
      {!isAdminRoute && (location.pathname === "/" || location.hash === "#/") && <StickyMobileCTA />}
    </div>
  );
};

/* =========================
   Router Wrapper
========================= */

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
