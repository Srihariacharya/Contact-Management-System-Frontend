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
        <div className="w-64 bg-white border-r min-h-screen p-5">
          {/* LOGO */}
          <div className="mb-8">
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
                         `flex items-center gap-3 p-3 rounded-lg transition
                          ${
                            isActive 
                              ? "bg-indigo-100 text-indigo-600 font-medium"
                              : "text-gray-600 hover:bg-gray-100"
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