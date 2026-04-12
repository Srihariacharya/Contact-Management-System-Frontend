import { Users, UserPlus, AlertCircle, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Cake, MessageSquare } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
    {
        title: "Total Contacts",
        value: "10",
        subtitle: "+2 this week",
        change: "up",
        icon: Users,
        iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        gradient: "from-indigo-500 to-indigo-600",
    },
    {
        title: "Added This Month",
        value: "7",
        subtitle: "+12% from last month",
        change: "up",
        icon: UserPlus,
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        gradient: "from-emerald-500 to-emerald-600",
    },
    {
        title: "Overdue Follow-Ups",
        value: "3",
        subtitle: "Needs attention",
        change: "down",
        icon: AlertCircle,
        iconBg: "bg-red-100 dark:bg-red-900/30",
        iconColor: "text-red-500 dark:text-red-400",
        gradient: "from-red-500 to-rose-600",
    },
    {
        title: "Relationship Health",
        value: "64%",
        subtitle: "Average score",
        change: "up",
        icon: Activity,
        iconBg: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        gradient: "from-purple-500 to-purple-600",
    },
];

const interactionData = [
    { date: "Jan 22", interactions: 12 },
    { date: "Jan 29", interactions: 15 },
    { date: "Feb 05", interactions: 18 },
    { date: "Feb 12", interactions: 22 },
    { date: "Feb 19", interactions: 19 },
    { date: "Feb 26", interactions: 16 },
];

const contactData = [
    { name: "Virat", value: 15 },
    { name: "Sharvan", value: 13 },
    { name: "Rohit", value: 12 },
    { name: "KL Rahul", value: 10 },
    { name: "Vinod", value: 8 },
];

const staleContacts = [
    { name: "Vinod Sharma", role: "Lead", days: "37 days ago", initials: "VS" },
    { name: "ShivaKumar", role: "Lead", days: "63 days ago", initials: "SK" },
    { name: "Rohan", role: "Lead", days: "47 days ago", initials: "R" },
];

const upcomingFollowups = [
    { name: "Jai Shankar", date: "Mar 22, 2025", days: "In 13 days", initials: "JS" },
    { name: "Roshan", date: "Mar 24, 2025", days: "In 15 days", initials: "R" },
    { name: "Ramesh", date: "Mar 28, 2025", days: "In 19 days", initials: "R" },
];

// All contacts with DOB — today is 2026-03-30
const allContacts = [
    { id: 1, name: "Shravan", dob: "1995-03-30", gender: "male", initials: "S" },
    { id: 2, name: "Rahul Shetty", dob: "1990-07-15", gender: "male", initials: "RS" },
    { id: 3, name: "Priya Sharma", dob: "1998-03-30", gender: "female", initials: "PS" },
    { id: 4, name: "Anita Verma", dob: "1993-05-22", gender: "female", initials: "AV" },
];

function getTodayBirthdays(contacts) {
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // 1-indexed
    const todayDay = today.getDate();
    return contacts.filter((c) => {
        if (!c.dob) return false;
        const d = new Date(c.dob);
        return d.getMonth() + 1 === todayMonth && d.getDate() === todayDay;
    });
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 shadow-card-hover text-xs">
                <p className="text-gray-500 dark:text-gray-400">{label}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{payload[0].value} interactions</p>
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) navigate("/login");
    }, [navigate]);

    const [wishStatus, setWishStatus] = useState({}); // { id: 'sending' | 'sent' }

    const handleSendWish = (id) => {
        setWishStatus((prev) => ({ ...prev, [id]: "sending" }));
        setTimeout(() => {
            setWishStatus((prev) => ({ ...prev, [id]: "sent" }));
        }, 1500);
    };

    const todayBirthdays = getTodayBirthdays(allContacts);

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-card-hover transition-all duration-200 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                                    <Icon size={18} className={stat.iconColor} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-medium ${stat.change === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                                    {stat.change === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                                    {stat.subtitle}
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Birthday Reminder Banner */}
            {todayBirthdays.length > 0 && (
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center">
                            <Cake size={18} className="text-pink-600 dark:text-pink-400" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">🎂 Today's Birthdays</h2>
                            <p className="text-xs text-pink-600 dark:text-pink-400">{todayBirthdays.length} contact{todayBirthdays.length > 1 ? "s have" : " has"} a birthday today!</p>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        {todayBirthdays.map((c) => (
                            <div key={c.id} className="flex items-center justify-between bg-white/60 dark:bg-gray-800/40 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold text-white flex-shrink-0 ${c.gender === "female" ? "bg-gradient-to-br from-pink-400 to-rose-500" : "bg-gradient-to-br from-indigo-400 to-purple-500"}`}>
                                        {c.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{c.name}</p>
                                        <p className="text-xs text-gray-400">🎉 Birthday today!</p>
                                    </div>
                                </div>
                                {wishStatus[c.id] === "sent" ? (
                                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium">
                                        ✅ SMS Sent!
                                    </span>
                                ) : wishStatus[c.id] === "sending" ? (
                                    <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
                                        Sending SMS…
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handleSendWish(c.id)}
                                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 font-medium hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-all"
                                    >
                                        <MessageSquare size={12} />
                                        Send SMS Wish
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Line Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Interaction Frequency</h2>
                        <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full">Last 6 weeks</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">Total interactions tracked over time</p>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={interactionData}>
                                <defs>
                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="interactions"
                                    stroke="url(#lineGradient)"
                                    strokeWidth={2.5}
                                    dot={{ fill: '#6366f1', r: 4, strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Most Contacted</h2>
                        <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full">Top 5</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">Your most frequently reached contacts</p>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={contactData} barSize={28}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'rgba(99,102,241,0.05)' }} content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 shadow-card-hover text-xs">
                                                <p className="text-gray-500">{label}</p>
                                                <p className="font-semibold text-gray-900 dark:text-white">{payload[0].value} contacts</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Activity Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Stale Contacts */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Stale Contacts</h2>
                        <span className="badge bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                            {staleContacts.length} contacts
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">No interaction in the last 30+ days</p>

                    <div className="space-y-3">
                        {staleContacts.map((contact, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 flex-shrink-0">
                                        {contact.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{contact.name}</p>
                                        <p className="text-xs text-gray-400">{contact.role}</p>
                                    </div>
                                </div>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium">
                                    {contact.days}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Follow-Ups */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Upcoming Follow-Ups</h2>
                        <span className="badge bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                            {upcomingFollowups.length} scheduled
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">Scheduled in the next 7–30 days</p>

                    <div className="space-y-3">
                        {upcomingFollowups.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                        {item.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                                        <p className="text-xs text-gray-400">{item.date}</p>
                                    </div>
                                </div>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium">
                                    {item.days}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
