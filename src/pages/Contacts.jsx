import { Plus, Search, Eye, Pencil, Trash2} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Contacts() {
    const [search, setSearch] = useState("");
    const [contacts, setContacts] = useState ([ 
    {
        id: 1,
        name:"PM Modi",
        phone: "+91 9374736443",
        email:"pmo@email.com",
        category:"client",
        interaction:"Today",
        score:98
    },
    {
        id: 2,
        name:"Rahul Shetty",
        phone: "+91 9355556443",
        email:"rahul23@email.com",
        category:"lead",
        interaction:"1 day ago",
        score:78
    },
       {
        id: 3,
        name:"Kuldeep",
        phone: "+91 8646445456",
        email:"deep@email.com",
        category:"client",
        interaction:"2 day ago",
        score:84
    },
    {
        id: 4,
        name:"Pavan",
        phone: "+91 9846534364",
        email:"pavan63@email.com",
        category:"vendor",
        interaction:"3 day ago",
        score:65
    }
  ]);
  const filteredContacts = contacts.filter((c)=>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    phone:"",
    email:"",
    category:"client"
  });

  const handleAddContact = () => {
    const newContact = {
        id: Date.now(),
        ...formData,
        interaction: "Today",
        score: Math.floor(Math.random() * 40) + 60
    }; 

    setContacts([...contacts,newContact]);
    setShowModel(false);

    setFormData({
        name:"",
        phone:"",
        email:"",
        category:"client"
    });
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !==id);
    setContacts(updatedContacts);
  };

  return (
    <div className="max-w-7xl mx-auto px space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-semibold dark:text-white">
                    Contacts
                </h1>
                <p className="text-sm text-gray-500">
                    Manage your relationships
                </p>
            </div>
            <button
                onClick={() => setShowModel(true)} 
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                <Plus size={18} />
                   Add Contact
            </button>
        </div>
       
        {/* Search */}
        <div className="flex gap-4 items-center">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="text"
                       placeholder="Search by name, email, or phone..."
                       value={search}
                       onChange={(e)=>setSearch(e.target.value)}
                       className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" />       
            </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                    <tr>
                        <th className="text-left p-4">Contact</th>
                        <th className="text-left p-4">Phone</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Last Interaction</th>
                        <th className="text-left p-4">Relationship Score</th>
                        <th className="text-left p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((c) => (
                        <tr key={c.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            <td className="p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                                    {c.name.charAt(0)}
                                </div>
                                <span className="font-medium dark:text-white">
                                    {c.name}
                                </span>
                            </td>
                            <td className="p-4 text-gray-600 dark:text-gray-300">
                                {c.phone}
                            </td>
                            <td className="p-4 text-gray-600 dark:text-gray-300">
                                {c.email}
                            </td>

                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs rounded 
                                     ${c.category === "client" ? "bg-blue-100 text-blue-600" : ""}
                                     ${c.category === "lead" ? "bg-green-100 text-green-600" : ""}
                                     ${c.category === "vendor" ? "bg-orange-100 text-orange-600" : ""}
                                  `} 
                                >
                                    {c.category}
                                </span>
                            </td>

                            <td className="p-4 text-gray-500">
                                {c.interaction}
                            </td>

                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-32 bg-gray-200 h-2 rounded-full">
                                        <div className="bg-indigo-600 h-2 rounded-full" 
                                             style={{width:`${c.score}%`}}>
                                        </div>
                                    </div>

                                    <span className="text-sm">
                                        {c.score}%
                                    </span>
                                </div>
                            </td>
                            <td className="p-4 flex gap-3 text-gray-500">
                              <Link to={`/contacts/${c.id}`}>
                                <Eye size={18} className="cursor-pointer" />
                              </Link>
                              <Link to={`/contacts/edit/${c.id}`}>
                                <Pencil size={18} className="cursor-pointer" />
                              </Link>
                              <button
                                 onClick={() => {
                                    if(window.confirm("Delete this Contact?")) {  
                                 handleDeleteContact(c.id); }
                                }}
                                 className="cursor-pointer text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                              </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Add Contacts */}
            {showModel && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">
                            Add Contact
                        </h2>
                        <div className="space-y-3">
                           <input type="text"
                                  placeholder="Name"
                                  value={formData.name}
                                  onChange={(e)=>setFormData({...formData,name:e.target.value})}
                                  className="w-full border rounded-lg p-2 dark:bg-gray-700"
                            />
                            <input type="text"
                                  placeholder="Phone"
                                  value={formData.phone}
                                  onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                                  className="w-full border rounded-lg p-2 dark:bg-gray-700"
                            />
                            <input type="email"
                                  placeholder="Email"
                                  value={formData.email}
                                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                                  className="w-full border rounded-lg p-2 dark:bg-gray-700"
                            />

                            <select 
                                value={formData.category}
                                onChange={(e)=>setFormatData({...formData,category:e.target.value})}
                                className="w-full border rounded-lg p-2 dark:bg-gray-700"
                            >
                                <option>client</option>
                                <option>lead</option>
                                <option>vendor</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <button onClick={() => setShowModel(false)}
                                    className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>

                            <button 
                               onClick={handleAddContact}
                               className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}