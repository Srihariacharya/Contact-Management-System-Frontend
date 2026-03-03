import { Search, Bell, Sun, Moon} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Header() {
    
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;

        if(path === "/") return "Dashboard";
        if(path.includes("contacts")) return "Contacts";
        if(path.includes("followups")) return "Follow-Ups";
        if(path.includes("task")) return "Tasks";
        if(path.includes("analytics")) return "Analytics";
        if(path.includes("import-export")) return "Import / Export";
        if(path.includes("settings")) return "Settings";
        
        return "Dashboard";
    };

    return (
        <header className="h-16 px-6 flex items-center justify-between bg-white dark:bg-gray-800 boder-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            
            {/*Page Title*/}
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {getPageTitle()}
            </h1>
            
            <div className="flex items-center gap-5">
                {/* Search Box */}
                <div className="relative">
                    <input 
                       type="text"
                       placeholder="Search..."
                       className="w-64 pl-4 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/*Notification Icon*/}
                <button className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <Bell size={22} />

                    <span className=" absoulte top-1 right-1 px-1.5 py-0.5 text-[10px] font-semibold bg-red-500 rounded-full text-white" > 3 </span>
                </button>

                {/* Theme Toggle*/}
                <button 
                   onClick={toggleTheme}
                   className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    {theme === "light" ? (
                        <Moon size={18} />
                    ): (
                        <Sun size={18} className="text-yellow-400" />
                    )}
                </button>

                {/*Profile*/}
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                    SA
                </div>
            </div>
        </header>
    );
}