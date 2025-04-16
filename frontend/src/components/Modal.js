import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import displayCedisCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose, price, sellingPrice, addToCartProductId }) => {
    
    const [available, setAvailable] = useState('');
    const [data, setData] = useState({ bargain: "" });

    const handleOnChange =async (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleBargain = () => {
        if (data.bargain < price && data.bargain > sellingPrice) {
            setAvailable('yes');
        } else {
            setAvailable('no');
        }
    };

  



    const handleBargainUpdate = async () => {
        try {
            const response = await fetch(SummaryApi.Bargain.url, {
                method: SummaryApi.Bargain.method,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    productId: addToCartProductId,
                    bargain: data.bargain, // The bargain value to be updated
                }),
            });

            const result = await response.json();

            if (result.success) {
                console.log(result.message);
                 toast.success(result.message)
                 onClose()
                
            } else {
                console.error(result.message); // Handle error case
            }
        } catch (error) {
            console.error("Failed to update bargain:", error);
        }
    };

    if (!isOpen) return null; // Return null if modal should not be shown
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-teal-600 p-4 rounded-lg shadow-lg w-80 h-80">
                <div className="flex gap-20 ml-auto w-fit ">
                    <h2 className="font-semibold text-lg text-white">Offer Your Price</h2>
                    <div onClick={onClose} className="flex text-white text-2xl rounded">
                        <IoMdClose />
                    </div>
                </div>
                <div className="mx-2 mt-10 relative flex items-center ">
                    <input
                        type="text"
                        name='bargain'
                        onChange={handleOnChange}
                        value={data.bargain}
                        required
                        autoComplete="off"
                        className="border-b py-2 w-full flex text-white text-3xl font-semibold items-center outline-none pl-36 bg-teal-600"
                    />
                    <div className="absolute left-[76px] ">
                        <p className="text-3xl font-semibold text-white">GHS</p>
                    </div>
                </div>
                <p className="text-sm flex mt-1 justify-center font-semibold text-white">
                    Recommended price {displayCedisCurrency(sellingPrice)}
                  
                </p>

                <div>
                    {
                        available === 'yes' ? (
                            <button className="w-full text-yellow-400 text-xl font-bold rounded-md mt-3 hover:scale-105 transition-all">Product Available</button>
                        ) : (
                            <button className="w-full text-red-500 mt-3 text-xl font-bold rounded-md">Not Available</button>
                        )
                    }
                </div>
                <button className="w-full bg-white text-teal-600 py-2 shadow-lg shadow-black-100 font-bold rounded-md mt-3 hover:scale-105 transition-all" onClick={handleBargain}>Check Availability</button>

                <div>
                    {
                        available === 'yes' && (
                            <button className="w-full bg-white text-teal-600 py-2 shadow-lg shadow-black-100 font-bold rounded-md mt-2 hover:scale-105 transition-all" onClick={handleBargainUpdate}>Proceed To Checkout</button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;