import "../assets/styles/VoteSection.css";
function VoteSection({candidates, setCandidates}) {
  if (candidates===null){
    return (<h2>Glasanje još nije otvoreno.</h2>);
  }
  function vote(id) {
    setCandidates(prev =>
      prev.map(c =>
        c.id === id ? { ...c, votes: c.votes + 1 } : c
      )
    );
  }

  const winner = candidates.reduce((max, c) =>
    c.votes > max.votes ? c : max
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