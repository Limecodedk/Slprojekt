import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import withAuth from '../components/WithAuthHOC';
import { fetchDataSearch } from '../APIConfig'

const SearchVehicles = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDataSearch(searchQuery, setData)
  }, [searchQuery]);

  const handleSearch = () => {
    fetchDataSearch(searchQuery, setData)
  };

  return (
    <div className="lg:flex flex-row gap-20 h-screen">
      <div className="lg:w-1/4 bg-menu rounded-r-lg">
        <Navbar />
      </div>
      <div className="lg:w-2/3 w-screen overflow-y-scroll mt-5">
        <div className="flex flex-row mx-auto justify-center gap-3">
          <img src="/assest/delivery.png" alt="" className="object-cover w-6" />
          <h2 className="text-center text-xl font-bold">Search vehicles</h2>
        </div>
        <div className="flex flex-row gap-5 mt-5 justify-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search vehicels number..."
            className="bg-gray-100 rounded pl-5 uppercase"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn-search text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
        <hr className="w-80% h-1 mx-auto my-4 bg-gray-100 border-0 rounded"></hr>
        {data.length === 0 ? (
          <p className="text-center">No data available. Try searching for vehicles!</p>
        ) : (
          <table className="lg:w-full table-auto mt-5">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-2 py-2">Transaktion id:</th>
                <th className="px-4 py-2">Date:</th>
                <th className="px-4 py-2">Time:</th>
                <th className="px-4 py-2">Category:</th>
                <th className="px-4 py-2">Item:</th>
                <th className="px-4 py-2">Quantity:</th>
                <th className="px-4 py-2">Price:</th>
                <th className="px-4 py-2">Total:</th>
                <th className="px-4 py-2">Paid:</th>
                <th className="px-4 py-2">Balance:</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{item.sale_transaktion_id}</td>
                  <td className="border px-4 py-2">{item.sale_date}</td>
                  <td className="border px-4 py-2">{item.sale_time}</td>
                  <td className="border px-4 py-2 capitalize">{item.sale_category_name}</td>
                  <td className="border px-4 py-2 capitalize">{item.sale_item}</td>
                  <td className="border px-4 py-2">{item.sale_quantity}</td>
                  <td className="border px-4 py-2">{item.sale_price}</td>
                  <td className="border px-4 py-2">{item.sale_total}</td>
                  <td className="border px-4 py-2">{item.sale_paid}</td>
                  <td className="border px-4 py-2">{item.sale_balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
export default withAuth(SearchVehicles);