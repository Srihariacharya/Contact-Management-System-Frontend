import { Plus, Search, Eye, Pencil, Trash2, X, User, Phone, Mail, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const categoryStyles = {
    client: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
    lead: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
    vendor: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
};

const scoreColor = (score) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 65) return "bg-indigo-500";
    return "bg-orange-400";
};

export default function Contacts() {
    const [search, setSearch] = useState("");
    const [contacts, setContacts] = useState([
        { id: 1, name: "Shravan", phone: "+91 9374736443", email: "shravan@email.com", category: "client", interaction: "Today", score: 98 },
        { id: 2, name: "Rahul Shetty", phone: "+91 9355556443", email: "rahul23@email.com", category: "lead", interaction: "1 day ago", score: 78 },
        { id: 3, name: "Kuldeep", phone: "+91 8646445456", email: "deep@email.com", category: "client", interaction: "2 days ago", score: 84 },
        { id: 4, name: "Pavan", phone: "+91 9846534364", email: "pavan63@email.com", category: "vendor", interaction: "3 days ago", score: 65 },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", category: "client" });

    const filteredContacts = contacts.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );

    const handleAddContact = () => {
        if (!formData.name || !formData.email) return;
        const newContact = {
            id: Date.now(),
            ...formData,
            interaction: "Today",
            score: Math.floor(Math.random() * 40) + 60,
        };
        setContacts([...contacts, newContact]);
        setShowModal(false);
        setFormData({ name: "", phone: "", email: "", category: "client" });
    };

    const handleDeleteContact = (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            setContacts(contacts.filter((c) => c.id !== id));
        }
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{contacts.length} total contacts</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary self-start sm:self-auto"
                >
                    <Plus size={16} />
                    Add Contact
                </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field pl-10"
                />
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-700">
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Last Interaction</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                            {filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-gray-400 dark:text-gray-500">
                                        No contacts found
                                    </td>
                                </tr>
                            ) : (
                                filteredContacts.map((c) => (
                                    <tr key={c.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors">
                                        {/* Contact */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                                    {c.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">{c.name}</span>
                                            </div>
                                        </td>
                                        {/* Phone */}
                                        <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{c.phone}</td>
                                        {/* Email */}
                                        <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{c.email}</td>
                                        {/* Category */}
                                        <td className="px-5 py-4">
                                            <span className={`badge ${categoryStyles[c.category] || "bg-gray-100 text-gray-600"} capitalize`}>
                                                {c.category}
                                            </span>
                                        </td>
                                        {/* Last interaction */}
                                        <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{c.interaction}</td>
                                        {/* Score */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 min-w-[100px]">
                                                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div className={`${scoreColor(c.score)} h-full rounded-full transition-all`} style={{ width: `${c.score}%` }} />
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{c.score}%</span>
                                            </div>
                                        </td>
                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1">
                                                <Link to={`/contacts/${c.id}`}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                                                    <Eye size={15} />
                                                </Link>
                                                <Link to={`/contacts/edit/${c.id}`}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                                                    <Pencil size={15} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteContact(c.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Contact Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-modal w-full max-w-md animate-scale-in border border-gray-100 dark:border-gray-700">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Add New Contact</h2>
                            <button onClick={() => setShowModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-5 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Full Name *</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input type="text" placeholder="e.g. Rajesh Kumar" value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input-field pl-9 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input type="tel" placeholder="+91 98765 43210" value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="input-field pl-9 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Email Address *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input type="email" placeholder="rajesh@example.com" value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="input-field pl-9 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Category</label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <select value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="input-field pl-9 text-sm appearance-none">
                                        <option value="client">Client</option>
                                        <option value="lead">Lead</option>
                                        <option value="vendor">Vendor</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                            <button onClick={() => setShowModal(false)} className="btn-secondary">
                                Cancel
                            </button>
                            <button onClick={handleAddContact} className="btn-primary">
                                <Plus size={15} />
                                Add Contact
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}