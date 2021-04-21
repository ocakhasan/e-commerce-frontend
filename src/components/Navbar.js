import React from "react";
import { Link } from 'react-router-dom'
import './styles/Navbar.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Navbar = ({ user, handleLogout}) => {

    const dashboard = user?.userType!==0 ? 
                        <li className="nav__link"><Link to="/dashboard">Dashboard</Link></li> : 
                        <li className="nav__link"><Link to="cart"><ShoppingCartIcon />Cart</Link></li>
                       
    
    return (
        <nav className="nav">
            <ul className="nav__ul">

                <li className="nav__link"><Link to="">Project</Link></li>


                <div className="right-links">
                   
                    
                    {
                        user &&
                        
                        <div className="nav__links">
                            {dashboard}
                            <li className="nav__link">
                                <button className="nav_button" onClick={() => handleLogout()}>Logout</button>
                            </li>
                        </div>
                    }

                    {
                        !user &&
                        <div className="nav__links">
                            <li className="nav__link"><Link to="/signup">Signup</Link></li>
                            <li className="nav__link"><Link to="/login">Login</Link></li>
                        </div>
                    }


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