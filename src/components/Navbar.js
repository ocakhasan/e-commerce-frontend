import React from "react";
import {Link} from 'react-router-dom'
import './styles/Navbar.css'

const Navbar = () => {
    return (
        <nav className="nav">
            <ul className="nav__ul">

                <li className="nav__link"><Link to="">Project</Link></li>
                <div className="right-links">
                    <li className="nav__link"><Link to="about">Dashboard</Link></li>
                    <li className="nav__link"><Link to="signup">Signup</Link></li>
                    <li className="nav__link"><Link to="login">Login</Link></li>
                </div>


                {/* <div className="right-links">
                    <li className="nav__link"><Link to="about">Icon1</Link></li>
                    <li className="nav__link"><Link to="about">Icon2</Link></li>
                    <li className="nav__link"><Link to="about">Icon3</Link></li>
                </div> */}
            </ul>
        </nav>
    )
}

export default Navbar