import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayCedisCurrency from '../helpers/displayCurrency'


const OrderPage = () => {

  const [data, setData] = useState([])

  const fetchOrderDetails = async()=>{
    const response = await fetch(SummaryApi.getOrder.url,{
      method : SummaryApi.getOrder.method,
      credentials : 'include',
      
  })
 

  const responseData = await response.json()
  setData(responseData.data)


  console.log("order-list", responseData)
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])
  return (
    <div className='p-4 w-full '>
       {
        !data[0] &&(
          <p> No Order Available</p>
        )
       }
       <div>
        {
          data.map((item,index)=>{
            return(
              <div key={index.userId+index} className=''>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('ll')}</p>
                <div className='border rounded'>
              <div className='flex justify-between  flex-col lg:flex-row'>
              <div className='grid gap-1'>
                  {
                    item?.productDetails.map((product, index)=>{
                      return(
                        <div key={product.productId+index} className='flex gap-3 bg-slate-100'>
                          <img src={product.image[0]} className='w-28 h-28 bg-slate-100 object-scale-down p-2'/>
                          <div>
                          <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                          <div className='flex items-center gap-5 mt-1'>
                          <div className='text-lg text-teal-500'>{displayCedisCurrency(product.price)}</div>
                          <p>Quantity:{product.quantity}</p>
                          </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  
                </div>
                <div className='flex flex-col min-w-[300px] gap-4 p-2'>
                <div>
                  <div className='text-lg font-medium '>Payment Details:</div>
                    <p className='ml-1'>Payment method:{item.paymentDetails.payment_method_type[0]}</p>
                    <p className='ml-1'>Payment status:{item.paymentDetails.payment_status}</p>

                </div>
                <div >
                <div className='text-lg font-medium '>Shipping Details: </div>
                  {
                    item.shipping_options.map((shipping, index)=>{
                      return(
                        <div key={shipping.shipping_rate} className=' ml-1'>
                          Shipping Amount : {shipping.shipping_amount}
                        </div>
                      )
                    })
                  }
                </div>
                </div>
                </div>
                
                <div>
              </div>
                <div className='font-semibold ml-auto w-fit lg:text-lg '>Total amount: {displayCedisCurrency(item.totalAmount)}</div>

                </div>
              </div>
            )
          })
        }
       </div>
    </div>
  )
}

export default OrderPage