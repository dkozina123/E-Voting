import "../assets/styles/VoteSection.css";

function VoteSection({ candidates, setCandidates }) {
  if (!candidates || candidates.length === 0) {
    return <h2>Glasanje još nije otvoreno.</h2>;
  }

  function vote(id) {
    setCandidates(prev =>
      prev.map(c =>
        c.id === id ? { ...c, votes: (c.votes || 0) + 1 } : c
      )
    );
  }

  const winner = candidates.reduce(
    (max, c) => (c.votes > max.votes ? c : max),
    candidates[0]
  );

  return (
    <div className="vote-section">
      <h2>Glasanje</h2>

      {candidates.map(c => (
        <div className="candidate" key={c.id}>
          {c.name} — {c.votes}
          <button onClick={() => vote(c.id)}>Glasaj</button>
        </div>
      ))}

      <h3>Pobjednik: {winner.name}</h3>
    </div>
  );
}

export default VoteSection;