import { Search, Bell, Sun, Moon} from "lucide-react";

export default function Header() {
    return (
        <div className="h-16 bg-white border-b px-6 flex items-center justify-between">
            {/*Page Title*/}
            <h2 className="text-lg font-semibold text-gray-700">
                Dashboard
            </h2>
            
            <div className="flex items-center gap-4">
                {/* Search Box */}
                <div className="relative">
                    <Search
                       size={18}
                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input 
                       type="text"
                       placeholder="Search..."
                       className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-indigo-500"
                    />
                </div>

                {/*Notification Icon*/}
                <Bell className="text-gray-600 cursor-pointer" size={20} />

                {/* Theme Toggle*/}
                <button className="p-2 rounded-lg hover: bg-gray-100">
                    <Sun size={18} />
                </button>

                {/*Profile*/}
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                    SA
                </div>
            </div>
        </div>
    );
}