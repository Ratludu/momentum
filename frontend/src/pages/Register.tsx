import { useState } from "react";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await api.post("/users", { name, email, password });
      const id = res.data.id || res.data.ID;
      setUserId(id);
      localStorage.setItem("userId", id);
      alert("Registered successfully! User ID: " + id);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h2>Register</h2>
      <form onSubmit={submit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            required
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            required
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        
        {error && <div className="error">{error}</div>}
        {userId && <div className="success">User ID: {userId} (saved to localStorage)</div>}
      </form>
    </div>
  );
}
