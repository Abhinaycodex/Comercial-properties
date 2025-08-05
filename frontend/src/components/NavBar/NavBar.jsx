import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import  logo from '../../assets/CP.jpg'

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <NavContent />
      </nav>

      {/* Mobile menu button */}
      <button className="navBtn" >
        <AiOutlineMenu />
      </button>

      
    </>
  );
};

export const HeaderPhone = () => {
  return (
    <div className="header-phone">
      <NavContent />
    </div>
  );
};

const NavContent = () => (
  <>
    <a  href="/" className="logo">
      <img src={logo} alt="Company Logo"  />
    </a>
    <div className="nav-links">
      <Link  to="/">
        HOME
      </Link>
      <Link  to="/buy">
        BUY
      </Link>
      <Link  to="/sell">
        SELL
      </Link>
      <NavLink  to="/rent">
        RENT
      </NavLink>
      <NavLink  to="/Register">
        LOGIN
      </NavLink>
      

    </div>
  </>
);

export default NavBar;