import { useParams } from "react-router-dom";

export default function ContactDetail() {
    const { id } = useParams();
    const contacts = [
      {
        id: 1,
        name: "Shravan",
        phone: "+91 9374736443",
        email: "shravan@email.com",
        category: "client",
        score: 98,
        company: "Tech Solutions",
        location: "Bangalore",
        gender: "male",
        dob: "1995-03-30",
      },
      {
        id: 2,
        name: "Rahul Shetty",
        phone: "+91 9355556443",
        email: "rahul23@email.com",
        category: "lead",
        score: 78,
        company: "Software Trainer",
        location: "Bangalore",
        gender: "male",
        dob: "1990-07-15",
      },
      {
        id: 3,
        name: "Priya Sharma",
        phone: "+91 8646445456",
        email: "priya@email.com",
        category: "client",
        score: 84,
        company: "Creative Agency",
        location: "Mumbai",
        gender: "female",
        dob: "1998-03-30",
      },
      {
        id: 4,
        name: "Anita Verma",
        phone: "+91 9846534364",
        email: "anita@email.com",
        category: "vendor",
        score: 65,
        company: "Vendor Services",
        location: "Hyderabad",
        gender: "female",
        dob: "1993-05-22",
      },
    ];

    const contact = contacts.find((c) => c.id === parseInt(id));

    if (!contact) {
        return (
            <div className="max-w-5xl mx-auto px-4">
                <p className="text-gray-500 dark:text-gray-400 mt-10 text-center">Contact not found.</p>
            </div>
        );
    }

    const dobFormatted = contact.dob
        ? new Date(contact.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
        : "—";

    return (
        <div className="max-w-5xl mx-auto px-4 space-y-6">
            <h1 className="text-2xl font-semibold dark:text-white">
                Contact Details
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold text-white
                        ${contact.gender === "female"
                            ? "bg-gradient-to-br from-pink-400 to-rose-500"
                            : "bg-gradient-to-br from-indigo-400 to-purple-500"}`}>
                        {contact.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold dark:text-white">
                            {contact.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {contact.company}
                        </p>
                        <span className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium
                            ${contact.gender === "female"
                                ? "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-300"
                                : "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300"}`}>
                            {contact.gender === "female" ? "♀ Female" : "♂ Male"}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
                    <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="dark:text-white">{contact.phone}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <p className="dark:text-white">{contact.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Category</p>
                        <p className="dark:text-white capitalize">{contact.category}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Location</p>
                        <p className="dark:text-white">{contact.location}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="dark:text-white capitalize">{contact.gender}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Date of Birth</p>
                        <p className="dark:text-white">{dobFormatted}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-gray-500 text-sm mb-2">
                        Relationship Score
                    </p>
                    <div className="w-full bg-gray-200 h-3 rounded-full">
                        <div
                           className="bg-indigo-600 h-3 rounded-full"
                            style={{ width: `${contact.score}%` }}>
                        </div>
                    </div>
                    <p className="text-sm mt-1 dark:text-white">
                        {contact.score}%
                    </p>
                </div>
            </div>
        </div>
    );
}