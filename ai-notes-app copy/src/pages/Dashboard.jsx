import { auth } from "../firebase";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = auth.currentUser;

  // 🔹 Take only first part of email
  const displayName = user?.email
    ? user.email.split("@")[0]
    : "User";

  // 🔹 Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* 🔹 HEADER */}
        <div className="bg-white rounded-2xl p-8 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {greeting},{" "}
              <span className="text-indigo-600 capitalize">
                {displayName}
              </span>
            </h1>
            <p className="text-gray-500 mt-2">
              Your AI-powered notes workspace
            </p>
          </div>

          <Link
            to="/mynotes"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition text-center"
          >
            📘 View My Notes
          </Link>
        </div>

        {/* 🔹 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-sm text-gray-500">Summarization Engine</h3>
            <p className="text-xl font-bold mt-1">BART AI Model</p>
            <p className="text-sm text-gray-400 mt-2">
              Optimized for long documents
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-sm text-gray-500">Authentication</h3>
            <p className="text-xl font-bold mt-1">Firebase Secure Login</p>
            <p className="text-sm text-gray-400 mt-2">
              User-specific notes storage
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-sm text-gray-500">Storage</h3>
            <p className="text-xl font-bold mt-1">Cloud Firestore</p>
            <p className="text-sm text-gray-400 mt-2">
              Real-time synced notes
            </p>
          </div>
        </div>

        {/* 🔹 ACTION CARDS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">What would you like to do?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/upload"
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold mb-2">📝 Text Summarizer</h3>
              <p className="text-gray-600">
                Paste or type notes and generate concise summaries instantly.
              </p>
            </Link>

            <Link
              to="/pdf_summerize"
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold mb-2">📄 PDF Summarizer</h3>
              <p className="text-gray-600">
                Upload PDFs and extract key insights automatically.
              </p>
            </Link>
          </div>
        </div>

        {/* 🔹 INFO SECTION */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-bold mb-3">How it works</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>✔ Upload text or PDF</li>
            <li>✔ AI generates summary & key points</li>
            <li>✔ Notes are saved securely to your account</li>
            <li>✔ Access anytime from “My Notes”</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
