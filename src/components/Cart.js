import React from 'react';
import { connect } from "react-redux";
import CartItem from './CartItem';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  close = () => {
    this.setState({ isOpen: false });
  };
  open = () => {
    this.setState({ isOpen: true });
  };

  render() {

    let totalAmount = this.props.state.cart.reduce((prev, curr) => {
      prev = prev + curr.price * curr.quantity;
      return Number(prev.toFixed(2));
    }, 0);

    const { isOpen } = this.state;
    if (!isOpen) {
      return <ClosedCart open={this.open} count={this.props.state.cart} />;
    }
    return (
      <aside className='cart'>
        <div onClick={this.close} className='close-btn'>
          X
        </div>
        <div className='cart-body'>
          <div className='cart-heading'>
            <div className='cart-icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='icon'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <span className='item-count'>{this.props.state.cart.length}</span>
            </div>
            <h2>Cart</h2>
          </div>
          <CartItem />
          <div className='cart-checkout'>
            <div>
              <p>SUBTOTAL</p>
              <p>$ {totalAmount}</p>
            </div>
            <button>CHECKOUT</button>
          </div>
        </div>
      </aside>
    );
  }
}

function ClosedCart(props) {
  return (
    <div className='close-cart'>
      <span onClick={props.open} className='open-btn'>
        <div className='cart-icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='icon'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <span className='item-count'>{props.count.length}</span>
        </div>
      </span>
    </div>
  );
}

function mapStateToProps(state){
  return {
    state,
  }
}

export default connect(mapStateToProps)(Cart);