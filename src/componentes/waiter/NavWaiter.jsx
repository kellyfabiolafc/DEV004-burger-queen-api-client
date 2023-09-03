import './Waiter.css'
import logoNav from "../../assets/logoNav.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

export const NavWaiter  = () => {
    return(
    <>
         <header>
            <figure>
              <img src={logoNav} alt="burger" className="waiter-logoburger-img" />
            </figure>
            <nav>  
              <ul>
                 <Link className="nav-link" to="/waiter/orders">NEW ORDER </Link>
                 <Link className="nav-link" to="/waiter/orders/list">ORDER LIST </Link>
              </ul>
            </nav>
            <Link to="/" className="salir-button">
    <button className="waiter-btn">
      <FontAwesomeIcon icon={faRightFromBracket} size="lg" style={{ color: "#e1d76b" }} />
    </button>
  </Link>
         </header>
    </>
    )
}