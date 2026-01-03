import { useState } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../firebase"; // 🔥 IMPORTANT

function PdfSummarize() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in");
      return;
    }

    const token = await user.getIdToken(); // 🔥 AUTH TOKEN

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/pdf/summarize",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ REQUIRED
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error:", errorText);
        throw new Error("PDF summarization failed");
      }

      const data = await res.json();
      setSummary(data.summary || "No summary generated");
    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF summarization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">PDF Summarizer</h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Processing..." : "Summarize PDF"}
        </button>

        {summary && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="whitespace-pre-wrap text-gray-800">
              {summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfSummarize;
