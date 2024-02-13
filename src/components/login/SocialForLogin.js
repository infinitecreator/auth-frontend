import SocialLogin from "../SocialLogin"
import "./SocialForLogin.css" ;
import facebook from '../../icons/facebook-app-symbol.svg' ;
import apple from '../../icons/apple.png' ;
import google from '../../icons/google.png' ;
export default function SocialForLogin(){
    return (
        <div className="main-social-for-login">
        <SocialLogin auth = "facebook" bcolor = "blue" img = {facebook} text = "Log in with Facebook"/>
        <SocialLogin auth = "apple" bcolor = "black" img = {apple} text = "Log in with Apple"/>
        <SocialLogin auth = "google" bcolor = "white" img = {google} text = "Log in with Google"/>
        </div>
        
    )
}