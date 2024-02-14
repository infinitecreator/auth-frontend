import CreateAccountFrom from '../components/signup/CreateAccountForm' ;
import Button from '../components/Button' ;
import PrivacyPolicy from '../components/PrivacyPolicy' ;
import SignIn from '../components/signup/SignIn' ;
import Footer from '../components/Footer' ;
import CreateAccount from '../components/CreateAccount';
import "./css/Signup.css" ;
import Logo from '../components/Logo';
import GrayText from '../components/common/GrayText';
import { useEffect, useState } from 'react';
import useNavigation from '../hooks/use-navigation';
const ppText = "By signing in or creating an account, you agree to our user agreement and acknowledge our privacy policy. You may receive SMS notifications from us and can opt out at any time."
export default function Signup(){
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
                <div className='main-signup'>
                    <Logo text = "StubHub"/>
                    <GrayText text="Create Account"/>
                    <CreateAccountFrom/>
                    <PrivacyPolicy ppText={ppText}/>
                    <CreateAccount textLeft="Have a StubHub account?" textRight = "Sign in" label = "Sign in" to = "/login" />
                    <Footer/>

                </div>
            }
        </>
    )
}