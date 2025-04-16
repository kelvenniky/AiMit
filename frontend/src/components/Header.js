import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { PiShoppingCartBold } from "react-icons/pi";
import { BsBagCheckFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }
  const handlePhoneSearch = (e)=>{
   
      navigate('/search')
    
  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full  flex items-center px-2 justify-between'>
            <div className='ml-5' >
                <Link className='' to={"/"}>
                <div className='flex gap-1'>
                <BsBagCheckFill style={{fontSize:35}} className='text-teal-900' />
                <h2 className='text-2xl  mt-2 text-teal-700  font-bold'>AiMit</h2>
                </div>
                <div className='bg-teal-900 rounded-full  w-1 h-1 ml-4 '></div>
                </Link>
            </div>


            

            <div className='hidden lg:flex items-center w-full justify-between max-w-md border rounded-lg focus-within:shadow pl-2'>
                
                <input type='text' placeholder='search product here...' className=' pl-2 w-full outline-none' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8  flex items-center justify-center rounded-r-lg '>
                  <GrSearch />
                </div>
            </div>

            <div className='text-lg  md:hidden  min-w-[50px] h-8  flex items-center justify-center rounded-r-lg '>
                  < ImSearch onClick={handlePhoneSearch} className='text-teal-600 ' fontSize={20} fontWeight={'bold'} />
                </div>


            <div className='flex items-center gap-7'>
                
                <div className='relative flex justify-center'>

                  {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        }
                      </div>
                    )
                  }
                  
                  
                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <nav className='grid'>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap   hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                          <Link to={'/order'} className='whitespace-nowrap  hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Orders</Link>
                          <Link to={'/address'} className='whitespace-nowrap  hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Address</Link>
                          <Link to={'/wishlist'} className='whitespace-nowrap md:hidden block  hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}> Wishlist</Link>


                        </nav>
                      </div>
                    )
                  }
                 
                </div>

       
{
                     user?._id && (
                     <div className=' gap-3 hidden md:block'>
                       <Link to={"/wishlist"} className='text-2xl relative'>
                          <span><FaRegHeart/></span>
      
                          <div className='bg-teal-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.wishlistCount}</p>
                          </div>
                      </Link>
                     </div>

                      )
                  }
                   {
                     user?._id && (
                     <div className='flex  gap-3'>
                       <Link to={"/cart"} className='text-2xl relative'>
                          <span><PiShoppingCartBold/></span>
      
                          <div className='bg-teal-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                     </div>

                      )
                  }
              
              
              


                <div>
                  {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-lg text-white bg-teal-600 hover:bg-teal-700'>Logout</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-lg text-white bg-teal-600 hover:bg-teal-700'>Login</Link>
                    )
                  }
                    
                </div>

            </div>

      </div>
    </header>
  )
}

export default Header