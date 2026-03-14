import { Upload, Download, FileText } from "lucide-react";
import { useRef, useState } from "react";
import Papa from "papaparse";

export default function ImportExport() {

  /* --------------------------- STATE --------------------------- */

  const [parsedData, setParsedData] = useState([]);
  const [validContacts, setValidContacts] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [errors, setErrors] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const fileInputRef = useRef(null);

  const [exportFields, setExportFields] = useState({
    Name: true,
    Phone: true,
    Email: true,
    Category: true,
    lastInteraction: true,
    relationshipScore: true,
    notes: false
  });


  /* --------------------------- FILE BROWSER --------------------------- */

  const handleBrowserClick = () => {
    fileInputRef.current.click();
  };


  /* --------------------------- CSV PARSER --------------------------- */

  const parseCSV = (file) => {

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

          if (!row.Email || !row.Name || !row.Phone) {
            error.push(row);
          }

          else if (emails.has(row.Email)) {
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

      }
    });
  };


  /* --------------------------- VCARD PARSER --------------------------- */

  const parseVCard = (file) => {

    const reader = new FileReader();

    reader.onload = (e) => {

      const text = e.target.result;

      const cards = text.split("BEGIN:VCARD").slice(1);

      const contacts = cards.map((card) => {

        const name = card.match(/FN:(.*)/)?.[1] || "";
        const phone = card.match(/TEL:(.*)/)?.[1] || "";
        const email = card.match(/EMAIL:(.*)/)?.[1] || "";

        return {
          Name: name,
          Phone: phone,
          Email: email,
          Category: "Client"
        };

      });

      setParsedData(contacts);
      setValidContacts(contacts);
      setDuplicates([]);
      setErrors([]);

    };

    reader.readAsText(file);

  };


  /* --------------------------- FILE UPLOAD --------------------------- */

  const handleFileUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setUploadedFile(file);

    if (file.name.endsWith(".csv")) {
      parseCSV(file);
    }

    else if (file.name.endsWith(".vcf")) {
      parseVCard(file);
    }

  };


  /* --------------------------- IMPORT CONTACTS --------------------------- */

  const handleImportContacts = () => {

    const existing = JSON.parse(localStorage.getItem("contacts")) || [];

    const updated = [...existing, ...validContacts];

    localStorage.setItem("contacts", JSON.stringify(updated));

    alert(`${validContacts.length} contacts imported successfully`);

  };


  /* --------------------------- EXPORT CSV --------------------------- */

  const handleExportCSV = () => {

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    if (contacts.length === 0) {
      alert("No contacts available to export");
      return;
    }

    const selectedFields = Object.keys(exportFields).filter(
      (field) => exportFields[field]
    );

    const csvRows = [];

    csvRows.push(selectedFields.join(","));

    contacts.forEach((contact) => {

      const row = selectedFields.map(
        (field) => contact[field] || ""
      );

      csvRows.push(row.join(","));

    });

    const csvContent =
      "data:text/csv;charset=utf-8," + csvRows.join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");

    link.href = encodedUri;
    link.download = "contacts_export.csv";

    document.body.appendChild(link);

    link.click();

  };


  /* --------------------------- EXPORT VCARD --------------------------- */

  const handleExportVCard = () => {

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    if (contacts.length === 0) {
      alert("No contacts available to export");
      return;
    }

    let vcard = "";

    contacts.forEach((c) => {

      vcard += `BEGIN:VCARD
VERSION:3.0
FN:${c.Name || ""}
TEL:${c.Phone || ""}
EMAIL:${c.Email || ""}
END:VCARD
`;

    });

    const blob = new Blob([vcard], { type: "text/vcard" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "contacts.vcf";

    link.click();

  };


  /* --------------------------- UI --------------------------- */

  return (

    <div className="space-y-6">

      {/* Page Header */}

      <div>
        <h1 className="text-2xl font-semibold">Import / Export</h1>
        <p className="text-gray-500">Manage your contact data</p>
      </div>


      {/* Main Grid */}

      <div className="grid grid-cols-2 gap-6">


        {/* ---------------- IMPORT CONTACTS ---------------- */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <div className="flex items-center gap-2 mb-4">
            <Upload className="text-indigo-500" size={20} />
            <h2 className="font-semibold">Import Contacts</h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Upload CSV or vCard (.vcf)
          </p>


          {/* Upload Area */}

          <div className="border-2 border-dashed rounded-lg p-10 text-center">

            <Upload className="mx-auto text-gray-400 mb-4" size={40} />

            <p className="text-gray-400 mb-3">or</p>

            <input
              type="file"
              accept=".csv,.vcf"
              ref={fileInputRef}
              onChange={handleFileUpload}
              hidden
            />

            <button
              onClick={handleBrowserClick}
              className="border px-4 py-2 rounded-lg text-sm"
            >
              Browse Files
            </button>

          </div>


          {/* Uploaded File Preview */}

          {uploadedFile && (

            <div className="bg-green-100 border border-green-300 p-4 rounded-lg mt-4 flex justify-between items-center">

              <div className="flex items-center gap-3">

                <FileText className="text-green-600" />

                <div>
                  <p className="font-medium">{uploadedFile.name}</p>

                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>

              </div>

              <span className="text-green-600">✔</span>

            </div>

          )}


          {/* Import Preview */}

          {parsedData.length > 0 && (

            <div className="mt-6">

              <h3 className="font-semibold mb-3">
                Import Preview
              </h3>

              <table className="w-full border rounded-lg">

                <thead className="bg-gray-100 dark:bg-gray-700">

                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Category</th>
                  </tr>

                </thead>

                <tbody>

                  {parsedData.map((c, i) => (

                    <tr key={i} className="border-b">

                      <td className="p-2">{c.Name}</td>
                      <td className="p-2">{c.Email}</td>
                      <td className="p-2">{c.Phone}</td>
                      <td className="p-2">{c.Category}</td>

                    </tr>

                  ))}

                </tbody>

              </table>


              <div className="flex justify-end mt-4 gap-3">

                <button className="px-4 py-2 border rounded">
                  Cancel
                </button>

                <button
                  onClick={handleImportContacts}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                >
                  Import {validContacts.length} Contacts
                </button>

              </div>

            </div>

          )}

        </div>


        {/* ---------------- EXPORT CONTACTS ---------------- */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <div className="flex items-center gap-2 mb-4">
            <Download className="text-indigo-500" size={20} />
            <h2 className="font-semibold">Export Contacts</h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Export contacts to CSV or vCard
          </p>


          {/* Export Buttons */}

          <button
            onClick={handleExportCSV}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg mb-3"
          >
            Export CSV
          </button>

          <button
            onClick={handleExportVCard}
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Export vCard (.vcf)
          </button>

        </div>

      </div>

    </div>

  );

}