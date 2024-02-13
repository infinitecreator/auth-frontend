import { useContext } from "react";
import NavigationContext from "../context/navigation";
// import { NavigationProvider } from "../context/navigation";

export default function useNavigation() {
    const navigation = useContext(NavigationContext) ;
    console.log(navigation, 'navigation') ;
    return navigation;

}