import useNavigation from "../../hooks/use-navigation";
import Logo from "../Logo";
import GrayText from "./GrayText";
import "./Redirect.css" ;
import { useEffect, useState } from "react";

export default function Redirect({type,text}){
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
    const handleSignin =() =>{
        navigate('/login') ;


    }
    return (
        <>
        { showComponent &&
            <div className="main-redirect">
                <Logo text = "StubHub"/>
                <GrayText text={text}/>
                {type ==='landing' && <button  onClick = {handleSignin}>Sign in</button>}

                {/* <h1>{text}</h1> */}

            </div>
        }
        </>
    )
}