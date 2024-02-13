import { createContext, useEffect, useState } from "react";

const NavigationContext = createContext() ;

function NavigationProvider({children}) {
    const [currentUrl, setCurrentUrl] = useState(window.location.pathname) ;

    useEffect(()=>{
        const handleClick = () =>{
            setCurrentUrl(window.location.pathname) ;
        }

        window.addEventListener('popstate',handleClick) ;
        return () =>{
            window.removeEventListener('popstate',handleClick) ;
        }

    },[]);

    const navigate = (to) =>{
        window.history.pushState({},'',to) ;
        setCurrentUrl(to) ;
    };

    return (
        <NavigationContext.Provider value = {{ navigate, currentUrl }}>
            {children}
        </NavigationContext.Provider>
        
    );

}

export { NavigationProvider };
export default NavigationContext ;