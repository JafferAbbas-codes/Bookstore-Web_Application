import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';

const Home = () => {
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [productsBySell, setProductsBySell] = useState([]);
    const [setError] = useState(false);

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setProductsBySell(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            className="container"
        >
            <div className="row mb-4">
                <div className="col-md-10">
                    <h2
                        style={{ backgroundColor: "#DC143c", color: "white", height: "40px" }}>
                        <h3 className="mt-3 ml-5">Just In</h3>
                    </h2>
                </div>
                <div className="col-md-2 mt-3">
                    <Link to="/shop" className="btn btn-dark">
                        View All
                </Link>
                </div>
            </div>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <div className="row mb-4">
                <div className="col-md-10">
                    <h2
                        style={{ backgroundColor: "#DC143c", color: "white", height: "40px" }}>
                        <h3 className="mt-3 ml-5">Best Sellers</h3>
                    </h2>
                </div>
                <div className="col-md-2 mt-3">
                    <Link to="/shop" className="btn btn-dark">
                        View All
                </Link>
                </div>
            </div>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

        </Layout>
    );
};

export default Home;

