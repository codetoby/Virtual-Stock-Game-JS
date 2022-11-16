import Navbar from "./Navbar"


function Login() {
    
    return (
        <div>
            <form>
                <button formAction="https://api.tleem.me/api/auth/discord/">Login With Discord</button>
            </form>
        </div>
    )

}

export default Login