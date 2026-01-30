import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Outlet, useNavigate } from "react-router";
import { DashboardIcon, TodoIcon } from "../components/Icons";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  badge?: number;
}

import React, { useState } from "react";

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: DashboardIcon,
      path: "#",
    },
    {
      id: "todos",
      label: "Todos",
      icon: TodoIcon,
      path: ROUTES.TODOS,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  // Toggle sidebar for mobile
  const handleSidebarToggle = () => setSidebarOpen((open) => !open);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for desktop, overlay for mobile */}
      <div className="z-30">
        <Sidebar
          menuItems={menuItems}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar with sidebar toggle for mobile */}
        <div className="sticky top-0 z-20">
          <Navbar
            onLogout={handleLogout}
            onSidebarToggle={handleSidebarToggle}
          />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay background */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
