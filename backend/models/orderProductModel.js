const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    productDetails:{
        type:Array,
        default:[],
    },
    userDetails: {                 
        name:{
            type:String,
            default:'',
        },
        lastname:{
            type:String,
            default:'',
        },  
        address:{
            type:String,
            default:'',
        },
        number1:{
            type:String,
            default:'',
        },
        number2:{
            type:String,
            default:'',
        },
        region:{
            type:String,
            default:'',
        },
        city:{
            type:String,
            default:'',
        },        
    },
    email:{
        type:String,
        default:'',
    },
    userId:{
        type:String,
        default:''
    },
    paymentDetails:{
        paymentId:{
            type:String,
            default:""
        },
        payment_method_type:[],  
        payment_status:{
             type:String,
             default:''
        } 
     },
     shipping_options:[],
     totalAmount:{
        type:Number,
        default:0,
     },

},{
    timestamps:true
})

const orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel