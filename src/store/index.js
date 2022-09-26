import { createStore } from 'redux';
import  products  from "../store/data.json";

let inclualState = {
    products: products.products,
    cart: [],
    sizeProducts:products.products,
    size:[]
}


function shoppingReducer( state=inclualState, actions){
    switch (actions.type) {
        case "addItemToCart":
            let  isPresent = state.cart.findIndex(product => product.id === actions.id);
            let product = state.products.find(product => product.id === actions.id)
            if(isPresent >= 0){
                state.cart.map((element) => {
                    if(element.id === actions.id){
                        element.quantity = element.quantity + 1;
                        return element;
                    }
                    return element;
                })

            } else {
                state.cart.push({...product,quantity:1});
            }
            return {...state}
        case "removeItemFromCart":
            state.cart.pop(state.products.find(product => product.id === actions.id))
            return {...state};
        default:
            return state;
    }
}

let store = createStore(shoppingReducer);


export default store;

