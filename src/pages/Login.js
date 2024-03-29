// import './App.css';
import Logo from '../components/Logo';
import LoginDetails from '../components/LoginDetails';
import PrivacyPolicy from '../components/PrivacyPolicy';
// import Button from '../components/Button';
// import SocialLogin from '../components/SocialLogin' ;
import CreateAccount from '../components/CreateAccount';
import Footer from '../components/Footer' ;
import GrayText from '../components/common/GrayText' ;
import './css/Login.css' ;
import SocialForLogin from '../components/login/SocialForLogin';
import { useEffect, useState } from 'react';
import useNavigation from '../hooks/use-navigation';
function Login() {
  const loginFields = ['Email', 'Password'] ;
  const ppText = "By signing in or creating an account, you agree to our user agreement and acknowledge our privacy policy. You may receive SMS notifications from us and can opt out at any time."

  const [showComponent, setShowComponent] = useState(false) ;
  const {navigate} = useNavigation() ;

  useEffect(()=>{
      
      fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/currentuser`,{ credentials: 'include'})
      .then((res) => {
          if (res.status === 200) {
              setShowComponent(false) ;
              navigate('/homepage')
          } else {
              setShowComponent(true) ;
          }
      });
      
  }) ; 


  const handleGuestPurchase = (event) =>{
    event.preventDefault() ;
    navigate('/coming-soon') ;

  }

  return (
    <>
        { showComponent && 
            <div className='main-login-page'>
              <Logo text = "AuthHub"/>
              <GrayText text = "Sign in to AuthHub"/>
              <LoginDetails fields = {loginFields} />
              <PrivacyPolicy ppText = {ppText}/>
              <div className='main-guest-purchase'>
                <button onClick = {handleGuestPurchase}>Guest purchase? Find your order</button>
              </div>
              <SocialForLogin/>
              

              <CreateAccount textLeft="New to AuthHub?" textRight = "Create account" to = "/signup" />
              <Footer/>
            </div>
        }
    </>

  ) 
}

export default Login;
