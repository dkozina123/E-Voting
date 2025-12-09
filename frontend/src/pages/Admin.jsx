import { useState } from "react";

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
    <div style={{ padding: 20 }}>
      <h1>Panel za admine</h1>

      <h2>Trenutni kandidati</h2>
      {candidates ? (
        candidates.map((c) => (
          <div key={c.id}>
            {c.name} — {c.votes} glas/glasova
            <button onClick={() => deleteCandidate(c.id)} style={{ marginLeft: 10 }}>
              Izbriši
            </button>
          </div>
        ))
      ) : (
        <p>Kandidati nisu dodani</p>
      )}

      <hr />

      <h2>Dodaj kandidata</h2>
      <input
        value={newCandidate}
        onChange={(e) => setNewCandidate(e.target.value)}
        placeholder="Candidate Name"
      />
      <button onClick={addCandidate}>Dodaj</button>

      <hr />

      <button onClick={resetVotes}>Izbriši sve glasove</button>
    </div>
  );
}

export default Admin;