import { useEffect, useState } from "react";
import Input from "../common/Input";
import "./ForgotPasswordForm.css"; 
import useRequest from "../../hooks/use-request";
import useNavigation from "../../hooks/use-navigation";


export default function ForgotPasswordForm() {
    
    const [optCount, setOtpCount]  = useState(0) ;
    const {initialMinute = 0,initialSeconds = 0} = {initialMinute:0, initialSeconds: 59};
    const [minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [visButton, setVisButton] = useState(true) ;
    const [eemail, setEEmail] = useState('') ;
    const [isGreyedOut, setIsGreyedOut] = useState(false) ;
    const [isGreyedOut2, setIsGreyedOut2] = useState(false) ;
    const [otp, setOTP] = useState('') ;
    const {navigate} = useNavigation() ;

    const otpText = `An otp has ${optCount > 1 ? 'again' : ''} been sent to your provided email if it's active. Please check the email and enter the otp.`
    const buttonText = `${optCount>=1 ? 'Resend' : 'Send'} OTP` ;

    // const { doRequest, errors } = useRequest({
    //     url: '${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}{process.env.PROTOCOL}://${process.env.BACKEND_URL}/api/users/forgotpassword',
    //     method: 'post',
    //     body: {
    //         email: eemail,
    //     },  
    //     // onSuccess: () => {
    //     //     // console.log('success') ;
                
    //     // }
    // }) ;
    const [verifyOtp, errOtp] = useRequest({
        url: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/verifyotp`,
        method: 'post',
        body: {
            email: eemail,
            otp: otp,
            // password: 'password',
        },  
        onSuccess: () => {
            navigate('/verify-otp');
        }

    })

    const [doRequest, errors ] = useRequest({
        url: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/forgotpassword`,
        method: 'post',
        body: {
            email: eemail,
            // password: 'password',
        },  
        onSuccess: () => {
            setOtpCount(e => e+1) ;
            setVisButton(false) ;
            setMinutes(initialMinute) ;
            setSeconds(initialSeconds) ;
        }

}) ;


    useEffect(()=>{
        const myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                    setVisButton(true) ;
                    setMinutes(initialMinute) ;
                    setSeconds(initialSeconds) ;
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000) ;

        return ()=> {
            clearInterval(myInterval);
          };


    }) ;

    



    const submitForm = async (event) =>{
        event.preventDefault() ;

        try{
            
            

            const submitType = event.nativeEvent.submitter.name ;
            

            switch (submitType){
                case 'resend':
                    setIsGreyedOut2(true) ;
                    await doRequest() ;
                    setIsGreyedOut2(false) ;
                    
                    break ;
                case 'submit':
                    setIsGreyedOut(true) ; 
                    await verifyOtp();
                    setIsGreyedOut(false) ;
                    
                    
                    break  ;
                default:
                    console.log('none') ;
            }
        } catch(err){
            setIsGreyedOut(false) ;
            setIsGreyedOut2(false) ;
            console.log(err) ;
        }
        
    }


    return (
        <form onSubmit = {submitForm} className="main-forgot-password-form">
            <Input onChange = {setEEmail} disabled = {!visButton ? true : false} inputText="Email"/>
            { optCount > 0 && <Input onChange = {setOTP} not_required inputText="Please enter your OTP"/> }
            <div className="otp-text">
                {(optCount > 0 && !visButton) && otpText}

            </div>
            {errors}
            {errOtp}
            <div className="resend-otp">
                {!visButton && `Resend OTP in ${minutes}:${seconds}`}
            </div>
            {optCount > 0 && <button disabled = {isGreyedOut} style = {isGreyedOut ? { color: 'gray' } : {color:'white'}} value = "submit" name = 'submit' className="submit-button">{isGreyedOut ? "Submitting OTP..." : "Submit OTP"} </button> }
            
            {visButton && <button disabled = {isGreyedOut2} style = {isGreyedOut2 ? { color: 'gray' } : {color:'white'}} value = "resend" name = 'resend' className="main-forgot-password-form-button">{ isGreyedOut2 ? (optCount===0 ? "Sending OTP..." : "Re-sending OTP...") : buttonText }</button>}
        </form>
    )

}