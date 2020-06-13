import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => { 
        init(_id, token);
    }, []);

    const deleteSuccess = () => {
        window.alert("User Deleted")
    }

   

    const userInfo = () => {
        return (
            <div className="mb-5">
                <h3 className="card-header"
                    style={{ backgroundColor: "#DC143c", color: "white" }}>
                    User Information
                </h3>

                <table class="table table-active table-bordered">

                    <tbody>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="mb-5">
                <h3 className="card-header" style={{ backgroundColor: "#DC143c", color: "white" }}>Order history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    <table className="table table-dark">
                                        <tbody>
                                            <tr>
                                                <th scope="row"> Order Number </th>
                                                <td>{i + 1}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <table class="table table-active table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row"> Product Name</th>
                                                            <td>{p.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Product Price</th>
                                                            <td><strong>Rs. {p.price}</strong></td>
                                                        </tr>
                                                    
                                                    <tr>
                                                        <th scope="row">Date Purchased</th>
                                                        <td>{moment(
                                                            h.createdAt
                                                        ).fromNow()}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Order Status</th>
                                                        <td>{h.status}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                                <hr />
                                            </div>

                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            className="container"
        >
            <div className="row">
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
                <div className="col-3">
                    <Link to={`/profile/${isAuthenticated().user._id}`}>
                        <button className="btn btn-success">
                            Update Profile
                    </button>
                    </Link>
                    
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
