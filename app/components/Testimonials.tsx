import React from 'react'
import Card from './Card'

const Testimonials = () => {
  return (
    <div className='dark:bg-[#0A0A0A] bg-[#FAFAFA] flex flex-col gap-8 justify-center items-center p-8'>
        <div className='text-xl text-purple-600'>Wall of Love</div>
        <div className='text-2xl'>What individuals say about us</div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3'>
            <Card />
        </div>
    </div>
  )
}

export default Testimonials