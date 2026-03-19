import React from "react";
import { Bell, UserCircle, LogOut } from "lucide-react";

const AdminHeader: React.FC = () => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left */}
      <div className="text-lg font-bold text-slate-800">
        Admin Dashboard
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-lg transition">
          <UserCircle size={22} />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>

        <button className="flex items-center gap-1 text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
