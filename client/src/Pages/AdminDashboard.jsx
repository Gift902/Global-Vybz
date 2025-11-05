import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardContent from "../components/DashboardContent";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-linear-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      {/* Sidebar */}
      <DashboardSidebar active={activeSection} onSelect={setActiveSection} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col backdrop-blur-sm relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800">
          <DashboardHeader title={activeSection} />
        </div>
        {/* Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
           <button
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 text-sm md:text-base"
          >
            Logout
          </button>
          <DashboardContent section={activeSection} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
