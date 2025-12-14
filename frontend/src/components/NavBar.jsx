import { useNavigate, Link } from "react-router-dom";
import '../assets/styles/NavBar.css';

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const authLink = !currentUser ? (
    <Link to="/">Prijava</Link>
  ) : (
    <Link
      to="/"
      onClick={() => {
        setCurrentUser(null);
        navigate("/");
      }}
    >
      Odjava
    </Link>
  );

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#">E-Voting</a>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li><Link to="/home">Početna</Link></li>
          <li><Link to="/vote">Glasaj</Link></li>
          <li><Link to="/result">Rezultati</Link></li>
          <li><Link to="/contact">Kontakt</Link></li>
          {currentUser?.role === "admin" && (
            <li><Link to="/admin">Admin panel</Link></li>
          )}
          <li>{authLink}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
