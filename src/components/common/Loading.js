import Logo from "../Logo";
import GrayText from "./GrayText";
import "./css/Loading.css" ;


export default function Loading({text}) {

    return (
       
            <div className="main-redirect">
                <Logo text = "AuthHub"/>
                <GrayText text={text}/>
                {/* <h1>Loading...</h1> */}

                {/* <h1>{text}</h1> */}

            </div>

    )

}