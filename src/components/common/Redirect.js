import useNavigation from "../../hooks/use-navigation";
import Logo from "../Logo";
import GrayText from "./GrayText";
import Loading from "./Loading";
import "./Redirect.css" ;
import { useEffect, useState } from "react";

export default function Redirect({buttonText, buttonUrl, greyText}){
    const [showComponent, setShowComponent] = useState(2) ;
    const {navigate} = useNavigation() ;
    useEffect(()=>{
        
        fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/currentuser`,{ credentials: 'include' })
        .then((res) => {
            if (res.status === 200) {
                setShowComponent(0) ;
                navigate('/homepage')
            } else {
                setShowComponent(1) ;
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
        { showComponent === 1 ?
            ( 
                <div className="main-redirect">
                    <Logo text = "AuthHub"/>
                    <GrayText text={greyText}/>
                    {buttonText && <button  onClick = {handleSignin}>{buttonText}</button>}
                </div>
            ) :
            showComponent === 0 ?
            (
                <h1 style={{display: 'flex', justifyContent: 'center', fontSize:'larger'}}>Not Allowed</h1>
            ) :
            (
                <Loading text = "Loading..."/>
            )
        }
        </>
    )
}