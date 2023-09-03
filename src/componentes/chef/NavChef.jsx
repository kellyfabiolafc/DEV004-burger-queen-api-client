import "./Chef.css";
import logoNav from "../../assets/logoNav.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const NavChef = () => {
  return (
    <>
      <header>
        <figure>
          <img src={logoNav} alt="burger" className="chef-logoburger-img" />
        </figure>
        <nav>
          <ul>
            <Link className="nav-link" to="/chef">
              ORDER PENDING CHEF
            </Link>
            <Link className="nav-link" to="/chef/orders/list">
              ORDER LIST CHEF{" "}
            </Link>
          </ul>
        </nav>
        <Link to="/" className="salir-button">
          <button className="chef-btn">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size="lg"
              style={{ color: "#e1d76b" }}
            />
          </button>
        </Link>
      </header>
    </>
  );
};
