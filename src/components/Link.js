import useNavigation from "../hooks/use-navigation";
import "./css/Link.css" ;
const Link = ({ routes, to, children}) =>{
    const { navigate } = useNavigation() ;
    // console.log(navigate,'navigate') ;

    const handleClick = (event) =>{
        event.preventDefault(); 
        if(event.metaKey || event.ctrlKey){
            return ;
        }
        
        navigate(to) ;

    }
    return (
        <div >
            <a className= { routes + 'a'} href = {to} onClick={handleClick}>
                {children}
            </a>
        </div>
    )

}

export default Link ;