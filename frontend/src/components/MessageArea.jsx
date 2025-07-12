import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import emptydp from '../assets/emptydp.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { BsEmojiSunglasses } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";


const MessageArea = () => {
  let { selectedUser } = useSelector(state => state.user)
  let dispatch = useDispatch()

  return (
    <div className={`lg:w-[70%] relative ${selectedUser ? "flex" : "hidden"} lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}>

      {selectedUser &&
        <div className='w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg
          flex items-center px-[20px] gap-[20px]'>
          <div className='cursor-pointer' onClick={() => dispatch(setSelectedUser(null))}>
            <IoMdArrowBack className='w-[30px] h-[30px] text-white' />
          </div>

          <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center
          shadow-gray-500 shadow-lg cursor-pointer' >
            <img src={selectedUser?.image || emptydp} className='h-[100%]' />
          </div>

          <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "user"}</h1>

        </div>
      }

      {
        !selectedUser &&
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <h1 className='text-gray-700 font-bold text-[50px]'>Welcome to Convo</h1>
          <span className='text-gray-700 font-semibold text-[30px]'>Let's Chat...</span>
        </div>
      }

      <div className='w-full flex justify-center absolute bottom-[20px]'>
        <form className='w-[95%] max-w-[70%] bg-[#1797c2] h-[60px] flex
        items-center justify-center rounded-full shadow-gray-400 shadow-lg
        gap-[10px] px-[20px]'>
          <div>
            <BsEmojiSunglasses className='w-[25px] h-[25px] text-white' />
          </div>
          <input type="text" className='w-full h-full px-[10px] outline-none border-0 text-[19px] text-white' />
          <div>
            <FaRegImages className='w-[25px] h-[25px] text-white' />
          </div>

          <div>
            <IoMdSend className='w-[25px] h-[25px] text-white'/>
          </div>
        </form>
      </div>

    </div>
  )
}

export default MessageArea