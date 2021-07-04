import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import signupAction, { loadingToggleAction } from '../../../store/actions/AuthActions';
import Loader from '../../Loader/Loader';

const SignUp = (props) => {

    const [email, setEMail] = useState('');
    let errorsObj = { email: '', password: ''};
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        const errorObj = {...errorsObj}
        if(email === '')
        {
            errorObj.email='Email is Required';
            error = true;
        }

        if(password === '')
        {
            errorObj.password='Password is Required';
            error = true;
        }

        setErrors(errorObj);

        if (error) return;
        dispatch(loadingToggleAction(true))
        dispatch(signupAction(email, password, props.history))
    }

    return (
        <div className="flex justify-center my-5">
            {props.showLoading && <Loader />}
            <div className="w-1/4 shadow p-3 border border-gray-300">
                <h3 className="font-bold text-2xl">Register</h3>

                {props.errorMessage && (
                    <div className="my-2 p-1 border bg-red-300 text-sm">   
                        {props.errorMessage}    
                    </div>
                )}

                {props.successMessage && (
                    <div className="my-2 p-1 border bg-green-300 text-sm">   
                        {props.successMessage}    
                    </div>
                )}

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mt-3">
                        <label htmlFor="Email">Email</label>
                        <div>
                            <input type="text" value={email} onChange={(e) => setEMail(e.target.value)} className="w-1/2 rounded-md border border-gray-600 shadow p-1" />
                        </div>
                        {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="Password">Password</label>
                        <div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-1/2 rounded-md border border-gray-600 shadow p-1" />
                        </div>
                        {errors.password && <div>{errors.password}</div>}</div>
                    <div className="mt-3">
                        <button type="submit" className="bg-green-700 text-white rounded-full px-3 py-1">Sumbit</button>
                    </div>
                </form>                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    }
}

export default connect(mapStateToProps)(SignUp);
