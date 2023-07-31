import './Administrador.css'
import logoNav from "../../assets/logoNav.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const NavAdmin = () => {
    return(
    <>
         <header>
            <figure>
              <img src={logoNav} alt="burger" className="admin-logoburger-img" />
            </figure>
            <nav>  
              <ul>
                 <li><a href="">ADMINISTRAR PRODUCTOS</a></li>
                 <li><a href="">ADMINISTRAR EMPLEADOS</a></li>
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
    )
}