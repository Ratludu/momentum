import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Entries from "./pages/Entries";
import Goals from "./pages/Goals";
import Analysis from "./pages/Analysis";
import './App.css'

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <h1>Momentum - Fitness Diary</h1>
        <div className="nav-links">
          <Link to="/">Entries</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/analysis">Analysis</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Entries />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
