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

const USERS = [
  { id: 1, username: "admin", password: "adminpass", role: "admin" },
  { id: 2, username: "user", password: "userpass", role: "user" },
  { id: 3, username: "user1", password: "userpass1", role: "user" }
];

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [candidates, setCandidates] = useState(() => {
    const stored = localStorage.getItem("candidates");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Routes>
        <Route
          path="/"
          element={<Login users={USERS} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/vote"
          element={
            <Vote
              currentUser={currentUser}
              candidates={candidates}
              setCandidates={setCandidates}
            />
          }
        />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            currentUser?.role === "admin" ? (
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
