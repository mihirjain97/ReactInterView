import axios from "axios";
import { logoutAction } from "../store/actions/AuthActions";

export function signUp(email, password)
{
    const postData = {
        email,
        password,
        returnSecureToken: true
    }
    //axios call
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAeouyKIib8C6zCit7cj2Xds9Gb4uxedI`,
        postData,
    );
}

export function logIn(config)
{
    //axios call
    return axios(config);
}

export function formatError(errorRes) {
    switch (errorRes.error.message) {
        case 'EMAIL_EXISTS':
            return 'Email already exists';
        case 'EMAIL_NOT_FOUND':
            return 'Email not found';
        case 'INVALID_PASSWORD':
            return 'Wrong Password';
        case 'USER_DISABLED':
            return 'User is disabled';
                    
        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails))
}

export function runLogoutTimer(dispatch, timer) {
    setTimeout(() => {
        dispatch(logoutAction())
    }, 100000000000000);
}

