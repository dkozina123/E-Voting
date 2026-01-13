import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './pages/Home.jsx';
import Vote from './pages/Vote.jsx';
import Result from './pages/Result.jsx';
import Contact from './pages/Contact.jsx';
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/NavBar.jsx";
import "./App.css";


function App() {
  const [role, setRole] = useState(localStorage.getItem("evote_role") || null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Error fetching candidates:", err));
  }, []);
  return (
    <BrowserRouter>
      <Navbar role={role} setRole={setRole} />
      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vote" element={<Vote role={role} candidates={candidates} setCandidates={setCandidates} />} />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            role === "admin" ? (
              <Admin candidates={candidates} setCandidates={setCandidates} />
            ) : (
              <h1>Zabranjen pristup</h1>
            )
          }

        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
