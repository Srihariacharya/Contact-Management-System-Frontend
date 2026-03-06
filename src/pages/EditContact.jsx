import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EditContact() {
    const { id } = useParams();

    const contacts = [
      {
        id: 1,
        name:"PM Modi",
        phone: "+91 9374736443",
        email:"pmo@email.com",
        category:"client"
      },
      {
        id: 2,
        name:"Rahul Shetty",
        phone: "+91 9355556443",
        email:"rahul23@email.com",
        category:"lead" 
      },
      {
        id: 3,
        name:"Kuldeep",
        phone: "+91 8646445456",
        email:"deep@email.com",
        category:"client"
      },
      {
        id: 4,
        name:"Pavan",
        phone: "+91 9846534364",
        email:"pavan63@email.com",
        category:"vendor"
      }
    ];

    const contact = contacts.find((c)=>c.id === parseInt(id));
    const [form,setForm] = useState(contact);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Contact updated");
    };

    return (
        <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h1 className="text-2xl font-semibold dark:text-white">
                Edit Contact
            </h1>
            <form 
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
                <div>
                    <label className="text-sm text-gray-500">
                        Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700"
                    />
                </div>
                 <div>
                    <label className="text-sm text-gray-500">
                        Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700"
                    />
                </div>
                 <div>
                    <label className="text-sm text-gray-500">
                        Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700"
                    />
                </div>
                 <div>
                    <label className="text-sm text-gray-500">
                        Category
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700"
                    >
                       <option value="client">Client</option>
                       <option value="lead">Lead</option>
                       <option value="vendor">Vendor</option>
                    </select>
                </div>
                <button 
                   type="submit"
                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Update Contact
                </button>
              </form>
        </div>
    );
}