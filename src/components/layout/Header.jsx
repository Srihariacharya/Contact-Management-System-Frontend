import { Search, Bell, Sun, Moon, ChevronDown, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === "/") return "Dashboard";
        if (path.includes("contacts")) return "Contacts";
        if (path.includes("followups")) return "Follow-Ups";
        if (path.includes("task")) return "Tasks";
        if (path.includes("analytics")) return "Analytics";
        if (path.includes("import-export")) return "Import / Export";
        if (path.includes("settings")) return "Settings";
        return "Dashboard";
    };

    const getPageSubtitle = () => {
        const path = location.pathname;
        if (path === "/") return "Welcome back, Srihari!";
        if (path.includes("contacts")) return "Manage all your relationships";
        if (path.includes("followups")) return "Stay on top of your follow-ups";
        if (path.includes("task")) return "Track your tasks and progress";
        if (path.includes("analytics")) return "Insights and reports";
        if (path.includes("import-export")) return "Manage your data";
        if (path.includes("settings")) return "Manage your preferences";
        return "";
    };

    return (
        <header className="h-16 px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 flex-shrink-0">

            {/* Page Title */}
            <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                    {getPageTitle()}
                </h1>
                <p className="text-xs text-gray-400 dark:text-gray-500">{getPageSubtitle()}</p>
            </div>

            <div className="flex items-center gap-2">
                {/* Search Box */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-56 pl-9 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
                    title="Toggle theme"
                >
                    {theme === "light" ? (
                        <Moon size={17} />
                    ) : (
                        <Sun size={17} className="text-yellow-400" />
                    )}
                </button>

                {/* Notification Icon */}
                <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-all">
                    <Bell size={17} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative ml-1">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            SA
                        </div>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-modal border border-gray-100 dark:border-gray-700 z-50 animate-scale-in overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Srihari Acharya</p>
                                <p className="text-xs text-gray-400">srihari@example.com</p>
                            </div>
                            <div className="p-1.5">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                >
                                    <LogOut size={15} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}