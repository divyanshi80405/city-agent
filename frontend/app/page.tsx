"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [fileName, setFileName] = useState("");
  const [department, setDepartment] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {

    if (processing) {

      const timer = setTimeout(() => {
        setProcessing(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

  }, [processing]);

  return (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">

    <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full text-center">

      <h1 className="text-5xl font-bold text-black mb-4">
        City-Agent
      </h1>

      <p className="text-xl text-gray-600 mb-6">
        Autonomous Municipal Workforce for Aging Societies
      </p>

      <p className="text-gray-500 mb-8">
        Upload municipal documents and let AI agents classify,
        validate, route and process them automatically.
      </p>

      <>
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          
          onChange={(e) => {
            if (e.target.files?.[0]) {

              const name = e.target.files[0].name;
              setProcessing(true);

              setFileName(name);
            
              if (name.toLowerCase().includes("tax")) {
                setDepartment("Tax Department");
              }

              else if (name.toLowerCase().includes("insurance")) {
                setDepartment("Health Department");
              }

              else if (name.toLowerCase().includes("residence")) {
                setDepartment("Registry Office");
              }

              else {
                setDepartment("General Municipal Office");
              }
            }
          }}
        />

        <button
          onClick={() =>
            document.getElementById("fileUpload")?.click()
          }
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 mb-8"
          >
            Upload Document
        </button>
      </>

      {processing ? (

        <div className="mt-6 bg-yellow-100 p-6 rounded-lg">

          <h2 className="text-xl font-bold text-black mb-4">
            Agent Activity
          </h2>

          <p className="text-black">
            ⏳ Agents are processing your document...
          </p>

        </div>

      ) : fileName && (
        <div className="mt-6">

          <p className="text-blue-700 font-bold text-lg mb-6">
            Selected File: {fileName}
          </p>

          <div className="bg-gray-100 p-6 rounded-lg text-left">

            <h2 className="text-black font-bold text-xl mb-4">
              Agent Activity
            </h2>

            <div className="space-y-3 text-black">

              <p>✅ Document Agent: Document classified successfully</p>

              <p>✅ Extraction Agent: Citizen information extracted</p>

              <p>✅ Validation Agent: Document verified</p>

              <p>✅ Department Agent: Routed to {department}</p>

              <p>✅ Recommendation Agent: Suggested Tax Update</p>

            </div>

          </div>

        </div>
      )}

      <div className="text-left text-black">
        <h2 className="font-semibold mb-3 text-black">
          Supported Forms
        </h2>

        <ul className="space-y-2 text-gray-700">
          <li>✓ Residence Registration</li>
          <li>✓ Tax Update</li>
          <li>✓ Health Insurance</li>
        </ul>
      </div>

    </div>

  </main>
);
}
 