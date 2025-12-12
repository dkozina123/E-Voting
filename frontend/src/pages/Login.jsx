import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HARD_USERS = [
  { username: "admin", password: "adminpass", role: "admin" },
  { username: "user", password: "userpass", role: "user" },
];

export default function Login({ setRole }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = HARD_USERS.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        setError("Neispravno korisničko ime ili lozinka");
        setLoading(false);
        return;
      }
      setRole(user.role);
      localStorage.setItem("evote_role", user.role);
      setLoading(false);
      navigate("/vote");
    }, 400);
  };

  return (
    <div className="login-container" style={{ maxWidth: 360, margin: "auto" }}>
      <h1>Prijava</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Korisničko ime
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Lozinka
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Prijava..." : "Prijavi se"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 12 }}>
        <small>Za demo: admin/adminpass ili user/userpass</small>
      </div>
    </div>
  );
}