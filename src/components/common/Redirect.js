import useNavigation from "../../hooks/use-navigation";
import Logo from "../Logo";
import GrayText from "./GrayText";
import "./Redirect.css" ;
import { useEffect, useState } from "react";

export default function Redirect({buttonText, buttonUrl, greyText}){
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
        console.log('clicked') ;
        // console.log(buttonUrl) ;
        navigate(buttonUrl) ;


    }
    return (
        <>
        { showComponent &&
            <div className="main-redirect">
                <Logo text = "AuthHub"/>
                <GrayText text={greyText}/>
                {buttonText && <button  onClick = {handleSignin}>{buttonText}</button>}

                {/* <h1>{text}</h1> */}

            </div>
        }
        </>
    )
}