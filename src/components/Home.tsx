import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../userContext/UserContext'
import axios from 'axios'

function Home() {

  // Token y headers de la API
  const token = "NmJmZTMxYTctMGMxZC00M2MzLTg1ZWItMmU0MWFlNDg4YmNi"
    
  const config = {
    headers: { 'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json' }
  };

  const handleGet = () => {
    axios.get("https://api.m3o.com/v1/user/List", config)
      .then(function (response) {
        console.log(response.data.users)
      })
      .catch(function (error) {
        console.log(error)
      })
  };

  const { user } = useContext(UserContext) || { user: null };

  return (
    <div className='flex-col h-screen w-screen flex justify-center items-center'>
      {user ?
      <div>
        <h1 className='text-3xl font-bold'>Welcome {user}!</h1>
        <NavLink className='text-xl text-gray-500' to="/login">LogOut</NavLink>
      </div> 
      :
      <div>
        <h1 className='text-3xl font-bold'>You are not logged in</h1>
        <p className='text-xl'>Click to <NavLink className='text-gray-500' to="/login">LogIn</NavLink></p>
      </div>
      }
      <button onClick={handleGet} className='bg-slate-600 text-white p-2 mt-5 rounded-lg hover:text-gray-300 transition-all delay-50'>Click here to get all the users in console</button>
    </div> 
  )
}
export default Home