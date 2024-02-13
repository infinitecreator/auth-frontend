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
    const [otp, setOTP] = useState('') ;
    const {navigate} = useNavigation() ;

    const otpText = `An otp has ${optCount > 1 ? 'again' : ''} been sent to your provided email if it's active. Please check the email and enter the otp.`
    const buttonText = `${optCount>=1 ? 'Resend' : 'Send'} OTP` ;

    // const { doRequest, errors } = useRequest({
    //     url: 'http://localhost:4000/api/users/forgotpassword',
    //     method: 'post',
    //     body: {
    //         email: eemail,
    //     },  
    //     // onSuccess: () => {
    //     //     // console.log('success') ;
                
    //     // }
    // }) ;
    const [verifyOtp, errOtp] = useRequest({
        url: 'http://localhost:4000/api/users/verifyotp',
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
        url: 'http://localhost:4000/api/users/forgotpassword',
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
                    await doRequest() ;
                    break ;
                case 'submit':
                    await verifyOtp();
                    break  ;
                default:
                    console.log('none') ;
            }
        } catch(err){
            console.log(err) ;
        }
        
    }


    return (
        <form onSubmit = {submitForm} className="main-forgot-password-form">
            <Input onChange = {setEEmail} disabled = {!visButton ? true : false} inputText="Email"/>
            { optCount > 0 && <Input onChange = {setOTP} not_required inputText="Please enter your OTP"/> }
            <div>
                {(optCount > 0 && !visButton) && otpText}

            </div>
            {errors}
            {errOtp}
            <div>
                {!visButton && `resend otp in ${minutes}:${seconds}`}
            </div>
            {optCount > 0 && <button value = "submit" name = 'submit' className="submit-button">Submit OTP </button> }
            
            {visButton && <button value = "resend" name = 'resend' className="main-forgot-password-form-button">{buttonText}</button>}
        </form>
    )

}