import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Gallery from "./pages/Gallery";
import SocialWork from "./pages/SocialWork";
import Members from "./pages/Members";
import AboutUs from "./pages/AboutUs";
import UpdateInfo from "./pages/UpdateInfo";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import NewsManagement from "./pages/NewsManagement";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/news" element={
          <>
            <Navbar />
            <News />
            <Footer />
          </>
        } />
        <Route path="/news/:id" element={
          <>
            <Navbar />
            <NewsDetail />
            <Footer />
          </>
        } />
        <Route path="/gallery" element={
          <>
            <Navbar />
            <Gallery />
            <Footer />
          </>
        } />
        <Route path="/social-work" element={
          <>
            <Navbar />
            <SocialWork />
            <Footer />
          </>
        } />
        <Route path="/members" element={
          <>
            <Navbar />
            <Members />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <AboutUs />
            <Footer />
          </>
        } />
        <Route path="/update-info" element={
          <>
            <Navbar />
            <UpdateInfo />
            <Footer />
          </>
        } />

        {/* Admin Login Route */}
        <Route path="/secured-admin2711" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/secured-admin2711" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="news" element={<NewsManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

