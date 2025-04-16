import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayCedisCurrency from '../helpers/displayCurrency';

const AllOrders = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.allOrder.method,
            credentials: 'include',
        });

        const responseData = await response.json();
        setData(responseData.data);
        
        console.log("order-list", responseData);
    };
  
    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <div className='h-[calc(100vh-190px)] overflow-y-scroll'>
            {
                !data[0] && (
                    <p>No Order Available</p>
                )
            }
            <div>
                {
                    data.map((order, index) => {
                        return (
                            <div key={order.userId + index} className='border rounded p-2 mb-4 bg-white shadow-sm shadow-slate-400'>
                                <div className='flex justify-between border-b'>
                                <p className='font-medium text-md  text-teal-600'>{moment(order.createdAt).format('ll')}</p>
                                <p className='font-semibold text-sm '>{moment(order.createdAt).fromNow()}</p>
                                </div>

                                


                                <div className='grid gap-1 border-b'>
                                    {
                                        order.productDetails.map((product, productIndex) => {
                                            return (
                                                <div key={product.productId + productIndex} className='flex gap-3 justify-between '>
                                                   <div className='flex '>
                                                   <img src={product.image[0]} className='w-20 h-20  object-scale-down p-2' alt={product.name} />
                                                    <div>
                                                        <div className='font-medium w-96 text-sm text-teal-600 text-ellipsis line-clamp-1'>{product.name}</div>
                                                        <div className='flex items-center gap-5 mt-1'>
                                                            <p className=' text-sm font-semibold '>Qty: {product.quantity}</p>
                                                        </div>
                                                    </div>
                                                   </div>
                                                   <div className='mb-2 pb-2'>
                                                        <p className='font-bold text-teal-600 text-md'>{order.userDetails.name} {order.userDetails.lastname}</p>
                                                        <p className='text-sm font-bold'>{order.userDetails.address}</p>
                                                        <p className='text-sm font-bold'>{order.userDetails.number1}/{order.userDetails.number2}</p>
                                                        <p className='text-sm font-bold'>{order.userDetails.region}-{order.userDetails.city}</p>
                                                    </div>


                                                    <div className='flex justify-between flex-col '>
                                                <div className='flex flex-col gap-1 mt-1'>
                                                    <div className='flex gap-2' >
                                                        <p className=' text-sm border rounded-md border-teal-500 bg-teal-100 px-3 py-1'>{order.paymentDetails.payment_method_type[0]}</p>
                                                        <p className=' text-sm border rounded-md border-teal-500 bg-teal-100 px-3 py-1 '>{order.paymentDetails.payment_status}</p>
                                                    </div>
                                                    <div className=' text-sm font-semibold '>Selling Price: {displayCedisCurrency(product.price)}</div>

                                                    <div>
                                                        {
                                                            order.shipping_options.map((shipping, shippingIndex) => {
                                                                return (
                                                                    <div key={shipping.shipping_rate + shippingIndex} className='text-sm font-semibold'>
                                                                    Shipping Amount: {displayCedisCurrency(shipping.shipping_amount)}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>


                                                </div>
                                                <div className='font-semibold ml-auto w-fit text-md'>Total amount: {displayCedisCurrency(order.totalAmount)}</div>

                                                    </div>
                                                   
                                                </div>
                                            )
                                        })
                                    }

                        
                                </div>
                                
                                {/* User Details Section */}
                             
                               

                               

                                <div className=' ml-auto w-fit mr-14  '>
                                    <button className='bg-teal-600 text-sm px-2 py-1  mt-2 border-md border rounded-md text-white'>delivered</button>

                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default AllOrders;