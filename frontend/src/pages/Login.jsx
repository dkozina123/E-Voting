import { useNavigate } from "react-router-dom";

function Login({ setRole }) {
  const navigate = useNavigate();

  function loginAs(role) {
    setRole(role);
    navigate("/vote");
  }

  return (
    <div>
      <h1>Prijava</h1>

      <button onClick={() => loginAs("user")}>Prijavi se kao korisnik</button>
      <button onClick={() => loginAs("admin")}>Prijavi se kao admin</button>
    </div>
  );
}

export default Login;