import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
    return (
        <div className = "flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                {/*Main Content */}
                <div className="flex-1 p-6">
                   <Outlet />
                </div>
            </div>
        </div>
    );
}