import axios from "axios";
import { AuthActionType } from "../actions/AuthAction";

const authState = {
    isLoggedin: false,
    user: {
        jwt: null,
        expires_at: null,
        user_id: null,
        full_name: null,
        adress: null,
        city: null,
        district_id: null,
        district: null,
        province_id: null,
        province: null,
        phone_no: null,
        email: null,
        username: null,
        password: null,
        type_id: null,
        user_type: {
            type_id: null,
            type: null
        },
        created_at: null,
        update_at: null
    },
    profile_url: null,
};

const getAuthState = () => {
    const auth = localStorage.getItem("auth");
    try {
        const authobj = JSON.parse(auth);
        const {expires_at, jwt} = authobj.user;
        if(new Date(expires_at) > new Date()){
            axios.defaults.headers.common["Content-Type"] = "application/json";
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            return authobj;
        }
        return authState;
    } catch (error) {
        return authState;
    }
};

const newAuth  = getAuthState();

const authreducer = (state = newAuth, action) => {
    switch (action.type) {
        case AuthActionType.REGISTER_SUCCESS:
            const newAuthState = {
                isLoggedin: false,
                user: action.payload,
            };
            localStorage.setItem("auth", JSON.stringify(newAuthState));
            return newAuthState;
        case AuthActionType.REGISTER_FAIL:
            return state;
        case AuthActionType.LOGIN_SUCCESS:
            const loginAuthState = {
                isLoggedin: (action.payload.jwt != null) ? true : false,
                user: action.payload,
                profile_url: "/dashboard/"+action.payload.user.user_type.type.toLowerCase(),
            };
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.jwt}`;
            localStorage.setItem("auth", JSON.stringify(loginAuthState));
            return loginAuthState;
        case AuthActionType.LOGIN_FAIL:
            return authState;
        case AuthActionType.LOGOUT_SUCCESS:
            localStorage.removeItem("auth");
            return authState;
        case AuthActionType.LOGOUT_FAIL:
            localStorage.removeItem("auth");
            return authState;
        default:
            return state;
    }
};

export default authreducer;