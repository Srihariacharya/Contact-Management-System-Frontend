import { useParams } from "react-router-dom";

export default function ContactDetail() {
    const { id } = useParams();
    const contacts = [
      {
        id:1,
        name: "PM Modi",
        phone: "+91 9374736443",
        email: "pmo@email.com",
        category: "client",
        score: 98,
        company: "Government of India",
        location: "New Delhi"
      },
      {
        id:2,
        name: "Rahul Shetty",
        phone: "+91 9355556443",
        email: "rahul23@email.com",
        category: "lead",
        score: 78,
        company: "Software Trainer",
        location: "Bangalore"
      },
       {
        id:3,
        name:"Kuldeep",
        phone: "+91 8646445456",
        email:"deep@email.com",
        category:"client",
        score:84,
        company: "Tech Crop",
        location: "Mumbai"
      },
      {
        id: 4,
        name:"Pavan",
        phone: "+91 9846534364",
        email:"pavan63@email.com",
        category:"vendor",
        score:65,
        company: "Vendor Services",
        location: "Hyderabad"
    }
    ];

    const contact = contacts.find((c) => c.id === parseInt(id));

    return (
        <div className="max-w-5xl mx-auto px-4 space-y-6">
            <h1 className="text-2xl font-semibold dark:text-white">
                Contact Details
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-200 rounded-full flex items-center justify-center text-xl font-semibold">
                        {contact.name.charAt(0)}
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold dark:text-white">
                            {contact.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {contact.company}
                        </p>
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
                        <p className="dark:text-white">{contact.category}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Location</p>
                        <p className="dark:text-white">{contact.location}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-gray-500 text-sm mb-2">
                        Relationship Score
                    </p>
                    <div className="w-full bg-gray-200 h-3 rounded-full">
                        <div 
                           className="bg-indigo-600 h-3 rounded-full"
                            style={{ width: `${contact.score}%` }} >
                        </div>    
                    </div>
                    <p className="text-sm mt-1">
                        {contact.score}%
                    </p>
                </div>
            </div>
        </div>
    );
}