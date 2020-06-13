import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = ({match}) => {
    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();

    const loadProducts = categoryId => {
        getProducts(categoryId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const deleteConfirm = (productId) => {
        let answer = window.confirm(
            "Are you sure you want to delete this Product?"
        )
        if(answer) {
            destroy(productId);
        }
    };

    const deleteSuccess = () => {
        window.alert("Product Deleted")
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                deleteSuccess();
                loadProducts(match.params.categoryId);
            }
        });
    };

    useEffect(() => {
        loadProducts(match.params.categoryId);
    }, []);

    return (
        <Layout
            className="container"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        <h1 className="display-4 mb-3" 
                        style={{color:"red"}}> Manage Products </h1>
                        <hr/>
                        Total {products.length} products
                    </h2>
                    <hr />
                    <Link to="/create/product"> 
                        <button className="btn btn-success">
                        Add a new Product
                        </button> 
                    </Link>
                    <hr />
                    <table className="table" style={{backgroundColor:"black"}}>
                        <thead>
                            <tr>
                                <th scope="col" style={{color:"white"}}> Product Name</th>
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
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong className="flex-fill">{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <button className="mr-3 badge badge-secondary">
                                        Update
                                    </button>
                                </Link>
                                <button
                                    onClick={() => deleteConfirm(p._id)}
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
        </Layout>
    );
};

export default ManageProducts;
