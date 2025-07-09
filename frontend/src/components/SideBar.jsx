import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import emptydp from '../assets/emptydp.jpg'
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const SideBar = () => {
    let { userData, otherUsers } = useSelector(state => state.user)

    const [search, setsearch] = useState(false)

    return (
        <div className="lg:w-[30%] w-full h-full bg-slate-200">
            <div className='w-full h-[240px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg
        flex flex-col justify-center px-[20px]'>
                <h1 className='text-white font-bold text-[25px]'>Convo</h1>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='text-gray-800 font-bold text-[25px]'>Hi , {userData.name}</h1>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center
                    shadow-gray-500 shadow-lg'>
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

                    {otherUsers?.map((user) => (
                        <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center
                    shadow-gray-500 shadow-lg'>
                            <img src={user.image || emptydp} className='h-[100%]' />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default SideBar