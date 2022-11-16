import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import './Navbar.css'
function Navbar() {

    
    const [avatar, setAvatar] = useState(null)
    const [username, setUsername] = useState(null)
    const [dis, setDisc] = useState(null)
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchingData = async () => {
            const data = await axios.get(`https://api.tleem.me/user/getCred`, {
            withCredentials: true
            })
            .then(data => {
               return data.data[0]
            }).catch(err => {
                console.log(err);
            })
        
            setAvatar(data.avatar_url)
            setUsername(data.username)
            setDisc(data.discriminator)
            setIsFetching(false)
        }
        fetchingData()
    })
    

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img 
                    src={!isFetching ? avatar.toString(): undefined}
                    alt=""
                    width="55px"
                    height="55px"
                    style={ { borderRadius:55 }}
                 />
                    Welcome {!isFetching && username +'#'+ dis}
                </a>
            </nav>
        </div>
    )
}

export default Navbar

