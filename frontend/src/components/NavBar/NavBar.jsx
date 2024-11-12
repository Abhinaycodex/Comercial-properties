import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import  logo from '../../assets/CP.jpg'

const NavBar = ({ setMenuOpen, menuOpen }) => {
  return (
    <>
      <nav className="navbar">
        <NavContent setMenuOpen={setMenuOpen} />
      </nav>

      {/* Mobile menu button */}
      <button className="navBtn" onClick={() => setMenuOpen(!menuOpen)}>
        <AiOutlineMenu />
      </button>

      {/* Mobile navigation */} 
      <HeaderPhone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export const HeaderPhone = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className={`navPhone ${menuOpen ? "navPhoneComes" : ""}`}>
      
      <NavContent setMenuOpen={setMenuOpen} />
    </div>
  );
};

const NavContent = ({ setMenuOpen }) => (
  <>
    <a  href="/" className="logo">
      <img src={logo} alt="Company Logo"  />
    </a>
    <div className="nav-links">
      <Link onClick={() => setMenuOpen(false)} to="/">
        HOME
      </Link>
      <Link onClick={() => setMenuOpen(false)} to="/buy">
        BUY
      </Link>
      <Link onClick={() => setMenuOpen(false)} to="/sell">
        SELL
      </Link>
      <NavLink onClick={() => setMenuOpen(false)} to="/rent">
        RENT
      </NavLink>
    </div>
  </>
);

export default NavBar;