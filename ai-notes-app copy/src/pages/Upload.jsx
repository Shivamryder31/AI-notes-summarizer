// src/pages/Upload.jsx
import { useState } from "react";
import Navbar from "../components/Navbar";
import { summarizeText } from "../api";

function Upload() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    setLoading(true);
    setSummary("");
    setKeyPoints([]);

    try {
      const res = await summarizeText(text);

      setSummary(res.data.summary);
      setKeyPoints(res.data.key_points || []);
    } catch (err) {
      console.error("Summarize failed:", err.response?.data || err);
      alert("Summarization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Upload / Paste Notes</h2>

        <textarea
          className="w-full h-48 border rounded-lg p-3 mb-4"
          placeholder="Paste your notes here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSummarize}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Summarizing..." : "Generate Summary"}
        </button>

        {summary && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        {keyPoints.length > 0 && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Key Points</h3>
            <ul className="list-disc pl-5">
              {keyPoints.map((kp, idx) => (
                <li key={idx}>{kp}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
