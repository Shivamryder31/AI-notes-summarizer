import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, "notes"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            createdAt: d.createdAt || d.created_at // ✅ backward-safe
          };
        });

        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">My Notes</h2>

        {loading && <p className="text-gray-600">Loading your notes...</p>}

        {!loading && notes.length === 0 && (
          <p className="text-gray-600">
            No notes yet. Upload a PDF or summarize text 📄✨
          </p>
        )}

        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="bg-white rounded-xl shadow p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-indigo-600">
                  {note.type === "pdf" ? "📄 PDF Summary" : "📝 Text Summary"}
                </span>
                <span className="text-xs text-gray-500">
                  {note.createdAt?.toDate?.().toLocaleString()}
                </span>
              </div>

              <p className="text-gray-800 mb-3">{note.summary}</p>

              {note.key_points?.length > 0 && (
                <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
                  {note.key_points.map((kp, i) => (
                    <li key={i}>{kp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyNotes;
