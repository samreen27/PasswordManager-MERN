import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer h-14 flex justify-around items-center px-4 py-5">

                <div className="logo font-bold flex items-center justify-center gap-1">
                   <img src="./favicon.png" alt="" className='font-bold text-white'/>
                   <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>

                </div>
                <button className='text-white my-5 bg-green-700 rounded-full flex justify-between items-center ring-white ring-1'>
                    <img className='invert p-1 w-10' src="icons/github.svg" alt="githubLogo" />
                    <span className='font-bold px-2'>Github</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
