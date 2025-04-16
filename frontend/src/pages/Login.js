import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }


    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method: 'POST',
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

    console.log("data login",data)
    
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className=' p-5 w-full max-w-sm mx-auto'>
                   
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons'/>
                    </div>
                    <div className='flex flex-col justify-center mt-2'>
                       <p className='text-xl font-semibold mx-auto'>Welcome to AiMit</p> 
                       <p className='text-md mt-1 text-gray-600 mx-auto font-semibold'>Type your email and password to log In</p> 

                     </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 mt-2'>
                                <input 
                                    type='email' 
                                    placeholder='enter your email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'/>
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 mt-2 flex items-center relative'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password' 
                                    onChange={handleOnChange}
                                    className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'/>
                                <div className='cursor-pointer absolute right-2 text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit  mt-2 ml-auto hover:underline hover:text-teal-600'>
                               <p className='text-sm'> Forgot password ?</p>
                            </Link>
                        </div>

                        <button className='bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 w-full shadow-sm shadow-slate-600  rounded-md hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                    </form>
                    <div className='flex justify-center'>
                    <p className='my-5 text-md'>Don't have account ? <Link to={"/sign-up"} className=' text-teal-600 hover:text-teal-700 hover:underline'>Sign up</Link></p>

                    </div>

            </div>


        </div>
    </section>
  )
}

export default Login