import React, { useContext, useEffect ,useState} from 'react'
import './placeOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {toast }from 'react-toastify'
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)

const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
});

const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({
        ...data,
        [name]: value
    }));
};

const placeOrder = async (event) => {
    event.preventDefault();
    
    try {
        // Prepare order items
        const orderItems = food_list
            .filter(item => cartItems[item.id] > 0)
            .map(item => ({
                ...item,
                quantity: cartItems[item.id]
            }));

        // Prepare order data
        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2, // $2 delivery charge
        };

        // Send order to backend
        const response = await axios.post(
            `${url}/api/order/place`,
            orderData,
           {headers:{token}}
        );

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            toast.error("Failed to place order");
        }
    } catch (error) {
        console.error("Order error:", error);
        toast.error("An error occurred while placing your order");
    }
};

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
                    <input required type="text"name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
                </div>
                <input required type="email"name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
                <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
                <div className="multi-fields">
                    <input required type="text"name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
                    <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required type="text"name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
                    <input required type="text"name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
                </div>
                <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${getTotalCartAmount()==0?0:2}</p>
                    </div>
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</b>
                    </div>
                </div>
                <button type='submit' >PROCEED TO PAYMENT</button>
            </div>
        </form>
    );
};

export default  PlaceOrder;
