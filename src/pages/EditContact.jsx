import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EditContact() {
    const { id } = useParams();

    const contacts = [
      {
        id: 1,
        name: "Shravan",
        phone: "+91 9374736443",
        email: "shravan@email.com",
        category: "client",
        gender: "male",
        dob: "1995-03-30",
      },
      {
        id: 2,
        name: "Rahul Shetty",
        phone: "+91 9355556443",
        email: "rahul23@email.com",
        category: "lead",
        gender: "male",
        dob: "1990-07-15",
      },
      {
        id: 3,
        name: "Priya Sharma",
        phone: "+91 8646445456",
        email: "priya@email.com",
        category: "client",
        gender: "female",
        dob: "1998-03-30",
      },
      {
        id: 4,
        name: "Anita Verma",
        phone: "+91 9846534364",
        email: "anita@email.com",
        category: "vendor",
        gender: "female",
        dob: "1993-05-22",
      }
    ];

    const contact = contacts.find((c) => c.id === parseInt(id));
    const [form, setForm] = useState(contact || { name: "", phone: "", email: "", category: "client", gender: "male", dob: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Contact updated successfully!");
    };

    if (!contact) {
        return (
            <div className="max-w-3xl mx-auto px-4">
                <p className="text-gray-500 dark:text-gray-400 mt-10 text-center">Contact not found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h1 className="text-2xl font-semibold dark:text-white">
                Edit Contact
            </h1>
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
                <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
                {/* Gender */}
                <div>
                    <label className="text-sm text-gray-500">Gender</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                {/* Date of Birth */}
                <div>
                    <label className="text-sm text-gray-500">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    >
                       <option value="client">Client</option>
                       <option value="lead">Lead</option>
                       <option value="vendor">Vendor</option>
                    </select>
                </div>
                <button
                   type="submit"
                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Update Contact
                </button>
              </form>
        </div>
    );
}