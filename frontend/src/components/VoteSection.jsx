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
    <div style={{ padding: 20 }}>
      <h2>Voting</h2>

      {candidates.map(c => (
        <div key={c.id}>
          {c.name} — {c.votes}
          <button onClick={() => vote(c.id)}>Vote</button>
        </div>
      ))}

      <h3>Winner: {winner.name}</h3>
    </div>
  );
}

export default VoteSection;