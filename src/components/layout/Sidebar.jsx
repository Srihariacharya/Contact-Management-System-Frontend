import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Bell,
    CheckSquare,
    BarChart3,
    Upload,
    Settings
} from "lucide-react";

export default function Sidebar() {
    const menuItems = [
        {name: "Dashboard", path: "/", icon: LayoutDashboard},
        {name: "Contacts", path: "/contacts", icon: Users},
        {name: "Follow-Ups", path: "/followups", icon: Bell},
        {name: "Tasks", path: "/tasks", icon: CheckSquare},
        {name: "Analytics", path: "/analytics", icon: BarChart3},
        {name: "Import/Export", path: "/import-export", icon: Upload},
        {name: "Settings", path: "/settings", icon: Settings},
    ];
    
    return (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          {/* LOGO */}
          <div className="h-16 flex items-center px-6 text-xl font-bold">
            <h1 className="text-xl font-bold text-indigo-600">
                ContactPro
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
                const Icon = item.icon;

                return(
                    <NavLink
                      key={index}
                      to={item.path}
                      className={({ isActive }) =>
                         `flex items-center gap-3 px-4 py-2 rounded-lg transition
                          ${
                            isActive 
                              ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300"
                              : "text-gray-600 dark:text-grey-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`
                        }
                    >
                       <Icon size={18} />
                        {item.name}
                    </NavLink>
                );
            })}
          </nav>
        </div>
    );
}