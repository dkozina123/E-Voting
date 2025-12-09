import VoteSection from '../components/VoteSection';
import { useNavigate } from "react-router-dom";

function Vote({role, candidates, setCandidates}) {
    const navigate = useNavigate();

    if (!role) return <h1>Potrebna prijava</h1>;

    return (
    <div>
    <h1>Glasaj</h1>

      {role === "admin" && (
        <button onClick={() => navigate("/admin")}>Otiđi na panel za admine</button>
      )}

      <VoteSection candidates={candidates} setCandidates={setCandidates}/>
    </div>
    );
}

export default Vote;