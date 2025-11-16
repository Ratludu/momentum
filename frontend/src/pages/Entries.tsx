import { useEffect, useState } from "react";
import api from "../api";
import { formatDate } from "../utils/date";

interface Entry {
  id?: string;
  ID?: string;
  created_at?: string;
  CreatedAt?: string;
  category?: string;
  Category?: string;
  notes?: string;
  Notes?: string | { String: string; Valid: boolean };
}

export default function Entries() {
  const [userId, setUserId] = useState<string>(localStorage.getItem("userId") || "");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!userId) return;
    setLoading(true);
    setError(null);
    
    try {
      const res = await api.get(`/entries/${userId}`);
      console.log("Entries response:", res.data);
      setEntries(res.data || []);
    } catch (err: any) {
      console.error("Error loading entries:", err);
      setError(err.response?.data?.message || err.message || "Failed to load entries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [userId]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) {
      setError("Please set a user ID first");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await api.post("/entries", { user_id: userId, category, notes });
      setCategory("");
      setNotes("");
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to create entry");
    } finally {
      setLoading(false);
    }
  }

  function saveUserId(id: string) {
    setUserId(id);
    localStorage.setItem("userId", id);
  }

  return (
    <div className="page">
      <h2>Workout Entries</h2>
      
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          placeholder="Enter your user ID"
          value={userId}
          onChange={(e) => saveUserId(e.target.value)}
        />
      </div>

      <form onSubmit={create} className="form">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            required
            placeholder="e.g., Cardio, Strength, Stretching"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            placeholder="Workout details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
        
        <button type="submit" disabled={loading || !userId}>
          {loading ? "Creating..." : "Create Entry"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="entries-list">
        <h3>Your Entries ({entries.length})</h3>
        {loading && <p>Loading...</p>}
        {entries.length === 0 && !loading && <p>No entries yet. Create your first workout entry!</p>}
        <ul>
          {entries.map((entry) => {
            const id = entry.id || entry.ID || '';
            const category = entry.category || entry.Category || 'Unknown';
            const createdAt = entry.created_at || entry.CreatedAt || '';
            const notes = typeof entry.notes === 'string' 
              ? entry.notes 
              : (entry.Notes && typeof entry.Notes === 'object' && entry.Notes.Valid) 
                ? entry.Notes.String 
                : "No notes";
            
            return (
              <li key={id} className="entry-item">
                <div className="entry-header">
                  <span className="entry-category">{category}</span>
                  <span className="entry-date">{formatDate(createdAt)}</span>
                </div>
                <div className="entry-notes">{notes}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
