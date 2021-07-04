import { LOADING_TOGGLE_ACTION, LOGIN_CONFIRMED_ACTION, LOGIN_FAILED_ACTION, LOGOUT_ACTION, SIGNUP_CONFIRMED_ACTION, SIGNUP_FAILED_ACTION } from "../actions/AuthActions";

const initialState = {
    auth: {
        access_token: '',
        scope: '',
        token_type: '',
        expiresIn: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
    logoutMessage: '',
};

export default function AuthReducers(state = initialState, action)
{
    if(action.type === SIGNUP_CONFIRMED_ACTION)
    {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'User Registered Successfully'
        };
    }
    if(action.type === SIGNUP_FAILED_ACTION)
    {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
        };
    }
    if(action.type === LOADING_TOGGLE_ACTION)
    {
        return {
            ...state,
            showLoading: action.payload,
        };
    }
    if(action.type === LOGIN_CONFIRMED_ACTION)
    {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Login Successful'
        };
    }
    if(action.type === LOGIN_FAILED_ACTION)
    {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
        };
    }

    if(action.type === LOGOUT_ACTION)
    {
        return {
            ...state,
            auth: {
                email: '',
                idToken: '',
                localId: '',
                expiresIn: '',
                refreshToken: '',
            },
            errorMessage: '',
            successMessage: ''
        };
    }
    return state;
}