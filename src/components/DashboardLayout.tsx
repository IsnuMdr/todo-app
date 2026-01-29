import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Outlet, useNavigate } from "react-router";
import { DashboardIcon, TodoIcon } from "./Icons";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  badge?: number;
}

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onLogout={handleLogout} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
