import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/Navbar.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";

const Navbar = ({ user, handleLogout }) => {
    const history = useHistory()
    const dashboard =
        user?.userType !== 0 ? (
            <Link to="/dashboard">
                <Button>
                    <DashboardIcon />
                    Dashboard
                </Button>
            </Link>
        ) : null;

    const navbarLogout = () => {
        handleLogout()
        history.push("/login")
    }

    return (
        <nav className="nav">
            <ul className="nav__ul">
                <Link to="">
                    <Button>
                        <SportsBasketballIcon />
                        BasketStore
                    </Button>
                </Link>

                <div className="right-links">
                    {!user || user.userType === 0 ? (
                        <Link to="/cart">
                            <Button>
                                <ShoppingCartIcon />
                                Cart
                            </Button>
                        </Link>
                    ) : null}

                    {user && (
                        <div className="nav__links">
                            {dashboard}
                            <Link to="/profile">
                                <Button>
                                    <PersonOutlineIcon /> {user.username}
                                </Button>
                            </Link>
                            <Button type="submit" onClick={navbarLogout}>
                                Logout
                            </Button>
                        </div>
                    )}

                    {!user && (
                        <div className="nav__links">
                            <Link to="/signup">
                                <Button>Signup</Button>
                            </Link>
                            <Link to="/login">
                                <Button>Login</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
