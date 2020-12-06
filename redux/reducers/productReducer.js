import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
} from '../constants/productConstans'



const initialState = {
    loading: false,
    products: [],
    error: ''

}

export const productReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: payload.products,
                pages: payload.pages,
                page: payload.page
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }

}

const initState = {
    product: null,
    loading: false,
    error: ''
}

export const productDetailsReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }

}

export const productTopRatedReducer = (state = { products: [] }, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_TOP_SUCCESS:
            return {
                loading: false,
                products: payload,

            }
        case PRODUCT_TOP_FAIL:
            return {
                loading: false,
                error: payload
            }

        default:
            return state
    }

}