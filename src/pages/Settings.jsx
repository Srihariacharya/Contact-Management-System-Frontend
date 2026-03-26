import { useState } from "react";
import { User, Bell, Palette, Shield, Camera, Save, Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "appearance", label: "Appearance", icon: Palette },
    { key: "security", label: "Security", icon: Shield },
];

function Toggle({ enabled, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${enabled ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-600"}`}
        >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
        </button>
    );
}

function InputField({ label, type = "text", placeholder, value, name, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                className="input-field"
            />
        </div>
    );
}

export default function Settings() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState("profile");

    const [profile, setProfile] = useState({
        name: "Srihari Acharya",
        email: "srihari@example.com",
        phone: "+91 98765 43210",
        company: "ContactPro Inc.",
    });

    const [notifications, setNotifications] = useState({
        email: true,
        followups: true,
        overdue: true,
        tasks: false,
        weekly: true,
    });

    const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
    const [saved, setSaved] = useState(false);

    const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPassword({ ...password, [e.target.name]: e.target.value });
    const handleNotificationToggle = (key) => setNotifications({ ...notifications, [key]: !notifications[key] });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const accentColors = [
        { name: "Indigo", class: "bg-indigo-600" },
        { name: "Blue", class: "bg-blue-600" },
        { name: "Emerald", class: "bg-emerald-600" },
        { name: "Rose", class: "bg-rose-600" },
        { name: "Violet", class: "bg-violet-600" },
        { name: "Amber", class: "bg-amber-500" },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-12 gap-5">
                {/* Sidebar Tabs */}
                <div className="col-span-12 md:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-2">
                        {/* Avatar */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 mb-2">
                            <div className="relative w-16 h-16 mx-auto">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                    SA
                                </div>
                                <button className="absolute bottom-0 right-0 w-5 h-5 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow border border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                                    <Camera size={10} className="text-gray-500" />
                                </button>
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white text-center mt-2">{profile.name}</p>
                            <p className="text-xs text-gray-400 text-center">{profile.email}</p>
                        </div>

                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                                        ${activeTab === tab.key
                                            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <Icon size={15} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="col-span-12 md:col-span-9 space-y-4">

                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Profile Settings</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label="Full Name" placeholder="Srihari Acharya" value={profile.name} name="name" onChange={handleProfileChange} />
                                <InputField label="Email address" type="email" placeholder="srihari@example.com" value={profile.email} name="email" onChange={handleProfileChange} />
                                <InputField label="Phone Number" type="tel" placeholder="+91 98765 43210" value={profile.phone} name="phone" onChange={handleProfileChange} />
                                <InputField label="Company" placeholder="ContactPro Inc." value={profile.company} name="company" onChange={handleProfileChange} />
                            </div>
                            <div className="mt-5 flex items-center gap-3">
                                <button onClick={handleSave} className="btn-primary text-sm">
                                    <Save size={15} />
                                    {saved ? "Saved!" : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === "notifications" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Notification Preferences</h2>
                            <div className="space-y-4">
                                {[
                                    { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
                                    { key: "followups", label: "Follow-up Reminders", desc: "Get reminded about scheduled follow-ups" },
                                    { key: "overdue", label: "Overdue Alerts", desc: "Alert when follow-ups are overdue" },
                                    { key: "tasks", label: "Task Reminders", desc: "Daily task summary and reminders" },
                                    { key: "weekly", label: "Weekly Report", desc: "Weekly summary sent every Monday" },
                                ].map(({ key, label, desc }) => (
                                    <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                                        </div>
                                        <Toggle enabled={notifications[key]} onToggle={() => handleNotificationToggle(key)} />
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleSave} className="btn-primary text-sm mt-5">
                                <Save size={15} />
                                {saved ? "Saved!" : "Save Preferences"}
                            </button>
                        </div>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === "appearance" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Appearance</h2>

                            {/* Theme */}
                            <div className="mb-6">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Color Theme</p>
                                <div className="flex gap-3">
                                    {[
                                        { mode: "light", icon: Sun, label: "Light" },
                                        { mode: "dark", icon: Moon, label: "Dark" },
                                    ].map(({ mode, icon: Icon, label }) => (
                                        <button
                                            key={mode}
                                            onClick={() => { if (theme !== mode) toggleTheme(); }}
                                            className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all text-sm font-medium
                                                ${theme === mode
                                                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                                                    : "border-gray-200 dark:border-gray-600 text-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                                                }`}
                                        >
                                            <Icon size={20} />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Accent Color */}
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Accent Color</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    {accentColors.map((c) => (
                                        <button key={c.name} title={c.name}
                                            className={`w-7 h-7 ${c.class} rounded-full hover:scale-110 transition-transform ring-2 ring-offset-2 ring-transparent hover:ring-gray-300`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Security Settings</h2>
                            <div className="space-y-4">
                                <InputField label="Current Password" type="password" placeholder="Enter current password" value={password.current} name="current" onChange={handlePasswordChange} />
                                <InputField label="New Password" type="password" placeholder="Enter new password" value={password.new} name="new" onChange={handlePasswordChange} />
                                <InputField label="Confirm New Password" type="password" placeholder="Confirm new password" value={password.confirm} name="confirm" onChange={handlePasswordChange} />
                            </div>
                            <button onClick={handleSave} className="btn-primary text-sm mt-5">
                                <Shield size={15} />
                                {saved ? "Password Updated!" : "Update Password"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}