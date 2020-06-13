import React, {useState} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { withRouter } from "react-router-dom";
import User from './User';
import Orders from '../admin/Orders';
import ManageCategory from '../admin/ManageCategory';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};


const AdminDashboard = ({ history }) => {

    const [redirect, setRedirect] = useState({
        redirecttoView:"true",
        redirecttoProducts:"",
        redirecttoUsers:"",
    });

    const {redirecttoView, redirecttoProducts, redirecttoUsers} = redirect;

    const View = () => {
            setRedirect({redirecttoView: true, redirecttoProducts:false, redirecttoUsers:false})
    }

    const Manage = () => {
        setRedirect({redirecttoProducts: true, redirecttoView:false, redirecttoUsers:false})
    }

    const Users = () => {
        setRedirect({redirecttoView: false, redirecttoProducts:false, redirecttoUsers:true})
    }

    const cases = () => {
        if (redirecttoView) {
            return (<Orders/>)
        } else if(redirecttoProducts){
            return (<ManageCategory/>)
        }
        else if (redirecttoUsers){
            return (<User/>)
        }
        else {
            return <div></div>
        }

    }

    return (
        <Layout
            className="container"
        >
            <div className="row">

                <div className="mb-3 col-12">
                    <div>
                        <ul className="nav nav-tabs" style={{ backgroundColor: "#34313D" }}>
                            <li className="ml-5 nav-item">
                                <button className="btn" onClick={View}
                                    style={isActive(history, "/admin/orders")}>
                                    Orders
                                </button>
                            </li>

                            <li className="ml-2 nav-item">
                                <button className="btn" onClick={Manage}
                                    style={isActive(history, "/admin/categories")}>
                                    Products
                                </button>
                            </li>
                            <li className="ml-2 nav-item">
                                <button className="btn" onClick={Users}
                                    style={isActive(history, "/users")}>
                                    Users
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <hr/>
            <div className="row">
                {
                    cases()
                }    
            </div>
        </Layout>
    );
};

export default withRouter(AdminDashboard);
