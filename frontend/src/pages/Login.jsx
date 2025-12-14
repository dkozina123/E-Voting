import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/Login.css';

export default function Login({ users, currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/home", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        setError("Neispravno korisničko ime ili lozinka");
        setLoading(false);
        return;
      }

      const safeUser = {
        id: user.id,
        username: user.username,
        role: user.role
      };

      setCurrentUser(safeUser);

      setLoading(false);
      navigate("/vote");
    }, 400);
  };

  return (
    <div className="login-container">
      <h1>Prijava</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Korisničko ime"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lozinka"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Prijava..." : "Prijavi se"}
        </button>
      </form>

      {error && <div>{error}</div>}
      <small>Za demo: admin/adminpass ili user/userpass</small>
    </div>
  );
}
