import useRequest from "../hooks/use-request";
import "./css/SocialLogin.css" ;
const GOOGLE_AUTH = `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/auth/google/` ;
const APPLE_AUTH = `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/auth/apple/` ;
const FACEBOOK_AUTH = `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/auth/facebook/` ;

const urlOBJ = {
    'google': GOOGLE_AUTH,
    'facebook': '#',
    'apple': '#'
}
export default function SocialLogin({auth,bcolor, text, img}){

    const [googleLogin, errors] = useRequest({
        url:`${process.env.PROTOCOL}://${process.env.BACKEND_URL}/auth/google/`,
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
    return (
        <div className="main-social-login">
            {errors}
            < form action = {urlOBJ[auth]}  method = 'get' style={{backgroundColor:bcolor, color: bcolor==='white' ? 'black' : 'white' }}>
                    

                {/* <div className="main-social-login-img-container">
                    

                </div> */}
                    
           
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