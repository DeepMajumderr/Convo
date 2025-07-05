import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const SignUp = () => {

  let navigate = useNavigate()
  const [show, setshow] = useState(false)

  const [userName, setuserName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")
  const dispatch = useDispatch()


  const handleSignUp = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`,
        {
          userName,
          email,
          password
        },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      setuserName("")
      setemail("")
      setpassword("")
      setloading(false)
      seterror("")
    } catch (error) {
      console.log(error.response?.data)
      seterror(error?.response?.data?.message)
      setloading(false)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[400px] h-[500px] bg-white rounded-lg shadow-gray-400 shadow-lg
      flex flex-col gap-[30px]'>
        <div className='w-full h-[125px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg
        flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-[25px]'>Welcome to
            <span className='text-white'> Convo </span></h1>
        </div>
        <form onSubmit={handleSignUp}
          className='w-full flex flex-col gap-[20px] items-center'>

          <input onChange={(e) => setuserName(e.target.value)}
            type="text" placeholder='username' value={userName}
            className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]'
          />

          <input onChange={(e) => setemail(e.target.value)}
            type="email" placeholder='email' value={email}
            className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]'
          />

          <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
            <input onChange={(e) => setpassword(e.target.value)}
              type={`${show ? "text" : "password"}`} placeholder='password' value={password}
              className='w-full h-full outline-none  px-[20px] py-[10px] bg-[white] 
            text-gray-700 text-[19px]'
            />
            <span className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff]  cursor-pointer'
              onClick={() => setshow(!show)}
            >{show ? "Hide" : "Show"}</span>
          </div>

          {error && <p className='text-red-500'>{error}!</p>}

          <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px]
          mt-[15px] font-semibold hover:shadow-inner' disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>

          <p onClick={() => navigate("/login")}
            className='cursor-pointer'>Already have an account ?
            <span className='text-[#20c7ff] font-semibold'> Login</span></p>

        </form>
      </div>
    </div>
  )
}

export default SignUp