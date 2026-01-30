import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  badge?: number;
}

interface SidebarProps {
  menuItems: MenuItem[];
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ menuItems, isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  // Responsive sidebar classes
  const sidebarBase =
    "fixed md:static left-0 top-0 z-30 md:z-auto w-64 bg-white border-r border-gray-200 flex flex-col h-full md:h-screen transition-transform duration-200 ease-in-out";
  const sidebarOpen = isOpen
    ? "translate-x-0"
    : "-translate-x-full md:translate-x-0";

  return (
    <aside className={`${sidebarBase} ${sidebarOpen}`}>
      {/* Logo & Settings */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-gray-100 relative">
        <img src="./logo.png" alt="Logo" className="h-10 w-auto" />
        <button
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Settings"
        >
          <img src="./setting.svg" alt="Settings" className="w-5 h-5" />
        </button>
        {/* Close button for mobile */}
        {onClose && (
          <button
            className="absolute right-2 top-2 md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-500"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Menu List */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-linear-to-br from-[#1e40af] to-[#5778b8] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`
                        px-2 py-0.5 text-xs font-semibold rounded-full
                        ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-700"
                        }
                      `}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
