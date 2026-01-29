import { useState, useRef, useEffect } from "react";
import { LogoutIcon, SearchIcon } from "./Icons";

interface NavbarProps {
  onLogout: () => void;
  onSearch?: (query: string) => void;
}

const Navbar = ({ onLogout, onSearch }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 w-full">
        <div className="relative w-full flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="
              w-full pl-10 pr-4 py-2
              text-sm
              border border-gray-300 rounded-lg
              bg-gray-50
              text-gray-900
              placeholder:text-gray-400
              focus:outline-none
              focus:bg-white
              focus:border-blue-900
              focus:ring-2
              focus:ring-blue-900/20
              transition-colors
            "
          />
        </div>
        <button
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Calendar"
        >
          <img src="./calendar.svg" alt="Calendar" className="w-5 h-5" />
        </button>

        <div className="relative " ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="
              flex items-center gap-3 px-3 py-2
              hover:bg-gray-50 rounded-lg
              transition-colors cursor-pointer
            "
          >
            <span className="text-sm font-medium text-gray-700">John Doe</span>

            <div className="relative">
              {/*  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                 /> */}
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#154886] to-[#1e5a9e] flex items-center justify-center">
                <span className="text-xs font-semibold text-white">John</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={handleLogout}
                className="
                  w-full px-4 py-2.5
                  flex items-center gap-3
                  text-sm font-medium text-red-600
                  hover:bg-red-50
                  transition-colors cursor-pointer
                "
              >
                <LogoutIcon className="w-5 h-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
