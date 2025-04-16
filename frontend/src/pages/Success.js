import React from 'react'
import success  from '../assest/success1.gif'
import cancel  from '../assest/cancel.gif'
import { Link } from 'react-router-dom'


const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2'>
        <img src={success} width={200} height={200} className='mix-blend-multiply'/>
        <p className='text-green-600 font-bold text-xl'>Payment Successfull</p>
        <Link to={'/order'} className='p-2 mt-5 px-3 rounded font-semibold text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Success