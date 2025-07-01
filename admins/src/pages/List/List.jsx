import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import './List.css'

const List = () => {


  const url = "https://food-delivery-backend-7xkr.onrender.com";
const [list, setList] = useState([]);

const fetchList = async () => {
    try {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("No data received");
        }
    } catch (error) {
        toast.error("Error fetching food list");
        console.error("API Error:", error);
    }
};

const removeFood = async (foodId) => {
    try {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        
        if (response.data.success) {
            toast.success(response.data.message);
            await fetchList(); // Refresh the list after successful deletion
        } else {
            toast.error(response.data.message || "Failed to delete food item");
        }
    } catch (error) {
        console.error("Delete error:", error);
        toast.error(error.response?.data?.message || "An error occurred while deleting");
    }
};

useEffect(()=>{
  fetchList()
},[])
  return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/${item.image}`} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p onClick={()=>removeFood(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
