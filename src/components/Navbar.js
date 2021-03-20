import React from "react";
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="nav">
            <ul className="nav__ul">
                <li className="nav__link"><Link to="">Homepage</Link></li>
                <li className="nav__link"><Link to="about">About</Link></li>
                <li className="nav__link"><Link to="signup">Signup</Link></li>
                <li className="nav__link"><Link to="login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar