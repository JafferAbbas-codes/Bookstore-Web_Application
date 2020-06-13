import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, itemTotal } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div> 
                {
                    items.length == 1 ?
                    <h2>Your cart has {`${items.length}`} item</h2> :
                    <h2>Your cart has {`${items.length}`} items</h2>
                }
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i} 
                        product={product}
                        showAddToCartButton={false}
                        showViewProductButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> 
            <Link to="/shop">
                <button className="btn btn-success mt-4"> 
                Continue shopping
                    </button></Link>
        </h2>
    );

    return (
        <Layout
            className="container"
        >
            <div className="row">
                <div className="col-5">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
                <div className="col-2"></div>
                <div className="col-5">
                    <h2 className="card-header mb-3"
                    style={{backgroundColor:"#DC143c", color:"white"}}>Confirm your Order</h2>
                    <hr />
                   <Checkout products={items} setRun={setRun} run={run} /> 
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
