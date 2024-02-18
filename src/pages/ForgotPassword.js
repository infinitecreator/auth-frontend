import { useEffect, useState } from "react";
import CreateAccount from "../components/CreateAccount";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import GrayText from "../components/common/GrayText";
import LongText from "../components/common/LongText";
import ForgotPasswordForm from "../components/forgot-password/ForgotPasswordForm";
import "./css/ForgotPassword.css" ;
import useNavigation from "../hooks/use-navigation";

const forgotDesc = "Please enter your email address associated with your account, we’ll send you an OTP to reset your password."
export default function ForgotPassword(){
    const [showComponent, setShowComponent] = useState(false) ;
    const {navigate} = useNavigation() ;

    useEffect(()=>{

        
        fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/currentuser`,{ credentials: 'include' })
        .then((res) => {
            if (res.status === 200) {
                setShowComponent(false) ;
                navigate('/homepage')
            } else {
                setShowComponent(true) ;
            }
        });
        
    }) ; 

    
    return (
        <>
            { showComponent && 
                <div className="main-forgot-password">
                    <Logo text = "AuthHub"/>
                    <GrayText text = "Forgot Password"/>
                    <LongText text = {forgotDesc}/>
                    <ForgotPasswordForm/>
                    <CreateAccount textLeft = "" textRight="Return to sign in" label = "return to sign in" to = "/login" />
                    <Footer/>
                </div>
            }
        </>
    )
}