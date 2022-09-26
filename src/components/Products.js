import React from "react";
import { connect } from "react-redux";
import OrderBy from "./OrderBy";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrder: "",
    };
  }
  handleOrderBy = (event) => {
    this.setState({ selectedOrder: event.target.value });
  };

  handleOrderProducts = (order, products) => {
    let sortedProducts = [...products];
    let size = this.props.state.size;
    if (order === "highest") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    }
    if (order === "lowest") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }
    if(size.length > 0){
      sortedProducts = sortedProducts.filter((p) => {
        for (const sizes of size) {
          if (p.availableSizes.includes(sizes)){
            return true;
          }
        }
      })
    }
    return sortedProducts;
  };

  addItemToCart = (id) => {
    this.props.dispatch({
      type:"addItemToCart",
      id
    })
  }

  render() {
    let { selectedOrder } = this.state;
    let products = this.handleOrderProducts(selectedOrder, this.props.state.products);
    

    return (
      <div>
        <div className="products-filter">
          <p>
            {`${products.length} Product${
              products.length > 1 ? "s" : ""
            } found.`}{" "}
          </p>
          <OrderBy
            selectedOrder={selectedOrder}
            handleOrderBy={this.handleOrderBy}
          />
        </div>
        <div className="flex wrap">
          {products.map((product) => (
            <Product key={product.id} {...product}  addItemToCart={this.addItemToCart}/>
          ))}
        </div>
      </div>
    );
  }
}


function Product(props) {
  return (
    <div className="product-item">
      <div className="product-label">Free Shipping</div>
      <img
        className="product-item-img"
        src={`/static/products/${props.sku}_1.jpg`}
        alt={props.title}
      />
      <div className="product-item-details">
        <p className="product-item-title">{props.title}</p>
        <div className="line"></div>
        <h3 className="product-item-price">
          {props.currencyFormat + props.price}
        </h3>
        <button onClick={() => props.addItemToCart(props.id)}>Add To Cart</button>
      </div>
    </div>
  );
}

function mapStateToProps(state){
  return {
    state,
  }
} 

export default connect(mapStateToProps)(Products);