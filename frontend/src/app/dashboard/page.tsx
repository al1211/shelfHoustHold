"use client"
import React from 'react'
import { useUserStore } from '../../../store/store'

const page = () => {
  const user=useUserStore((state)=>state.user)
  console.log(user);
  return (
    <div>
      <h1 className='text-white'>{user?.name}</h1></div>
  )
}

export default page