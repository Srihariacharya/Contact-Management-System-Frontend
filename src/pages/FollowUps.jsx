import { CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { useState } from "react";

export default function FollowUps() {
    const [followups, setFollowups] = useState([
        {
            id:1,
            name: "Vinod Sharma",
            email: "vinod@email.com",
            category: "Client",
            date: "Feb 4, 2026",
            frequency: "Every 30 days",
            status: "Overdue",
            days: "37 days overdue"
        },
        {
            id:2,
            name: "Roshan",
            email: "roshan@email.com",
            category: "Partner",
            date: "Mar 22, 2026",
            frequency: "Every 7 days",
            status: "Upcoming",
            days: "13 days"
        },
    ]);

    const markComplete = (id) => {
        const updated = followups.map((f) =>
            f.id === id ? {...f, status: "Completed"} : f 
        );
        setFollowups(updated);
    }


    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Follow-Up Management</h1>
                <p className="text-gray-500">
                     Stay on top of your relationship touchpoints
                </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border p-4 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Total Follow-Ups</p>
                        <h2 className="text-xl font-semibold">10</h2>
                    </div>
                    <Clock className="text-indigo-600" />
                </div>

                <div className="bg-white rounded-xl border p-4 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Overdue</p>
                        <h2 className="text-xl font-semibold text-red-600">3</h2>
                    </div>
                    <AlertTriangle className="text-red-500" />
                </div>
                
                <div className="bg-white rounded-xl border p-4 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Next 7 Days</p>
                        <h2 className="text-xl font-semibold text-green-600">3</h2>
                    </div>
                    <CheckCircle className="text-green-600" />
                </div>
            </div>
            <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-4 text-left">Contact Name</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Next Follow-Up Date</th>
                            <th className="p-4 text-left">Frequency</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Days Remaining</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {followups.map((f)=> (
                            <tr key={f.id} className={`border-t hover:bg-gray-50 ${
                            f.status === "Completed" ? "opacity-50" : ""
                        }`} >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                            {f.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium">{f.name}</p>
                                            <p className="text-xs text-gray-500">{f.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                        {f.category}
                                    </span>
                                </td>
                                <td className="p-4">{f.date}</td>
                                <td className="p-4">{f.frequency}</td>

                                <td className="p-4">
                                    {f.status === "Overdue" ? (
                                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                                            Overdue
                                        </span>
                                    ) : (
                                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                                            Upcoming
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-red-500">{f.days}</td>
                                <td className="p-4">
                                    {f.status === "Completed" ? (
                                        <span className="text-green-600 text-sm font-medium">
                                            Completed
                                        </span>
                                    ) : (
                                    <button 
                                        onClick={() => markComplete(f.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-xs">
                                        Mark Complete
                                    </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}