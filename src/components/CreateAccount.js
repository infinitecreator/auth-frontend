import "./css/CreateAccount.css" ;
import Link from "./Link";
export default function CreateAccount({textLeft, textRight, label, to}){
    return (
        <div className="main-create-account">
            <div className="main-create-account-text">
                {/* New to AuthHub ? */}
                {textLeft}
            </div>
            <Link
                    routes = {textRight}
                    key = {textRight}
                    to = {to}
                >
                    {textRight}
            </Link>
                {/* <a href = "#">{textRight}</a> */}
        </div>
    )
}