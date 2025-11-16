import { useEffect, useState } from "react";
import api from "../api";
import { formatDate } from "../utils/date";

interface Goal {
  id?: string;
  ID?: string;
  created_at?: string;
  CreatedAt?: string;
  category?: string;
  Category?: string;
  goal?: string | { String: string; Valid: boolean };
  Goal?: string | { String: string; Valid: boolean };
  is_active?: boolean;
  IsActive?: boolean;
  is_complete?: boolean;
  IsComplete?: boolean;
}

export default function Goals() {
  const [userId, setUserId] = useState<string>(localStorage.getItem("userId") || "");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!userId) return;
    setLoading(true);
    setError(null);
    
    try {
      const res = await api.get(`/goals/${userId}`);
      console.log("Goals response:", res.data);
      setGoals(res.data || []);
    } catch (err: any) {
      console.error("Error loading goals:", err);
      setError(err.response?.data?.message || err.message || "Failed to load goals");
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
      await api.post("/goals", { user_id: userId, category, goal });
      setCategory("");
      setGoal("");
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to create goal");
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
      <h2>Fitness Goals</h2>
      
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
            placeholder="e.g., Strength, Endurance, Weight Loss"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="goal">Goal</label>
          <textarea
            id="goal"
            required
            placeholder="Describe your fitness goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={4}
          />
        </div>
        
        <button type="submit" disabled={loading || !userId}>
          {loading ? "Creating..." : "Create Goal"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="goals-list">
        <h3>Your Goals ({goals.length})</h3>
        {loading && <p>Loading...</p>}
        {goals.length === 0 && !loading && <p>No goals yet. Set your first fitness goal!</p>}
        <ul>
          {goals.map((g) => {
            const id = g.id || g.ID || '';
            const category = g.category || g.Category || 'Unknown';
            const createdAt = g.created_at || g.CreatedAt || '';
            const isActive = g.is_active !== undefined ? g.is_active : (g.IsActive !== undefined ? g.IsActive : true);
            const isComplete = g.is_complete !== undefined ? g.is_complete : (g.IsComplete !== undefined ? g.IsComplete : false);
            const goalText = typeof g.goal === 'string'
              ? g.goal
              : (g.Goal && typeof g.Goal === 'object' && g.Goal.Valid)
                ? g.Goal.String
                : (g.goal && typeof g.goal === 'object' && g.goal.Valid)
                  ? g.goal.String
                  : "No goal text";
            
            return (
              <li key={id} className="goal-item">
                <div className="goal-header">
                  <span className="goal-category">{category}</span>
                  <span className="goal-date">{formatDate(createdAt)}</span>
                  {isComplete && <span className="badge">✓ Complete</span>}
                  {!isActive && <span className="badge">Inactive</span>}
                </div>
                <div className="goal-text">{goalText}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
