import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';
import { GrSearch } from 'react-icons/gr';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProduct = async (searchTerm) => {
    setLoading(true);
    
    // Construct the URL with the search term
    const response = await fetch(`${SummaryApi.searchProduct.url}?q=${encodeURIComponent(searchTerm)}`);
    const dataResponse = await response.json();
    setLoading(false);

    if (dataResponse.success) {
      setData(dataResponse.data);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    // If there is a search term, fetch products
    if (search) {
      fetchProduct(search);
    }
  }, [search]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white md:hidden'>
        <div className='flex items-center w-full justify-between max-w-md border rounded-lg focus-within:shadow pl-2'>
          <input
            type='text'
            placeholder='search product here...'
            className='pl-2 w-full outline-none'
            onChange={handleSearch}
            value={search}
          />
          <div className='text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-lg'>
            <GrSearch onClick={() => fetchProduct(search)} />
          </div>
        </div>
      </div>

      {loading && (
        <p className='text-lg text-center'>Loading ...</p>
      )}

      <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>

      {data.length === 0 && !loading && (
        <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;