
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_LOGIN_FAIL_RESET
} from '../constants/userConstans'
import * as SecureStore from 'expo-secure-store'

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    userInfo: [],
    error: ''
}
const saveUser = async (payload) => {
    await SecureStore.setItemAsync('user', JSON.stringify(payload))
}

const deleteUser = async () => {
    await SecureStore.deleteItemAsync('user')
    await SecureStore.deleteItemAsync('shippingAddress')
    await SecureStore.deleteItemAsync('paymentMethod')
}


export const userLoginReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOGIN_REQUEST:
            return { isLoading: true }
        case USER_LOGIN_SUCCESS:
            saveUser(payload)
            return {
                isLoading: false,
                isAuthenticated: true,
                userInfo: payload
            }
        case USER_LOGIN_FAIL:
            return {
                isLoading: false,
                error: payload
            }
        case USER_LOGOUT:
            deleteUser()
            return {
                isLoading: false,
                isAuthenticated: false,
                userInfo: [],
                error: ''
            }
        case USER_LOGIN_FAIL_RESET:
            return {
                ...state,
                error: ''
            }
        default:
            return state
    }

}

const registrationState = {
    loading: true,
    registration: false,
    userInfo: {},
    error: ''
}

export const userRegisterReducer = (state = registrationState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            saveUser(payload)
            return {
                loading: false,
                registration: true,
                userInfo: payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }

}

export const userDetailsReducer = (state = { loading: false, user: '', error: '' }, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: payload
            }
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            }
        case USER_DETAILS_RESET:
            return {
                user: {}
            }

        default:
            return state
    }

}

export const userUpdateProfileReducer = (state = { loading: false, user: '', error: '' }, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: payload
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: payload
            }

        default:
            return state
    }

}


export const userListReducer = (state = { users: [] }, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: payload,

            }
        case USER_LIST_FAIL:
            return {
                loading: false,
                error: payload
            }
        case USER_LIST_RESET:
            return {
                users: []
            }
        default:
            return state
    }

}

export const userDeleteReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,

            }
        case USER_DELETE_FAIL:
            return {
                loading: false,
                error: payload
            }

        default:
            return state
    }

}


export const userUpdateReducer = (state = { user: {} }, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,

            }
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: payload
            }
        case USER_UPDATE_RESET:
            return {
                user: {}
            }
        default:
            return state
    }

}