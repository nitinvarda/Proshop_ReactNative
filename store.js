import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productReducer, productDetailsReducer, productTopRatedReducer } from './redux/reducers/productReducer'
import { cartReducers } from './redux/reducers/cartReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './redux/reducers/userReducer'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer
} from './redux/reducers/orderReducer';

import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

export const configureStore = () => {

    const reducer = combineReducers({
        productList: productReducer,
        productDetails: productDetailsReducer,
        productTopRated: productTopRatedReducer,
        cart: cartReducers,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderDeliver: orderDeliverReducer,
        orderListMy: orderListMyReducer,
        orderList: orderListReducer
    })







    const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)))
    return store



}

