import Input from "../components/common/Input" ;
import "./css/LoginDetails.css" ;
import Checkbox from "./common/Checkbox";
import Link from "./Link";
import useRequest from "../hooks/use-request";
import { useState, useEffect } from "react";
import useNavigation from "../hooks/use-navigation";

export default function LoginDetails({fields, buttonText}){
    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('') ;
    const { navigate } = useNavigation() ;
    

    
    const [doRequest, errors ] = useRequest({
        url: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/signin`,
        method: 'post',
        body: {
            email: email,
            password: password
        },  
        onSuccess: () => {
            navigate('/homepage') ;
        }
    });


    const handleSubmit= async (event) =>{
        event.preventDefault();

        
        try {
            
        setEmail( event.target.email.value.trim()) ;
        setPassword(event.target.password.value.trim()) ;
        
        // console.log('wow') ;
        await doRequest() ;

        }catch(err){
            console.log(err) ;
        }
        
    }


    
    
    return (
        
            <form onSubmit = {handleSubmit} className="main-login-details">
            { 
                fields.map((field)=>{
                return <Input onChange={field==='Email' ? setEmail: setPassword} inputText = {field} />})
            }
            <div className="main-login-details-checkbox-container">
                <Checkbox checkboxText="Stay logged in"/>
            <Link routes = "Forgot Password" key = "Forgot Password" to = "/forgot-password">Forgot Password</Link>
            </div>
            {errors}

            <button className="sign-in-button">Sign In</button>
            
            </form>
    )
}