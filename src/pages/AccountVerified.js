import { useEffect, useState } from "react"
import useNavigation from "../hooks/use-navigation"

export default function AccountVerified() {

    const {navigate} = useNavigation() ;

    const [showComponent, setShowComponent] = useState(false) ;

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

    
    setTimeout(()=>{
            navigate('/login') ;
            
     },3000) ;
    

    return (
        <>
            { showComponent && 
       
                <h1>
                    Account Successfully Activated. redirecting you to the login page.
                </h1>
            }
        </>
    )
}