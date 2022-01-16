import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const menu = <FontAwesomeIcon icon={faBars} />
  
    return ( 
        <div className="navbar">
            <ul className="navbar-list">
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <span>{menu}</span>
            <span>Storage</span>
        </div>
     );
}
 
export default Header;