import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const {
        user: { name, email } 
    } = isAuthenticated();

    const adminInfo = () => {
        return (
            <div className="mb-5">
                <h3 className="card-header" style={{backgroundColor:"#DC143c", color:"white"}}>User Information</h3>
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

    return (
        <Layout
            className="container"
        >
            <div className="row">
                <div className="col-9">{adminInfo()}</div>
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

export default AdminDashboard;
