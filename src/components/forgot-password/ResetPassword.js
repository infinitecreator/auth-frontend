import Input from "../common/Input";
import "../forgot-password/ResetPassword.css" ;
import useRequest from "../../hooks/use-request";
import { useState } from "react";
import NotMatchedErr from "../Errors/NotMatchedErr";
import LengthNotMatchedErr from "../Errors/LenghtNotMatchedErr";
import NavigationContext from "../../context/navigation";
import useNavigation from "../../hooks/use-navigation";
import Link from "../Link";
 const ResetPassword = () =>{
    const {navigate} = useNavigation() ;
    const [updatedPassword, setUpdatedPassword] = useState('') ;
    const [reUpdatedPassword, setReUpdatedPassword] = useState('') ;
    const [notMatchedError, setNotMatchedError] = useState(false) ;
    const [lengthError, setLengthError] = useState(false) ;
    const [isGreyedOut, setIsGreyedOut] = useState(false) ;
    const[flagSuccessUpdate, setFlagSuccessUpdate] = useState(false) ;
    const successMessage = "Password updated successfully, taking you to the appropriate page... " ;

    const [updatePasswordRequest, errors] = useRequest({
        url: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/update`,
        method: 'patch',
        body:{
            password: updatedPassword,
        },
        onSuccess: () =>{
            setFlagSuccessUpdate(true) ;
            setTimeout(()=>{
                navigate('/login') ;
            },2000) ;

        }

    }) ;

    const submitHandler = async (event)=>{
        event.preventDefault() ;
        try{
            setIsGreyedOut(true) ;
            setNotMatchedError(false) ;
            setLengthError(false) ;

        
            const newPasss = updatedPassword.trim() ;
            const reNewPass = reUpdatedPassword.trim() ;
            console.log(newPasss, ' ', reNewPass, 'pass') ;
            if(newPasss.length <8 || newPasss.length >30) setLengthError(true) ;
            if(newPasss === reNewPass) {
                

                const data = await updatePasswordRequest() ;
                setIsGreyedOut(false) ;
                console.log(data,' data ') ;



            }

            else setNotMatchedError(true) ;

        } catch(err) {
            setIsGreyedOut(false) ;
            console.log(err) ;
        }


    }

    return (
        <form onSubmit = {submitHandler} className="main-reset-password">
            <Input type = 'password' onChange = {setUpdatedPassword} name = "newPass" inputText="Enter New Password"/>
            <Input type = 'password' onChange = {setReUpdatedPassword} name = "reNewPass" inputText="Re-enter Password" />
            {flagSuccessUpdate && successMessage}
            {lengthError && <LengthNotMatchedErr/>}
            {notMatchedError && <NotMatchedErr/>}
            {errors}
            <button disabled = {isGreyedOut} style = {isGreyedOut ? { color: 'gray' } : {color:'white'}} className="update-password-button">{isGreyedOut ? "Updating Password..." : "Update Password"}</button>
            <Link routes="return" key = "Return to Sign in" to = "/login">Return to Sign in</Link>
        </form>
    )

}

export default ResetPassword ;