import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-white h-[68px] w-full flex items-center px-8 justify-between'>
            <div className='flex items-center justify-center gap-6'>
                <h1 className='font-inter font-semibold text-gray-900 text-[24px] leading-[150%] tracking-[0%]'>ticktock</h1>
                <p className='font-inter font-medium text-[14px] leading-[150%] tracking-[0%] text-center'>Timesheets</p>
            </div>
            <div>
                <button>John Doe</button>
            </div>
        </div>
    )
}

export default Navbar