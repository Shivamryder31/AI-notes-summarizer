// src/pages/Dashboard.jsx
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to your AI Study Dashboard
        </h2>
        <p className="text-gray-600">
          Yaha se tum notes upload kar sakte ho, summaries dekh sakte ho, quizzes aur insights generate kar sakte ho.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
