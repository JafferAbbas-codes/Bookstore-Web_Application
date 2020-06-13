import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addItem, updateItem, removeItem } from './cartHelpers';
import Cart from "../images/cart.png"
import Glass from "../images/search.png"

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [confirm, setConfirm]=useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className=" btn mt-2 mb-2" style={{ backgroundColor:"white"}}>
          <img src={Glass} alt="" width="50px" height="50px"/>
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(false), setConfirm(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const Confirm = confirm => {
    if(confirm) {
      return (
        <div className="alert alert-secondary" role="alert">
            Item has been added to your cart.
        </div>
      )
    }
  }

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <Link  onClick={addToCart} className="btn btn-danger mt-2 mb-2 ">
            <img src={Cart} alt="" width="40px" height="40px"/>
        </Link>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-secondary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return ( 
    <>
    <div class="card">
  <img class="mt-3 card-img-top" style={{width:"160px", height:"160px", marginLeft:"100px"}}
  src={`http://localhost:8001/api/product/photo/${product._id}`} 
  alt={product.name}/>
  <div class="card-body">
    {shouldRedirect(redirect)}
    {Confirm(confirm)}
  <h5 class="card-title">Title: {product.name}</h5>
  <p class="card-text">By: {product.author}</p>
  <p class="card-text">Rs. {product.price}</p>
  {showStock(product.quantity)}
    <br/>

  <div className="container ml-5">
      {showViewButton(showViewProductButton)}

      {showAddToCartBtn(showAddToCartButton)}
  </div>

  {showRemoveButton(showRemoveProductButton)}

  {showCartUpdateOptions(cartUpdate)}
  </div>
</div>
<br/><br/>
</>
  );
};

export default Card;
