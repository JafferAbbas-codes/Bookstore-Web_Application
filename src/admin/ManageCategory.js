import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./apiAdmin";

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const deleteConfirm = (categoryId) => {
        let answer = window.confirm(
            "Are you sure you want to delete this category? This will delete all the prodcuts in this category?"
        )
        if(answer) {
            destroy(categoryId);
        }
    };

    const deleteSuccess = () => {
        window.alert("Category Deleted")
    }

    const destroy = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                deleteSuccess();
                loadCategories();
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div
            className="container"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        <h1 className="display-4 mb-3" 
                        style={{ color:"red"}}> Manage Products </h1>
                        <hr/>
                        Total {categories.length} categories
                    </h2>
                    <hr />
                    <Link to="/create/category"> 
                        <button className="btn btn-success">
                        Add a new Category
                        </button> 
                    </Link>
                    <hr/>
                    <table className="table" style={{backgroundColor:"black"}}>
                        <thead>
                            <tr>
                                <th scope="col" style={{color:"white"}}> Category Name</th>
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
                        {categories.map((c, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <Link to={`/admin/products/${c._id}`} 
                                    className="flex-fill"
                                    style={{color:"black"}}>
                                    <strong>{c.name}</strong>
                                </Link>

                                <Link to={`/admin/category/update/${c._id}`}>
                                    <button className="mr-3 badge badge-secondary">
                                        Update
                                    </button>
                                </Link>

                                <button
                                    onClick={() => deleteConfirm(c._id)}
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

export default ManageCategory;
