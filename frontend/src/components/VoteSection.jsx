import "../assets/styles/VoteSection.css";
function VoteSection({ candidates, onVote, hasVoted }) {
  if (candidates === null) {
    return (<h2>Glasanje još nije otvoreno.</h2>);
  }

  const winner = candidates.reduce((max, c) =>
    c.votes > max.votes ? c : max
    , candidates[0] || { votes: -1, name: "" });

  return (
    <div className="vote-section">


      {candidates.map(c => (
        <div className="candidate" key={c._id}>
          {c.name} — {c.votes}
          <button
            className="btn-vote"
            onClick={() => onVote(c._id)}
            disabled={hasVoted} // Disable if already voted
          >
            {hasVoted ? "Glasano" : "Glasaj"}
          </button>
        </div>
      ))}

      <h3>Pobjednik: {winner && winner.name}</h3>
    </div>
  );
}

export default VoteSection;