import React, { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const FormSearch = () => {
  const [data, setData] = useState({
    productName: "",
    minPrice: "",
    maxPrice: "",
  });

  const [products, setProducts] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      setProducts(responseData.products || []); // assuming the API returns products in this way
      toast.success(responseData?.message);
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-2 rounded w-full max-w-sm h-full max-h-[40%] overflow-hidden">
        <form
          className="grid p-2 gap-2 overflow-y-scroll h-full pb-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-1 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="minPrice">Minimum Price :</label>
          <input
            type="number"
            id="minPrice"
            placeholder="Enter minimum price"
            name="minPrice"
            value={data.minPrice}
            onChange={handleOnChange}
            className="p-1 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="maxPrice">Maximum Price :</label>
          <input
            type="number"
            id="maxPrice"
            placeholder="Enter maximum price"
            name="maxPrice"
            value={data.maxPrice}
            onChange={handleOnChange}
            className="p-1 bg-slate-100 border rounded"
            required
          />

          <button className="px-3 py-1 bg-teal-600 mt-4 text-white mb-10 hover:bg-teal-700">
            Search
          </button>
        </form>

        {/* Display products if available */}
        {products.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Products:</h3>
            <ul className="list-disc list-inside">
              {products.map((product) => (
                <li key={product.id}>
                  {product.name} - ${product.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSearch;