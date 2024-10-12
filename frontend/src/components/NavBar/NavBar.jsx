import { AiOutlineMenu } from "react-icons/ai";
import './NavBar.css'; // Add CSS to style the nav
import logo from '../../assets/LOGO.jpg';

const NavBar = ({ setMenuOpen, menuOpen }) => {
  return (
    <>
      <nav>
        <NavContent setMenuOpen={setMenuOpen} />
      </nav>

      <button className="navBtn" onClick={() => setMenuOpen(!menuOpen)}>
        <AiOutlineMenu />
      </button>
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
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
    <div className="nav-links">
      <a onClick={() => setMenuOpen(false)} href="#buy">
        BUY
      </a>
      <a onClick={() => setMenuOpen(false)} href="#sell">
        SELL
      </a>
      <a onClick={() => setMenuOpen(false)} href="#rent">
        RENT
      </a>
    </div>
  </>
);

export default NavBar;
