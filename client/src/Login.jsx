import Navbar from "./Navbar"


function Login() {
    
    return (
        <div>
            <form>
                <button formAction="http://localhost:8080/api/auth/discord/">Login With Discord</button>
            </form>
        </div>
    )

}

export default Login