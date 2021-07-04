import { formatError, logIn, runLogoutTimer, saveTokenInLocalStorage, signUp } from "../../services/authService"

export const SIGNUP_CONFIRMED_ACTION = '[Sign Up Action] Confirmed signup';
export const SIGNUP_FAILED_ACTION = '[Sign Up Action] Failed signup';
export const LOGIN_CONFIRMED_ACTION = '[Login Action] Confirmed Login Action';
export const LOGIN_FAILED_ACTION = '[Login Action] Failed Login Action';
export const LOADING_TOGGLE_ACTION = '[Sign Up Action] Loading toggle Action';
export const LOGOUT_ACTION = '[Logout Action] Logout Action';

export default function signupAction(email, password, history)
{
    return (dispatch) => {
        signUp(email, password)
        .then(response => {
            dispatch(loadingToggleAction(false))
            runLogoutTimer(dispatch, response.data.timer * 1000);
            dispatch(confirmedSignUpAction(response.data));
            history.push('/')
        }).catch((error)=> {
            dispatch(loadingToggleAction(false))
            const errorMessage = formatError(error.response.data);
            dispatch(signUpFailedAction(errorMessage));
        })
    }
}

export function logoutAction(history) {
    localStorage.removeItem('userDetails')
    history.push('/sign-in')
    return {
        type: LOGOUT_ACTION,
    }
}

export function loginAction(config, history)
{
    return (dispatch) => {
        logIn(config)
        .then(response => {
            console.log(response)
            saveTokenInLocalStorage(response.data)
            // runLogoutTimer(dispatch, response.data.timer * 1000);
            dispatch(loadingToggleAction(false))
            dispatch(confirmedLoginAction(response.data.Response));
            history.push('/')
        }).catch((error)=> {
            console.log(error)
            // dispatch(loadingToggleAction(false))
            // const errorMessage = formatError(error.response.data);
            // dispatch(loginFailedAction(errorMessage));
        })
    }
}

export function  confirmedLoginAction(payload) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload,
    }
}

export function  loginFailedAction(message) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: message
    }
}
export function  confirmedSignUpAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    }
}

export function  signUpFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message
    }
}

export function  loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status
    }
}