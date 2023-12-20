import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import InformationModal from '../components/InformationModal';
import withAuth from '../components/WithAuthHOC';
import { createNewSale } from '../APIConfig';

const CreateSale = () => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [data, setData] = useState();

  const calculateSubtotal = () => {
    const newSubtotal = quantity * price;
    setSubtotal(newSubtotal);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    calculateSubtotal();
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    calculateSubtotal();
  };

  useEffect(() => {
    calculateSubtotal();
  }, [quantity, price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubtotal = quantity * price;
    const newPaid = parseFloat(e.target.paid.value);

    let newBalance = newPaid - newSubtotal;

    const newData = {
      sale_date: e.target.date.value,
      sale_time: e.target.date.value,
      sale_category_id: e.target.category.value,
      sale_item: e.target.item.value,
      sale_quantity: e.target.quantity.value,
      sale_price: e.target.price.value,
      sale_total: subtotal,
      sale_paid: e.target.paid.value,
      sale_balance: newBalance,
      sale_vehicles_number: e.target.VehiclesNumber.value,
    };

    createNewSale(newData, setData);

    document.getElementById("infoModalButton").click();
  };

  const currentDate = new Date().toISOString().slice(0, 16);

  return (
    <>
      <div className="lg:flex flex-row gap-20 h-screen">
        <div className="lg:w-1/4 bg-menu rounded-r-lg">
          <Navbar />
        </div>

        <div className="lg:w-3/5 m-5">
          <div className="flex flex-row mx-auto justify-center gap-3">
            <img src="/assest/star.png" alt="" className="object-cover w-6" />
            <h2 className="text-center text-xl font-bold">New Sale</h2>
          </div>
          <hr className="w-80% h-1 mx-auto my-4 bg-gray-100 border-0 rounded"></hr>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="date">Date & Time</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              defaultValue={currentDate}
              className="bg-gray-100 rounded my-2 h-10 px-2"
            />
            <label htmlFor="VehiclesNumber">Vehicles Number</label>
            <input
              type="text"
              name="VehiclesNumber"
              id="VehiclesNumber"
              autoComplete="off"
              className="bg-gray-100 rounded my-2 h-10"
              required
            />
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className="bg-gray-100 rounded my-2 h-10"
            >
              <option value="1">Sand</option>
              <option value="2">Soil</option>
              <option value="3">Gravel</option>
            </select>
            <label htmlFor="item">Item</label>
            <input
              type="text"
              name="item"
              id="item"
              autoComplete="off"
              className="bg-gray-100 rounded my-3 h-10"
              required
            />
            <div className="flex lg:flex-row flex-col mt-3 gap-4 my-2">
              <div className="flex flex-col">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="bg-gray-100 rounded h-10 px-3"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-100 rounded h-10 px-3"
                  value={price}
                  onChange={handlePriceChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="subtotal">Subtotal</label>
                <input
                  type="number"
                  name="subtotal"
                  id="subtotal"
                  className="bg-gray-100 rounded h-10 px-3"
                  value={subtotal}
                  readOnly
                />
              </div>
            </div>
            <label htmlFor="paid">Paid</label>
            <input
              type="number"
              name="paid"
              id="paid"
              className="bg-gray-100 rounded mb-4 my-3 h-10"
              required
            />
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 mb-5 rounded"
              >
                Create Sale
              </button>
              <p></p>
            </div>
            <InformationModal title="The sale is created" message="Success, the sale is now created!" />
          </form>
        </div>
      </div>
    </>
  )
}
export default withAuth(CreateSale);