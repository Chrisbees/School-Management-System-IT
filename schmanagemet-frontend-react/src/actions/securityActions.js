import axios from "axios";
import setJWTTOken from "../securityUtils/setJWTToken";
import * as types from './types';
import jwt_decode from "jwt-decode";


export const createNewUser = (newUser, navigate) => async dispatch => {
    try {
        await axios.post("http://localhost:8082/api/users/register", newUser);
        navigate("/login");
        dispatch({
            type: types.GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: types.GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const login = (LoginRequest) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8082/api/users/login", LoginRequest);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setJWTTOken(token);
        const decoded = jwt_decode(token);
        // navigate("/dashboard")
        dispatch({
            type: types.SET_CURRENT_USER,
            payload: decoded
        })
    } catch (error) {
        dispatch({
            type: types.GET_ERRORS,
            payload: error.response.data
        })
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken")
    setJWTTOken(false);
    dispatch({
        type: types.SET_CURRENT_USER,
        payload: {}
    })
}