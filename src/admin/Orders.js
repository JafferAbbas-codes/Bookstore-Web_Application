import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h3 className="card-header"
                    style={{ backgroundColor: "#DC143c", color: "white" }}>
                    Total Orders: {orders.length}</h3>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}

                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ borderBottom: "5px solid indigo", borderColor: "red" }}
                            >
                                <table className="table ">
                                    <thead className="table-dark">

                                        <tr>
                                            <th scope="row"> Order Number </th>
                                            <td>{oIndex + 1}</td>
                                        </tr>






                                    </thead>

                                    <tbody className="table-active table-bordered">

                                        <tr>
                                            <th scope="row"> Order by</th>
                                            <td>{o.user.name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Price</th>
                                            <td><strong>Rs. {o.amount}</strong></td>
                                        </tr>

                                        <tr>
                                            <th scope="row">Delivery Address</th>
                                            <td>{o.address}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Ordered</th>
                                            <td>{moment(
                                                o.createdAt
                                            ).fromNow()}</td>
                                        </tr>
                                    </tbody>
                                    <tr className="table-secondary">
                                        <th> Status: {showStatus(o)} </th>
                                        <td> {o.status}</td>
                                    </tr>
                                </table>


                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Orders;
