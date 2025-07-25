import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import getMessages from '../customHooks/getMessages'

const Home = () => {
  let {} = useSelector(state=>state.user)
  getMessages()
  return (
    <div  className='w-full h-screen flex'>
      <SideBar />
      <MessageArea />
    </div>
  )
}

export default Home