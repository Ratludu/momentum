import { useState } from "react";
import api from "../api";

export default function Analysis() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!userId) {
      setError("Please set a user ID first");
      return;
    }
    
    setLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const res = await api.get(`/analysis/${userId}`);
      setAnalysis(res.data.analysis || res.data.Analysis || JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Analysis failed");
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
      <h2>AI Workout Analysis</h2>
      
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          placeholder="Enter your user ID"
          value={userId}
          onChange={(e) => saveUserId(e.target.value)}
        />
      </div>

      <button onClick={run} disabled={!userId || loading} className="analyze-btn">
        {loading ? "Analyzing..." : "🤖 Analyze My Workouts"}
      </button>

      {error && <div className="error">{error}</div>}
      
      {loading && (
        <div className="loading">
          <p>Analyzing your workout data with AI...</p>
          <div className="spinner"></div>
        </div>
      )}

      {analysis && (
        <div className="analysis-result">
          <h3>Analysis Results</h3>
          <div className="analysis-content">
            {analysis.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
