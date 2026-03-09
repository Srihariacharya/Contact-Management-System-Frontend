import { useState } from "react";
import { User, Calendar } from "lucide-react";

export default function Tasks() {
const [tasks, setTasks] = useState([
{
id:1,
title:"Update CRM notes for Rahul",
contact:"Rahul Sharma",
priority:"Low",
date:"Feb 26",
status:"pending"
},
{
id:2,
title:"Schedule meeting with Priya",
contact:"Priya Nair",
priority:"Medium",
date:"Feb 23",
status:"inprogress"
},
{
id:3,
title:"Prepare presentation for Amit",
contact:"Amit Verma",
priority:"High",
date:"Feb 24",
status:"inprogress"
},
{
id:4,
title:"Send proposal to Anjali",
contact:"Anjali Mehta",
priority:"High",
date:"Feb 22",
status:"completed"
},
{
id:5,
title:"Follow up with Rohan on lead",
contact:"Rohan Shetty",
priority:"High",
date:"Feb 20",
status:"completed"
},
{
id:6,
title:"Review contract with Kiran",
contact:"Kiran Patel",
priority:"Medium",
date:"Feb 25",
status:"completed"
},
{
id:7,
title:"Send thank you message to Neha",
contact:"Neha Gupta",
priority:"Low",
date:"Feb 21",
status:"completed"
}
])

const pending = tasks.filter(t=>t.status==="pending")
const progress = tasks.filter(t=>t.status==="inprogress")
const completed = tasks.filter(t=>t.status==="completed")

const startTask = (id) => {
    const updated = tasks.map(task => 
        task.id === id ? {...task, status: "inprogress"} : task
    );
    setTasks(updated);
};

const completeTask = (id) => {
    const updated = tasks.map(task => 
        task.id === id ? {...task, status: "completed"} : task
    );
    setTasks(updated);
};

const backTask = (id) => {
    const updated = tasks.map(task => 
        task.id === id ? {...task, status: "pending"} : task
    );
    setTasks(updated);
};

const [showModal, setShowModal ] = useState(false)

const [newTask, setNewTask ] = useState({
    title:"",
    contact:"",
    priority:"",
    date:""
})

const addTask = () => {
    const task = {
        id: Date.now(),
        title: newTask.title,
        contact: newTask.contact,
        priority: newTask.priority,
        date: newTask.date,
        status:"pending"
    }

    setTasks([...tasks, task])

    setShowModal(false)

    setNewTask({
        title:"",
        contact:"",
        priority:"Low",
        date:""
    })
} 

return (
    <>
    <div className="space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-semibold">Tasks</h1>
                <p className="text-gray-500">Manage your contact-related task</p>
            </div>

            <button
                onClick={() => setShowModal(true)} 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
            >
                + Add Task
            </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
                <p className="text-gray-500 text-sm">Total Tasks</p>
                <p className="text-xl font-semibold">{tasks.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-xl font-semibold">{pending.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
                <p className="text-gray-500 text-sm">In Progress</p>
                <p className="text-xl font-semibold text-blue-600">{progress.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-xl font-semibold text-green-600">{completed.length}</p>
            </div>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-3 gap-6">

            {/* Pending */}
            <div className="bg-white border rounded-lg-p4">
                <h3 className="font-semibold mb-4">
                    Pending ({pending.length})
                </h3>

                {pending.map(task=>(
                    <div key={task.id} className="border rounded-lg p-3 mb-3">
                        <p className="font-medium">{task.title}</p>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            {task.priority}
                        </span>
                        <div className="flex items-center text-sm text-gray-500 mt-2 gap-3">
                            <div className="flex items-center gap-1">
                                <User size={14} />
                                {task.contact}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {task.date}
                            </div>
                        </div>

                        <button 
                            onClick={() => startTask(task.id)}
                            className="mt-3 bg-green-600 text-white text-xs px-3 py-1 rounded"
                        >
                            Start
                        </button>
                    </div>
                ))}
            </div>

            {/* In Progress */}
            <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-4">
                    In Progress ({progress.length})
                </h3>

                {progress.map(task => (
                    <div key={task.id} className="border rounded-lg p-3 mb-3">
                        <p className="font-medium">{task.title}</p>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                            {task.priority}
                        </span>

                        <div className="flex items-center text-sm text-gray-500 mt-2 gap-3">
                            <div className="flex items-center gap-1">
                                <User size={14} />
                                {task.contact}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {task.date}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button 
                                onClick={()=> backTask(task.id)}
                                className="bg-gray-200 text-xs px-3 py-1 rounded"
                            >
                                Back
                            </button>
                            <button 
                                onClick={() => completeTask(task.id)}
                                className="bg-green-600 text-white text-xs px-3 py-1 rounded"
                            >
                                Complete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

             {/* Completed */}
            <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-4">
                    Completed ({completed.length})
                </h3>

                {completed.map(task => (
                    <div key={task.id} className="border rounded-lg p-3 mb-3">
                        <p className="font-medium">{task.title}</p>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                            {task.priority}
                        </span>

                        <div className="flex items-center text-sm text-gray-500 mt-2 gap-3">
                            <div className="flex items-center gap-1">
                                <User size={14} />
                                {task.contact}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {task.date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>

    {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 space-y-4">
                <h2 className="text-lg font-semibold">Add Task</h2>
                <input type="text"
                       placeholder="Task title"
                       className="w-full border p-2 rounded"
                       value={newTask.title}
                       onChange={(e)=>setNewTask({...newTask,title:e.target.value})}
                />
                <input type="text"
                       placeholder="Contact Name"
                       className="w-full border p-2 rounded"
                       value={newTask.contact}
                       onChange={(e)=>setNewTask({...newTask,contact:e.target.value})}
                />
                <select className="w-full border p-2 rounded"
                        value={newTask.priority}
                        onChange={(e)=>setNewTask({...newTask,priority:e.target.value})}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>

                </select>

                <input type="date"
                       className="w-full border p-2 rounded"
                       value={newTask.date}
                       onChange={(e)=>setNewTask({...newTask,date:e.target.value})}
                />
                <div className="flex justify-end gap-3"> 
                  <button onClick={()=>setShowModal(false)}
                        className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>

                  <button onClick={addTask}
                        className="px-4 py-2  bg-gray-200 rounded"
                  >
                    Add Task
                  </button>
                </div>
            </div>
        </div>
    )}
  </>
 )
}