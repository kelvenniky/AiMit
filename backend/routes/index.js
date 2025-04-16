const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const addToWishlist = require('../controller/user/addToWishList')
const countAddToWishList = require('../controller/user/countAddToWishList')
const addToWishListView = require('../controller/user/addToWishListView')
const deleteWish = require('../controller/user/deleteWish')
const formSearchController = require('../controller/product/formSearchController')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')
const OrderController = require('../controller/order/OrderController')
const allOrdersController = require('../controller/order/allOrdersController')
const getSaleTypeWiseProduct = require('../controller/product/getSaleTypeWiseProduct')
const addAddressController = require('../controller/user/addAddressController')
const getAddressController = require('../controller/user/getAddresController')
const deleteAdminProduct = require('../controller/product/deleteAdminProduct')
const bargainPriceController = require('../controller/product/bargainPriceController')



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


//payments and order
router.post('/checkout',authToken, paymentController)
router.post('/webhook',webhooks) //api webhook
router.get('/order-list',authToken,OrderController)
router.get('/all-orders',authToken,allOrdersController)




//mine
router.post('/addtowishlist',authToken,addToWishlist)
router.get("/countwishlist",authToken,countAddToWishList)
router.get("/view-wishlist-product",authToken,addToWishListView)
router.post("/delete-wish",authToken,deleteWish)
router.post("/form-search",formSearchController)
router.post("/sale-type",getSaleTypeWiseProduct)
router.post("/add-address",authToken, addAddressController)
router.get("/get-address",authToken, getAddressController)
router.post("/delete-admin-product",authToken,deleteAdminProduct)
router.post("/bargain",bargainPriceController)















module.exports = router