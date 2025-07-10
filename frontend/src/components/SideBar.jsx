import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import emptydp from '../assets/emptydp.jpg'
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from 'axios'
import { serverUrl } from '../main';
import { setOtherUsers, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    let { userData, otherUsers } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const [search, setsearch] = useState(false)

    const handleLogout = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`,
                { withCredentials: true }
            )
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="lg:w-[30%] w-full h-screen bg-slate-200 relative flex flex-col">


            {/* Logout Button */}
            <div className='absolute bottom-[20px] left-[10px] w-[60px] h-[60px] bg-[#20c7ff] rounded-full flex items-center justify-center shadow-lg cursor-pointer'>
                <RiLogoutCircleLine className='w-[25px] h-[25px]' />
            </div>

            <div className='w-full h-[240px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg
        flex flex-col justify-center px-[20px]'>
                <h1 className='text-white font-bold text-[25px]'>Convo</h1>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='text-gray-800 font-bold text-[25px]'>Hi , {userData.name || "User"}</h1>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center
                    shadow-gray-500 shadow-lg cursor-pointer' onClick={() => navigate("/profile")}>
                        <img src={userData.image || emptydp} className='h-[100%]' />
                    </div>
                </div>

                <div className='w-full flex items-center gap-[20px]'>
                    {
                        !search &&
                        <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center
                    shadow-gray-500 shadow-lg bg-white cursor-pointer' onClick={() => setsearch(true)}>
                            <IoSearchSharp className='w-[25px] h-[25px]' />
                        </div>
                    }

                    {search &&
                        <form className='w-full h-[60px] shadow-gray-500 shadow-lg bg-white 
                        flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] cursor-pointer'>
                            <IoSearchSharp className='w-[25px] h-[25px]' />
                            <input type="text" placeholder='search users...'
                                className='w-full text-[17px] p-[10px] h-full outline-0 border-0' />
                            <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={() => setsearch(false)} />
                        </form>
                    }

                    {!search &&
                        otherUsers?.map((user) => (
                            <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center
                    shadow-gray-500 shadow-lg'>
                                <img src={user.image || emptydp} className='h-[100%]' />
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className='flex-1 overflow-auto flex flex-col gap-[20px] items-center mt-[10px] px-2'>
                {
                    otherUsers?.map((user) => (
                        <div className='w-[95%] h-[60px] flex items-center gap-[20x] bg-white shadow-gray-500  shadow-lg
                        rounded-full hover:bg-[#b2ccdf] cursor-pointer'>
                            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center
                    shadow-gray-500 shadow-lg'>
                                <img src={user.image || emptydp} className='h-[100%]' />
                            </div>
                            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar