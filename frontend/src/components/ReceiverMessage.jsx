import React, { useEffect, useRef } from 'react'
import emptydp from '../assets/emptydp.jpg'
import { useSelector } from 'react-redux'

const ReceiverMessage = ({ image, message }) => {

  let scroll = useRef()

  let { selectedUser } = useSelector(state => state.user)

  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" })
  }, [message, image])

  const handleImageScroll = () => {
    scroll.current.scrollIntoView({ behaviour: "smooth" })
  }


  return (
    <div className='flex items-start gap-[20px]'>

      <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center
        shadow-gray-500 shadow-lg ' >
        <img src={selectedUser.image || emptydp} className='h-[100%]' />
      </div>

      <div ref={scroll}
        className='mb-4 w-fit max-[500px] px-[20px] py-[10px] bg-[rgb(23,151,194)]
        text-white text-[19px] rounded-tl-none rounded-2xl relative left-0 
        shadow-gray-400 shadow-lg gap-[10px] flex flex-col'
      >
        {
          image &&
          <img src={image} alt="" className='w-[150px] rounded-lg'
            onLoad={handleImageScroll}
          />
        }

        {
          message &&
          <span>{message}</span>
        }
      </div>

    </div>
  )
}

export default ReceiverMessage