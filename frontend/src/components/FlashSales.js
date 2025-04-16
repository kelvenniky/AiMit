import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCedisCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight, FaRegHeart, FaStar, FaStarHalf } from 'react-icons/fa6'
import { TbHeartPlus } from "react-icons/tb";
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import addToWishList from '../helpers/addToWishList';
import { MdDiscount } from "react-icons/md";


const FlashSales = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const [added, setAdded] = useState()

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)
    const { fetchUserAddToWishList } = useContext(Context)


    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const handleAddToWishList = async(e,id)=>{
                
        await addToWishList(e,id)
        fetchUserAddToWishList()

     }
 

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className='container mx-auto bg-white px-8 my-4 py-2 rounded-lg relative'>

           <div className='flex items-center gap-2'>
           <h2 className='md:text-2xl text-lg font-semibold py-4'>{heading}</h2>
           </div>

                
           <div className='flex items-center gap-2  md:gap-1 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>

            <button  className='bg-white shadow-md rounded-full ml-1 p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className='bg-white shadow-md rounded-full mr-1 p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 

           {

                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div className='w-full min-w-[115px]  md:min-w-[199px] max-w-[200px] md:max-w-[230px]  bg-white rounded-lg shadow '>
                                <div className='bg-slate-200 h-20 md:h-28 p-4 rounded-md min-w-[115px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='px-2 py-2 grid gap-1'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-teal-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse hidden md:block rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200 hidden md:block  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <Link to={"product/" + product?._id} className='w-full mb-2 rounded-md min-w-[115px] relative md:min-w-[199px] max-w-[200px] md:max-w-[230px] bg-white shadow hover:scale-100 hover:rounded-md transition-all'>
                            <div className='absolute top-2 left-4 md:top-4 md:eft-5 text-xs md:block' onClick={(e) => handleAddToWishList(e, product?._id)}>
                                <TbHeartPlus className='text-xs md:text-lg text-green-700 '  />
                            </div>
                            <div className='bg-slate-200 h-20 md:h-28 p-4 rounded-md min-w-[115px] md:min-w-[145px] flex justify-center items-center'>
                                <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='px-2 py-2 grid gap-1'>
                                <h2 className='font-medium text-xs md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-xs md:text-lg text-slate-500'>{product?.category}</p>
                                <div className='flex gap-1  md:gap-3'>
                                    <p className='text-teal-600 text-xs  md:text-[15px] font-semibold'>{displayCedisCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 text-xs  hidden md:block line-through'>{displayCedisCurrency(product?.price)}</p>
                                </div>
                                <button className='text-sm bg-teal-700 shadow-sm shadow-slate-600  hidden md:block hover:bg-teal-800 text-white md:px-3 md:py-0.5 rounded-md hover:scale-105 hover:rounded-md transition-all' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
                        )
                    })
                )
                
            }
           </div>
            

    </div>
  )
}

export default FlashSales