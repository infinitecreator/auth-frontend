import Input from "../common/Input";
import "./CreateAccountForm.css" ;
import useRequest from "../../hooks/use-request";
import { useState } from "react";
import useNavigation from "../../hooks/use-navigation";
export default function CreateAccountForm(){
    const { navigate } = useNavigation() ;
    const successSignupText = "Successfully Created Account. Please verify your account before loggin in. redirecting to login page" ;


    const [first_name, setFirstName] = useState('') ;
    const [last_name, setLastName] = useState('') ;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('') ;
    const [mobile, setMobile] = useState('') ;
    const [successSignup, setSuccessSignup] = useState(false) ;
    const [ doRequest, errors ] = useRequest({
        url: 'http://localhost:4000/api/users/signup',
        method: 'post',
        body: {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            mobile: mobile
        },  
        onSuccess: () => {
            setSuccessSignup(true) ;
            setTimeout(()=>{
                navigate('/login') ; 

        },5000);
    }
    }) ;
    

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            setFirstName(event.target['first name'].value.trim());
            setLastName(event.target['last name'].value.trim())
            setEmail(event.target['email'].value.trim()) ;
            setPassword(event.target['password'].value.trim()) ;
            setMobile(event.target['phone number'].value.trim()) ;
            // console.log(event.target.cc_dropdown.value) ;
            await doRequest() ;

        } catch(err){
            console.log(err) ;

        }
        
    }
    return (
        <form onSubmit = {handleSubmit} className="main-create-account-form">
     

            <Input onChange = {setFirstName} inputText="First Name" />
            <Input onChange = {setLastName} inputText="Last Name" />
            <Input onChange = {setEmail} inputText="Email"/>
            <div className="main-create-account-form-phone-number">
                {/* <select  name= "cc_dropdown" className="cc"/>
                    

                <select/> */}
                <select name="cc_dropdown" className="cc">
                    <option value="+91">+91</option>
                    <option value="+81">+81</option>
                </select>
                <Input onChange = {setMobile} inputText="Phone Number" />
            </div>

            <Input onChange = {setPassword} inputText="Password"/>
            {successSignup && successSignupText}
            {errors}
            <button className="main-create-account-form-button">Create Account</button>
        </form>
    )
}