import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import WishList from '../pages/WishList'
import FormSearch from '../pages/FormSearch'
import Payments from '../pages/Payments'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import OrderPage from '../pages/OrderPage'
import AllOrders from '../pages/AllOrders'
import Address from '../pages/Address'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "success",
                element :<Success/>
            },
            {
                path : "cancel",
                element :<Cancel/>
            },
            {
                path : "order",
                element :<OrderPage/>
            },


            //mine
            {
                path : 'wishlist',
                element :<WishList/>
            },
            {
                path : "form-search",
                element :<FormSearch/>
            },
            {
                path : "payments",
                element :<Payments/>
            },
            {
                path : "address",
                element :<Address/>
            },
        
            
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "all-orders",
                        element :<AllOrders/>
                    },
                ]
            },
        ]
    }
])


export default router