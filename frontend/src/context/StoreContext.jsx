import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
        const [cartItems, setCartItems] = useState({});
        const [food_list,setFoodList]=useState([])
const url='https://food-delivery-backend-7xkr.onrender.com'
const addToCart = async(itemId) => {
  if (!cartItems[itemId]) {
    setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  } else {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }
  if(token){
    await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
  }
};

const removeFromCart = async(itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
   if(token){
    await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
  }
};

const getTotalCartAmount = () => {
  let totalAmount = 0;

  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = food_list.find(
        (product) =>product._id === item
      );


      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      } else {
        console.warn(`Item ID ${item} not found in food_list`);
      }
    }
  }

  return totalAmount;
};


const [token,setToken]=useState('')

const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
}

    const contextValue = {
        food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,url,token,setToken
    };

const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);
    }

useEffect(()=>{
    async function loadData() {
    await fetchFoodList();
    if (localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
    await loadCartData(localStorage.getItem("token"))
    }
    }
    loadData();
},[]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
