import VoteSection from '../components/VoteSection';
import { useNavigate } from "react-router-dom";

function Vote({ currentUser, candidates, setCandidates }) {
  const navigate = useNavigate();

  if (!currentUser) return <h1>Potrebna prijava</h1>;

  return (
    <div>
      <h1>Glasaj</h1>

      {currentUser.role === "admin" && (
        <button onClick={() => navigate("/admin")}>
          Otiđi na panel za admine
        </button>
      )}

      <VoteSection
        currentUser={currentUser}
        candidates={candidates}
        setCandidates={setCandidates}
      />
    </div>
  );
}

export default Vote;
