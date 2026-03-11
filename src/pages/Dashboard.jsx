import { Users, UserPlus, AlertCircle, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

const stats = [
  {
    title: "Total Contacts",
    value: "10",
    subtitle: "Active relationships",
    icon: <Users className="text-indigo-500" size={20} />,
  },
  {
    title: "Contacts Added This Month",
    value: "7",
    subtitle: "+12% from last month",
    icon: <UserPlus className="text-green-500" size={20} />,
  },
  {
    title: "Overdue Follow-Ups",
    value: "3",
    subtitle: "Needs attention",
    icon: <AlertCircle className="text-red-500" size={20} />,
  },
  {
    title: "Relationship Health",
    value: "64%",
    subtitle: "Average score",
    icon: <Activity className="text-purple-500" size={20} />,
  },
];

const interactionData = [
  {date: "Jan 22", interactions: 12 },
  {date: "Jan 29", interactions: 15 },
  {date: "Feb 05", interactions: 18 },
  {date: "Feb 12", interactions: 22 },
  {date: "Feb 19", interactions: 19 },
  {date: "Feb 26", interactions: 16 },
];

const contactData = [
  {name: "Virat Kohli", value: 15},
  {name: "Sharvan", value: 13},
  {name: "Rohit Sharma", value: 12},
  {name: "KL Rahul", value: 10},
  {name: "Vinod Shah", value: 8},
]

const staleContacts = [
  {
    name: "Vinod Sharma",
    role: "Lead",
    days: "37 days ago",
  },
  {
    name: "ShivaKumar",
    role: "Lead",
    days: "63 days ago",
  },
  {
    name: "Rohan",
    role: "Lead",
    days: "47 days ago",
  },
];

const upcomingFollowups = [
  {
    name: "Jai Shankar",
    date: "Mar 22",
    days: "13 day",
  },
  {
    name: "Roshan ",
    date: "Mar 24",
    days: "15 day",
  },
   {
    name: "Ramesh",
    date: "Mar 28",
    days: "19 day",
  },
];

export default function Dashboard() {
    return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">

     {/*Page Title */}
     <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>

      <p className="text-sm text-gray-500 dark: text-gray-400">
        Welcome back! Here's your relationship overview
      </p>
     </div>

      {/*Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key ={index}
            className = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shodow-md transition">
             <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}  
              </p>    
               {stat.icon}
             </div>
             <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
             </p>
          </div>
        ))}
      </div>

      {/*Charts Section*/}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Interaction Frequency */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Interaction Frequency
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Last 30 days activity
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={interactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2}/>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                 type="monotone"
                 dataKey="interactions"
                 stroke="#6366F1"
                 strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Contacted People */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Most Contacted People
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Top 5 relationships
        </p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contactData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

       </div>
     </div>

     {/*Activity Section */}
     <div className="grid grid-cols-1 xl:grid-cols-2 gap=6">

      {/* Stale Contacts */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Stale Contacts
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          No interaction in 30+ days
        </p>

        <div className="space-y-4">
          {staleContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-semibold">
                  {contact.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {contact.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {contact.role}
                  </p>
                </div>
              </div>

              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                {contact.days}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming FollowUps */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Upcoming Follow-Ups
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Next 7 days
        </p>

        <div className="space-y-4">
          {upcomingFollowups.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {item.date}
                  </p>
                </div>
              </div>

              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
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