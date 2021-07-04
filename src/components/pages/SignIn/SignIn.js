import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { loadingToggleAction, loginAction } from '../../../store/actions/AuthActions';
import Loader from '../../Loader/Loader';
import axios from "axios";
import VerifyOtp from './VerifyOtp';

const SignIn = (props) => {

    const [mobile, setMobile] = useState('');
    let errorsObj = { mobile: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [errorLog, setErrorLog] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorObj = {...errorsObj}
        var config = {
            method: 'post',
            url: `https://stage-services.truemeds.in/CustomerService/sendOtp?mobileNo=${mobile}`,
            headers: { 
                'transactionId': 'react_interview'
            }
        };
        if(mobile.length === 0)
        {
            errorObj.mobile = 'Mobile Number is Required';
            setErrorLog(true)
        }else{
            axios(config)
            .then((res) => {
                if(res.status === 200)
                {
                    setShowOTPInput(true)
                    setErrorLog(false)
                }
            })
        }
        setErrors(errorObj)

        if (errorLog) return;
    }

    return (
        <>
        {!showOTPInput ? 
            (<div className="flex justify-center my-5">
                {props.showLoading && <Loader />}
                <div className="w-1/4 shadow p-3 border border-gray-300">
                    <h3 className="font-bold text-2xl">Login</h3>
                    <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mt-3">
                                <label htmlFor="Mobile">Enter Mobile Number For OTP:</label>
                                <div className="my-2">
                                    <input type="tel" minLength={2} maxLength={10} pattern="^[6-9]\d{9}$" placeholder="Enter 10 Digits Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-3/4 rounded-md border border-gray-600 shadow p-1" />
                                </div>
                                {errorLog && <div className="text-red-600">* {errors.mobile}</div>}
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="bg-green-700 text-white rounded-full px-3 py-1">Sumbit</button>
                            </div> 
                        </form>                
                </div>
            </div>)
            :
            <VerifyOtp mobile={mobile}/>
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    }
}


export default connect(mapStateToProps)(SignIn);
