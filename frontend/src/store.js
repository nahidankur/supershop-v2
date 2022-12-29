import {createStore,combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { productList, productDetails,productDelete,productUpdate,productCreateReview,
    
    productCreate,productTopRated} from './reducers/productReducer'
import { cartReducer} from './reducers/cartReducer'
import { userLogin, userRegister, userDetails, userUpdateProfile, userDetailsByAdmin, userUpdate, userDelete, userList} from './reducers/userReducers'
import { orderCreate, orderDetails,orderDeliver, orderPay,orderList, orderMyList} from './reducers/orderReducer'

const reducer = combineReducers({
    productList, productDetails,
    cart: cartReducer,
    userLogin, userRegister, userDetails,
    userUpdateProfile, orderCreate, orderDetails, orderPay,
    orderMyList, userList, userDelete, userUpdate, userDetailsByAdmin,productDelete,
    productCreate, productUpdate, orderList, orderDeliver,productCreateReview,
    productTopRated
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(
    localStorage.getItem('cartItems')
) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
    localStorage.getItem('userInfo')
) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(
    localStorage.getItem('shippingAddress')
) : {}
const paymentAddressFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(
    localStorage.getItem('paymentMethod')
) : null


const initialState = { 
    cart: { cartItems: cartItemsFromStorage,
            shippingAddress: shippingAddressFromStorage,
            paymentMethod: paymentAddressFromStorage
        },
    userLogin: { userInfo: userInfoFromStorage }
 }
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store   