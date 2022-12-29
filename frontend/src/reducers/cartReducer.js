import {CART_ADD_ITEM, CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD,CART_CLEAR_ITEMS
} from '../constants/constants'

export const cartReducer = (state = { cartItems : [], shippingAddress: { } }, action)=> {
    const {type, payload } = action

    switch(type){
        case CART_ADD_ITEM:
            const existItem = state.cartItems.find(x => x.product === payload.product)

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x=> x.product === existItem.product ? payload : x)
                }

            } else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
                }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload
                }
        case CART_CLEAR_ITEMS:
            return {
                cartItems: []

            }
            default: 
            return state
    }

}