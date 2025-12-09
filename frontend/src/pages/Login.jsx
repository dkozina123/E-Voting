import { useNavigate } from "react-router-dom";

function Login({ setRole }) {
  const navigate = useNavigate();

  function loginAs(role) {
    setRole(role);
    navigate("/vote");
  }

  return (
    <div>
      <h1>Login</h1>

      <button onClick={() => loginAs("user")}>Login as User</button>
      <button onClick={() => loginAs("admin")}>Login as Admin</button>
    </div>
  );
}

export default Login;