
import axios from 'axios';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    UPDATE_CART_ITEMS
} from '../constants/cartConstants';
import { baseUrl } from '../../shared/baseUrl'

import * as SecureStore from 'expo-secure-store'




export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(baseUrl + `/api/products/${id}`)

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        await SecureStore.setItemAsync('cartItems', JSON.stringify(getState().cart.cartItems))
        // await AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }
    catch (err) {
        console.log(err)
    }
}


export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id })
    await SecureStore.setItemAsync('cartItems', JSON.stringify(getState().cart.cartItems))
    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => async (dispatch) => {

    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })

    await SecureStore.setItemAsync('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {

    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })

    await SecureStore.setItemAsync('paymentMethod', data)
}