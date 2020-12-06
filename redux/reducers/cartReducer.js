
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    UPDATE_CART_ITEMS,
    FETCH_CART_ITEMS,
} from '../constants/cartConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';




const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: null
}

export const cartReducers = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case CART_ADD_ITEM:
            const item = payload
            const existItem = state.cartItems.find(x => x.product === item.product)


            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]

                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== payload)
            }
        case FETCH_CART_ITEMS: {
            return {
                ...state,
                cartItems: payload
            }
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
        default:
            return state
    }
}