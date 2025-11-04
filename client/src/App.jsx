import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Instrumentals from "./Pages/Instrumentals";
import Songs from "./Pages/Songs";
import BookSession from "./Pages/BookSession";
import Admin from "./Pages/Admin";
import AdminDashboard from './Pages/AdminDashboard';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instrumentals" element={<Instrumentals />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/book-session" element={<BookSession />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
