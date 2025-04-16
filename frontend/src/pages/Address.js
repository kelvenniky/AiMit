import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Address = () => {
    const user = useSelector(state => state?.user?.user);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        number1: '',
        number2: '',
        address: '',
        info: '',
        region: '',
        city: ''
    });
    const navigate = useNavigate();

    // Fetch existing address data when component mounts
    useEffect(() => {
        const fetchAddressData = async () => {
            try {
                const response = await fetch(SummaryApi.getAddress.url, {
                    method: SummaryApi.getAddress.method,
                    credentials: 'include',
                    headers: {
                        "content-type": "application/json"
                    }
                });
                const dataApi = await response.json();

                if (dataApi.success) {
                    setData(dataApi.data); // Assuming the response contains the address data
                } else {
                    toast.error(dataApi.message);
                }
            } catch (error) {
                toast.error("Failed to fetch address data");
            }
        };

        fetchAddressData();
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.addAddress.url, {
            method: SummaryApi.addAddress.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            console.log('data', data);
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    console.log("data Address", data);

    return (
        <section id='Address'>
            <div className='flex gap-1 mx-auto container p-4'>
                <div className='p-5 w-full bg-white max-w-2xl mx-auto'>
                    <div className='flex flex-col border-b'>
                        <p className='text-xl font-semibold pb-2'>Your Address</p>
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='flex w-full gap-10 items'>
                            <div className='w-full'>
                                <label className='text-xs text-gray-500'>First Name: </label>
                                <div className='bg-slate-100 mt-2'>
                                    <input
                                        type='text'
                                        placeholder='enter your first name'
                                        name='firstname'
                                        value={data.firstname}
                                        onChange={handleOnChange}
                                        required
                                        className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='text-xs text-gray-500'>Last Name: </label>
                                <div className='bg-slate-100 mt-2'>
                                    <input
                                        type='text'
                                        placeholder='enter your last name'
                                        name='lastname'
                                        value={data.lastname}
                                        onChange={handleOnChange}
                                        required
                                        className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-10'>
                            <div className='w-full gap-10 flex items-center'>
                                <div className='grid gap-2'>
                                    <label className='text-xs text-gray-500'>prefix</label>
                                    <label>+233</label>
                                </div>
                                <div className='bg-slate-100 mt-2 w-full'>
                                    <input
                                        type='text'
                                        placeholder='enter your phone number'
                                        name='number1'
                                        value={data.number1}
                                        onChange={handleOnChange}
                                        required
                                        className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='w-full gap-10 flex items-center'>
                                <div className='grid gap-2'>
                                    <label className='text-xs text-gray-500'>prefix</label>
                                    <label>+233</label>
                                </div>
                                <div className='bg-slate-100 mt-2 w-full'>
                                    <input
                                        type='text'
                                        placeholder='enter an additional phone number'
                                        name='number2'
                                        value={data.number2}
                                        onChange={handleOnChange}
                                        className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className='text-gray-500 text-xs'>Address</label>
                            <div className='bg-slate-100 mt-2 flex items-center relative'>
                                <input
                                    type='text'
                                    placeholder='enter your Address'
                                    name='address'
                                    value={data.address}
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'
                                />
                            </div>
                        </div>
                        <div>
                            <label className='text-gray-500 text-xs'>Additional Info</label>
                            <div className='bg-slate-100 mt-2 flex items-center relative'>
                                <input
                                    type='text'
                                    placeholder='enter your Additional Info'
                                    name='info'
                                    value={data.info}
                                    onChange={handleOnChange}
                                    className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'
                                />
                            </div>
                        </div>
                        <div className='flex w-full gap-10 items'>
                            <div className='w-full'>
                                <label className='text-xs text-gray-500'>Region: </label>
                                <div className='bg-slate-100 mt-2'>
                                    <input
                                        type='text'
                                        placeholder='enter the region'
                                        name='region'
                                        value={data.region}
                                        required
                                        onChange={handleOnChange}
                                        className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='text-xs text-gray-500'>City: </label>
                                <div className='bg-slate-100 mt-2'>
                                    <input
                                        type='text'
                                        placeholder='enter the city'
                                        name='city'
                                        value={data.city}
                                        required
                                        onChange={handleOnChange}
                                        className='w-full h-full border py-4 px-4 rounded-md border-gray-500 outline-teal-600 bg-transparent'
                                    />
                                </div>
                            </div>
                        </div>
                        <button className='bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 w-full shadow-sm shadow-slate-600 rounded-md hover:scale-110 transition-all mx-auto block mt-6'>Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Address;