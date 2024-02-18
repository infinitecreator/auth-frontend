import GrayText from "../components/common/GrayText";
import LongText from "../components/common/LongText";
// import CreateAccount from "../components/CreateAccount";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import "./css/VerifyOTP.css" ;
import ResetPassword from "../components/forgot-password/ResetPassword" ;
import { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";
import Redirect from "../components/common/Redirect";

const forgotDesc = "Please create your new password below";
export default function VerifyOTP(){
    const [showComponent, setShowComponent] = useState(false) ;
    // const [validaterequest, errors] = useRequest({
    //     url: '${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}{process.env.PROTOCOL}://${process.env.BACKEND_URL}/api/users/currentuser',
    //     method:'get',
    //     body:{},
    //     onSuccess: ()=>{
    //         setShowComponent(true) ;
    //     }
        

    // }) ;
    useEffect(()=>{
        
        // const res = async () =>{
        //     await validaterequest() ;
        // }
        // console.log(res) ;
        fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/currentotpuser`,{ credentials: 'include'})
        .then((res) => {
            if (res.status === 200) {
                setShowComponent(true)
            } else {
                setShowComponent(false)
            }
        });
        
    }) ;
    
    return (
        <>
        {showComponent && 
            <div className="main-verify-otp">
                <Logo text = "AuthHub"/>
                <GrayText text = "Reset your password"/>
                <LongText text = {forgotDesc}/>
                <ResetPassword/>
                
                {/* <CreateAccount textLeft = "" textRight="Return to sign in" label = "return to sign in" to = "/login" /> */}
                <Footer/>
            </div>
        }
        {!showComponent && <Redirect text = "Not Allowed"/>}
        </>
    )
}