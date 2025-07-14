import React from 'react'
import emptydp from '../assets/emptydp.jpg'

const SenderMessage = () => {
  return (
    <div className='mb-4 w-fit max-[500px] px-[20px] py-[10px] bg-[rgb(23,151,194)]
    text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 ml-auto
    shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
        <img src={emptydp} alt="" className='w-[150px] rounded-lg' />
        <span>hii</span>
    </div>
  )
}

export default SenderMessage