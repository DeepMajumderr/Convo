import React from 'react'
import emptydp from '../assets/emptydp.jpg'
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import { serverUrl } from '../main';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';


const Profile = () => {

    let { userData } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const [name, setname] = useState(userData.name || "")
    const [frontendImage, setfrontendImage] = useState(userData.image || emptydp)
    const [backendImage, setbackendImage] = useState(null)

    let image = useRef()
    const [saving, setsaving] = useState(false)

    const handleImage = (e) => {
        let file = e.target.files[0]
        setbackendImage(file)
        setfrontendImage(URL.createObjectURL(file))

    }

    const handleProfile = async (e) => {
        setsaving(true)
        e.preventDefault()
        try {
            let formData = new FormData()
            formData.append("name", name)

            if (backendImage) {
                formData.append("image", backendImage)
            }

            let result = await axios.put(
                `${serverUrl}/api/user/profile`,
                formData,
                {
                    withCredentials: true,

                }
            )

            setsaving(false)
            dispatch(setUserData(result.data))
        } catch (error) {
            setsaving(false)
        }
    }

    return (
        <div className='w-full h-[100vh] bg-slate-200 flex flex-col
    justify-center items-center gap-[20px]'>
            <div className='fixed top-[20px] left-[20px]'>
                <IoMdArrowBack className='w-[50px] h-[50px] text-gray-600 cursor-pointer'
                    onClick={() => navigate("/")} />
            </div>
            <div className=' bg-white rounded-full
            border-4 border-[#20c7ff] shadow-gray-400 shadow-lg relative' onClick={() => image.current.click()}>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center'>
                    <img src={frontendImage} className='h-[100%]' />
                </div>

                <div className='absolute bottom-4 text-gray-700 right-5 w-[30px] h-[30px] rounded-full bg-[#20c7ff]
                '>
                    <CiCamera className='absolute bottom-4 text-gray-700 right-5 w-[28px] h-[28px] ' />
                </div>

            </div>

            <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center' onSubmit={handleProfile}>

                <input type="file" hidden accept='image/*' ref={image} onChange={handleImage} />

                <input type="text" placeholder='Enter your name' onChange={(e) => setname(e.target.value)} value={name}
                    className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-200 shadow-lg text-gray-900 text-[19px]' />

                <input type="text" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px]' value={userData?.userName} />

                <input type="email" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px]' value={userData?.email} />

                <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px]
          mt-[15px] font-semibold hover:shadow-inner' disabled={saving}>
                    {saving ? "saving..." : "Save Profile"}
                </button>
            </form>
        </div>
    )
}

export default Profile