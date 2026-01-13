import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



import "../assets/styles/Login.css";

export default function Login({ setRole }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Login failed");
        setLoading(false);
        return;
      }

      setRole(data.role);
      localStorage.setItem("evote_role", data.role);
      localStorage.setItem("evote_username", data.username);
      localStorage.setItem("evote_voted", JSON.stringify(data.votedElections || []));

      setLoading(false);
      navigate("/vote");
    } catch (err) {
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Prijava</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Korisničko ime</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Unesite korisničko ime"
            />
          </div>
          <div className="form-group">
            <label>Lozinka</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Unesite lozinku"
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Prijava..." : "Prijavi se"}
          </button>
        </form>

        <div className="demo-info">
          <small>Za demo: admin/adminpass ili user/userpass</small>
        </div>
      </div>
    </div>
  );
}