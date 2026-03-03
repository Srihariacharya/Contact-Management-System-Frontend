import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
    return (
        <div className = "flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                {/*Main Content */}
                <main className="flex-1 p-6">
                   <Outlet />
                </main>
            </div>
        </div>
    );
}