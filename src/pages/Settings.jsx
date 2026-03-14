import { useState } from "react";
import {
  User,
  Bell,
  Palette,
  Shield,
  Camera
} from "lucide-react";

export default function Settings() {

const [profile,setProfile] = useState({
  name:"John Doe",
  email:"john@example.com",
  phone:"+1 (555) 000-0000",
  company:"ContactPro Inc."
});

const [notifications,setNotifications] = useState({
  email:true,
  followups:true,
  overdue:true,
  tasks:false,
  weekly:true
});

const [darkMode,setDarkMode] = useState(false);

const [password,setPassword] = useState({
  current:"",
  new:"",
  confirm:""
});


const handleProfileChange = (e)=>{
  setProfile({...profile,[e.target.name]:e.target.value});
};

const handleNotificationToggle = (key)=>{
  setNotifications({...notifications,[key]:!notifications[key]});
};

return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="grid grid-cols-12 gap-6">

      {/* LEFT SETTINGS MENU */}
      <div className="col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 text-purple-600 font-medium">
            Profile
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            Notifications
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            Appearance
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            Security
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="col-span-9 space-y-6">

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">Profile Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="border rounded-lg p-2" placeholder="Full Name"/>
            <input className="border rounded-lg p-2" placeholder="Email"/>
            <input className="border rounded-lg p-2" placeholder="Phone"/>
            <input className="border rounded-lg p-2" placeholder="Company"/>
          </div>
          
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </div>

        {/* Notification Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-3">
            <label className="flex justify-between">
              Email Notifications
              <input type="checkbox"/>
            </label>
            <label className="flex justify-between">
              Follow-up Reminders
              <input type="checkbox"/>
            </label>
            <label className="flex justify-between">
              Overdue Alerts
              <input type="checkbox"/>
            </label>
            <label className="flex justify-between">
              Task Reminders
              <input type="checkbox"/>
            </label>
            <label className="flex justify-between">
              Weekly Report
              <input type="checkbox"/>
            </label>
          </div>
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">
            Save Preferences
          </button>
        </div>
        
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">Appearance</h2>
          <label className="flex justify-between mb-4">
            Dark Mode
            <input type="checkbox"/>
          </label>
          
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-600"></div>
            <div className="w-6 h-6 rounded-full bg-blue-600"></div>
            <div className="w-6 h-6 rounded-full bg-green-600"></div>
            <div className="w-6 h-6 rounded-full bg-red-600"></div>
          </div>

          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">
             Save Appearance
          </button>
        </div>

         {/* Security */}
         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">Security Settings</h2>
          <div className="space-y-3">
            <input type="password" className="border rounded-lg p-2 w-full" placeholder="Current Password"/>
            <input type="password" className="border rounded-lg p-2 w-full" placeholder="New Password"/>
            <input type="password" className="border rounded-lg p-2 w-full" placeholder="Confirm Password"/>
          </div>
          
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">
             Update Password
          </button>
        </div>
      </div>
    </div>
  </div>
);
}