import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listallUsers,remove } from "./apiUser";

const User = () => {
    const [users, setUsers] = useState([]);

    const { user, token } = isAuthenticated();

    const loadusers = () => {
        listallUsers(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };

    const deleteSuccess = () => {
        window.alert("User Deleted")
    }

    const deleteConfirm = (userId) => {
        let ans = window.confirm("Are you sure you want to delete this account?")
        if(ans){
            init(userId);
        }
    }

    const init = (userId) => {
         console.log(userId);
        remove(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                deleteSuccess();
                loadusers();
            }
        });
    };

    useEffect(() => {
        loadusers();
    }, []);

    return (
        <div
            className="container"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        <h1 className="display-4 mb-3" 
                        style={{ color:"red"}}> Manage Users </h1>
                        <hr/>
                        Total {users.length} Users
                    </h2>
                    <hr />
                    <hr/>
                    <table className="table" style={{backgroundColor:"black"}}>
                        <thead>
                            <tr>
                                <th scope="col" style={{color:"white"}}> User Name</th>
                                <th scope="col" style={{color:"black"}}> Actions </th>
                                <th scope="col" style={{color:"black"}}> Actions</th>
                                <th scope="col" style={{color:"black"}}> Actions</th>
                                <th scope="col" style={{color:"black"}}> Actions</th>
                                <th scope="col" style={{color:"black"}}> Actions</th>
                                <th scope="col" style={{color:"white"}}> Actions</th>
                            </tr>
                        </thead>
                    </table>
                    <ul className="list-group">
                        {users.map((u, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <Link to={`/user/${u._id}`} 
                                    className="flex-fill"
                                    style={{color:"black"}}>
                                    <strong>{u.name}</strong>
                                </Link>

                                <Link to={`/profile/${u._id}`}>
                                    <button className="mr-3 badge badge-secondary">
                                        Update
                                    </button>
                                </Link>

                                <button
                                    onClick={() => deleteConfirm(u._id)}
                                    className="badge badge-danger"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default User;
