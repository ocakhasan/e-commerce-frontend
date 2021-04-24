import React from "react";
import { Link } from 'react-router-dom'
import './styles/Navbar.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';

const Navbar = ({ user, handleLogout }) => {

    const dashboard = user?.userType !== 0 ?
        <Link to="/dashboard"><Button ><DashboardIcon />Dashboard</Button></Link> : null



    return (
        <nav className="nav">
            <ul className="nav__ul">

                <li className="nav__link"><Link to="">Project</Link></li>


                <div className="right-links">
                    {user && <Link to="/profile"><Button ><PersonOutlineIcon /> {user.username}</Button></Link>}
                    {(!user || user.userType === 0) ?
                        <Link to="/cart"><Button ><ShoppingCartIcon />Cart</Button></Link> :
                        null}

                    {
                        user &&

                        <div className="nav__links">
                            
                            {dashboard}
                            <Button  type="submit" onClick={handleLogout}>Logout</Button>
                        </div>
                    }

                    {
                        !user &&
                        <div className="nav__links">
                            <Link to="/signup"><Button >Signup</Button></Link>
                            <Link to="/login"><Button >Login</Button></Link>
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