import React, { useState } from 'react';
import { createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '', 
        instance: {},
        address: '' 
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <>
            <div>{showDropIn()}</div>
            </>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true });

        const createOrderData = {
            products: products,
            amount: getTotal(),
            address: deliveryAddress
        };

        createOrder(userId, token, createOrderData)
            .then(response => {
                if(JSON.stringify(response.message1)){
                emptyCart(() => {
                    setRun(!run); 
                    console.log('order placed');
                    setData({
                        ...data,
                        loading: false,
                        success: true,
                    });
                    window.alert(JSON.stringify(response.message1))
                });}
                else {
                    emptyCart(() => {
                        setRun(!run); 
                        window.alert(JSON.stringify(response.message))
                        setData({
                            ...data,
                            loading: false,
                            success: true,
                        });
                    })
                }
            }) 
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });

    }

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            { products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                        <label>Delivery address:</label>
                        <select
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Select your delivery address"
                        >
                            <option> Gulberg </option>
                            <option> Federal B Area </option>
                            <option> Naseerabad </option>
                            <option> Garden </option>
                            <option> Saddar </option>
                            <option> Liaqatabad </option>
                            <option> Nazimabad </option>
                            <option> New Karachi </option>
                            <option> North Nazimabad </option>
                            <option> Faisal Cantonment </option>
                            <option> Ferozabad </option>
                            <option> Gulshan e Iqbal </option>
                            <option> Gulzar-e-Hijri </option>
                            <option> Jamshed Quarters </option>
                            <option> Aram Bagh </option>
                            <option> Civil Line </option>
                            <option> Clifton </option>
                            <option> Lyari </option>
                            <option> Saddar </option>
                            <option> Baldia </option>
                            <option> Orangi </option>
                            <option> Korangi </option>
                            <option> Malir </option>

                            
                            </select>
                    </div>
                    <h2 className="mb-3 text-center bg-warning">Total: Rs. {getTotal()}</h2>
                    <button onClick={buy} className="btn btn-success btn-block">
                        Place order
                    </button>
                </div>
            ) : null }
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            
            {showLoading(data.loading)}
            {showError(data.error)}
            {showCheckout()}
            
        </div>
    );
};

export default Checkout; 
