
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import  { Navigate } from 'react-router-dom'

const Home = () => {
    
    const [login, setLogin] = useState(null)
    const [fetch, setFetch] = useState(true)
    const fetchData = async () => {
      const login = await axios.get(`http://localhost:3000/user/checkUser`, {
        withCredentials: true
      }).then(data => {
        if (data.data.success) {
          setLogin(true)
          setFetch(false)
        }
        else {
          setLogin(false)
          setFetch(false)
        }
      })
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
      <div>
        {
          !fetch && (
            login ? <Navigate to='/userPortfolio'  /> : <Navigate to='/login'  />
          ) 
        }
      </div>
    )
   
    
}

export default Home