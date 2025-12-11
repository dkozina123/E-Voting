import { useState } from "react";
import '../assets/styles/Admin.css';

function Admin({ candidates, setCandidates }) {
  const [newCandidate, setNewCandidate] = useState("");

  const addCandidate = () => {
    if (!newCandidate) return;

    if (!candidates) {
      setCandidates([{ id: Date.now(), name: newCandidate, votes: 0 }]);
    } else {
      setCandidates([...candidates, { id: Date.now(), name: newCandidate, votes: 0 }]);
    }

    setNewCandidate("");
  };

  const resetVotes = () => {
    if (!candidates) return;
    const confirmed = window.confirm("Potvrdi");
    if (confirmed) {
      setCandidates(candidates.map((c) => ({ ...c, votes: 0 })));
    }
  };

  const deleteCandidate = (id) => {
    if (!candidates) return;
    setCandidates(candidates.filter((c) => c.id !== id));
  };

  return (
    <div className="admin-panel">
      <h1>Panel za admine</h1>
      <div className="admin-candidate-list">
        <h2>Trenutni kandidati</h2>
        {candidates && candidates.length > 0 ? (
          candidates.map((c) => (
            <div className="admin-candidate" key={c.id}>
              <span>
                {c.name} — {c.votes} glas/glasova
              </span>

              <button
                onClick={() => deleteCandidate(c.id)}
              >
                Izbriši
              </button>
            </div>
          ))
        ) : (
          <p>Kandidati nisu dodani</p>
        )
      }
      </div>
      <hr />
      <div className="admin-input-group">
        <h2>Dodaj kandidata</h2>
        <div className="admin-add-candidate">
          <input
            value={newCandidate}
            onChange={(e) => setNewCandidate(e.target.value)}
            placeholder="Ime kandidata"
          />
          <button onClick={addCandidate}>Dodaj</button>
        </div>
        <button onClick={resetVotes}>Izbriši sve glasove</button>
      </div>
    </div>
  );
}

export default Admin;