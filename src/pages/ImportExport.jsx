import { Upload, Download, FileText } from "lucide-react";
import { useRef, useState } from "react";
import Papa from "papaparse";

export default function ImportExport() {
    const [parsedData, setParsedData] = useState([]);
    const [validContacts, setValidContacts] = useState([]);
    const [duplicates, setDuplicates] = useState([]);
    const [errors, setErrors] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);

    const fileInputRef = useRef(null);
    const handleBrowserClick = () => {
        fileInputRef.current.click();
    };
    const [contacts, setContacts] = useState([]);

    const [exportFields, setExportFields] = useState({
        Name: true,
        Phone: true,
        Email: true,
        Category: true,
        lastInteraction: true,
        relationshipScore: true,
        notes: false
    });

    const handleImportContacts = () => {
        const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        const existingEmails = new Set(existingContacts.map(c => c.Email));
        const newContacts = validContacts.filter(contact => !existingEmails.has(contact.Email));
        const updatedContacts = [...existingContacts, ...newContacts];
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        alert(newContacts.length + " contacts imported successfully!");
    };

    const handleExportCSV = () => {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        if(contacts.length === 0){
            alert("No contacts available to export");
            return;
        }

        const selectedFields = Object.keys(exportFields).filter(
            (field) => exportFields[field]
        );
        
        const csvRows = [];
        csvRows.push(selectedFields.join(","));
        contacts.forEach(contact => {
            const row = selectedFields.map(field => contact[field] || "");
            csvRows.push(row.join(","));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "contacts_export.csv");
        document.body.appendChild(link);
        link.click();
    };
    
    
    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if(!file) return;

        setUploadedFile(file);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
               const data = results.data;
               const valid = [];
               const duplicate = [];
               const error = [];
               const emails = new Set();

               data.forEach((row) => {
                if(!row.Email || !row.Name || !row.Phone) {
                    error.push(row);
                }
                else if(emails.has(row.Email)) {
                    duplicate.push(row);
                }

                else {
                    emails.add(row.Email);
                    valid.push(row);
                }
               });

               setParsedData(data);
               setValidContacts(valid);
               setDuplicates(duplicate);
               setErrors(error);
            },
        }); 
    };

    return (
        <div className="space-y-6">

            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-semibold">Import / Export</h1>
                <p className="text-gray-500">Manage your contact data</p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-2 gap-6">
                
              {/* Import Contacts */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center gap-2 mb-4">
                    <Upload className="text-indigo-500" size={20} />
                    <h2 className="font-semibold">Import Contacts</h2>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                    Upload a CSV file to import contacts
                </p>

                {/* Drag Drop Area */}
                <div className="border-2 border-dashed rounded-lg p-10 text-center dark:border-gray-700">
                    <Upload className="mx-auto text-gray-400 mb-4" size={40} />

                    <p className="text-gray-400 text-sm mb-3">
                        or
                    </p>
                  <div>
                    <input type="file"
                           accept = ".csv"
                           ref={fileInputRef}
                           onChange={handleFileUpload}
                           style={{display: "none"}}
                    />
                    <button 
                        onClick={handleBrowserClick}
                        className="border px-4 py-2 rounded-lg text-sm">
                        Browser Files
                    </button>
                  </div>
                </div>

                {parsedData.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-semibold mb-3">
                            Import Preview
                        </h3>

                        <table className="w-full mt-6 border rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Email</th>
                                    <th className="p-2 text-left">Phone</th>
                                    <th className="p-2 text-left">Category</th>
                                </tr>
                            </thead>

                            <tbody>
                                {parsedData.map((c,i) => {
                                    let status = "Valid";
                                    let color = "green";

                                    if(duplicates.includes(c)) {
                                        status = "Duplicate";
                                        color = "orange";
                                    }

                                    if(errors.includes(c)) {
                                        status = "Error";
                                        color = "red";
                                    }

                                    return (
                                      <tr key={i} className="border-b dark:boder-gray-700">
                                         <td className="p-2">{c.Name}</td>
                                         <td className="p-2">{c.Email}</td>
                                         <td className="p-2">{c.Phone}</td>
                                         <td className="p-2">{c.Category}</td>

                                         <td className="p-2">
                                            <span className={`px-2 py-1 rounded text-${color}-700 bg-${color}-100`}>
                                                {status}
                                            </span>
                                         </td>
                                      </tr>
                                    );
                                })}
                            </tbody>

                            {validContacts.length > 0 && (
                                <div className="flex justify-end mt-4 gap-3">
                                    <button className="px-4 py-2 border rounded">
                                        Cancel
                                    </button>

                                    <button onClick={handleImportContacts}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                                        Import {validContacts.length} Valid Contacts
                                    </button>
                                </div>
                            )}
                        </table>
                    </div>
                )}

                {uploadedFile && (
                    <div className="bg-green-100 border border-green-300 p-4 rounded-lg mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FileText className="text-green-600" size={22} />

                            <div>
                                <p className="font-medium">{uploadedFile.name}</p>
                                <p className="text-sm text-gray-500">
                                    {(uploadedFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* CSV Info */}
                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg mt-4 text-sm">
                    <h3 className="font-medium mb-2">
                        CSV Format Requirements:
                    </h3>

                    <ul className="list-disc ml-5 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Required columns: Name,Email,Phone</li>
                        <li>Optional columns: Category, Notes</li>
                        <li>First row should contain column headers</li>
                        <li>Use UTF-8 encoding</li>
                    </ul>
                </div>

                {parsedData.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="bg-green-100 p-4 rounded-lg">
                            <h3 className="text-green-700 font-semibold">Valid Entries</h3>
                            <p className="text-2xl font-bold">{validContacts.length}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg">
                            <h3 className="text-green-700 font-semibold">Duplicates</h3>
                            <p className="text-2xl font-bold">{duplicates.length}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg">
                            <h3 className="text-green-700 font-semibold">Errors</h3>
                            <p className="text-2xl font-bold">{errors.length}</p>
                        </div>
                    </div>
                )}


                {/* Sample CSV */}
                <button className="w-full mt-4 bg-gray-300 dark:bg-gray-700 py-2 rounded-lg">
                    Download Sample CSV
                </button>
              </div>
            
            {/* Export Contacts */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center gap-2 mb-4">
                    <Download className="text-indigo-500" size={20} />
                    <h2 className="font-semibold">Export Contacts</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    Export your contacts to a CSV file
                </p>

                {/* Checkboxes */}
                <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked/>
                        Name
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked/>
                        Phone
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked/>
                        Email
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked/>
                        Category
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked/>
                        Last Interaction
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked/>
                        Relationship Score
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked/>
                        Notes
                    </label>
                </div>

                {/* Info */}
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4 text-sm">
                    <p>Total Contacts: <strong>10</strong></p>
                    <p>Selected fields: <strong>6</strong></p>
                </div>

                {/* Export Button */}
                <button onClick={handleExportCSV} className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg">
                    Export to CSV
                </button>
            </div>
          </div>
        </div>
    );
}