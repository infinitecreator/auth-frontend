import { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";
import useNavigation from "../hooks/use-navigation";
import Logo from "../components/Logo";
import GrayText from "../components/common/GrayText";
import "./css/HomePage.css" ;

const logoutMessage = "Successfully logged out, redirecting you to the login page"

const HomePage = ()=>{
    const [showComponent, setShowComponent] = useState(false) ;
    const {navigate} = useNavigation()  ;
    const [logOutApi, errors] = useRequest({
        url: 'http://localhost:4000/api/users/signout',
        method:'post',
        body:{

        },
        onSuccess: ()=>{
            navigate('/logout') ;
            setTimeout(()=>{
                navigate('/login') ;

            },2000);
            
            
        }
    }) ;

    const handleLogOut = async () =>{
        try{
            await logOutApi() ;

        }catch (err){
            console.log(err) ;
        }


    }

    useEffect(()=>{
       

        fetch("http://localhost:4000/api/users/currentuser",{ credentials: 'include' })
        .then((res) => {
            if (res.status === 200) {
                setShowComponent(true)
            } else {
                setShowComponent(false)
            }
        });
        
    }) ;

    return (
        <>
            {   showComponent && 
                <div className="main-homepage">
                    <Logo text = "StubHub"/>
                    <GrayText text = "Homepage"/>
                    <button onClick = {handleLogOut}>Sign Out</button>

                </div>
                
            }
            {errors}   

            <h1 style={{display: 'flex', justifyContent: 'center'}}>{!showComponent && 'Not Allowed'}</h1>
        </>
    )
}

export default HomePage ;