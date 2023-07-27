import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' sticky top-0 z-10 bg-black text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
      <Link to={"/"}><span>Filmy<span className='text-white'>Verse</span></span></Link>
     <Link to="/addmovie"> <h1 className='text-white cursor-pointer hover:text-blue-500'><span className='text-lg'>Add New</span> </h1></Link>
    </div>
  )
}

export default Header
