import axios from "axios";
import {NotificationManager} from 'react-notifications';

const AuthActionType = {
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAIL: "LOGOUT_FAIL",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
};

const registerAuthAction = (userState, navigate) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("/auth/register", userState);
            const { data } = res;
            dispatch({ type: AuthActionType.REGISTER_SUCCESS, payload: data });
            NotificationManager.success('Please, login your account using your username and password.', 'Registraion successful');
            navigate("/login");
        } catch (error) {
            console.log(error);
            dispatch({ type: AuthActionType.REGISTER_FAIL, payload: {} });
        }
    };
};

const loginAuthAction = (loginState, navigate) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("/auth/login", loginState);
            const { data } = res;
            dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: data });
            NotificationManager.success('Your are login to our system.', 'Success');
            navigate("/dashboard/"+data.user.user_type.type.toLowerCase());
        } catch (error) {
            console.log(error);
            NotificationManager.error('Please, check your username or password.', 'Incorrect');
            dispatch({ type: AuthActionType.LOGIN_FAIL, payload: {} });
        }
    };
};

const logoutAuthAction = (navigate) => {
    return async (dispatch) => {
        try {
            const res = await axios.get("/auth/logout");
            const { data } = res;
            dispatch({ type: AuthActionType.LOGOUT_SUCCESS, payload: data });
            NotificationManager.success(data);
            navigate("/");
        } catch (error) {
            console.log(error);
            dispatch({ type: AuthActionType.LOGOUT_FAIL, payload: {} });
        }
    };
};

export { AuthActionType, registerAuthAction, loginAuthAction, logoutAuthAction };