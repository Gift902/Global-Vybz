import React, { useState } from "react";
import { FiHome, FiMusic, FiEdit3, FiSettings, FiMenu, FiX } from "react-icons/fi";

const DashboardSidebar = ({ active, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true); // sidebar toggle for mobile

  const menuItems = [
    { id: "posts", label: "Posts", icon: <FiEdit3 /> },
    { id: "songs", label: "Songs", icon: <FiMusic /> },
    { id: "instrumentals", label: "Instrumentals", icon: <FiMusic /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gray-800/80 rounded-full text-white shadow-lg hover:bg-gray-700 transition"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-full md:h-screen w-64 bg-gray-900/95 backdrop-blur-lg border-r border-gray-700 p-6 flex flex-col transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <ul className="space-y-4 flex-1 overflow-y-auto mt-10 sm:mt-14">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300 text-base sm:text-lg font-medium ${
                  active === item.id
                    ? "bg-neon-pink/30 text-neon-pink drop-shadow-neon"
                    : "text-gray-200 hover:bg-neon-blue/20 hover:text-neon-blue"
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DashboardSidebar;
