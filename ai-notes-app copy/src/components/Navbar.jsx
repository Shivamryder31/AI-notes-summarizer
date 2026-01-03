// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      <h1 className="font-bold text-xl text-indigo-600">AI Notes</h1>
      <div className="flex gap-4 text-sm">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/mynotes">My Notes</Link>
        <Link to="/pdf_summerize">PDF</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-xs"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
