import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { CartProvider } from './context/cartContext';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)
  const [wishlistCount,setWishlistCount] = useState(0)
  const [cartActive,setCartActive] = useState(false)

 



  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }


  //mine
  const fetchUserAddToWishList = async()=>{
    const dataResponse = await fetch(SummaryApi.addToWishListCount.url,{
      method : SummaryApi.addToWishListCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setWishlistCount(dataApi?.data?.count)
  }


  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()
    fetchUserAddToWishList()

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
          fetchUserAddToWishList,
          wishlistCount
      }}>
        <ToastContainer 
          position='top-center'
        />
        
       <CartProvider>
       <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
       </CartProvider>
      </Context.Provider>
    </>
  );
}

export default App;
