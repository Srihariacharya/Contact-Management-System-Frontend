import { 
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { Activity } from "lucide-react";

const interactionData = [
    {name: "Week 1", value: 12},
    {name: "Week 2", value: 15},
    {name: "Week 3", value: 18},
    {name: "Week 4", value: 22},
    {name: "Week 5", value: 19},
    {name: "Week 6", value: 16},
];

const growthData = [
    {name: "Sep", value: 45},
    {name: "Oct", value: 52},
    {name: "Nov", value: 60},
    {name: "Dec", value: 68},
    {name: "Jan", value: 77},
    {name: "Feb", value: 85},
];

const heatmap = [
  [2,3,1,4,2,3,4,2,1],
  [3,2,4,3,4,3,2,1,3],
  [4,3,2,4,3,2,4,3,2],
  [1,2,3,2,4,3,2,4,3],
  [2,4,3,2,3,4,3,2,4],
  [3,2,4,3,2,3,4,2,3],
  [1,3,2,4,3,2,3,4,2]
];

const taskData = [
    {name: "Completed", value: 45},
    {name: "Pending", value: 30},
    {name: "In Progress", value: 25},
];

const COLORS = ["#4f46e5", "#10b981", "#f59e0b"];
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const times=["9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];

export default function Analytics() {
    const [filter,setFilter] = useState("30days");

    return (
        <div className="space-y-6">
            
            {/* Page Title */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold">Analytics</h1>
                <p className="text-gray-500">
                    Insights into your relationship management
                </p>
              </div>

              <select 
                  value={filter}
                  onChange={(e)=>setFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800"
              >
                <option value="7days">Last 7 Days</option>
                <option value="39days">Last 30 Days</option>
                <option value="6months">Last 6 Months</option>
              </select>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Interactions</p>
                    <h2 className="text-2xl font-bold">8</h2>
                  </div>
                  <Activity className="text-indigo-500" />
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                    <p className="text-gray-500">Avg Call Duration</p>
                    <h2 className="text-2xl font-bold">29 min</h2>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                    <p className="text-gray-500">Task Completion</p>
                    <h2 className="text-2xl font-bold">75%</h2>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                    <p className="text-gray-500">Active Contacts</p>
                    <h2 className="text-2xl font-bold">10</h2>
                </div>
            </div>

            {/* Line + Pie chart */}
            <div className="grid grid-cols-2 gap-6">
                
                {/* Line Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">
                        Monthly Interaction Trend
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={interactionData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                               type="monotone"
                               dataKey="value"
                               stroke="#4f46e5"
                               strokeWidth={3}
                               dot={{ r:5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                { /* Pie Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">
                        Task Completion Rate
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                               data={taskData}
                               dataKey="value"
                               outerRadius={90}
                            >
                                {taskData.map((entry, index) => (
                                    <Cell 
                                       key={index}
                                       fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bar Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">
                        Contact Growth Over Time
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={growthData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4f46e5" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">
                        Weekly Activity Heatmap
                    </h3>

                    <div className="grid grid-cols-10 gap-2 text-sm">
                        <div></div>

                        {times.map((t,index) =>  (
                            <div key={t} className="text-gray-500">{t}</div>
                        ))}

                        {heatmap.map((row,i) => (
                            <div key={i} className="contents">
                              <div className="text-gray-500">{days[i]}</div>

                              {row.map((v,j)=>(
                                <div key={j}
                                     className={`h-6 rounded
                                        ${v===1?"bg-blue-100":
                                          v===2?"bg-blue-200":
                                          v===3?"bg-blue-400":"bg-blue-600"}`}
                                />
                              ))}
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
}