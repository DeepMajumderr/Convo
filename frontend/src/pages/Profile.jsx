import React from 'react'
import emptydp from '../assets/emptydp.jpg'
import { CiCamera } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const Profile = () => {

    let { userData } = useSelector(state => state.user)
    let navigate=useNavigate()

    return (
        <div className='w-full h-[100vh] bg-slate-200 flex flex-col
    justify-center items-center gap-[20px]'>
            <div className='fixed top-[20px] left-[20px]'>
                <IoMdArrowBack className='w-[50px] h-[50px] text-gray-600 cursor-pointer' 
                onClick={()=>navigate("/")}/>
            </div>
            <div className=' bg-white rounded-full
            border-4 border-[#20c7ff] shadow-gray-400 shadow-lg relative'>
                <div className='w-[200px] h-[200px] overflow-hidden rounded-full'>
                    <img src={emptydp} className='h-[100%]' />
                </div>
                <CiCamera className='absolute bottom-4 text-gray-700 right-5 w-[28px] h-[28px] ' />
            </div>

            <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center'>
                <input type="text" placeholder='Enter your name' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-200 shadow-lg text-gray-900 text-[19px]' />
                <input type="text" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px]' value={userData?.userName} />
                <input type="email" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px]' value={userData?.email} />
                <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px]
          mt-[15px] font-semibold hover:shadow-inner'>
                    Save Profile
                </button>
            </form>
        </div>
    )
}

export default Profile