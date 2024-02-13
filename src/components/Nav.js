import Link from './Link' ;
// import "./Nav.css" ;
// import logo from "../../images/logo.jpeg"

const Nav = ({children}) => {
    // console.log(children[0].props) ;
    const links = [
        { label: 'Login', to: '/login' },
        { label: 'Signup', to: '/signup' },
        { label: 'ForgotPassword', to: '/forgot-password' },
        { label: 'VerifyOTP', to: '/verify-otp' },
        { label: 'AccountVerified', to:'/account-verified'},
        // { label: 'Counter', to: '/counter'},
        // { label: 'Playlist', to: '/playlist'},
    ];

    const renderedLinks = links.map((child,index)=>{
        return (
            <>
                <Link
                    routes = {child.label}
                    key = {child.label}
                    to = {child.to}
                >
                    {child.label}
                </Link>
            </>
        )

    }) ;
    return (
        <div>
            <div>

                {/* <div className='mn-pages'> */}
                    {/* {renderedLinks} */}
                {/* </div> */}

            </div>
            
            {children}
        </div>
    )

}

export default Nav ;