import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../assets/styles/NavBar.css';

const Navbar = ( {role, setRole} ) => {
    const navigate = useNavigate();
    let content;

    if (role === null) {
        content = <Link to="/">Prijava</Link>;
    } else {
        content = <Link to="/home" onClick={() => {
            setRole(null);
            navigate("/");
          }
        }>Odjava</Link>;
    }

    return (

        <nav className="navbar">
            <div className="navbar-left">
                <a href="#">
                    E-Voting
                </a>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li>
                        <Link to="/home">Početna</Link>
                    </li>
                    <li>
                        <Link to="/vote">Glasaj</Link>
                    </li>
                    <li>
                        <Link to="/result">Rezultati</Link>
                    </li>
                    <li>
                        <Link to="/contact">Kontakt</Link>
                    </li>
                    <li>
                        {content}
                    </li>
                </ul>
            </div>
        </nav >
    );
};

export default Navbar;