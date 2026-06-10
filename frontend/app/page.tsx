"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [department, setDepartment] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [summary, setSummary] = useState("");
  const [validation, setValidation] = useState("");
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [affectedDepartments, setAffectedDepartments] = useState<string[]>([]);
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [visitsSaved, setVisitsSaved] = useState(0);
  const [timeSaved, setTimeSaved] = useState("");
  const [taskStatuses, setTaskStatuses] = useState<any[]>([]);
  const [activeCases, setActiveCases] = useState(128);
  const [autoProcessed, setAutoProcessed] = useState(94);
  const [departmentsCoordinated, setDepartmentsCoordinated] = useState(5);
  const [hoursSaved, setHoursSaved] = useState(37);
  const [caseId, setCaseId] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [workflowGraph, setWorkflowGraph] = useState<string[]>([]);
  const [caseQueue, setCaseQueue] = useState<
    { id: string; status: string }[]
  >([]);

  useEffect(() => {
    if (processing) {
      setCurrentStep(1);

      const step1 = setTimeout(() => {
        setCurrentStep(2);
      }, 1000);

      const step2 = setTimeout(() => {
        setCurrentStep(3);
      }, 2000);

      const step3 = setTimeout(() => {
        setCurrentStep(4);
      }, 3000);

      const step4 = setTimeout(() => {
        setCurrentStep(5);
        setProcessing(false);
      }, 4000);

      return () => {
        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(step3);
        clearTimeout(step4);
      };
    }
  }, [processing]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold text-black mb-4">City-Agent</h1>

        <p className="text-xl text-gray-600 mb-6">
          Autonomous Municipal Workforce for Aging Societies
        </p>

        <p className="text-gray-500 mb-8">
          Upload municipal documents and let AI agents classify, validate, route and process them automatically.
        </p>

        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const name = file.name;
            setUploadStatus("Uploading...");

            try {
              const uploadFormData = new FormData();
              uploadFormData.append("file", file);

              const response = await fetch("http://127.0.0.1:8000/upload", {
                method: "POST",
                body: uploadFormData,
              });

              if (!response.ok) {
                setUploadStatus("Upload Failed ❌");
                return;
              }

              setUploadStatus("Upload Successful ✅");

              const analyzeFormData = new FormData();
              analyzeFormData.append("file", file);

              const analysisResponse = await fetch("http://127.0.0.1:8000/analyze", {
                method: "POST",
                body: analyzeFormData,
              });

              if (!analysisResponse.ok) {
                setUploadStatus("Analysis Failed ❌");
                return;
              }

              const analysisData = await analysisResponse.json();

              setDepartment(analysisData.department || "");
              setSummary(analysisData.summary || "");
              setValidation(analysisData.validation || "");
              setRecommendation(analysisData.recommendation || "");
              setMatchedKeywords(analysisData.matched_keywords || []);
              setAffectedDepartments(analysisData.affected_departments || []);
              setWorkflowGraph([
                analysisData.department,
                ...(analysisData.affected_departments || [])
              ]);
              setGeneratedTasks(analysisData.generated_tasks || []);
              setVisitsSaved(analysisData.affected_departments?.length || 0);
              setTimeSaved(`${(analysisData.affected_departments?.length || 0) * 2} Days`);
              setTaskStatuses(analysisData.task_statuses || []);
              setFileName(name);
              setCaseId(
                "CA-" +
                new Date().getFullYear() +
                "-" +
                Math.floor(1000 + Math.random() * 9000)
              );

              setCaseStatus("Processing Complete");
              setPriority("Medium");

              const newCaseId =
                "CA-" +
                new Date().getFullYear() +
                "-" +
                Math.floor(1000 + Math.random() * 9000);

              setCaseId(newCaseId);

              setCaseQueue((prev) => [
                ...prev,
                {
                  id: newCaseId,
                  status: "Completed",
                },
              ]); 


              setProcessing(true);
            } catch (error) {
              console.error("UPLOAD ERROR:", error);
              setUploadStatus("Backend Not Reachable ❌");
            }
          }}
        />

        <button
          onClick={() => document.getElementById("fileUpload")?.click()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 mb-8"
        >
          Upload Document
        </button>

        {processing ? (
          <div className="mt-6 bg-yellow-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-black mb-4">Agent Activity</h2>

            <div className="space-y-3 text-black">
              {currentStep > 1 ? (
                <p>✅ Document Agent Complete</p>
              ) : currentStep === 1 ? (
                <p>⏳ Document Agent Processing...</p>
              ) : null}

              {currentStep > 2 ? (
                <p>✅ Extraction Agent Complete</p>
              ) : currentStep === 2 ? (
                <p>⏳ Extraction Agent Processing...</p>
              ) : null}

              {currentStep > 3 ? (
                <p>✅ Validation Agent Complete</p>
              ) : currentStep === 3 ? (
                <p>⏳ Validation Agent Processing...</p>
              ) : null}

              {currentStep > 4 ? (
                <p>✅ Department Agent Complete</p>
              ) : currentStep === 4 ? (
                <p>⏳ Department Agent Processing...</p>
              ) : null}

              {currentStep === 5 ? <p>⏳ Recommendation Agent Processing...</p> : null}
            </div>
          </div>
        ) : fileName ? (
          <>
            <div className="mt-6">
              <p className="text-blue-700 font-bold text-lg mb-6">
                Selected File: {fileName}
              </p>

              <p className="text-green-700 font-semibold mb-4">{uploadStatus}</p>

              <div className="bg-white border-2 border-blue-200 p-6 rounded-lg mt-6 text-left">

                <h2 className="text-black font-bold text-xl mb-4">
                  Case Information
                </h2>

                <p>📄 Case ID: {caseId}</p>

                <p>📌 Status: {caseStatus}</p>

                <p>⚠️ Priority: {priority}</p>

                <p>🏢 Assigned Department: {department}</p>

              </div>

              <div className="bg-orange-50 p-6 rounded-lg mt-6 text-left">

                <h2 className="text-black font-bold text-xl mb-4">
                  Municipal Case Queue
                </h2>

                <div className="space-y-2 text-black">

                  {caseQueue.map((item, index) => (

                    <p key={index}>
                      📄 {item.id} - {item.status}
                    </p>

                  ))}

                  <p className="font-semibold mt-4">
                  Total Cases Managed: {caseQueue.length}
                  </p>

                </div>

              </div>



              <div className="bg-gray-100 p-6 rounded-lg text-left">
                <h2 className="text-black font-bold text-xl mb-4">Agent Activity</h2>

                <div className="space-y-3 text-black">
                  <p>✅ Document Agent: Document classified successfully</p>

                  <p>✅ Extraction Agent: {summary}</p>

                  <p>✅ Validation Agent: {validation}</p>

                  <p>✅ Department Agent: Routed to {department}</p>

                  {matchedKeywords.length > 0 && (
                    <div className="ml-4 mt-2 text-sm text-gray-600">
                      <p>Reasoning:</p>
                      <ul>
                        {matchedKeywords.map((keyword) => (
                          <li key={keyword}>• {keyword}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p>✅ Recommendation Agent: {recommendation}</p>

                  <div className="mt-4">
                    <p className="font-semibold">✅ Workforce Coordinator</p>

                    <div className="ml-4 mt-2">
                      <p>Affected Departments:</p>
                      <ul>
                        {affectedDepartments.map((dept) => (
                          <li key={dept}>• {dept}</li>
                        ))}
                      </ul>

                      <p className="mt-2">Generated Tasks:</p>
                      <ul>

                        {taskStatuses.map((item, index) => (

                          <li key={index}>

                            {item.status === "Completed" && "🟢"}

                            {item.status === "In Progress" && "🟡"}

                            {item.status === "Queued" && "🔵"}

                            {" "}

                            {item.task}

                            {" - "}

                            {item.status}

                          </li>

                        ))}

                      </ul>
                    </div>
                  </div>
                </div>
              </div>

<div className="bg-indigo-50 p-6 rounded-lg mt-6 text-left">

  <h2 className="text-black font-bold text-xl mb-4">
    Municipal Workforce Overview
  </h2>

  <div className="space-y-2 text-black">

    <p>📄 Active Cases: {activeCases}</p>

    <p>🤖 Auto-Processed Today: {autoProcessed}</p>

    <p>🏢 Departments Coordinated: {departmentsCoordinated}</p>

    <p>⏳ Hours Saved: {hoursSaved}</p>

    <p>🚶 Citizen Visits Avoided: {visitsSaved}</p>

  </div>

  <div className="bg-purple-50 p-6 rounded-lg mt-6 text-left">

    <h2 className="text-black font-bold text-xl mb-4">
      Workflow Visualization
    </h2>

    <div className="text-center text-black">

      <p className="font-semibold">
        Citizen Upload
      </p>

      {workflowGraph.map((node, index) => (

        <div key={index}>

          <p className="text-lg">
            ↓
          </p>

          <p className="font-medium">
            {node}
          </p>

        </div>

      ))}

    </div>

</div>

</div>

              <div className="bg-blue-50 p-6 rounded-lg mt-6 text-left">
                <h2 className="text-black font-bold text-xl mb-4">
                  Municipal Operations Dashboard
                </h2>

                <div className="space-y-2 text-black">
                  <p>🏢 Departments Impacted: {affectedDepartments.length}</p>
                  <p>📋 Generated Tasks: {generatedTasks.length}</p>
                  <p>🚶 Citizen Visits Saved: {visitsSaved}</p>
                  <p>⏳ Processing Time Saved: {timeSaved}</p>
                  <p>🎯 Auto-Routed Successfully</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mt-6 text-left">
                <h2 className="text-black font-bold text-xl mb-4">
                  Citizen Journey Timeline
                </h2>

                <div className="space-y-2 text-black">
                  <p>09:01 • Document Uploaded</p>
                  <p>09:02 • Document Classified</p>
                  <p>09:02 • Department Routed</p>
                  <p>09:03 • Tasks Generated</p>
                  <p>09:03 • Departments Notified</p>
                </div>
              </div>
            </div>

            <div className="text-left text-black mt-6">
              <h2 className="font-semibold mb-3 text-black">Supported Forms</h2>

              <ul className="space-y-2 text-gray-700">
                <li>✓ Residence Registration</li>
                <li>✓ Tax Update</li>
                <li>✓ Health Insurance</li>
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}