import { faBars, faTimes,faUserAlt,faHome,faSignInAlt, faCogs,faList, faListAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../data/logo.gif"
const Header = () => {
  const menu = <FontAwesomeIcon icon={faBars} />;
  const crossBar = <FontAwesomeIcon icon={faTimes} />;
  const profile = <FontAwesomeIcon icon={faUserAlt} />;
  const home = <FontAwesomeIcon icon={faHome} />;
  const setting= <FontAwesomeIcon icon={faCogs} />;
  const login = <FontAwesomeIcon icon={faSignInAlt} />;
  const productList = <FontAwesomeIcon icon={faListAlt} />;
  
  const [isShow, setIsShow] = useState(false);
  const showMenu = () => {
    return (
      document.querySelector(".navbar-bars").classList.toggle("menu-opened"),
      document.querySelector(".navbar-list-container").classList.toggle("show-menu"),
      document.querySelector(".navbar-logo").classList.toggle("hideLogoTitle"),
      isShow ? setIsShow(false) : setIsShow(true)
    );
  };
  return (
    <div className="navbar">
      <div className="navbar-list-container">
        <ul className="navbar-list">
          <Link className="navbar-list-link" to="/"><span className="link-icon">{home}<span className="link-name">Home</span></span ></Link>
          <Link className="navbar-list-link" to="/"><span className="link-icon">{profile}<span className="link-name">Profile</span></span ></Link>
          <Link className="navbar-list-link" to="/productlist"><span className="link-icon">{productList}<span className="link-name">Product List</span></span ></Link>
          <Link className="navbar-list-link" to="/"><span className="link-icon">{setting}<span className="link-name">Setting</span></span ></Link>
          <Link className="navbar-list-link" to="/"><span className="link-icon">{login}<span className="link-name">Login</span></span ></Link>
        </ul>
      </div>
      <span onClick={showMenu} className="navbar-bars">
        {isShow ? crossBar : menu}
      </span>
      <span className="navbar-logo"></span>
    </div>
  );
};

export default Header;
