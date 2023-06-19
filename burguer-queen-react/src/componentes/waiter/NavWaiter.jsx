import './Waiter.css'
import logoNav from "../../assets/logoNav.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export const NavWaiter  = () => {
    return(
    <>
         <header>
            <figure>
              <img src={logoNav} alt="burger" className="waiter-logoburger-img" />
            </figure>
            <nav>  
              <ul>
                 <li><a href="">NEW ORDER </a></li>
                 <li><a href="">ORDER LIST</a></li>
              </ul>
            </nav>
              <button className='waiter-btn'><FontAwesomeIcon icon={faRightFromBracket} size="lg" style={{color: "#e1d76b",}}></FontAwesomeIcon></button>
         </header>
    </>
    )
}