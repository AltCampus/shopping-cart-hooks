import { createStore } from 'redux';
import  products  from "../store/data.json";

let inclualState = {
    products: products.products,
    cart: [],
    sizeProducts: products.products
}


function shoppingReducer( state=inclualState, actions){
    switch (actions.type) {
        case "changeSize":
            let s = state.products.filter((product) => {return product.availableSizes.includes(actions.size)});
            [...state.products] = s;
            return {...state};
        case "addItemToCart":
            state.cart.push(state.products.find(product => product.id === actions.id))
            return {...state};
        case "removeItemFromCart":
            state.cart.pop(state.products.find(product => product.id === actions.id))
            return {...state};
        default:
            return state;
    }
}

let store = createStore(shoppingReducer);


export default store;

