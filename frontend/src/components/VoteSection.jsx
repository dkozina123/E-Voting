import { useEffect, useState } from "react";
import "../assets/styles/VoteSection.css";

function VoteSection({ currentUser, candidates, setCandidates }) {
  const STORAGE_KEY = "votedUsers";
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const votedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setHasVoted(votedUsers.includes(currentUser.id));
  }, [currentUser]);

  if (!candidates || candidates.length === 0) {
    return <h2>Glasanje još nije otvoreno.</h2>;
  }

  function vote(id) {
    if (hasVoted || currentUser.role !== "user") return;
    const confirmed = window.confirm("Potvrdi");
    if (!confirmed) return;
    setCandidates(prev =>
      prev.map(c =>
        c.id === id ? { ...c, votes: (c.votes || 0) + 1 } : c
      )
    );

    const votedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    votedUsers.push(currentUser.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votedUsers));

    setHasVoted(true);
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
          {c.name}
          <button onClick={() => vote(c.id)} disabled={hasVoted}>
            {hasVoted ? "Već ste glasali" : "Glasaj"}
            {currentUser.role === "admin" ? " (Admin pogled)" : ""}
          </button>
        </div>
      ))}
    </div>
  );
}

export default VoteSection;