import VoteSection from '../components/VoteSection';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/styles/Vote.css"; // We will create this

function Vote({ role, candidates, setCandidates }) {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [votedElections, setVotedElections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/elections")
      .then(res => res.json())
      .then(data => setElections(data))
      .catch(err => console.error(err));

    // Load initial voted state from login
    const saved = localStorage.getItem("evote_voted");
    if (saved) setVotedElections(JSON.parse(saved));
  }, []);

  if (!role) return <h1>Potrebna prijava</h1>;

  const handleVote = async (id) => {
    const username = localStorage.getItem("evote_username");
    try {
      const res = await fetch(`http://localhost:5000/api/candidates/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Greška pri glasanju");
        return;
      }

      // Update local state
      if (selectedElection) {
        const newVoted = [...votedElections, selectedElection];
        setVotedElections(newVoted);
        localStorage.setItem("evote_voted", JSON.stringify(newVoted));
        alert("Glas zaprimljen!");
      }

      setCandidates(prev =>
        prev.map(c => c._id === data._id ? data : c)
      );
    } catch (err) {
      console.error(err);
      alert("Greška servera");
    }
  };

  if (selectedElection) {
    const typeCandidates = candidates ? candidates.filter(c => c.electionType === selectedElection) : [];
    const hasVoted = votedElections.includes(selectedElection);

    return (
      <div className="vote-page-container">
        <div className="vote-header">
          <button className="btn-back" onClick={() => setSelectedElection(null)}>
            ← Povratak
          </button>
          <h1>{selectedElection} Elections</h1>
        </div>

        {hasVoted && (
          <div style={{
            margin: '20px 0',
            padding: '10px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid var(--primary)',
            borderRadius: '6px',
            textAlign: 'center',
            color: 'var(--primary)'
          }}>
            Već ste glasali na ovim izborima!
          </div>
        )}

        <VoteSection
          candidates={typeCandidates}
          onVote={handleVote}
          hasVoted={hasVoted} // Pass down prop
        />
      </div>
    );
  }

  return (
    <div>
      <div className="vote-header">
        <h1>Odaberi izbore</h1>
        {role === "admin" && (
          <button className="btn-admin-panel" onClick={() => navigate("/admin")}>
            ⚙️ Panel za Admine
          </button>
        )}
      </div>

      <div className="election-dashboard">
        {elections.map(e => {
          const now = new Date();
          const start = e.startTime ? new Date(e.startTime) : null;
          const end = e.endTime ? new Date(e.endTime) : null;

          let isOpen = e.isOpen; // Fallback
          if (start && end) {
            isOpen = now >= start && now < end;
          }

          return (
            <div key={e._id} className={`election-card ${isOpen ? 'open' : 'closed'}`}>
              <h2>{e.name}</h2>
              <p>Status: {isOpen ? "OTVORENO" : "ZATVORENO"}</p>
              {start && end && (
                <div style={{ fontSize: '0.8rem', marginBottom: '10px' }}>
                  <p>Početak: {start.toLocaleString('hr-HR', { hour12: false })}</p>
                  <p>Kraj: {end.toLocaleString('hr-HR', { hour12: false })}</p>
                </div>
              )}
              <button
                disabled={!isOpen}
                onClick={() => setSelectedElection(e.name)}
              >
                {isOpen ? "Pristupi glasanju" : "Glasanje zatvoreno"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Vote;