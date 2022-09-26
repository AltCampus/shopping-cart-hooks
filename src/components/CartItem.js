import React from 'react';
import { connect } from "react-redux";
import { useState } from "react";

function CartItem(props) {
  const [quantity, setQuantity] = useState([]);

  function addQuantity(id){
    console.log(id);
    this.props.dispatch({
      type:"addItemToCart",
      id
    })
  }

  function removeQuantity(){
    if(quantity > 1){
      setQuantity(quantity-1);
    }
  }
  
  function removeItemFromCart(id) {
    props.dispatch({
      type:"removeItemFromCart",
      id
    })
  }

  let cart = [... new Set(props.state.cart)]
  return (
    <>
    {
      cart.map(product => (
        <div className='cart-item'>
          <img
            src={`/static/products/${product.sku}_2.jpg`}
            alt=''
            width='80'
          />
          <div className='cart-item-details'>
            <p className='cart-item-name'>
              {product.title}
            </p>
            <p>{product.style}</p>
            <p>print Quantity:</p>
          </div>
          <div className='cart-price'>
            <p className='cart-cross' onClick={() => removeItemFromCart(product.id)}>X</p>
            <p className='price'>$ {product.price * quantity }</p>
            <div>
              <Increment addQuantity={addQuantity} id={product.id} />
              <Decrement removeQuantity={removeQuantity} />
            </div>
          </div>
        </div>
      ))
    }
  </>
  );
}

function Increment(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      className='plus-icon'
      onClick={() => props.addQuantity(props.id)}
      >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
        />
    </svg>
  );
}
function Decrement(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      className='plus-icon'
      onClick={props.removeQuantity}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M18 12H6'
      />
    </svg>
  );
}

function mapStateToProps(state){
  return {
    state,
  }
}

export default connect(mapStateToProps)(CartItem);