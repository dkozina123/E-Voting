import { useState, useEffect } from "react";
import '../assets/styles/Admin.css';
import AdminElectionControl from "../components/AdminElectionControl";
import AdminCandidateManager from "../components/AdminCandidateManager";

function Admin({ candidates, setCandidates }) {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/elections")
      .then(res => res.json())
      .then(data => setElections(data))
      .catch(err => console.error(err));
  }, []);

  const updateElection = async (name, startTime, endTime) => {
    try {
      const res = await fetch("http://localhost:5000/api/elections/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, startTime, endTime }),
      });
      const updatedElection = await res.json();
      setElections(prev => prev.map(e => e.name === name ? updatedElection : e));
    } catch (err) {
      console.error(err);
    }
  };

  const addCandidate = async (name, electionType) => {
    try {
      const res = await fetch("http://localhost:5000/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, electionType }),
      });
      const data = await res.json();
      setCandidates([...candidates, data]);
    } catch (err) {
      console.error(err);
    }
  };

  const resetVotes = async () => {
    const confirmed = window.confirm("Jeste li sigurni da želite resetirati SVE glasove?");
    if (confirmed) {
      try {
        const res = await fetch("http://localhost:5000/api/candidates/reset_votes", {
          method: "POST",
        });
        const data = await res.json();
        setCandidates(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteCandidate = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/candidates/${id}`, {
        method: "DELETE",
      });
      setCandidates(candidates.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel za Admine</h1>

      <div className="admin-grid">
        <AdminElectionControl
          elections={elections}
          updateElection={updateElection}
        />

        <AdminCandidateManager
          candidates={candidates}
          addCandidate={addCandidate}
          deleteCandidate={deleteCandidate}
          resetVotes={resetVotes}
        />
      </div>
    </div>
  );
}

export default Admin;
