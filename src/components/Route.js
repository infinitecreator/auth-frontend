import useNavigation from "../hooks/use-navigation";
function Routes({children, to}) {
    
    const {currentUrl} = useNavigation() ;
    console.log(currentUrl,'curr') ;
    
    if(to === currentUrl ) return children ;

    return null ;
    

}

export default Routes ;