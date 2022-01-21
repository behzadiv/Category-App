import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTelegramPlane,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const facebook = <FontAwesomeIcon icon={faFacebookF} />;
  const telegram = <FontAwesomeIcon icon={faTelegramPlane} />;
  const youtube = <FontAwesomeIcon icon={faYoutube} />;
  
  return (
    <div className="footer">
      <div className="social-icons">
        <span><a href="">{facebook}</a></span>
        <span><a href="">{youtube}</a></span>
        <span><a href=""> {telegram}</a></span>
      </div>
      <p>©BehzadSaeediv</p>
    </div>
  );
};

export default Footer;
