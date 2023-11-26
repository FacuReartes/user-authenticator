import { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../userContext/UserContext';
import { useContext, useEffect } from 'react'

function LogIn() {

    const { user, setUser } = useContext(UserContext) || { user: null, setUser: () => {} };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [error, setError] = useState<any>(null);

    // tokens y headers de la API
    const token = "NmJmZTMxYTctMGMxZC00M2MzLTg1ZWItMmU0MWFlNDg4YmNi"
    
    const config = {
      headers: { 'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' }
    };

    useEffect(() => {
      setUser(null);
    })
    
    const onSubmit = (data: any) => {
      console.log(data);
      axios.put("https://api.m3o.com/v1/user/Login", {
        username: data.username,
        password: data.password
      }, config)
        .then((res) => {
          console.log(res)
          console.log("Logged in succesfully")
          setUser(data.username)
          console.log(user)
          navigate("/home")
        })
        .catch((err) => {
          console.log(err)
          setError(err.response.data.detail)
        })
    }
      
    return (
      <div className="App bg-slate-950 w-screen h-screen flex items-center justify-center">

        <form onSubmit={handleSubmit(onSubmit)} 
          className="w-[25%] text-white opacity-90 text-lg p-4 bg-gray-700 rounded-lg ">
  
          <div className="flex justify-center pb-4">
            <p>Log in to Continue</p>
          </div>
          
          <div className="text-base flex flex-col">
            <label
              htmlFor="Username"
              className="transition-all py-2 px-2 relative block rounded-md border border-gray-400 focus-within:border-white focus-within:ring-1 focus-within:white"
            >
              <input {...register("username", { 
                required: "Username is required", 
                minLength: {
                  value: 4,
                  message: "Min length is 4"
                }})}
                type="text"
                id="Username"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Username"
              />
              <span className="px-1 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-700 p-0.5 text-xs text-white 
              transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs">
                Username
              </span>
            </label>
            <p className="px-1 py-1 text-sm text-red-300">{errors.username?.message?.toString()}</p>
  
            <label
              htmlFor="Password"
              className="mt-2 transition-all py-2 px-2 relative block rounded-md border border-gray-400 focus-within:border-white focus-within:ring-1 focus-within:white"
            >
              <input {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Min length is 8"
                }})}
                type="password"
                id="Password"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Password"
              />
              <span className="px-1 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-700 p-0.5 text-xs text-white 
              transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs">
                Password
              </span>
            </label>
            <p className="py-1 px-1 text-sm text-red-300">{errors.password?.message?.toString()}</p>
          </div>

          <div className="flex justify-center pb-2 pt-1">
            <button type="submit"
              className="bg-slate-950 w-full rounded-md p-2">
              Continue
            </button>
          </div>
            {error && <p className='text-red-300 text-base pb-1'>Error! {error}</p>}
          <div className=''>
            <p className="text-sm text-gray-400">
              Don't have an account? <NavLink to="/signup" className="text-white">Sign up</NavLink>
            </p>
          </div>
        </form>
      </div>
    );
}

export default LogIn