import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-white h-[68px] w-full flex items-center px-8 justify-between sticky top-0 z-100'>
            <div className='flex items-center justify-center gap-6'>
                <h1 className='font-inter font-semibold text-gray-900 text-[24px] leading-[150%] tracking-[0%]'>ticktock</h1>
                <p className='font-inter font-medium text-[14px] leading-[150%] tracking-[0%] text-center'>Timesheets</p>
            </div>
            <div className='font-medium text-gray-500 text-base leading-6 tracking-normal'>
                <button>John Doe</button>
                <span></span>
            </div>
        </div>
    )
}

export default Navbar