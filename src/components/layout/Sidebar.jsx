import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Bell,
    CheckSquare,
    BarChart3,
    Upload,
    Settings,
    Zap,

} from "lucide-react";

export default function Sidebar() {
    const menuItems = [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Contacts", path: "/contacts", icon: Users },
        { name: "Follow-Ups", path: "/followups", icon: Bell },
        { name: "Tasks", path: "/tasks", icon: CheckSquare },
        { name: "Analytics", path: "/analytics", icon: BarChart3 },

        { name: "Import/Export", path: "/import-export", icon: Upload },
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    return (
        <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col min-h-screen">
            {/* LOGO */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                        <Zap size={16} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                        Contact<span className="text-indigo-600">Pro</span>
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-3">
                    Main Menu
                </p>
                {menuItems.slice(0, 5).map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                                ${isActive
                                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`p-1 rounded-lg transition-all duration-150 ${isActive ? "bg-indigo-100 dark:bg-indigo-800/50" : ""}`}>
                                        <Icon size={16} />
                                    </div>
                                    {item.name}
                                </>
                            )}
                        </NavLink>
                    );
                })}

                <div className="pt-3 pb-1">
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2">
                        Management
                    </p>
                </div>

                {menuItems.slice(5).map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                                ${isActive
                                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`p-1 rounded-lg transition-all duration-150 ${isActive ? "bg-indigo-100 dark:bg-indigo-800/50" : ""}`}>
                                        <Icon size={16} />
                                    </div>
                                    {item.name}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom User Section */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm flex-shrink-0">
                        SA
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">Srihari Acharya</p>
                        <p className="text-xs text-gray-400 truncate">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}