import { createStore } from 'redux';
import  products  from "../store/data.json";

let initialState = {
    products: products.products,
    cart: [],
    sizeProducts:products.products,
    size:[]
};


function shoppingReducer( state = initialState, actions) {

    let  isPresent = state.cart.findIndex(product => product.id === actions.id);
    let product = state.products.find(product => product.id === actions.id);

    switch (actions.type) {
        case "addSize": {
            let isSize = state.size.findIndex(ele => ele === actions.size);
            if(isSize >= 0){
                state.size.filter(ele => {
                    if(ele === actions.size){
                        state.size.splice(actions.size,1);
                        return state.size;
                    }
                })
            } else {
                state.size.push(actions.size);
            }
            return {...state};
        }
        case "add": {
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
            return {...state};
        }
            

        case "delete": {
            state.cart.filter((product,index) =>  {
                if(product.id === actions.id){
                    state.cart.splice(index,1);
                    return state.cart;
                }
            })
            return {...state};
        }
        case "increment": {
            if(isPresent >= 0){
                state.cart.map((element) => {
                    if(element.id === actions.id){
                        element.quantity = element.quantity + 1;
                        return element;
                    }
                    return element;
                })
            }
            return {...state};
        }
        case "decrement": {
            if(isPresent >= 0){
                state.cart.map((element) => {
                    if(element.id === actions.id){
                        element.quantity = element.quantity - 1;
                        return element;
                    }
                    return element;
                })
            }
            return {...state};
        }
        default: {
            return state;
        }
    }
}

let store = createStore(shoppingReducer);


export default store;

