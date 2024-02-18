import useNavigation from "../hooks/use-navigation";
import useRequest from "../hooks/use-request";
import Link from "./Link";
import "./css/SocialLogin.css" ;
const GOOGLE_AUTH = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/auth/google/` ;
const APPLE_AUTH = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/auth/apple/` ;
const FACEBOOK_AUTH = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/auth/facebook/` ;


export default function SocialLogin({auth, bcolor, text, img}){

    const {navigate}  = useNavigation() ;
    // const navigateFacebook = () => navigate('/coming-soon') ;
    // const navigateApple = () => navigate('/coming-soon') ;

    const urlOBJ = {
        'google': GOOGLE_AUTH,
        'facebook': '/coming-soon',
        'apple': '/coming-soon', 
    }

    const [googleLogin, errors] = useRequest({
        url:`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/auth/google/`,
        method:'get',
        body:{

        },
        onSuccess: ()=>{
            console.log("success") ;

        }
    }) ;
    

    const handleClick = async (event) =>{
        // event.preventDefault();
        try{
            await googleLogin() ;

        } catch(err){
            console.log(err) ;
        }
        

    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        navigate('/coming-soon') ;
        
    }
    return (
        <div className="main-social-login">
            {errors}
            < form  action = { auth ==='google' && urlOBJ[auth] } onSubmit={auth!=='google' && handleSubmit}  method = 'get' style={{backgroundColor:bcolor, color: bcolor==='white' ? 'black' : 'white' }}>
                    
                <button className="main-social-login-text" style={{backgroundColor:bcolor, color: bcolor==='white' ? 'black' : 'white' }}>
                <img className="main-social-login-img" src = {img} alt = "social login " /> 
                    <div className="mscli-text">
                        {text}  

                    </div>
                    
                </button>
                
                
            </form>
        </div>
    )
}