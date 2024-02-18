// import './App.css';
// import dotenv from 'dotenv';
// import dotenvExpand from 'dotenv-expand' ;
import Routes from "./components/Route";
import Login from './pages/Login' ;
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword' ;
import Nav from "./components/Nav";
import VerifyOTP from "./pages/VerfiyOTP.js";
import AccountVerified from "./pages/AccountVerified.js";
import HomePage from "./pages/HomePage.js";
import Redirect from "./components/common/Redirect.js";
import "./App.css" ;

// dotenvExpand(dotenv.config());


function App() {
  return (
    <div className="main-app">
      <Routes to = '/coming-soon'>
        <Redirect buttonText = 'Back to Sign in' buttonUrl = '/login' greyText = "Coming Soon" />
      </Routes>

      <Routes to = '/logout'>
        <Redirect greyText = "Successfully logged out. Redirecting you to login page...." />
      </Routes>

      <Routes to = '/homepage'>
        <HomePage/>
      </Routes>
      <Routes to = '/'>
        <Redirect buttonText='Sign in' buttonUrl='/login' greyText = "Welcome to AuthHub"/>
      </Routes>

      <Routes to = '/login'>
        <Login/>
      </Routes>

      <Routes to = '/signup'>
        <Signup/>
      </Routes>

      <Routes to = '/forgot-password'>
        <ForgotPassword/>
      </Routes>

      <Routes to = '/verify-otp'>
        <VerifyOTP/>
      </Routes> 

      <Routes to = '/account-verified'>
        <AccountVerified/>
      </Routes> 

      {/* <Footer/> */}


    </div>

  ) 
}

export default App;
