import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import Cart from "../images/cart.png";
import Logo from "../images/logo.png";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => (
    <>
    <div style={{backgroundColor:"black"}}>
        <br/> <div style={{height:"15px"}}></div> 
        <div style={{backgroundColor:"#DC143c"}}>
            <nav class="navbar">
                <h1 class="ml-5" style={{color:"white"}}>
                    <img src={Logo} alt="" width="350" height="100"/>
                </h1>
                <Link
                    className="nav-link"
                    to="/cart"
                >
                    <img src={Cart} alt="" width="40px" height="40px"/>{" "}
                    <sup>
                        <small className="cart-badge" style={{backgroundColor:"white"}}>{itemTotal()}</small>
                    </sup>
                </Link>
            </nav>

        </div>
    </div>
    <div>
        <ul className="nav nav-tabs" style={{backgroundColor:"#34313D"}}>
            <li className="ml-5 nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li className="ml-2 nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <>
                <li className="ml-2 nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, `/user/dashboard`)}
                        to={`/user/dashboard`}
                    >
                        {isAuthenticated().user.name}'s Profile
                    </Link>

                </li>
                </>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <>
                <li className="ml-2 nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>

                <li className="ml-2 nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, `/profile/admin/${isAuthenticated().user._id}`)}
                        to={`/profile/admin/${isAuthenticated().user._id}`}
                    >
                        {isAuthenticated().user.name}'s Profile
                    </Link>

                </li>

                </>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="ml-2 nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Login
                        </Link>
                    </li>

                    <li className="ml-2 nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Register
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="ml-2 nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
    </>
);

export default withRouter(Menu);
