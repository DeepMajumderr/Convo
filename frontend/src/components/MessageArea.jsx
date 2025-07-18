import React, { useRef, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import emptydp from '../assets/emptydp.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { BsEmojiSunglasses } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react'
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import axios from 'axios'
import { serverUrl } from '../main';

// Optional: Import emoji picker if you're using one
// import EmojiPicker from 'emoji-picker-react';

const MessageArea = () => {
  const { selectedUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [input, setinput] = useState("")
  const [frontendImage, setfrontendImage] = useState(null)
  const [backendImage, setbackendImage] = useState(null)
  let image = useRef()

  const handleSendMessage = async () => {
    try {
      let formData = new FormData()
      formData("message",input)
      if(backendImage) {
        formData("image",backendImage)
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,{withCredentials:true}
      )
    } catch (error) {
      console.log(error)
    }
  }

  const onEmojiClick = (emojiData) => {
    setinput((prevInput) => prevInput + emojiData.emoji)
    setShowPicker(false)
  }

  return (
    <div className={`lg:w-[70%] w-full h-full flex flex-col relative bg-slate-200 ${selectedUser ? "" : "hidden lg:flex"}`}>

      {/* Header */}
      {selectedUser && (
        <div className='h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-lg flex items-center px-5 gap-5'>
          <div className='cursor-pointer' onClick={() => dispatch(setSelectedUser(null))}>
            <IoMdArrowBack className='w-[30px] h-[30px] text-white' />
          </div>

          <div className='w-[50px] h-[50px] rounded-full overflow-hidden shadow-lg'>
            <img src={selectedUser?.image || emptydp} className='w-full h-full object-cover' />
          </div>

          <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "User"}</h1>
        </div>
      )}

      {/* Welcome screen */}
      {!selectedUser && (
        <div className='flex-1 flex flex-col items-center justify-center'>
          <h1 className='text-gray-700 font-bold text-[50px]'>Welcome to Convo</h1>
          <span className='text-gray-700 font-semibold text-[30px]'>Let's Chat...</span>
        </div>
      )}

      {/* Chat content */}
      {selectedUser && (
        <div className='flex-1 flex flex-col overflow-hidden'>

          {/* Scrollable message list */}
          <div className='flex-1 overflow-y-auto p-4 px-[20px] py-[30px] '>

          </div>

          {/* Emoji Picker */}
          {showPicker && (
            <div className="absolute bottom-[120px] left-[20px] z-50">
              <EmojiPicker width={250} height={350} className='shadow-lg'
                onEmojiClick={onEmojiClick} />
            </div>
          )}

          {/* Input area */}
          <div className='w-full flex justify-center py-3'>
            <form
              className='w-[95%] lg:w-[70%] bg-[#1797c2] h-[60px] flex items-center justify-between rounded-full shadow-lg px-5 gap-4'
              onSubmit={(e) => {
                e.preventDefault();
                if (message.trim() !== "") {
                  console.log("Send message:", message);
                  setMessage("");
                }
              }}
            >
              <div onClick={() => setShowPicker(prev => !prev)}>
                <BsEmojiSunglasses className='w-[25px] h-[25px] text-white cursor-pointer' />
              </div>
              
              <input type="file" accept='image/*' ref={image} hidden />

              <input
                type="text"
                value={input}
                onChange={(e) => setinput(e.target.value)}
                placeholder="Message..."
                className='flex-1 h-full px-2 text-white text-[18px] bg-transparent outline-none placeholder-white'
              />

              <FaRegImages className='w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>image.current.click()} />
              <IoMdSend type="submit" className='w-[25px] h-[25px] text-white cursor-pointer' />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
