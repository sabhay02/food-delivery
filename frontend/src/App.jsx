import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopUp/LoginPopup';
import PlaceOrder from './pages/placeorder/placeOrder';
import Verify from './pages/verify/Verify';

function App() {

  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
    </div>
    <Footer />
    </>
  );
}

export default App;