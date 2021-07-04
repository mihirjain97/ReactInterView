import React from 'react'
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadingToggleAction, loginAction } from '../../../store/actions/AuthActions';
import Loader from '../../Loader/Loader';


const VerifyOtp = (props) => {
    const [otpValue, setOtpValue] = useState('');
    let errorsObj = { otpValue: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [errorLog, setErrorLog] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const errorObj = {...errorsObj}
        var config = {
            method: 'post',
            url: `https://stage-services.truemeds.in/CustomerService/verifyOtp?mobileNo=${props.mobile}&otp=${otpValue}&de
            viceKey=abcd&isIos=false&source=react_interview`,
            headers: { 
                'transactionId': 'react_interview'
            }
        };
        if(otpValue.length === 0)
        {
            errorObj.otpValue = 'OTP is Required';
            setErrorLog(true)
        }
        setErrors(errorObj)

        if(errorLog) return;

        dispatch(loginAction(config, props.history))
        dispatch(loadingToggleAction(true))
    }
    return (
        <div className="flex justify-center my-5">
            {props.showLoading && <Loader />}
            <div className="w-1/4 shadow p-3 border border-gray-300">
                <h3 className="font-500 text-2xl">OTP Verification</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mt-3">
                        <label htmlFor="otp">Enter OTP: </label>
                        <div className="my-3">
                            <input type="tel" value={otpValue} maxLength={4} onChange={(e) => setOtpValue(e.target.value)} className="w-1/2 rounded-md border border-gray-600 shadow p-1" />
                        </div>
                        {errorLog && <div className="text-red-600">{errors.otpValue}</div>}
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="bg-green-700 text-white rounded-full px-3 py-1">Verify</button>
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

export default withRouter(connect(mapStateToProps)(VerifyOtp))
