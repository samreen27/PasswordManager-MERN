import React from 'react'
import Navbar from './Navbar'

const Footer = () => {
    return (
        <div className=' w-full bg-slate-800 text-white flex flex-col justify-center items-center'>
            
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'> &lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>

            <div>
                Created with ❤
            </div>
        </div>
    )
}

export default Footer
