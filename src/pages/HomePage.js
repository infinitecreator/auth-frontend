import { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";
import useNavigation from "../hooks/use-navigation";
import Logo from "../components/Logo";
import GrayText from "../components/common/GrayText";
import "./css/HomePage.css" ;
import Loading from "../components/common/Loading";

// const logoutMessage = "Successfully logged out, redirecting you to the login page"

const HomePage = ()=>{
    const [showComponent, setShowComponent] = useState(0) ;
    const {navigate} = useNavigation()  ;
    const [logOutApi, errors] = useRequest({
        url: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/signout`,
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
       

        fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/users/currentuser`,{ credentials: 'include'})
        .then((res) => {
            if (res.status === 200) {
                setShowComponent(1)
            } else {
                setShowComponent(2)
            }
        }).
        catch((err)=>{
            console.log(err) ;
        
        }) ;

});

    return (
        <>
            {   showComponent === 1 ? 
                ( <div className="main-homepage">
                    <Logo text = "StubHub"/>
                    <GrayText text = "Homepage"/>
                    <button onClick = {handleLogOut}>Sign Out</button>

                </div> ) : 
                showComponent === 2 ? 
                (
                    <h1 style={{display: 'flex', justifyContent: 'center'}}>Not Allowed</h1>
                ) :
                (
                    <Loading text = "Loading..."/>
                )
                
            }
            {errors}   

            
        </>
    )
}

export default HomePage ;